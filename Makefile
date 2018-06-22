CC = yarn
NODE_ENV?=development

.PHONY: clean all test

all:
	NODE_ENV=production
	$(MAKE) clean
	$(MAKE) install

clean:
	rm -rf assets

dev:
	$(MAKE) clean
	$(MAKE) install

jsdoc:
	$(CC) run jsdoc . --configure ./jsdoc.json

install:
	$(CC) run webpack --config ./build/webpack.config.js
