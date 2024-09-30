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
}
