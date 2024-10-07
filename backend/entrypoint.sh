#!/bin/sh

set -e

if [ "$1" = "prod" ] || [ "$1" = "prod_postgres" ]
then
    poetry run python manage.py migrate
    poetry run python manage.py collectstatic --noinput
    poetry run python manage.py crontab add
    poetry run gunicorn backend.asgi:application --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
fi

if [ "$1" = "dev" ]
then
    poetry run python manage.py runserver 0.0.0.0:8000
fi

if [ "$1" = "celery" ]
then
    poetry run celery -A backend worker -l info
fi
