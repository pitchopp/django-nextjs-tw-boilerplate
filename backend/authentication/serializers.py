from dj_rest_auth.serializers import (
    UserDetailsSerializer,
    PasswordResetSerializer as BasePasswordResetSerializer,
)
from django.conf import settings
from urllib.parse import urljoin
from django.utils.http import int_to_base36

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

class UserSerializer(UserDetailsSerializer):
    class Meta(UserDetailsSerializer.Meta):
        fields = ("id", "email", "first_name", "last_name", "is_staff")


class PasswordResetSerializer(BasePasswordResetSerializer):
    def url_generator(self, request, user, temp_key):
        url = urljoin(
            settings.CLIENT_URL,
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
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.save(update_fields=['first_name', 'last_name'])
