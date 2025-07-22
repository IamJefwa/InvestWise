from django.urls import path
from .views import (
    UserRegistrationView,
    VerifyOTPView,
    ResendOTPView,
    UserLoginView,
    UserProfileView,
    SectorListView,
    ForgotPasswordView,
    ResetPasswordView,
    ChangePasswordView,
    LogoutView
)

urlpatterns = [
    # Authentication URLs
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('logout/', LogoutView.as_view(), name='user-logout'),
    
    # Email Verification URLs
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('resend-otp/', ResendOTPView.as_view(), name='resend-otp'),
    
    # Password Management URLs
    path('forgot-password/', ForgotPasswordView.as_view(), name='forgot-password'),
    path('reset-password/', ResetPasswordView.as_view(), name='reset-password'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    
    # Profile and Data URLs
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('sectors/', SectorListView.as_view(), name='sector-list'),
]