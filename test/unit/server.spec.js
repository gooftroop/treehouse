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

const FAKE_LOGGER = {
  info: sinon.fake(),
  error: sinon.fake(),
};

describe('server.js', () => {
  let testRouter;
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

  beforeEach(() => {
    testRouter = {
      routes: sinon.fake.returns(() => { return []; }),
      allowedMethods: sinon.fake.returns(() => { return []; }),
    };
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

    it('should attach to the exit event on the process', () => {
      chai.assert(process.on.calledWith('exit', server.stop));
    });

    it('should attach to the SIGINT event on the process', () => {
      chai.assert(process.once.calledWith('SIGINT', sinon.match.func));
    });

    it('should create a Koa app', () => {
      chai.expect(server.app).to.be.an.instanceof(Koa);
    });

    it('should call initialize', () => {});
  });

  describe('createServer', () => {
    describe('when secure is false', () => {
      beforeEach(() => {
        config.server = { secure: false };
        server = new Server(config, testRouter);
      });

      it('should return the Koa app', () => {
        const result = server.createServer();

        chai.expect(result).to.equal(server.app);
      });
    });

    describe('when secure is true', () => {
      beforeEach(() => {
        config.server = { secure: true };
        server = new Server(config, testRouter);

        sinon.stub(server, 'createHttpsServer');
      });

      it('should call createHttpsServer', () => {
        server.createServer();

        chai.assert(server.createHttpsServer.called);
      });
    });
  });

  describe('createHttpsServer', () => {
    beforeEach(() => {
      config.server = {
        secure: true,
        ssl: {
          key: '',
          cert: '',
        },
      };

      server = new Server(config, testRouter);

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
    beforeEach(() => {
      server = new Server(config);
    });

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

  });

  describe('middleware', () => {});

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

    beforeEach(() => {
      server = new Server(config);
    });

    it('should attach the router', () => {
      server.mountRouters();

      chai.assert(router.routes.called);
      chai.assert(router.allowedMethods.called);
      chai.assert(server.app.use.called);
    });
  });

  describe('routers', () => {});

  describe('start', () => {
    describe('when the app has not been initialized', () => {
      it('should throw an Error', () => {});
    });

    it('should call getListenCallback', () => {});

    it('should call createServer', () => {});

    describe('after calling createServer', () => {
      describe('with the server configuration and listen callback', () => {
        it('should call listen', () => {});
      });
    });

    it('should return the http(s) server', () => {});

    describe('when starting causes an error', () => {
      it('should log the error', () => {});
    });
  });

  describe('stop', () => {
    it('should log a message', () => {});

    describe('when a custom callback is provided', () => {
      it('should invoke the callback', () => {});
    });

    it('should close the HTTP(s) connection', () => {});
  });
});
