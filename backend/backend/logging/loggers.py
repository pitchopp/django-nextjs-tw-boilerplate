def get_loggers(apps):
    loggers = {
        "": {
            "handlers": [
                "console",
                "file",
            ],
            "level": "DEBUG",
            "propagate": True,
        }
    }

    for app in apps:
        root_app = app.split(".")[0]
        loggers[root_app] = {
            "handlers": [
                "console",
                f"{root_app}_file",
            ],
            "level": "DEBUG",
            "propagate": False,
        }

    return loggers
