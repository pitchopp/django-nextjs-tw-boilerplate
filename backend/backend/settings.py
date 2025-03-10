from pathlib import Path
from decouple import config
from datetime import timedelta
from .logging import get_filters, get_formatters, get_handlers, get_loggers


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("DJANGO_SECRET_KEY", default=None)

DEBUG = config("DJANGO_DEBUG", default=False, cast=bool)

_DOMAIN_NAME = config("DOMAIN_NAME", "localhost")
ALLOWED_HOSTS = (
    [
        config("SERVER_IP", default="127.0.0.1"),
        "0.0.0.0",
        _DOMAIN_NAME,
        f"api.{_DOMAIN_NAME}",
        f"admin.{_DOMAIN_NAME}",
    ]
    if not DEBUG
    else ["*"]
)
DEFAULT_HOST = config("DEFAULT_HOST", default="api")
ROOT_HOSTCONF = "backend.hosts"

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django_hosts",
    "corsheaders",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "django_extensions",
    "import_export",
    "django_crontab",
    "django_celery_results",
    "django_celery_beat",
    "rest_framework",
    "rest_framework.authtoken",
    "drf_spectacular",
    "django_filters",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "authentication",
    "api",
    "post_office",
]

MIDDLEWARE = [
    # HostsRequestMiddleware must be the first middleware in the list
    "django_hosts.middleware.HostsRequestMiddleware",
    # ---------------------------------------------------------------
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "authentication.middleware.UpdateLastActivityMiddleware",
    # HostsResponseMiddleware must be the last middleware in the list
    "django_hosts.middleware.HostsResponseMiddleware",
    # ---------------------------------------------------------------
]

AUTHENTICATION_BACKENDS = [
    # Needed to login by username in Django admin, regardless of `allauth`
    # 'django.contrib.auth.backends.ModelBackend',
    # `allauth` specific authentication methods, such as login by email
    "allauth.account.auth_backends.AuthenticationBackend",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
    {
        "BACKEND": "post_office.template.backends.post_office.PostOfficeTemplates",
        "APP_DIRS": True,
        "DIRS": [],
        "OPTIONS": {
            "context_processors": [
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.template.context_processors.static",
                "django.template.context_processors.tz",
                "django.template.context_processors.request",
            ]
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": config("DB_ENGINE", default="django.db.backends.sqlite3"),
        "NAME": config("DB_NAME", default=BASE_DIR / "db.sqlite3"),
        "USER": config("DB_USER", default=""),
        "PASSWORD": config("DB_PASSWORD", default=""),
        "HOST": config("DB_HOST", default=""),
        "PORT": config("DB_PORT", default=""),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": get_formatters(INSTALLED_APPS),
    "filters": get_filters(INSTALLED_APPS),
    "handlers": get_handlers(INSTALLED_APPS),
    "loggers": get_loggers(INSTALLED_APPS),
}

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

EMAIL_BACKEND = "post_office.EmailBackend"
EMAIL_HOST = config("SMTP_HOST", default="")
EMAIL_PORT = config("SMTP_PORT", default="")
EMAIL_HOST_USER = config("SMTP_USER", default="")
EMAIL_HOST_PASSWORD = config("SMTP_PASSWORD", default="")
EMAIL_USE_TLS = config("SMTP_USE_TLS", default=True, cast=bool)
DEFAULT_FROM_EMAIL = config("DEFAULT_FROM_EMAIL", default="")
SERVER_EMAIL = config("DEFAULT_FROM_EMAIL", default="")

POST_OFFICE = {
    "BACKENDS": {
        "default": config(
            "DJANGO_EMAIL_BACKEND",
            default="django.core.mail.backends.console.EmailBackend",
        ),
    },
    "DEFAULT_PRIORITY": "now",
    "DEFAULT_TEMPLATE": "post_office",
}

CSRF_TRUSTED_ORIGINS = ["http://" + d for d in ALLOWED_HOSTS] + [
    "https://" + d for d in ALLOWED_HOSTS
]

CORS_ORIGIN_ALLOW_ALL = DEBUG  # not recommended for production

CORS_ALLOWED_SUBDOMAINS = ["www"]

CORS_ORIGIN_WHITELIST = (
    [f"http://{_DOMAIN_NAME}", f"https://{_DOMAIN_NAME}"]
    + [f"http://{sd}.{_DOMAIN_NAME}" for sd in CORS_ALLOWED_SUBDOMAINS]
    + [f"https://{sd}.{_DOMAIN_NAME}" for sd in CORS_ALLOWED_SUBDOMAINS]
)

# if not DEBUG:
#     STORAGES = {
#         "default": {
#             "BACKEND": "storages.backends.s3.S3Storage",
#             "OPTIONS": {
#                 "access_key": config("AWS_ACCESS_KEY_ID", ""),
#                 "secret_key": config("AWS_SECRET_ACCESS_KEY", ""),
#                 "bucket_name": config("AWS_STORAGE_BUCKET_NAME", ""),
#                 "endpoint_url": config("AWS_S3_ENDPOINT_URL", ""),
#                 "region_name": config("AWS_S3_REGION_NAME", ""),
#             },
#         },
#         "staticfiles": {
#             "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
#         },
#     }

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ("django_filters.rest_framework.DjangoFilterBackend",),
}

SPECTACULAR_SETTINGS = {
    "TITLE": "Your Project API",
    "DESCRIPTION": "Your project description",
    "VERSION": "1.0.0",
}

REST_AUTH = {
    "USE_JWT": True,
    "SESSION_LOGIN": False,
    "JWT_AUTH_HTTPONLY": False,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "USER_DETAILS_SERIALIZER": "authentication.serializers.UserSerializer",
    "PASSWORD_RESET_SERIALIZER": "authentication.serializers.PasswordResetSerializer",
    "REGISTER_SERIALIZER": "authentication.serializers.RegisterSerializer",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=99 if DEBUG else 7),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=99 if DEBUG else 7),
    "ROTATE_REFRESH_TOKENS": True,
    "UPDATE_LAST_LOGIN": True,
}

AUTH_USER_MODEL = "authentication.User"
ACCOUNT_ADAPTER = "authentication.adapters.AccountAdapter"
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = "mandatory"
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_CHANGE_EMAIL = True
ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_EMAIL_SUBJECT_PREFIX = ""

WEBSITE_URL = config("WEBSITE_URL", default="http://localhost:3000")
GOOGLE_CLIENT_ID = config("GOOGLE_OAUTH_CLIENT_ID", default="")

CRONJOBS: list[str] = []

# CELERY_BROKER_URL = 'redis://redis:6379/0'  # Redis broker
CELERY_BROKER_URL = config("CELERY_BROKER_URL", default="redis://redis:6379/0")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_BACKEND = "django-db"
CELERY_CACHE_BACKEND = "django-cache"
