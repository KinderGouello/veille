CMD_DOCKER_COMPOSE=docker-compose -p veille

.PHOHY: build start down node run-client run-server deploy-app

all:

build:
	$(CMD_DOCKER_COMPOSE) build

start:
	$(CMD_DOCKER_COMPOSE) up -d

down:
	$(CMD_DOCKER_COMPOSE) down

node:
	$(CMD_DOCKER_COMPOSE) exec server sh

run-client:
	$(shell npm start --prefix client)

run-server: start
	$(CMD_DOCKER_COMPOSE) exec server npm start

deploy-app:
	$(shell git push heroku-server master --force-with-lease)
	$(shell git push heroku-client master --force-with-lease)
