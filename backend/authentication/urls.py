from django.urls import path, include
from dj_rest_auth.registration.views import ConfirmEmailView
from dj_rest_auth.views import PasswordResetConfirmView
from .views import LoginView

urlpatterns = [
    path('register/account-confirm-email/<str:key>/', ConfirmEmailView.as_view(), name='account_confirm_email'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('register/', include('dj_rest_auth.registration.urls')),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('', include('dj_rest_auth.urls')),
]