import bodyparser from 'koa-bodyparser';
import compress from 'koa-compress';
import cors from 'koa-cors';
import fs from 'fs';
import helmet from 'koa-helmet';
import https from 'https';
import Koa from 'koa';

import accessLogger from 'treehouse/middleware/accessLogger';
import errorMiddleware from 'treehouse/middleware/error';
import Exception from 'treehouse/exception';
import Logger from 'treehouse/utils/logger';
import sigInitHandler from 'treehouse/utils/sigInitHandler';
import transactionMiddleware from 'treehouse/middleware/transaction';
import uncaughtExceptionHandler from 'treehouse/utils/uncaughtExceptionHandler';
import unhandledRejectionHandler from 'treehouse/utils/unhandledRejectionHandler';
import { ILLEGAL_STATE_EXCEPTION } from 'treehouse/exception/codes';

/**
 * This class encapsulates a <code>Koa</code> application and provides an API
 * for controlling the configuration and life-cycle of application server.
 *
 * <code>Server</code> contains the following public variables:
 * - `app`     The instantiated Koa application
 * - `config`  The application-specific configuration object
 * - `logger`  A reference to the app logger
 *
 * @class
 */
export default class Server {
  app: Function;

  config: Object;

  logger: Object;

  stopProcedures = [];

  startProcedures = [];

  /**
   * Configures and initializes the <code>Server</code> instance.
   * Calls <code>initialize</code> after instantiating a <code>Koa</code>
   * app, setting the <code>config</code> object to the instance, and attaching
   * the `app` <code>Logger</code> to the instance.
   *
   * Instantiation will also attach listeners to the process on the following
   * events to provide a graceful shutdown experience:
   *
   * - <code>exit</code>
   * - <code>SIGINT</code>
   *
   * @constructor
   * @param {Object}      config The application configuration object
   * @param {Object|null} logger (optional) The logger to use for all logging in treehouse
   * @return {void}
   *
   * @see {@link https://nodejs.org/api/process.html|process}
   * @see {@link https://koajs.com/|Koa}
   * @see {@link Logger}
   */
  constructor(config: Object, logger: ?Object = null): void {
    this.app = new Koa();
    this.config = config;

    this.logger = this.configureLogger(this.config, logger);

    this.configureHooks(this.logger);

    this.initialize(this.app, this.config);
  }

  /**
   * Sets up all appropriate hooks for graceful life-cycle handling.
   *
   * @param {Object} logger The logger instance to use in the hooks
   * @returns {void}
   */
  configureHooks(logger: Object): void {
    // atexit handler
    process.on('exit', this.stop);

    // Catches ctrl+c event
    process.on('SIGINT', sigInitHandler(logger));

    // Catches uncaught exceptions and rejections
    process.on('uncaughtException', uncaughtExceptionHandler(logger));
    process.on('unhandledRejection', unhandledRejectionHandler(logger));

    // pm2 graceful shutdown compatibility
    process.once('SIGINT', () => {
      this.stop();
      process.kill(process.pid, 'SIGINT');
    });
  }

  /**
   * Set the logger configuration from the Server config.
   * If a <code>logger</code> is provided, configure the Logger to use the
   * provided <code>logger</code> as the single, default logger.
   *
   * @param {Object}      config The application configuration object
   * @param {Object|null} logger (optional) The logger to use for all logging in treehouse
   * @returns {void}
   */
  configureLogger(config: Object, logger: ?Object = null): void {
    if (config.loggers) {
      Logger.configure(config.loggers);
    }

    if (logger) {
      Logger.setDefaultLogger(logger);
    }

    // Create the logger
    return Logger.getLogger();
  }

  /**
   * Creates and makes the NodeJS HTTP(s) server available.
   * If the <code>secure</code> configuration option is true, then this method
   * calls <code>createHttpsServer</code>; otherwise the default HTTP Koa
   * server is used.
   *
   * @see {@link createHttpsServer}
   * @see {@link start}
   * @return {void}
   */
  createServer(secure): Object {
    return (secure) ? this.createHttpsServer() : this.app;
  }

  /**
   * Creates a NodeJS HTTPS server using the <code>ssl</code> configuration option.
   * Setups a HTTP redirect to force all traffic to HTTP.
   *
   * @return {void}
   */
  createHttpsServer(): void {
    this.app.use(function cb(ctx: Object, next: Function) {
      if (ctx.secure) {
        return next();
      }

      return ctx.redirect(`https://${ctx.hostname}:${this.config.server.port}${ctx.url}`);
    });

    const sslConfig = this.config.server.ssl;
    const httpsConfig = Object.assign({}, sslConfig, {
      key: fs.readFileSync(sslConfig.key),
      cert: fs.readFileSync(sslConfig.cert),
    });

    return https.createServer(httpsConfig, this.app.callback());
  }

