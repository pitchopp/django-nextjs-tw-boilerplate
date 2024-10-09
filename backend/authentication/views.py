from dj_rest_auth.views import LoginView
from django.utils import timezone
from rest_framework import viewsets, permissions
from django.contrib.auth import get_user_model
from .serializers import UserSerializer
from django_filters.rest_framework import DjangoFilterBackend

User = get_user_model()

class LoginView(LoginView):

    def login(self):
        # Call the original login method to ensure the user is authenticated
        super().login()
        # Update last login time
        self.user.last_login = timezone.now()
        self.user.save()


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['email', 'phone', 'address']
    search_fields = ['email', 'phone', 'address']
    ordering_fields = ['email', 'phone', 'address']
    ordering = ['email']
    
    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)