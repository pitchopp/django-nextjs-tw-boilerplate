PROJECT_NAME := boilerplate
.PHONY: all

all: format lint test

frontend-lint:
	cd frontend && make lint

backend-lint:
	cd backend && make lint

frontend-test:
	cd frontend && make test

backend-test:
	cd backend && make test

backend-format:
	cd backend && make format

frontend-format:
	cd frontend && make format

lint:
	make frontend-lint
	make backend-lint

test:
	make frontend-test
	make backend-test

format:
	make frontend-format
	make backend-format

dev:
	docker compose -f compose.dev.yml -p $(PROJECT_NAME) up --watch --build --remove-orphans

qa:
	docker compose -f compose.qa.yml -p $(PROJECT_NAME)-qa up -d --build --remove-orphans
	# docker compose -f compose.qa.yml -p $(PROJECT_NAME)-qa watch --no-up

prod:
	docker compose -f compose.prod.yml -p $(PROJECT_NAME) up -d --build --remove-orphans

watchtower:
	docker run -d --name $(PROJECT_NAME)-watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --cleanup --interval 60 $(PROJECT_NAME)-backend $(PROJECT_NAME)-frontend $(PROJECT_NAME)-celery