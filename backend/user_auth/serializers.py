from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import Sector, InvestorProfile, BusinessProfile

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 'is_investor', 'is_individual')
        extra_kwargs = {
            'email': {'required': True},
            'name': {'required': True},
        }

    def validate_password(self, value):
        """Validate password using Django's built-in validators."""
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate_email(self, value):
        """Check if email already exists."""
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def create(self, validated_data):
        is_investor = validated_data.get('is_investor', False)
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            is_investor=is_investor,
            is_individual=validated_data.get('is_individual', False)
        )
        # Profile creation is handled by signals
        return user


class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login.
    """
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                # Increment failed login attempts
                try:
                    failed_user = User.objects.get(email=email)
                    failed_user.failed_login_attempts += 1
                    if failed_user.failed_login_attempts >= 5:
                        from datetime import timedelta
                        from django.utils import timezone
                        failed_user.account_locked_until = timezone.now() + timedelta(hours=1)
                    failed_user.save()
                except User.DoesNotExist:
                    pass
                raise serializers.ValidationError('Invalid credentials, please try again.')
        else:
            raise serializers.ValidationError('Email and password are required.')

        data['user'] = user
        return data


class SectorSerializer(serializers.ModelSerializer):
    """
    Serializer for the Sector model.
    """
    class Meta:
        model = Sector
        fields = '__all__'


class InvestorProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the InvestorProfile model.
    """
    interests = serializers.PrimaryKeyRelatedField(
        queryset=Sector.objects.all(), 
        many=True, 
        required=False
    )
    
    class Meta:
        model = InvestorProfile
        fields = ('contact_info', 'address_info', 'is_local', 'avatar', 'interests')


class BusinessProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for the BusinessProfile model.
    """
    category = serializers.PrimaryKeyRelatedField(
        queryset=Sector.objects.all(), 
        required=False, 
        allow_null=True
    )
    
    class Meta:
        model = BusinessProfile
        fields = ('business_name', 'contact_info', 'address_info', 'is_local', 'avatar', 'category')


class UserProfileSerializer(serializers.ModelSerializer):
    """
    A serializer to handle both investor and business profiles.
    """
    investorprofile = InvestorProfileSerializer(required=False)
    businessprofile = BusinessProfileSerializer(required=False)

    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_investor', 'is_individual', 'investorprofile', 'businessprofile')
        read_only_fields = ('id', 'email')

    def update(self, instance, validated_data):
        investor_data = validated_data.pop('investorprofile', None)
        business_data = validated_data.pop('businessprofile', None)

        # Update user instance
        instance = super().update(instance, validated_data)

        if instance.is_investor and investor_data:
            investor_profile = instance.investorprofile
            for attr, value in investor_data.items():
                setattr(investor_profile, attr, value)
            investor_profile.save()
        
        elif not instance.is_investor and business_data:
            business_profile = instance.businessprofile
            for attr, value in business_data.items():
                setattr(business_profile, attr, value)
            business_profile.save()

        return instance

    def to_representation(self, instance):
        """
        Customize the representation to only include the relevant profile.
        """
        representation = super().to_representation(instance)
        
        # Only include the profile that matches the user type
        if instance.is_investor:
            representation.pop('businessprofile', None)
        else:
            representation.pop('investorprofile', None)
            
        return representation


class OTPVerificationSerializer(serializers.Serializer):
    """
    Serializer for OTP verification.
    """
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, min_length=6, required=True)

    def validate_otp(self, value):
        """Validate OTP format."""
        if not value.isdigit():
            raise serializers.ValidationError("OTP must contain only digits.")
        return value


class ResendOTPSerializer(serializers.Serializer):
    """
    Serializer for resending OTP.
    """
    email = serializers.EmailField(required=True)


class ForgotPasswordSerializer(serializers.Serializer):
    """
    Serializer for forgot password request.
    """
    email = serializers.EmailField(required=True)


class ResetPasswordSerializer(serializers.Serializer):
    """
    Serializer for password reset.
    """
    email = serializers.EmailField(required=True)
    token = serializers.CharField(required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate_new_password(self, value):
        """Validate new password using Django's built-in validators."""
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing password.
    """
    current_password = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True, min_length=8)

    def validate_new_password(self, value):
        """Validate new password using Django's built-in validators."""
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def validate(self, data):
        """Validate that new password is different from current password."""
        if data.get('current_password') == data.get('new_password'):
            raise serializers.ValidationError({
                'new_password': 'New password must be different from current password.'
            })
        return data


class LogoutSerializer(serializers.Serializer):
    """
    Serializer for user logout.
    """
    refresh = serializers.CharField(required=False)


class UserBasicSerializer(serializers.ModelSerializer):
    """
    Basic user serializer for minimal user information.
    """
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_investor', 'is_individual')
        read_only_fields = ('id', 'email')