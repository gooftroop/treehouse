CC = npm
CCX = npx

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
	$(CCX) jsdoc . --configure ./jsdoc.json
	sed -i .bak -e 's/docs\/assets/assets/g' docs/index.html

bundle:
	$(CCX) webpack --config ./webpack.config.js
