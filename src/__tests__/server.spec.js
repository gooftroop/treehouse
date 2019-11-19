import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import config from 'config';
import cors from 'koa-cors';
import fs from 'fs';
import helmet from 'koa-helmet';
import https from 'https';
import Koa from 'koa';

import accessLogger from 'treehouse/middleware/accessLogger';
import errorMiddleware from 'treehouse/middleware/error';
import Logger from 'treehouse/utils/logger';
import Server from 'treehouse/server';
import transactionMiddleware from 'treehouse/middleware/transaction';
import { ILLEGAL_STATE_EXCEPTION } from 'treehouse/exception/codes';

jest.mock('treehouse/middleware/accessLogger');
jest.mock('treehouse/utils/logger');
jest.mock('koa-bodyparser');
jest.mock('koa-compress');
jest.mock('koa-cors');
jest.mock('koa-helmet');

jest.spyOn(process, 'on').mockImplementation(jest.fn());
jest.spyOn(process, 'once').mockImplementation(jest.fn());

describe('server.js', () => {
  let server;

  describe('constructor', () => {
    beforeEach(() => {
      jest.spyOn(Server.prototype, 'configureHooks').mockImplementation(jest.fn());
      jest.spyOn(Server.prototype, 'configureLogger').mockImplementation(jest.fn(() => Logger.getLogger()));
      jest.spyOn(Server.prototype, 'initialize').mockImplementation(jest.fn());

      // Instantiate server
      server = new Server(config);
    });

    afterEach(() => {
      Server.prototype.initialize.mockRestore();
      Server.prototype.configureHooks.mockRestore();
    });

    it('should create a Koa app', () => {
      expect(server.app).toBeInstanceOf(Koa);
    });

    it('should call configureHooks with the logger', () => {
      expect(server.configureHooks).toHaveBeenLastCalledWith(Logger.getLogger());
    });

    it('should provide the app and config to initialize', () => {
      expect(server.initialize).toHaveBeenCalledWith(server.app, server.config);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      server = new Server(config);
    });

    describe('configureHooks', () => {
      it('should attach to the exit event on the process', () => {
        server.configureHooks(server.logger);

        expect(process.on).toHaveBeenCalledWith('exit', server.stop);
      });

      it('should attach to the SIGINT event on the process', () => {
        server.configureHooks(server.logger);

        expect(process.once).toHaveBeenCalledWith('SIGINT', expect.any(Function));
      });
    });

    describe('createServer', () => {
      describe('when secure is false', () => {
        it('should return the Koa app', () => {
          const result = server.createServer(false);

          expect(result).toEqual(server.app);
        });
      });

      describe('when secure is true', () => {
        beforeEach(() => {
          server.createHttpsServer = jest.fn();
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

        jest.spyOn(fs, 'readFileSync').mockImplementation(() => 'fakevalue');

        server.app.use = jest.fn();
        https.createServer = jest.fn();
      });

      afterEach(() => {
        fs.readFileSync.mockRestore();
      });

      it('should setup a HTTP redirect handler', () => {
        server.createHttpsServer();

        expect(server.app.use).toHaveBeenCalledWith(expect.any(Function));
      });

      it('should call https createServer', () => {
        server.createHttpsServer();

        const expectedConfig = {
          cert: 'fakevalue',
          key: 'fakevalue',
        };

        expect(https.createServer).toHaveBeenCalledWith(expectedConfig, expect.any(Function));
      });
    });

    describe('getListenCallback', () => {
      describe('when invoking the callback', () => {
        let fn = null;

        it('should log a message', () => {
          const expectedMessage = `Server listening at ${config.server.hostname}:${config.server.port}...`;

          fn = server.getListenCallback();

          fn();

          expect(server.logger.info).toHaveBeenCalledWith(expectedMessage);
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

        expect(app.use).toHaveBeenCalledWith(helmet());
      });

      it('should attach the transaction middleware to the provided app', () => {
        server.initialize(app);

        expect(app.use).toHaveBeenCalledWith(transactionMiddleware);
      });

      it('should attach the accessLogger middleware to the provided app', () => {
        server.initialize(app);

        expect(accessLogger).toHaveBeenCalled();

        expect(app.use).toHaveBeenCalledWith(accessLogger());
      });

      it('should attach the error middleware to the provided app', () => {
        server.initialize(app);

        expect(app.use).toHaveBeenCalledWith(errorMiddleware);
      });

      describe('cors', () => {
        describe('when the cors configuration does not exist', () => {
          it('should attach the cors middleware to the provided app', () => {
            server.initialize(app);

            expect(cors).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(cors());
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

            expect(cors).toHaveBeenCalledWith(server.config.cors);

            expect(app.use).toHaveBeenCalledWith(cors());
          });
        });
      });

      describe('compress', () => {
        describe('when the compress configuration does not exist', () => {
          it('should attach the compress middleware to the provided app', () => {
            server.initialize(app);

            expect(compress).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(compress());
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

            expect(app.use).toHaveBeenCalledWith(compress());
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

            expect(app.use).toHaveBeenCalledWith(bodyparser());
          });
        });

        describe('when the bodyparser configuration does exist', () => {
          it('should attach the bodyparser middleware to the provided app', () => {
            server.initialize(app);

            expect(bodyparser).toHaveBeenCalled();

            expect(app.use).toHaveBeenCalledWith(bodyparser());
          });
        });
      });
    });

    describe('use', () => {
      let returnedMiddleware;
      let callback;

      beforeEach(() => {
        returnedMiddleware = jest.fn();
        callback = jest.fn(() => returnedMiddleware);
      });

      describe('when a callback is provided', () => {
        beforeEach(() => {
          jest.spyOn(server.app, 'use').mockImplementation(() => jest.fn());
        });

        afterEach(() => {
          server.app.use.mockRestore();
        });

        it('should provide the app to the callback', () => {
          server.use(callback);

          expect(callback).toHaveBeenCalledWith(server.app);
        });

        it('should call app.use with the return value of the callback', () => {
          server.use(callback);

          expect(server.app.use).toHaveBeenCalledWith(returnedMiddleware);
        });
      });
    });

    describe('start', () => {
      const listen = jest.fn();
      const mockListenCallback = jest.fn();
      const mockHttpServer = { listen };

      beforeEach(() => {
        server.getListenCallback = jest.fn(() => mockListenCallback);

        server.createServer = jest.fn(() => mockHttpServer);
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

        expect(result).toEqual(mockHttpServer);
      });

      describe('after calling createServer', () => {
        describe('with the server configuration and listen callback', () => {
          it('should call listen', () => {
            server.start();

            expect(listen).toHaveBeenCalledWith(
              config.server.port,
              config.server.hostname,
              config.server.backlog,
              mockListenCallback,
            );
          });
        });
      });

      describe('when starting causes an error', () => {
        const error = new Error("The name's Bond. James Bond.");

        beforeEach(() => {
          server.createServer = jest.fn(() => {
            throw error;
          });
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

      it('should close the HTTP(s) connection', () => {
        server.stop();

        expect(server.app.tcp.close).toHaveBeenCalled();
      });
    });
  });
});