  /**
   * Returns a Function to be used as a callback to the server start.
   * The callback function will notify any watching processes via
   * <code>process.send('ready')</code>, if <code>send</code> is available on
   * <code>process</code>, and finally log a start message.
   *
   * @see {@link start}
   * @return {Function}
   */
  getListenCallback(): Function {
    return () => {
      if (process.send) {
        process.send('ready');
      }

      this.logger.info(`Server listening at ${this.config.server.hostname}:${this.config.server.port}...`);
    };
  }

  /**
   * Initializes and attaches common middleware to the provided
   * <code>Koa</code> app instance.
   *
   * For custom implementations looking to override or adjust the order of the
   * default middleware added to the app, it is recommended to extend
   * <code>Server</code> and override this method.
   *
   * For custom implementations looking to add middleware before the first
   * default middleware is attached, it is recommended to extend
   * <code>Server</code>, override this method, and call
   * <code>super.initialize();</code> after adding the custom middleware.
   *
   * @param   {Koa}     app
   * @param   {Object}  config
   * @return  {void}
   */
  initialize(app: Object, config: Object): void {
    // Add common request security measures
    app.use(helmet());

    // Enabled CORS (cors-origin resource sharing)
    app.use(cors(config && config.cors));

    // response compression
    app.use(compress(config && config.compress));

    // Initialize body parser before routes or body will be undefined
    app.use(bodyparser(config && config.bodyparser));

    // Trace a single request process (including over async)
    app.use(transactionMiddleware);

    // Configure Request logging
    app.use(accessLogger());

    // Configure the request error handling
    app.use(errorMiddleware);
  }

  /**
   * Provides a functional means to attach custom middleware or routers to the
   * <code>Koa</code> app instance by executing the provided callback function.
   * The callback is provided the <code>Koa</code> app instance.
   *
   * @param  {Function|null}  fn
   * @return {Server}         The server instance
   */
  use(fn: Function): Server {
    fn(this.app);

    return this;
  }

  /**
   * Adds the provided function to the list of startup procedures to be
   * executed when `start` is called.
   * Each procedure is provided the server instance when executed.
   *
   * @param {Function} callback
   * @returns {void}
   */
  onStart(callback: Function): void {
    this.stopProcedures.push(callback);
  }

  /**
   * Starts the server. The last thing that is done before starting the server
   * is to mount the router(s) by calling <code>mountRouters</code>.
   *
   * Starting the server will create an HTTP or HTTPS server, depending on
   * configuration, with the provided callback and begin listening on the
   * configured hostname/port.
   *
   * If any errors are encountered while starting the server, the error is
   * logged and the process exits.
   * Returns the created server instance upon successful startup; otherwise
   * <code>null</code> is returned.
   *
   * @see {@link https://nodejs.org/api/http.html|http}
   * @see {@link createServer}
   * @see {@link getListenCallback}
   *
   * @return {Object | null}
   */
  start(): Object | null {
    if (!this.app) {
      const message = {
        ...ILLEGAL_STATE_EXCEPTION(),
        details: 'Cannot start server: the koa instance is not defined',
      };

      throw new Exception(message);
    }

    try {
      this.app.tcp = this.createServer(this.config.server.secure);

      this.startProcedures.forEach((procedure) => {
        procedure(this.app);
      });

      this.app.tcp.listen(
        this.config.server.port,
        this.config.server.hostname,
        this.config.server.backlog,
        this.getListenCallback(),
      );

      return this.app.tcp;
    } catch (e) {
      this.logger.error(e);
    }

    return null;
  }

  /**
   * Adds the provided function to the list of shutdown procedures to be
   * executed when `stop` is called.
   * Each procedure is provided the server instance when executed.
   *
   * @param {Function} callback
   * @returns {void}
   */
  onStop(callback: Function): void {
    this.stopProcedures.push(callback);
  }

  /**
   * Invokes the provided callback, if one is provided, and then stops the
   * server from accepting any new connections.
   *
   * @see {@link https://nodejs.org/api/net.html#net_server_close_callback}
   * @return {void}
   */
  stop(): void {
    this.logger.info(`Server (${this.config.server.hostname}:${this.config.server.port}) stopping...`);

    this.stopProcedures.forEach((procedure) => {
      procedure(this.app);
    });

    this.app.tcp.close();
  }
}
