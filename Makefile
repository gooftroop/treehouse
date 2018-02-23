CC = yarn
NODE_ENV?=development

.PHONY: clean all test

all:
	$(MAKE) clean
	$(MAKE) install

clean:
	rm -rf assets

install:
	$(CC) run webpack --config ./build/webpack.config.js
