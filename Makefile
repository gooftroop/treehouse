CC = yarn
NODE_ENV?=development

.PHONY: clean all test

all:
	$(MAKE) clean
	$(MAKE) server

clean:
	rm -rf assets

server:
	$(CC) run webpack --config ./build/webpack.config.js
