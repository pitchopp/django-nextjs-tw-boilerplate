from dj_rest_auth.views import LoginView
from django.utils import timezone

class LoginView(LoginView):

    def login(self):
        # Call the original login method to ensure the user is authenticated
        super().login()
        # Update last login time
        self.user.last_login = timezone.now()
        self.user.save()
