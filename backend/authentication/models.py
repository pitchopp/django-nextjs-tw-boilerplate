from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    last_activity = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = "auth_user"

    def __str__(self):
        return self.email
