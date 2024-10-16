from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import viewsets, permissions
from dj_rest_auth.views import LoginView as BaseLoginView
from django_filters.rest_framework import DjangoFilterBackend
from .serializers import GoogleTokenSerializer, UserSerializer
from .permissions import UserPersmission


User = get_user_model()


class LoginView(BaseLoginView):

    def login(self):
        # Call the original login method to ensure the user is authenticated
        super().login()
        # Update last login time
        self.user.last_login = timezone.now()
        self.user.save()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, UserPersmission]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["email"]
    search_fields = ["email", "first_name", "last_name"]
    ordering_fields = ["last_name", "email"]
    ordering = ["email"]

    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)


class GoogleLoginView(LoginView):
    serializer_class = GoogleTokenSerializer
