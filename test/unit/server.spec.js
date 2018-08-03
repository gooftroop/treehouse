import chai from 'chai';
import config from 'config';
import fs from 'fs';
import helmet from 'koa-helmet';
import https from 'https';
import Koa from 'koa';
import sinon from 'sinon';

import Logger from 'treehouse/utils/logger';
import router from 'treehouse/router';
import Server from 'treehouse/server';
import { ILLEGAL_STATE_EXCEPTION } from 'treehouse/exception/codes';

const FAKE_LOGGER = {
  info: sinon.fake(),
  error: sinon.fake(),
};

global.mocker.mock('koa-helmet', global.sinon.stub().returns(() => {}));

describe('server.js', () => {
  let server;

  before(() => {
    sinon.stub(process, 'on');
    sinon.stub(process, 'once');
    sinon.stub(Logger, 'getLogger').returns(FAKE_LOGGER);
  });

  after(() => {
    process.on.restore();
    process.once.restore();
    Logger.getLogger.restore();
  });

  describe('constructor', () => {
    before(() => {
      sinon.stub(Server.prototype, 'initialize');
    });

    after(() => {
      Server.prototype.initialize.restore();
    });

    beforeEach(() => {
      server = new Server(config);
    });

    afterEach(() => {
      Server.prototype.initialize.reset();
    });

    it('should attach to the exit event on the process', () => {
      chai.assert(process.on.calledWith('exit', server.stop));
    });

    it('should attach to the SIGINT event on the process', () => {
      chai.assert(process.once.calledWith('SIGINT', sinon.match.func));
    });

    it('should create a Koa app', () => {
      chai.expect(server.app).to.be.an.instanceof(Koa);
    });

    it('should provide the app to initialize', () => {
      chai.assert(server.initialize.calledWith(server.app));
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

          chai.expect(result).to.equal(server.app);
        });
      });

      describe('when secure is true', () => {
        beforeEach(() => {
          sinon.stub(server, 'createHttpsServer');
        });

        it('should call createHttpsServer', () => {
          server.createServer(true);

          chai.assert(server.createHttpsServer.called);
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

        sinon.stub(server.app, 'use');
        sinon.stub(fs, 'readFileSync').returns('fakevalue');
        sinon.stub(https, 'createServer');
      });

      afterEach(() => {
        fs.readFileSync.restore();
        https.createServer.restore();
      });

      it('should setup a HTTP redirect handler', () => {
        server.createHttpsServer();

        chai.assert(server.app.use.calledWith(sinon.match.func));
      });

      it('should call https createServer', () => {
        const httpsConfig = {
          key: 'fakevalue',
          cert: 'fakevalue',
        };

        server.createHttpsServer();

        chai.assert(https.createServer.calledWith(httpsConfig, sinon.match.func));
      });
    });

    describe('getListenCallback', () => {
      it('should return the callback function', () => {
        const result = server.getListenCallback();

        chai.expect(result).to.be.a('function');
      });

      describe('when invoking the callback', () => {
        let fn = null;

        it('should log a message', () => {
          const expectedMessage = `Server listening at ${config.server.hostname}:${config.server.port}...`;

          fn = server.getListenCallback();

          fn();

          chai.assert(server.logger.info.calledWith(expectedMessage));
        });

        describe('when a custom callback is provided', () => {
          let fakeCallback = null;

          beforeEach(() => {
            fakeCallback = sinon.fake();
            fn = server.getListenCallback(fakeCallback);
          });

          it('should invoke the custom callback', () => {
            fn();

            chai.assert(fakeCallback.called);
          });
        });

        describe('when send is available on process', () => {
          beforeEach(() => {
            process.send = sinon.fake();
            fn = server.getListenCallback();
          });

          it('should send the ready signal', () => {
            fn();

            chai.assert(process.send.calledWith('ready'));
          });
        });
      });
    });

    describe('initialize', () => {
      const app = { use: sinon.fake() };

      it('should attach helmet to the provided app', () => {
        server.initialize(app);

        chai.assert(helmet.called);
      });
    });

    describe('middleware', () => {
      describe('when a callback is provided', () => {
        it('should provide the app to the callback', () => {
          const callback = sinon.fake();

          server.middleware(callback);

          chai.assert(callback.calledWith(server.app));
        });
      });
    });

    describe('mountRouters', () => {
      before(() => {
        sinon.stub(Koa.prototype, 'use');
        sinon.stub(router, 'routes').returns(() => { return []; });
        sinon.stub(router, 'allowedMethods').returns(() => { return []; });
      });

      after(() => {
        Koa.prototype.use.restore();
        router.routes.restore();
        router.allowedMethods.restore();
      });

      it('should attach the router', () => {
        server.mountRouters();

        chai.assert(router.routes.called);
        chai.assert(router.allowedMethods.called);
        chai.assert(server.app.use.called);
      });
    });

    describe('routers', () => {
      describe('when a callback is provided', () => {
        it('should provide the app to the callback', () => {
          const callback = sinon.fake();

          server.routers(callback);

          chai.assert(callback.calledWith(server.app));
        });

        it('should provide the router to the callback', () => {
          const callback = sinon.fake();

          server.routers(callback);

          chai.assert(callback.calledWith(server.app, router));
        });
      });
    });

    describe('start', () => {
      const listen = sinon.fake();
      const listenCallback = sinon.fake();
      const httpServer = { listen };

      beforeEach(() => {
        sinon.stub(server, 'mountRouters');
        sinon.stub(server, 'getListenCallback').returns(listenCallback);
        sinon.stub(server, 'createServer').returns(httpServer);
      });

      it('should call mountRouters', () => {
        server.start();

        chai.assert(server.mountRouters.called);
      });

      it('should call getListenCallback', () => {
        server.start();

        chai.assert(server.getListenCallback.called);
      });

      it('should call createServer', () => {
        server.start();

        chai.assert(server.createServer.calledWith(config.server.secure));
      });

      it('should return the http(s) server', () => {
        const result = server.start();

        chai.expect(result).to.equal(httpServer);
      });

      describe('after calling createServer', () => {
        describe('with the server configuration and listen callback', () => {
          it('should call listen', () => {
            server.start();

            chai.assert(listen.calledWith(
              config.server.port,
              config.server.hostname,
              config.server.backlog,
              listenCallback,
            ));
          });
        });
      });

      describe('when starting causes an error', () => {
        const error = new Error("The name's Bond. James Bond.");

        beforeEach(() => {
          server.createServer.throws(() => {
            return error;
          });
        });

        it('should log the error', () => {
          server.start();
          chai.assert(server.logger.error.calledWith(error));
        });
      });

      describe('when the app has not been initialized', () => {
        beforeEach(() => {
          server.app = null;
        });

        it('should throw an ILLEGAL_STATE_EXCEPTION', () => {
          chai.expect(() => {
            server.start();
          }).to.throw()
            .with.property('code', ILLEGAL_STATE_EXCEPTION().code);
        });

        it('should throw an Exception with a `details` message', () => {
          const details = 'Cannot start server: the koa instance is not defined';

          chai.expect(() => {
            server.start();
          }).to.throw()
            .with.property('details', details);
        });
      });
    });

    describe('stop', () => {
      const close = sinon.fake();

      beforeEach(() => {
        server.app.tcp = { close };
      });

      it('should log a message', () => {
        const message = `Server (${config.server.hostname}:${config.server.port}) stopping...`;

        server.stop();

        chai.assert(server.logger.info.calledWith(message));
      });

      describe('when a custom callback is provided', () => {
        it('should invoke the callback', () => {
          const callback = sinon.fake();

          server.stop(callback);

          chai.assert(callback.called);
        });
      });

      it('should close the HTTP(s) connection', () => {
        server.stop();

        chai.assert(server.app.tcp.close.called);
      });
    });
  });
});
