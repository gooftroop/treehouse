CC = yarn

.PHONY: clean all test

all:
	$(MAKE) clean
	NODE_ENV=production $(MAKE) bundle
	$(MAKE) jsdoc

clean:
	rm -rf assets

dev:
	$(MAKE) clean
	NODE_ENV=development $(MAKE) bundle
	$(MAKE) jsdoc

jsdoc:
	$(CC) run jsdoc . --configure ./jsdoc.json

bundle:
	$(CC) run webpack --config ./build/webpack.config.js
