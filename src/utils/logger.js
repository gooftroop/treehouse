/**
 * @module utils/logger
 * @exports DEFAULT_LOGGER_NAME
 * @exports Logger
 */
import Bunyan from 'bunyan';
import process from 'process';

export const DEFAULT_CONFIG: Object = {
  default: 'app',
  handlers: {
    access: {
      name: 'access',
      level: 'info',
    },
    app: {
      name: 'access',
      level: 'info',
    },
  },
  streams: {},
};

export const DEFAULT_LOGGER: Object = {
  info: console.log,
  warn: console.warn,
  error: console.error,
};

/*
 * BEGIN NOTE: example of stream config
  streamConfig = Object.assign({}, streamsConfig.get('cloudwatch'));
  streamConfig.logStreamName += `-${process.pid}-${uuidv4()}`;
  logger.addStream({
    name: 'cloudwatch',
    type: 'raw',
    stream: createCWStream(Object.assign({}, streamConfig)),
  });
 * END NOTE
 */

/**
 * Implementation of the <code>Bunyan</code> logger that provides a static
 * access method to retrieve configuration logger instances and to extend the
 * logging output behavior to include our request <code>transaction</code>
 * data as additional log metadata.
 *
 * The configuration object must be of the following shape:
 *  {
 *    default_name: [name],
 *    handlers: {
 *      [name]: {
 *        name: [name],
 *        level: [valid level],
 *      }
 *    },
 *    streams: {
 *      // TBD
 *    },
 *  }
 *
 * @see {@link https://github.com/trentm/node-bunyan}
 *
 * @class
 * @extends Bunyan
 */
class Logger extends Bunyan {
  // static logger config
  static config: Object = DEFAULT_CONFIG;

  // loggers cache
  static loggers: Object = {};

  /**
   * Extends <code>Bunyan</code>'s functionality to include the
   * <code>transaction</code> data in the log output. Calls
   * <code>Bunyan._emit</code> with the modified log record.
   * <code>_emit</code> is responsible for writing a log record to the logger
   * instance's output.
   *
   * @param  {Object} rec     The log record to emit
   * @param  {boolean} noemit Flag controlling if the current record should be
   *                          emitted or not
   * @return {void}
   */
  _emit(rec: Object, noemit: boolean): void {
    const r: Object = this.serializeTransaction(rec);

    // eslint-disable-next-line no-underscore-dangle
    return super._emit(r, noemit);
  }

  /**
   * Generates a formatted object from the <code>transaction</code> data
   * attached to the current <code>process.domain</code>. If such a
   * <code>transaction</code> exists, get the <code>transaction</code>'s
   * ID and the request context (Koa context).
   * Attach the <code>transaction</code> ID to the record, as well as
   * the session ID, if a session exists, and some basic information about the
   * current logged-in user, if a user exists.
   *
   * The session is found on the context as <code>ctx.session</code>, and the
   * use is found on the context as <code>ctx.user</code>.
   *
   * @param  {rec} Object The log record to emit
   * @return {Object}     The modified log record
   */
  serializeTransaction(rec: Object): Object {
    const r: Object = rec;
    const transaction: Object = process.domain;

    if (transaction && transaction.data) {
      const { ctx } = transaction.data;

      r.transactionId = transaction.data.id;
      if (ctx.session) {
        r.sessionId = ctx.session.id;
      }

      if (ctx.user) {
        r.user = {
          id: ctx.user.id,
          username: ctx.user.username,
        };
      }
    }

    return rec;
  }

  /**
   * Applies the provided config as the static configuration for all loggers.
   * @param   {Object} config
   * @return  {void}
   */
  static configure(config: Object): void {
    Logger.config = { ...config };
  }

  /**
   * Creates and returns a new logger of the name <code>loggerName</code> using
   * the <code>DEFAULT_LOGGER</code>.
   *
   * @param   {string}  The requested logger name
   * @return {Object}   The new fallback logger
   */
  static createFallbackLogger(loggerName: string): Object {
    const logger = DEFAULT_LOGGER;

    Logger.addLogger(loggerName, logger);
    logger.warn(`Using fallback logger: no logger for "${loggerName}" found in configuration`);

    return logger;
  }

  /**
   * Creates a new logger for the given logger name.
   * If the requested name does not exist in the config, then a fallback logger
   * is provided.
   *
   * @param   {string}  The requested logger name
   * @return  {Object}  The new logger
   */
  static createLogger(loggerName: string): Object {
    const handlersConfig: Object = Logger.config.handlers;

    return (!handlersConfig || !(loggerName in handlersConfig))
      ? Logger.createFallbackLogger(loggerName)
      : Logger.addLogger(loggerName, new Logger(handlersConfig[loggerName]));
  }

  /**
   * Retrieve a logger instance by name by looking up the logger in the logger
   * cache. If no logger name is provide, the default logger
   * (<code>root</code>) is returned. If no logger by the provided name exists
   * and the logger name is found in the configuration, then a new logger is
   * created and returned; otherwise an <code>Error</code> is thrown.
   *
   * @param  {string} name  The requested logger name
   * @return {Object}
   */
  static getLogger(name: string = null): Object {
    const loggerName: string = (name == null) ? Logger.config.default : name.toLowerCase();

    return (!(loggerName in Logger.loggers))
      ? Logger.createLogger(loggerName)
      : Logger.loggers[loggerName];
  }

  /**
   * Adds the provided logger instance to the cache.
   *
   * @param {string|Object} loggerName
   * @param {Object|null}   loggerInstance  (optional) Provide the logger
   *                                        object if also providing the
   *                                        logger name
   * @return {Object}       The added logger
   */
  static addLogger(loggerName: string | Object, loggerInstance: Object = null): void {
    let logger = loggerInstance;
    let name = loggerName;

    if (!logger) {
      logger = loggerName;
      name = logger.fields && logger.fields.name;
    }

    assert(typeof logger === 'object', 'logger must be an object');
    assert(typeof name === 'string', 'logger name must be a string');

    Logger.loggers[name] = logger;

    return logger;
  }

  /**
   * Adds the provided logger instance to the cache and sets the default logger
   * name to config.
   *
   * @param   {Object} loggerInstance The default logger instance
   * @return  {void}
   */
  static setDefaultLogger(logger: Object): void {
    const { name } = logger.fields;

    Logger.config.default = name;
    Logger.addLogger(name, logger);
  }
}

export default Logger;
