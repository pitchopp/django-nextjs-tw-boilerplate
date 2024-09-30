from django.conf import settings


loggers = {
    "": {
        "handlers": ["console", "file_debug", "file_info", "file_error"],
        "level": "DEBUG",
        "propagate": True,
    }
}

for app in settings.INSTALLED_APPS:
    loggers[app] = {
        "handlers": [f"{app}_file_debug", f"{app}_file_info", f"{app}_file_error"],
        "level": "DEBUG",
        "propagate": False,
    }
