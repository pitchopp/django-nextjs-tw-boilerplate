FROM python:3.12-alpine

# create directory for the app user
RUN mkdir -p /home/app

# create the app user
# RUN addgroup -S app && adduser -S app -G app

# create the appropriate directories
ENV HOME=/home/app
ENV APP_HOME=/home/app/code
RUN mkdir ${APP_HOME}
RUN mkdir -p ${APP_HOME}/logs
WORKDIR ${APP_HOME}

ENV PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  # pip:
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  # poetry:
  POETRY_VERSION=1.8.1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry'

# Update and install necessary packages using apk
RUN apk update && \
    apk add --no-cache bash build-base curl gettext git libpq-dev wget libffi-dev && \
    rm -rf /var/cache/apk/*

RUN pip3 install "poetry==${POETRY_VERSION}" && poetry --version

COPY poetry.lock pyproject.toml ${APP_HOME}/
RUN poetry install --no-interaction --no-ansi --no-root

# copy entrypoint.sh
COPY ./entrypoint.sh ${APP_HOME}/
RUN sed -i 's/\r$//g' ${APP_HOME}/entrypoint.sh
RUN chmod +x  ${APP_HOME}/entrypoint.sh

# copy project
COPY . ${APP_HOME}

# chown all the files to the app user
# RUN chown -R app:app ${APP_HOME}

# change to the app user
# USER app


# run entrypoint.prod.sh
ENTRYPOINT ["sh", "entrypoint.sh"]
CMD ["prod"]
