from .settings import *

SECRET_KEY = "insecure-for-testing"

# Use an in-memory database for speed
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",
    }
}

# Disable password validation for speed
AUTH_PASSWORD_VALIDATORS = []

# Use a fast hasher for testing
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.MD5PasswordHasher",
]

LOGGING = {}

# Other settings you can tweak for testing
DEBUG = False
TEMPLATES[0]["OPTIONS"]["debug"] = False  # type: ignore[index]
STORAGES: dict = {}
