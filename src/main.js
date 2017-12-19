import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import flash from 'connect-flash-plus';
import fs from 'fs';
import helmet from 'helmet';
import https from 'https';
import process from 'process';
import swaggerTools from 'swagger-tools';

import { accessLogger } from 'jarvis/middleware/logging';
import { describe } from 'jarvis/api/controllers/meta';
import { errorMiddleware, notFoundError } from 'jarvis/middleware/error';
import { getLogger, createLoggers } from 'jarvis/utils/logger';
import { ping } from 'jarvis/api/controllers/health';
import { transactionMiddleware } from 'jarvis/middleware/transaction';

const DEFAULT_SWAGGER_OPTS: Object = {
  apiDocs: '/api-docs',
  apiDocsPrefix: '',
  controllers: {},
  ignoreMissingHandlers: false,
  security: {},
  swaggerUi: '/docs',
  swaggerUiDir: '',
  swaggerUiPrefix: '',
  useStubs: false,
  validateResponse: true,
};

/**
 * [app description]
 * @type {[type]}
 */
export default class Server {
  app: Function;
  config: Object;
  logger: Object;

  /**
   * [constructor description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  constructor(config: Object): void {
    this.config = { ...config };

    // Initialize the express server
    this.app = express();

    // Create all the loggers
    createLoggers(config);

    // Configure the app with common middleware
    this.configure(this.app);

    // Catches ctrl+c event
    this.boundSigIntHandler = this.sigIntHandler.bind(this);
    process.on('SIGINT', this.boundSigIntHandler);

    // Catches uncaught exceptions and rejections
    this.boundUncaughtExceptionHandler = this.unhandledExceptionHandler.bind(this);
    process.on('uncaughtException', this.boundUncaughtExceptionHandler);
    process.on('unhandledRejection', this.boundUncaughtExceptionHandler);
  }

  /**
   * [app description]
   * @type {[type]}
   */
  configure(app: Object): void {

    // Attach the logger (also create since this is the first access)
    this.logger = getLogger('root');

    // Add common request security measures
    app.use(helmet());

    // Enabled CORS (corss-origin resource sharing)
    app.use(cors(config.cors));

    // request compression
    app.use(compression());

    // Initialize body parser before routes or body will be undefined
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // Setup flash messaging
    app.use(flash({ unsafe: true }));

    // Trace a single request process (including over async)
    app.use(transactionMiddleware);

    // Configure Request logging
    // TODO switch to morgan
    app.use(accessLogger);

    // Serve asset resources using the 'assets' url
    app.use(
      conf.assets.get('url'),
      express.static(conf.assets.get('path')),
    );

    // Serve static resources using the 'static' url
    app.use(
      conf.static.get('url'),
      express.static(conf.static.get('path')),
    );

    // Configure the request error handling
    // TODO more specific error handling - make this one a fallback handler?
    app.use(errorMiddleware);
  }

  /**
   * [destroy description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  destroy(): void {
    this.removeEventListeners();
    // TODO logger destroy
    // TODO send destroy event?
  }

  /**
   * Attach middleware & controllers to the Express app.
   * Note: Order matters here.
   * @param  {[type]}  void [description]
   * @return {Promise}      [description]
   */
  async initialize(app: Object, conf: Object): void {
    throw new Error('initialize must be implemented');
  }

