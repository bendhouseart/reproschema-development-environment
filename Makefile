submodules:
	git submodule update --init --recursive

env:
	@if [ ! -f .env ]; then cp example.env .env; fi

install: env submodules
	npm install http-server
	cd reproschema-ui && npm install

run: env
	node server.js & echo $$! > server.pid
	cd reproschema-ui && npm run serve & echo $$! > ../ui.pid

run-local: env
	node server.js --protocol reproschema-library/activities/PHQ-9/ & echo $$! > server.pid
	cd reproschema-ui && VUE_APP_REPROSCHEMA_GITHUB_SRC=http://localhost:3508/PHQ9_schema npm run serve & echo $$! > ../ui.pid

stop:
	-@pkill -f "node server.js"
	-@pkill -f "npm run serve"

.PHONY: install run run-local stop submodules env
