from dj_rest_auth.serializers import (
    UserDetailsSerializer,
    PasswordResetSerializer as BasePasswordResetSerializer,
)
from django.conf import settings
from urllib.parse import urljoin
from django.utils.http import int_to_base36
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from django.utils.crypto import get_random_string
from allauth.socialaccount.models import SocialAccount, EmailAddress

User = get_user_model()

class UserSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ("id", "email", "first_name", "last_name", "is_staff")


class PasswordResetSerializer(BasePasswordResetSerializer):
    def url_generator(self, request, user, temp_key):
        url = urljoin(
            settings.WEBSITE_URL,
            f"auth/reset-password?uid={int_to_base36(user.pk)}&token={temp_key}",
        )
        return url

    def get_email_options(self):
        return {
            "url_generator": self.url_generator,
        }


class RegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    def custom_signup(self, request, user):
        user.first_name = self.validated_data.get("first_name", "")
        user.last_name = self.validated_data.get("last_name", "")
        user.save(update_fields=["first_name", "last_name"])


class GoogleTokenSerializer(serializers.Serializer):
    credential = serializers.CharField()

    def validate_credential(self, value):
        try:
            self.google_info = id_token.verify_oauth2_token(
                value, requests.Request(), settings.GOOGLE_CLIENT_ID
            )
        except ValueError as e:
            raise serializers.ValidationError("Invalid token")
        return value
    
    def validate(self, attrs):
        result = super().validate(attrs)
        try:
            self.user = User.objects.get(email=self.google_info.get("email"))
        except User.DoesNotExist:
            self.user = User.objects.create_user(
                email=self.google_info.get("email"),
                first_name=self.google_info.get("given_name") or "",
                last_name=self.google_info.get("family_name") or "",
                username=self.google_info.get("email"),
                password=get_random_string(length=16),
            )
            # Create a social account entry for this user
            self.social_account = SocialAccount.objects.create(user=self.user, provider="google", uid=self.google_info.get("sub"))
            
            EmailAddress.objects.create(
                user=self.user,
                email=self.user.email,
                verified=True,
                primary=True,
            )
        result["google_info"] = self.google_info
        result["user"] = self.user
        return result
        
 
