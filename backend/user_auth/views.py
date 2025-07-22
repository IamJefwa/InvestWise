from django.contrib.auth import get_user_model
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from django.contrib.auth.tokens import default_token_generator
from django.utils import timezone
import requests
import random
import string
from datetime import timedelta
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Sector
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    SectorSerializer,
    UserProfileSerializer,
    InvestorProfileSerializer,
    BusinessProfileSerializer
)

User = get_user_model()

def send_email_via_service(email, subject, message):
    """Helper function to send emails via external mail microservice"""
    try:
        response = requests.post(
            'https://mutaiservices.pythonanywhere.com/auth/test_mail/',
            json={
                'email': email,
                'subject': subject,
                'body': message
            },
            timeout=10
        )
        response.raise_for_status()
        return True, None
    except requests.RequestException as e:
        return False, str(e)

class UserRegistrationView(generics.CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.is_active = False

        # Generate and save OTP
        otp = random.randint(100000, 999999)
        user.otp = str(otp)
        user.otp_created_at = timezone.now()
        user.otp_attempts = 0
        user.save()

        # Prepare email content
        subject = 'Verify your email with OTP'
        message = f'''Hi {user.name},

Welcome to our platform! Please verify your email address using the OTP code below:

Your OTP: {otp}

This OTP will expire in 10 minutes.

If you didn't create this account, please ignore this email.

Best regards,
The Team'''

        # Send OTP via external mail microservice
        success, error = send_email_via_service(user.email, subject, message)
        if not success:
            # If email fails, delete the user and return error
            user.delete()
            return Response(
                {'error': 'Failed to send verification email. Please try again later.', 'details': error},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({
            'message': 'User registered successfully. Please check your email for the OTP to verify your account.',
            'email': user.email
        }, status=status.HTTP_201_CREATED)

class VerifyOTPView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        otp = request.data.get('otp')

        if not email or not otp:
            return Response({'error': 'Email and OTP are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if account is locked
        if user.is_account_locked():
            return Response({
                'error': 'Account temporarily locked due to too many failed attempts. Please try again later.'
            }, status=status.HTTP_423_LOCKED)

        # Check OTP validity
        if not user.is_otp_valid(otp):
            user.otp_attempts += 1
            
            # Lock account after 5 failed attempts
            if user.otp_attempts >= 5:
                user.account_locked_until = timezone.now() + timedelta(hours=1)
                user.save()
                return Response({
                    'error': 'Account locked due to too many failed OTP attempts. Please try again in 1 hour.'
                }, status=status.HTTP_423_LOCKED)
            
            user.save()
            remaining_attempts = 5 - user.otp_attempts
            return Response({
                'error': 'Invalid or expired OTP.',
                'remaining_attempts': remaining_attempts
            }, status=status.HTTP_400_BAD_REQUEST)

        # Successful verification
        user.is_active = True
        user.clear_otp()
        user.account_locked_until = None
        user.failed_login_attempts = 0
        user.save()

        return Response({
            'message': 'Email verified successfully. You can now login to your account.'
        }, status=status.HTTP_200_OK)

class ResendOTPView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)

        if user.is_active:
            return Response({'error': 'Account is already verified.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if account is locked
        if user.is_account_locked():
            return Response({
                'error': 'Account temporarily locked. Please try again later.'
            }, status=status.HTTP_423_LOCKED)

        # Rate limiting: Allow resend only after 60 seconds
        if user.otp_created_at and timezone.now() < user.otp_created_at + timedelta(seconds=60):
            wait_time = (user.otp_created_at + timedelta(seconds=60) - timezone.now()).seconds
            return Response({
                'error': f'Please wait {wait_time} seconds before requesting a new OTP.'
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        # Generate new OTP
        otp = random.randint(100000, 999999)
        user.otp = str(otp)
        user.otp_created_at = timezone.now()
        user.otp_attempts = 0
        user.save()

        # Send OTP
        subject = 'Your New Verification OTP'
        message = f'''Hi {user.name},

Here's your new verification OTP:

Your OTP: {otp}

This OTP will expire in 10 minutes.

Best regards,
The Team'''

        success, error = send_email_via_service(user.email, subject, message)
        if not success:
            return Response(
                {'error': 'Failed to send OTP. Please try again later.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        return Response({
            'message': 'New OTP sent successfully. Please check your email.'
        }, status=status.HTTP_200_OK)

class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Check if account is locked
        if user.is_account_locked():
            return Response({
                'error': 'Account temporarily locked due to multiple failed login attempts. Please try again later.'
            }, status=status.HTTP_423_LOCKED)

        if not user.is_active:
            return Response({
                'error': 'Please verify your email before logging in.',
                'action_required': 'email_verification'
            }, status=status.HTTP_403_FORBIDDEN)

        # Reset failed login attempts on successful login
        user.failed_login_attempts = 0
        user.last_login_attempt = timezone.now()
        user.save()

        refresh = RefreshToken.for_user(user)
        return Response({
            'message': 'Login successful',
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': UserProfileSerializer(user).data
        })

class ForgotPasswordView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')

        if not email:
            return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email, is_active=True)
        except User.DoesNotExist:
            # Don't reveal if user exists or not for security
            return Response({
                'message': 'If this email exists in our system, you will receive password reset instructions.'
            }, status=status.HTTP_200_OK)

        # Check rate limiting
        if (user.password_reset_token_created_at and 
            timezone.now() < user.password_reset_token_created_at + timedelta(minutes=5)):
            return Response({
                'message': 'If this email exists in our system, you will receive password reset instructions.'
            }, status=status.HTTP_200_OK)

        # Generate secure reset token
        reset_token = ''.join(random.choices(string.ascii_letters + string.digits, k=32))
        user.password_reset_token = reset_token
        user.password_reset_token_created_at = timezone.now()
        user.password_reset_attempts = 0
        user.save()

        # Send reset email
        subject = 'Password Reset Request'
        reset_link = f"http://localhost:3000/reset-password?token={reset_token}&email={email}"
        message = f'''Hi {user.name},

You requested to reset your password. Click the link below to set a new password:

{reset_link}

This link will expire in 1 hour.

If you didn't request this password reset, please ignore this email.

Best regards,
The Team'''

        success, error = send_email_via_service(user.email, subject, message)
        if not success:
            # Clear the token if email failed
            user.password_reset_token = None
            user.password_reset_token_created_at = None
            user.save()

        return Response({
            'message': 'If this email exists in our system, you will receive password reset instructions.'
        }, status=status.HTTP_200_OK)

class ResetPasswordView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        token = request.data.get('token')
        new_password = request.data.get('new_password')

        if not all([email, token, new_password]):
            return Response({
                'error': 'Email, token, and new password are required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({
                'error': 'Password must be at least 8 characters long.'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email, is_active=True)
        except User.DoesNotExist:
            return Response({'error': 'Invalid reset request.'}, status=status.HTTP_400_BAD_REQUEST)

        # Check if account is locked
        if user.is_account_locked():
            return Response({
                'error': 'Account temporarily locked due to too many failed attempts.'
            }, status=status.HTTP_423_LOCKED)

        # Validate token
        if not user.is_password_reset_token_valid(token):
            user.password_reset_attempts += 1
            
            # Lock account after 5 failed attempts
            if user.password_reset_attempts >= 5:
                user.account_locked_until = timezone.now() + timedelta(hours=2)
                user.save()
                return Response({
                    'error': 'Account locked due to too many failed reset attempts.'
                }, status=status.HTTP_423_LOCKED)
            
            user.save()
            return Response({
                'error': 'Invalid or expired reset token.',
                'remaining_attempts': 5 - user.password_reset_attempts
            }, status=status.HTTP_400_BAD_REQUEST)

        # Reset password
        user.set_password(new_password)
        user.clear_password_reset_token()
        user.account_locked_until = None
        user.failed_login_attempts = 0
        user.save()

        # Send confirmation email
        subject = 'Password Reset Successful'
        message = f'''Hi {user.name},

Your password has been successfully reset.

If you didn't make this change, please contact our support team immediately.

Best regards,
The Team'''

        send_email_via_service(user.email, subject, message)

        return Response({
            'message': 'Password reset successfully. You can now login with your new password.'
        }, status=status.HTTP_200_OK)

class ChangePasswordView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')

        if not all([current_password, new_password]):
            return Response({
                'error': 'Current password and new password are required.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if len(new_password) < 8:
            return Response({
                'error': 'New password must be at least 8 characters long.'
            }, status=status.HTTP_400_BAD_REQUEST)

        user = request.user

        if not user.check_password(current_password):
            return Response({
                'error': 'Current password is incorrect.'
            }, status=status.HTTP_400_BAD_REQUEST)

        if current_password == new_password:
            return Response({
                'error': 'New password must be different from current password.'
            }, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()

        # Send confirmation email
        subject = 'Password Changed Successfully'
        message = f'''Hi {user.name},

Your password has been successfully changed.

If you didn't make this change, please contact our support team immediately.

Best regards,
The Team'''

        send_email_via_service(user.email, subject, message)

        return Response({
            'message': 'Password changed successfully.'
        }, status=status.HTTP_200_OK)

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            if self.request.user.is_investor:
                return InvestorProfileSerializer
            return BusinessProfileSerializer
        return UserProfileSerializer

    def get_instance(self):
        user = self.request.user
        if user.is_investor:
            return user.investorprofile
        return user.businessprofile

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_instance()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(UserProfileSerializer(self.get_object()).data)

class SectorListView(generics.ListAPIView):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [permissions.AllowAny]

class LogoutView(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get('refresh')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
            return Response({
                'message': 'Successfully logged out.'
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'error': 'Invalid token or already logged out.'
            }, status=status.HTTP_400_BAD_REQUEST)