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
	sed -i .bak -e 's/docs\/assets/assets/g' docs/index.html

bundle:
	$(CC) run webpack --config ./build/webpack.config.js
