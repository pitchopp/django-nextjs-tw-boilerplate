frontend-lint:
	cd frontend && make lint

backend-lint:
	cd backend && make lint

frontend-test:
	cd frontend && make test

backend-test:
	cd backend && make test

lint:
	make frontend-lint
	make backend-lint

test:
	make frontend-test
	make backend-test

dev:
	docker compose -f compose.dev.yml -p boilerplate-dev up --watch --build --remove-orphans

qa:
	docker compose -f compose.qa.yml -p boilerplate-qa up -d --build --remove-orphans
	docker compose -f compose.qa.yml -p boilerplate-qa watch --no-up

prod:
	docker compose -f compose.prod.yml -p boilerplate up -d --build --remove-orphans

watchtower:
	docker run -d --name boilerplate-watchtower -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --cleanup --interval 60 boilerplate-backend boilerplate-frontend boilerplate-celery