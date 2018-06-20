import body from 'koa-body';
import compress from 'koa-compress';
import cors from 'koa-cors';
import EventEmitter from 'events';
import fs from 'fs';
import helmet from 'koa-helmet';
import https from 'https';
import Koa from 'koa';
import mount from 'koa-mount';
import serve from 'koa-static';

import accessLogger from 'axon/middleware/accessLogger';
import errorMiddleware from 'axon/middleware/error';
import Logger from 'axon/utils/logger';
import router from 'axon/router';
import sigInitHandler from 'axon/utils/sigInitHandler';
import transactionMiddleware from 'axon/middleware/transaction';
import uncaughtExceptionHandler from 'axon/utils/uncaughtExceptionHandler';
import unhandledRejectionHandler from 'axon/utils/unhandledRejectionHandler';

// Catches ctrl+c event
process.on('SIGINT', sigInitHandler);

// Catches uncaught exceptions and rejections
process.on('uncaughtException', uncaughtExceptionHandler);
process.on('unhandledRejection', unhandledRejectionHandler);

/**
 * [app description]
 * @type {[type]}
 */
export default class Server extends EventEmitter {
  app: Function;
  config: Object;
  logger: Object;
  router: Object;

  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  constructor(config: Object, appRouter: Object): void {
    super();

    // atexit handler
    process.on('exit', this.destroy);

    this.config = config;

    // Initialize the express server
    this.app = new Koa();

    // Create the logger
    this.logger = Logger.getLogger('app');

    // Configure the app with common middleware
    this.initialize(this.app);

    this.initializeRouter(router, appRouter);

    this.emit('ready');
  }

  /**
   * [createServer description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  createServer(): Object {
    return (this.config.server.secure) ? this.createHttpsServer() : this.app;
  }

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  createHttpsServer(): void {
    this.app.all('*', function cb(request: Object, response: Object, next: Function) {
      if (request.secure) {
        return next();
      }

      return response.redirect(`https://${request.hostname}:${this.config.server.port}${request.url}`);
    });

    const sslConfig = this.config.server.ssl;
    const httpsConfig = Object.assign({}, sslConfig, {
      key: fs.readFileSync(sslConfig.get('key')),
      cert: fs.readFileSync(sslConfig.get('cert')),
    });

    return https.createServer(httpsConfig, this.app.callback());
  }

  /**
   * [callback description]
   * @type {Function}
   */
  getListenCallback(callback: Function): Function {
    return () => {
      if (callback != null) {
        callback();
      }

      this.emit('start');

      if (process.send) {
        process.send('ready');
      }

      this.logger.info(`Server listening at ${this.config.server.hostname}:${this.config.server.port}...`);
    };
  }

  /**
   * [app description]
   * @type {[type]}
   */
  initialize(app: Object): void {
    // Add common request security measures
    app.use(helmet());

    // Enabled CORS (corss-origin resource sharing)
    app.use(cors(this.config.get('cors')));

    // request compression
    app.use(compress(this.config.get('compress')));

    // Initialize body parser before routes or body will be undefined
    app.use(body(this.config.get('body')));

    // Trace a single request process (including over async)
    app.use(transactionMiddleware);

    // Configure Request logging
    app.use(accessLogger);

    this.initializeMiddleware();

    // Configure the request error handling
    app.use(errorMiddleware);
  }

  /**
   * [initializeMiddleware description]
   * @return {[type]} [description]
   */
  initializeMiddleware() {
    // Override to provide custom middleware
  }

  /**
   * [initializeRouter description]
   * @param  {[type]} appRouter [description]
   * @return {[type]}           [description]
   */
  initializeRouter(baseRouter: Object, appRouter: Object): void {
    // Combine with application-specific router
    baseRouter.use(appRouter.routes());

    this.app.use(baseRouter.routes());
    this.app.use(baseRouter.allowedMethods());
  }

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  destroy(): void {
    // TODO logger destroy?
    this.emit('destroy');
    process.emit('destroy');
  }

  /**
   * [callback description]
   * @type {Function}
   */
  async start(callback: Function | null = null): void {
    if (!this.app) {
      throw new Error('Cannot start server: the express instance is not defined');
    }

    try {
      this.emit('before:start');
      return this.createServer().listen(
        this.config.get('port'),
        this.config.get('hostname'),
        this.config.get('backlog'),
        this.getListenCallback(callback),
      );
      this.emi('after:start');
    } catch (e) {
      this.logger.error(e);
      this.destroy();
      throw e;
    }
  }

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  stop(callback: Function | null = null): void {
    this.logger.info(`Server (${this.config.hostname}:${this.config.port}) stopping...`);

    this.emit('before:stop');
    if (callback) {
      callback();
    }

    this.destroy();
    this.emit('after:stop');
  }
}
