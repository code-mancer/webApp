PROJECT_NAME = webapp

COMPOSE_FILE = docker-compose.yml

up:
	docker-compose -f $(COMPOSE_FILE) up

down:
	docker-compose -f $(COMPOSE_FILE) down

build:
	docker-compose -f $(COMPOSE_FILE) build

restart:
	docker-compose -f $(COMPOSE_FILE) restart

logs:
	docker-compose -f $(COMPOSE_FILE) logs -f

ps:
	docker-compose -f $(COMPOSE_FILE) ps