  /**
   * Initializes the Swagger middleware with the given swagger document and options.
   * Applies the following middleware:
   * - <code>metadata</code>
   * - <code>validator</code>
   * - <code>security</code>
   * - <code>router</code>
   * - <code>ui</code>
   *
   * Reference: https://github.com/apigee-127/swagger-tools/blob/master/docs/Middleware.md
   *
   * Options
   * =======
   * validateResponse       [boolean=false]           Whether or not to validate responses
   * apiDocs                [string=/api-docs]        The path to serve the Swagger documents from
   * apiDocsPrefix          [string=]                 The prefix to prepend to the options.apiDocs (This is required
   *                                                  when serving a swagger-tools based API behind a reverse proxy.)
   * swaggerUi              [string=/docs]            The path to serve Swagger UI from
   * swaggerUiDir           [string]                  The filesystem path to your custom swagger-ui deployment to serve
   * swaggerUiPrefix        [string]                  The prefix to prepend to the options.swaggerUi (This is required
   *                                                  when serving a swagger-tools UI behind a reverse proxy.)
   * security               [object]                  An object containing the authorization/security name, the value is
   *                                                  a function that will be used to perform the authentication/
   *                                                  authorization. The function signature for the callback is:
   *                                                  function (req, authOrSecDef, scopesOrApiKey, callback).
   * controllers            [string|string[]|object]  The controllers to look for or use. If the value is a string, we
   *                                                  assume the value is a path to a directory that contain controller
   *                                                  modules. If the value is an array, we assume the value is an array
   *                                                  of paths to directories that contain controller modules. If the
   *                                                  value is an object, we assume the object keys are the handler name
   *                                                  ({ControllerName}{HandlerFunctionName}) and the value is a
   *                                                  function.
   * ignoreMissingHandlers: [boolean]                 When false (default), a 500 is returned when a handler cannot be
   *                                                  found. When true, we will ignore the missing handler and send the
   *                                                  request downstream.
   * useStubs:              [boolean]                 Whether or not stub handlers should be used for routes with no
   *                                                  defined controller or the controller could not be found.
   *
   * @param  {[type]} options [description]
   * @return {[type]}         [description]
   */
  initializeSwagger(doc: Object, options: Object): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      swaggerTools.initializeMiddleware(doc, (middleware: ?Object) => {
        if (!middleware) {
          reject(new Error('Failed to initialize swagger'));
        }

        const mergedOpts: Object = {
          ...DEFAULT_SWAGGER_OPTS,
          options
        }

        // Interpret Swagger resources and attach metadata to request
        this.app.use(middleware.swaggerMetadata());

        // Validate Swagger requests
        this.app.use(middleware.swaggerValidator({
          validateResponse: mergedOpts.validateResponse,
        }));

        // Authenticate/authorize requests based on the authorization/security definitions
        this.app.use(middleware.swaggerSecurity(mergedOpts.security));

        // Route validated requests to appropriate controller
        app.use(middleware.swaggerRouter({
          controllers: {
            ...mergedOpts.controllers,
            describe: describe(doc),
            ping,
          },
          ignoreMissingHandlers: mergedOpts.ignoreMissingHandlers,
          useStubs: mergedOpts.useStubs,
        }));

        // Serve the Swagger documents and Swagger UI
        app.use(middleware.swaggerUi({
          apiDocs: mergedOpts.apiDocs,
          apiDocsPrefix: mergedOpts.apiDocsPrefix,
          swaggerUi: mergedOpts.swaggerUi,
          swaggerUiDir: mergedOpts.swaggerUiDir,
          swaggerUiPrefix: mergedOpts.swaggerUiPrefix,
        }));

        resolve();
      });
    });
  }

  /**
   * [onStart description]
   * @param  {[type]} Promise [description]
   * @return {[type]}         [description]
   */
  async onStart(): Promise<void> {
    // Call the abstract initialize method to allow for custom setup
    await this.initialize(this.app, this.config);

    // Send 404 if we get here in the route processing
    app.all('*', notFoundError);
  }

  /**
   * [callback description]
   * @type {Function}
   */
  async start(callback: Function | null = null): void {
    if (!this.app) {
      throw new Error('Cannot start server: the express instance is not defined');
    }

    const cb: Function = () => {
      if (callback != null) {
        callback();
      }
      // process.send('ready');
      this.logger.info(`Server listening at ${this.config.get('hostname')}:${this.config.get('port')}...`);
    };

    try {
      // Call the abstract initialize method to allow for custom setup
      await this.onStart();

      return (this.config.get('secure')) ? this.startHttps(cb) : this.startHttp(cb);
    } catch (e) {
      if (this.logger) {
        this.logger.error(e);
      } else {
        /* eslint-disable no-console */
        console.error(e);
      }
      this.destroy();
      throw e;
    }
  }

  /**
   * [startHttp description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  startHttp(callback: Function): void {
    return this.app.listen(
      this.config.get('port'),
      this.config.get('hostname'),
      this.config.get('backlog'),
      callback,
    );
  }

  /**
   * [startHttps description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  startHttps(callback: Function): void {
    this.app.all('*', function cb(request: Object, response: Object, next: Function) {
      if (request.secure) {
        return next();
      }

      return response.redirect(`https://${request.hostname}:${this.config.get('port')}${request.url}`);
    });

    const sslConfig = this.config.get('ssl');
    const httpsConfig = Object.assign({}, sslConfig, {
      key: fs.readFileSync(sslConfig.get('key')),
      cert: fs.readFileSync(sslConfig.get('cert')),
    });

    return https.createServer(httpsConfig, this.app).listen(
      this.config.get('port'),
      this.config.get('hostname'),
      this.config.get('backlog'),
      callback,
    );
  }

  /**
   * [stop description]
   * @param  {Function} callback [description]
   * @return {[type]}            [description]
   */
  stop(callback: Function | null = null): void {
    if (this.app && this.app.server) {
      this.app.server.close(() => {
        if (callback != null && typeof callback === 'function') {
          callback();
        }
        this.logger.info(`Server (${this.config.hostname}:${this.config.port}) stopping...`);
      });
    }
    this.destroy();
  }

  /**
   * [sigIntHandler description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  sigIntHandler(): void {
    if (this.logger) {
      this.logger.info('Captured ctrl-c');
    }

    this.stop();
    process.exit(0);
  }

  /**
   * [removeEventListeners description]
   * @param  {[type]} void [description]
   * @return {[type]}      [description]
   */
  removeEventListeners(): void {
    process.removeListener('SIGINT', this.boundSigIntHandler);
    process.removeListener('uncaughtException', this.boundUncaughtExceptionHandler);
  }

  /**
   * [unhandledExceptionHandler description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  unhandledExceptionHandler(e: Error): void {
    if (this.logger) {
      this.logger.error('An unhandled exception occurred. Reporting then terminating process');
      this.logger.error(e);
    }

    this.stop();
    process.exit(1);
  }
}
