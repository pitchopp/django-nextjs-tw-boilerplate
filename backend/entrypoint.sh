#!/bin/sh

set -e

if [ "$1" = "prod_postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $DB_HOST $DB_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# run if the first argument is "prod" or "prod_postgres"
if [ "$1" = "prod" ] || [ "$1" = "prod_postgres" ]
then
    poetry run python manage.py migrate
    poetry run python manage.py collectstatic --noinput
    poetry run python manage.py crontab add
    poetry run uvicorn backend.asgi:application --host 0.0.0.0 --port 8000
fi

if [ "$1" = "dev" ]
then
    poetry run python manage.py runserver 0.0.0.0:8000
fi
