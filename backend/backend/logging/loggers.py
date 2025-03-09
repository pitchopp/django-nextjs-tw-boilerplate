def get_loggers(apps):
    loggers = {
        "": {
            "handlers": [
                "console",
                "file_debug",
                "file_info",
                "file_warn",
                "file_error",
            ],
            "level": "DEBUG",
            "propagate": True,
        }
    }

    for app in apps:
        loggers[app] = {
            "handlers": [
                f"{app}_file_debug",
                f"{app}_file_info",
                f"{app}_file_warn",
                f"{app}_file_error",
            ],
            "level": "DEBUG",
            "propagate": False,
        }

    return loggers
