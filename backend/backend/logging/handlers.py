import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent


def get_handlers(apps):
    # create logs directory if it doesn't exist
    if not os.path.exists(BASE_DIR / "logs"):
        os.makedirs(BASE_DIR / "logs")

    handlers = {
        "console": {
            "level": "INFO",
            "class": "logging.StreamHandler",
            "formatter": "simple",
            "filters": ["require_debug_true"],
        },
        "mail_admins": {
            "level": "ERROR",
            "class": "django.utils.log.AdminEmailHandler",
            "formatter": "verbose",
        },
        "file": {
            "level": "INFO",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": BASE_DIR / "logs/root.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 0,
            "formatter": "verbose",
        },
    }

    for app in apps:
        filename = app.split(".")[0]
        handlers[f"{filename}_file"] = {
            "level": "DEBUG",
            "class": "logging.handlers.RotatingFileHandler",
            "filename": BASE_DIR / f"logs/{filename}.log",
            "maxBytes": 1024 * 1024 * 5,  # 5 MB
            "backupCount": 0,
            "formatter": "verbose",
        }
    return handlers
