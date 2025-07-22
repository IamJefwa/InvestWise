from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import gettext_lazy as _
from django.utils import timezone  # Add this import


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    """
    Custom user model where email is the unique identifier for authentication.
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)
    name = models.CharField(max_length=255, blank=True)
    is_investor = models.BooleanField(default=False)
    is_individual = models.BooleanField(default=False)
    
    # OTP fields for email verification
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    otp_attempts = models.IntegerField(default=0)
    
    # Password reset fields
    password_reset_token = models.CharField(max_length=100, blank=True, null=True)
    password_reset_token_created_at = models.DateTimeField(blank=True, null=True)
    password_reset_attempts = models.IntegerField(default=0)
    
    # Account security
    last_login_attempt = models.DateTimeField(blank=True, null=True)
    failed_login_attempts = models.IntegerField(default=0)
    account_locked_until = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    def is_otp_valid(self, otp):
        """Check if provided OTP is valid and not expired."""
        from datetime import timedelta
        if not self.otp or self.otp != otp:
            return False
        if not self.otp_created_at:
            return False
        return timezone.now() <= self.otp_created_at + timedelta(minutes=10)
    
    def is_password_reset_token_valid(self, token):
        """Check if provided password reset token is valid and not expired."""
        from datetime import timedelta
        if not self.password_reset_token or self.password_reset_token != token:
            return False
        if not self.password_reset_token_created_at:
            return False
        return timezone.now() <= self.password_reset_token_created_at + timedelta(hours=1)
    
    def is_account_locked(self):
        """Check if account is temporarily locked due to failed attempts."""
        if not self.account_locked_until:
            return False
        return timezone.now() < self.account_locked_until
    
    def clear_otp(self):
        """Clear OTP related fields."""
        self.otp = None
        self.otp_created_at = None
        self.otp_attempts = 0
    
    def clear_password_reset_token(self):
        """Clear password reset token related fields."""
        self.password_reset_token = None
        self.password_reset_token_created_at = None
        self.password_reset_attempts = 0


class Sector(models.Model):
    """
    Model for business sectors or categories.
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Profile(models.Model):
    """
    Abstract base model for user profiles.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    contact_info = models.CharField(max_length=100, blank=True)
    address_info = models.CharField(max_length=255, blank=True)
    is_local = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class InvestorProfile(Profile):
    """
    Profile for investor users.
    """
    interests = models.ManyToManyField(Sector, blank=True, related_name='interested_investors')

    def __str__(self):
        return f'Investor Profile: {self.user.email}'


class BusinessProfile(Profile):
    """
    Profile for business users.
    """
    business_name = models.CharField(max_length=255)
    category = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True, blank=True, related_name='businesses')

    def __str__(self):
        return f'Business Profile: {self.business_name}'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_investor:
            InvestorProfile.objects.create(user=instance)
        else:
            BusinessProfile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'investorprofile'):
        instance.investorprofile.save()
    if hasattr(instance, 'businessprofile'):
        instance.businessprofile.save()