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
 * This class encapsulates a <code>Koa</code> application and provides an API
 * for controlling the configuration and lifecycle of application server.
 * <code>Server</code> extends <code>EventEmitter</code> to provide the following
 * event-based lifecycle triggers:
 * - `ready`
 * - `before:start`
 * - `start`
 * - `after:start`
 * - `before:stop`
 * - `destroy`
 * - `after:stop`
 *
 * <code>Server</code> contains the following public variables:
 * - `app`     The instantiated Koa application
 * - `config`  The application-specific configuration object
 * - `logger`  A reference to the app logger
 * - `router`  The combined universal and application-specific router
 *
 * @class
 * @extends {EventEmitter}
 */
export default class Server extends EventEmitter {
  app: Function;
  config: Object;
  logger: Object;
  router: Object;

  /**
   * Configures and initializes the <code>Server</code> instance.
   * Calls <code>initialize</code>, which will call
   * </code>initializeMiddleware</code>, and <code>initializeRouter</code>
   * prior to emitting the `ready` event.
   * @constructor
   * @param {Object} config
   * @param {Object} appRouter
   * @return {void}
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
    this.initialize();

    this.initializeRouter(router, appRouter);

    this.emit('ready');
  }

  /**
   * Creates and makes the NodeJS HTTP(s) server available.
   * If the <code>secure</code> configuration option is true, then this method
   * calls <code>createHttpsServer</code>; otherwise the default HTTP Koa
   * server is used.
   * @see {@link createHttpsServer}
   * @see {@link start}
   * @return {void}
   */
  createServer(): Object {
    return (this.config.server.secure) ? this.createHttpsServer() : this.app;
  }

  /**
   * Creates a NodeJS HTTPS server using the <code>ssl</code> configuration option.
   * Setups a HTTP redirect to force all traffic to HTTP.
   * @return {void}
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
   * Returns a Function to be used as a callback to the server start.
   * The custom callback is invoked first, if provided. The callback function
   * will then emit the `start` event, notify any watching proceeses via
   * <code>process.send('ready')</code>, if <code>send</code> is available on
   * <code>process</code>, and finally log a start message.
   * @see {@link start}
   * @param {Function} callback
   * @return {Function}
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
   * Initializes and attaches common middleware to the app.
   * <code>initializeMiddleware</code> is called prior to attaching the
   * <code>error</code> middleware in order for implementations to easily
   * attach custom middleware.
   * @return {void}
   */
  initialize(): void {
    // Add common request security measures
    this.app.use(helmet());

    // Enabled CORS (corss-origin resource sharing)
    this.app.use(cors(this.config.get('cors')));

    // request compression
    this.app.use(compress(this.config.get('compress')));

    // Initialize body parser before routes or body will be undefined
    this.app.use(body(this.config.get('body')));

    // Trace a single request process (including over async)
    this.app.use(transactionMiddleware);

    // Configure Request logging
    this.app.use(accessLogger);

    // Configure the request error handling
    this.app.use(errorMiddleware);

    this.initializeMiddleware();
  }

  /**
   * Abstract function.
   * Called when initializing middleware to expose an entry point to attach
   * additional custom, application-specific middleware. Any middleware
   * attached to the <code>app</code> that throws an <code>Error</code> will be
   * handled by the <code>error</code> middleware.
   * @return {void}
   */
  initializeMiddleware() {
    // Override to provide custom middleware
  }

  /**
   * Given the common/core <code>Router</code> and an application-specific
   * <code>Router</code>, merge the app-specific <code>Router</code> into the
   * core <code>Router</code> and mount the product to the <code>app</code>.
   * @param  {Object} router
   * @param  {Object} appRouter
   * @return {void}
   */
  initializeRouter(router: Object, appRouter: Object): void {
    // Combine with application-specific router
    router.use(appRouter.routes());

    this.app.use(router.routes());
    this.app.use(router.allowedMethods());
  }

  /**
   * Performs any common cleanup and notifies any listeners of the tear-down
   * by emitting the `destroy` event locally and on the <code>process</code>.
   * @see {@link stop}
   * @return {void}
   */
  destroy(): void {
    // TODO logger destroy?
    this.emit('destroy');
    process.emit('destroy');
  }

  /**
   * Starts the server.
   * Starting the server will create an HTTP or HTTPS server, depending on
   * configuration, with the provided callback and begin listening on the
   * configured hostname/port.
   * If any errors are encountered while starting the server, the error is
   * logged and <code>destroy</code> is called prior to the process exiting.
   * Returns the created server instance upon successful startup.
   * @see {@link https://nodejs.org/api/http.html}
   * @see {@link createServer}
   * @see {@link getListenCallback}
   * @see {@link destroy}
   * @param {Function|null = null} callback
   * @return {Object}
   */
  start(callback: Function | null = null): void {
    if (!this.app) {
      throw new Error('Cannot start server: the express instance is not defined');
    }

    try {
      this.emit('before:start');
      this.app.server = this.createServer().listen(
        this.config.get('port'),
        this.config.get('hostname'),
        this.config.get('backlog'),
        this.getListenCallback(callback),
      );
      this.emit('after:start');
      return this.app.server;
    } catch (e) {
      this.logger.error(e);
      this.destroy();
      throw e;
    }
  }

  /**
   * Stops the server by executing the following routines:
   * 1. Emits `before:stop`
   * 2. Invokes the provided callback, if one is provided
   * 3. Stops the server from accepting any new connections
   * 4. Calls <code>destroy</code>
   * 5. Emits `after:stop`
   * @see {@link https://nodejs.org/api/net.html#net_server_close_callback}
   * @see {@link destroy}
   * @param  {Function|null = null} callback
   * @return {void}
   */
  stop(callback: Function | null = null): void {
    this.logger.info(`Server (${this.config.hostname}:${this.config.port}) stopping...`);

    this.emit('before:stop');
    if (callback) {
      callback();
    }

    this.app.server.close();
    this.destroy();
    this.emit('after:stop');
  }
}
