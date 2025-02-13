from django.urls import path, include
from dj_rest_auth.registration.views import ConfirmEmailView
from dj_rest_auth.views import PasswordResetConfirmView
from .views import LoginView
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, GoogleLoginView


router = DefaultRouter()
router.register("users", UserViewSet)

urlpatterns = [
    path(
        "register/account-confirm-email/<str:key>/",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path("register/", include("dj_rest_auth.registration.urls")),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("google/", GoogleLoginView.as_view(), name="google_login"),
    path("", include(router.urls)),
    path("", include("dj_rest_auth.urls")),
]
