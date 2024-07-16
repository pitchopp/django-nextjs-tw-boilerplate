#!/bin/sh

set -e

# if [ "$DATABASE" = "postgres" ]
# then
# echo "Waiting for postgres..."

# while ! nc -z $DB_HOST $DB_PORT; do
#   sleep 0.1
# done

# echo "PostgreSQL started"
# fi

poetry run python manage.py migrate
poetry run python manage.py collectstatic --noinput
poetry run gunicorn backend.wsgi:application --bind 0.0.0.0:8000