submodules:
	git submodule update --init --recursive

env:
	@if [ ! -f .env ]; then cp example.env .env; fi

install: submodules
	npm install express
	cd reproschema-ui && npm install

run: env
	node server.js & echo $$! > server.pid
	cd reproschema-ui && npm run serve & echo $$! > ../ui.pid

stop:
	-@if [ -f server.pid ]; then kill `cat server.pid` && rm server.pid; fi
	-@if [ -f ui.pid ]; then kill `cat ui.pid` && rm ui.pid; fi

.PHONY: install run stop
