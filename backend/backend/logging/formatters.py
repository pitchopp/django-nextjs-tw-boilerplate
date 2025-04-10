from pythonjsonlogger import jsonlogger


class JsonFormatter(jsonlogger.JsonFormatter):
    def add_fields(self, log_record, record, message_dict):
        super().add_fields(log_record, record, message_dict)
        log_record["data"] = message_dict
        for k in message_dict.keys():
            if k != "message" and k in log_record:
                del log_record[k]


def get_formatters(apps):
    formatters = {
        "verbose": {
            "format": "{levelname}::{asctime}::{module}::{process:d}::{thread:d}::{message}",
            "style": "{",
        },
        "simple": {
            "()": "django.utils.log.ServerFormatter",
            "format": "[{server_time}] {message}",
            "style": "{",
        },
        "json": {
            "()": "backend.logging.formatters.JsonFormatter",
            "format": "%(asctime)s %(levelname)s %(pathname)s %(name)s %(module)s %(funcName)s %(lineno)d %(message)s %(process)d %(threadName)s",
            "datefmt": "%Y-%m-%dT%H:%M:%S%z",
        },
    }
    return formatters
