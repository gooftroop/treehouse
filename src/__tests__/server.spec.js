import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import config from 'config';
import cors from 'koa-cors';
import fs from 'fs';
import helmet from 'koa-helmet';
import https from 'https';
import Koa from 'koa';

// import accessLogger from 'treehouse/middleware/accessLogger';
import errorMiddleware from 'treehouse/middleware/error';
import Logger from 'treehouse/utils/logger';
import router from 'treehouse/router';
import Server from 'treehouse/server';
import transactionMiddleware from 'treehouse/middleware/transaction';
import { ILLEGAL_STATE_EXCEPTION } from 'treehouse/exception/codes';

// const MOCK_ACCESS_LOGGER_MIDDLEWARE = jest.fn();
const MOCK_BODYPARSER_MIDDLEWARE = jest.fn();
const MOCK_COMPRESS_MIDDLEWARE = jest.fn();
const MOCK_CORS_MIDDLEWARE = jest.fn();
const MOCK_HELMET_MIDDLEWARE = jest.fn();

jest.mock('treehouse/utils/logger');
// jest.mock('treehouse/middleware/accessLogger', () => { return MOCK_ACCESS_LOGGER_MIDDLEWARE; });
jest.mock('koa-bodyparser', () => { return MOCK_BODYPARSER_MIDDLEWARE; });
jest.mock('koa-compress', () => { return MOCK_COMPRESS_MIDDLEWARE; });
jest.mock('koa-cors', () => { return MOCK_CORS_MIDDLEWARE; });
jest.mock('koa-helmet', () => { return MOCK_HELMET_MIDDLEWARE; });

jest.spyOn(process, 'on').mockImplementation(jest.fn());
jest.spyOn(process, 'once').mockImplementation(jest.fn());

