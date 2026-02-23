.PHONY: up down build logs test lint db-create db-migrate db-seed sh

up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

logs:
	docker compose logs -f

test:
	docker compose exec app npm test

lint:
	docker compose exec app npm run lint

db-create:
	docker compose exec app npx prisma db push

db-migrate:
	docker compose exec app npx prisma migrate dev

db-seed:
	docker compose exec app npx prisma db seed

sh:
	docker compose exec app sh