describe('server.js', () => {
  let server;

  describe('constructor', () => {
    beforeEach(() => {
      jest.spyOn(Server.prototype, 'initialize').mockImplementation(jest.fn());
      server = new Server(config);
    });

    afterEach(() => {
      Server.prototype.initialize.mockRestore();
    });

    it('should attach to the exit event on the process', () => {
      expect(process.on).toHaveBeenCalledWith('exit', server.stop);
    });

    it('should attach to the SIGINT event on the process', () => {
      expect(process.once).toHaveBeenCalledWith('SIGINT', expect.any('function'));
    });

    it('should create a Koa app', () => {
      expect(server.app).toBeInstanceOf(Koa);
    });

    it('should provide the app to initialize', () => {
      expect(server.initialize).toHaveBeenCalledWith(server.app);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      server = new Server(config);
    });

    describe('createServer', () => {
      describe('when secure is false', () => {
        it('should return the Koa app', () => {
          const result = server.createServer(false);

          expect(result).to.equal(server.app);
        });
      });

      describe('when secure is true', () => {
        beforeEach(() => {
          jest.mock(server.createHttpsServer);
        });

        it('should call createHttpsServer', () => {
          server.createServer(true);

          expect(server.createHttpsServer).toHaveBeenCalled();
        });
      });
    });

    describe('createHttpsServer', () => {
      beforeEach(() => {
        server.config.server = {
          secure: true,
          ssl: {
            key: '',
            cert: '',
          },
        };

        jest.mock(server.app.use);
        jest.mock(fs.readFileSync, () => { return 'fakevalue'; });
        jest.mock(https.createServer);
      });

      afterEach(() => {
        fs.readFileSync.mockRestore();
        https.createServer.mockRestore();
      });

      it('should setup a HTTP redirect handler', () => {
        server.createHttpsServer();

        expect(server.app.use).toHavBeenCalledWith(expect.any('function'));
      });

      it('should call https createServer', () => {
        const httpsConfig = {
          key: 'fakevalue',
          cert: 'fakevalue',
        };

        server.createHttpsServer();

        expect(https.createServer).toHaveBeenCalledWith(httpsConfig, expect.any('function'));
      });
    });

    describe('getListenCallback', () => {
      it('should return the callback function', () => {
        const result = server.getListenCallback();

        expect(result).toBe(expect.any('function'));
      });

      describe('when invoking the callback', () => {
        let fn = null;

        it('should log a message', () => {
          const expectedMessage = `Server listening at ${config.server.hostname}:${config.server.port}...`;

          fn = server.getListenCallback();

          fn();

          expect(server.logger.info).toHaveBeenCalledWith(expectedMessage);
        });

        describe('when a custom callback is provided', () => {
          let fakeCallback = null;

          beforeEach(() => {
            fakeCallback = jest.fn();
            fn = server.getListenCallback(fakeCallback);
          });

          it('should invoke the custom callback', () => {
            fn();

            expect(fakeCallback).toHaveBeenCalled();
          });
        });

        describe('when send is available on process', () => {
          beforeEach(() => {
            process.send = jest.fn();
            fn = server.getListenCallback();
          });

          it('should send the ready signal', () => {
            fn();

            expect(process.send).toHaveBeenCalledWith('ready');
          });
        });
      });
    });

    describe('initialize', () => {
      const app = { use: jest.fn() };

      it('should attach the helmet middleware to the provided app', () => {
        server.initialize(app);

        expect(helmet).toHaveBeenCalled();

        expect(app.use).toHaveBeenCalledWith(MOCK_HELMET_MIDDLEWARE);
      });

      it('should attach the transaction middleware to the provided app', () => {
        server.initialize(app);

        expect(app.use).toHaveBeenCalledWith(transactionMiddleware);
      });

      // it('should attach the accessLogger middleware to the provided app', () => {
      //   server.initialize(app);

      //   expect(accessLogger).toHaveBeenCalled();

      //   expect(app.use).toHaveBeenCalledWithMOCK_ACCESS_LOGGER_MIDDLEWARE);
      // });

      it('should attach the error middleware to the provided app', () => {
        server.initialize(app);

        expect(app.use).toHaveBeenCalledWith(errorMiddleware);
      });

      describe('cors', () => {
        describe('when the cors configuration does not exist', () => {
          it('should attach the cors middleware to the provided app', () => {
            server.initialize(app);

            expect(cors).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_CORS_MIDDLEWARE);
          });
        });

        describe('when the cors configuration does exist', () => {
          beforeEach(() => {
            const modifiedConfig = {
              ...config,
              cors: {
                origin: 'test.com',
              },
            };

            server = new Server(modifiedConfig);
          });

          it('should attach the cors middleware to the provided app', () => {
            server.initialize(app);

            expect(cors).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_CORS_MIDDLEWARE);
          });
        });
      });

      describe('compress', () => {
        describe('when the compress configuration does not exist', () => {
          it('should attach the compress middleware to the provided app', () => {
            server.initialize(app);

            expect(compress).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_COMPRESS_MIDDLEWARE);
          });
        });

        describe('when the compress configuration does exist', () => {
          beforeEach(() => {
            const modifiedConfig = {
              ...config,
              compress: {
                threshold: 2048,
              },
            };

            server = new Server(modifiedConfig);
          });

          it('should attach the compress middleware to the provided app', () => {
            server.initialize(app);

            expect(compress).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_COMPRESS_MIDDLEWARE);
          });
        });
      });

      describe('body', () => {
        describe('when the bodyparser configuration does not exist', () => {
          beforeEach(() => {
            const modifiedConfig = {
              ...config,
              bodyparser: {
                textLimit: 2048,
              },
            };

            server = new Server(modifiedConfig);
          });

          it('should attach the bodyparser middleware to the provided app', () => {
            server.initialize(app);

            expect(bodyparser).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_BODYPARSER_MIDDLEWARE);
          });
        });

        describe('when the bodyparser configuration does exist', () => {
          it('should attach the bodyparser middleware to the provided app', () => {
            server.initialize(app);

            expect(bodyparser).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(MOCK_BODYPARSER_MIDDLEWARE);
          });
        });
      });
    });

    describe('middleware', () => {
      describe('when a callback is provided', () => {
        it('should provide the app to the callback', () => {
          const callback = jest.fn();

          server.middleware(callback);

          expect(callback).toHaveBeenCalledWith(server.app);
        });
      });
    });

    describe('mountRouters', () => {
      beforeEach(() => {
        jest.mock(Koa.prototype.use);
        jest.mock(router.routes, () => { return []; });
        jest.mock(router.allowedMethods, () => { return []; });
      });

      afterEach(() => {
        Koa.prototype.use.mockRestore();
        router.routes.mockRestore();
        router.allowedMethods.mockRestore();
      });

      it('should attach the router', () => {
        server.mountRouters();

        expect(router.routes).toHaveBeenCalled();
        expect(router.allowedMethods).toHaveBeenCalled();
        expect(server.app.use).toHaveBeenCalled();
      });
    });

    describe('routers', () => {
      describe('when a callback is provided', () => {
        it('should provide the app to the callback', () => {
          const callback = jest.fn();

          server.routers(callback);

          expect(callback).toHaveBeenCalledWith(server.app);
        });

        it('should provide the router to the callback', () => {
          const callback = jest.fn();

          server.routers(callback);

          expect(callback).toHaveBeenCalledWith(server.app, router);
        });
      });
    });

    describe('start', () => {
      const listen = jest.fn();
      const mockListenCallback = jest.fn();
      const mockHttpServer = { listen };

      beforeEach(() => {
        jest.mock(server.mountRouters);
        jest.mock(server.getListenCallback, () => {
          return mockListenCallback;
        });
        jest.mock(server.createServer, () => {
          return mockHttpServer;
        });
      });

      it('should call mountRouters', () => {
        server.start();

        expect(server.mountRouters).toHaveBeenCalled();
      });

      it('should call getListenCallback', () => {
        server.start();

        expect(server.getListenCallback).toHaveBeenCalled();
      });

      it('should call createServer', () => {
        server.start();

        expect(server.createServer).toHaveBeenCalledWith(config.server.secure);
      });

      it('should return the http(s) server', () => {
        const result = server.start();

        expect(result).toEqual(httpServer);
      });

      describe('after calling createServer', () => {
        describe('with the server configuration and listen callback', () => {
          it('should call listen', () => {
            server.start();

            expect(listen).toHaveBeenCalledWith(
              config.server.port,
              config.server.hostname,
              config.server.backlog,
              listenCallback,
            );
          });
        });
      });

      describe('when starting causes an error', () => {
        const error = new Error("The name's Bond. James Bond.");

        beforeEach(() => {
          server.createServer.mockRejectedValue(error);
        });

        it('should log the error', () => {
          server.start();
          expect(server.logger.error).toHaveBeenCalledWith(error);
        });
      });

      describe('when the app has not been initialized', () => {
        beforeEach(() => {
          server.app = null;
        });

        it('should throw an ILLEGAL_STATE_EXCEPTION', () => {
          expect(() => {
            server.start();
          }).toThrow(expect.objectContaining({
            code: ILLEGAL_STATE_EXCEPTION().code,
          }));
        });

        it('should throw an Exception with a `details` message', () => {
          const details = 'Cannot start server: the koa instance is not defined';

          expect(() => {
            server.start();
          }).toThrow(expect.objectContaining({ details }));
        });
      });
    });

    describe('stop', () => {
      const close = jest.fn();

      beforeEach(() => {
        server.app.tcp = { close };
      });

      it('should log a message', () => {
        const message = `Server (${config.server.hostname}:${config.server.port}) stopping...`;

        server.stop();

        expect(server.logger.info).toHaveBeenCalledWith(message);
      });

      describe('when a custom callback is provided', () => {
        it('should invoke the callback', () => {
          const callback = jest.fn();

          server.stop(callback);

          expect(callback).toHaveBeenCalled();
        });
      });

      it('should close the HTTP(s) connection', () => {
        server.stop();

        expect(server.app.tcp.close).toHaveBeenCalled();
      });
    });
  });
});
