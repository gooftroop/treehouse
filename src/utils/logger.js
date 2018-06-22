/**
 * @module utils/logger
 * @exports DEFAULT_LOGGER_NAME
 * @exports Logger
 */
import Bunyan from 'bunyan';
import config from 'config';
import process from 'process';

export const DEFAULT_LOGGER_NAME: string = 'root';

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
 * logging output behavior to include our request <code>trasnaction</code>
 * data as additional log metadata.
 *
 * @see {@link https://github.com/trentm/node-bunyan}
 *
 * @class
 * @extends Bunyan
 */
class Logger extends Bunyan {
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
   * Retrieve a logger instance by name by looking up the looger in the logger
   * cache. If no logger name is provide, the default logger
   * (<code>root</code>) is returned. If no logger by the provided name exists
   * and the logger name is found in the configuration, then a new logger is
   * created and returned; otherwise an <code>Error</code> is thrown.
   *
   * @param  {string} name
   * @return {Object}
   */
  static getLogger(name: string = null): Object {
    const handlersConfig: Object = config.loggers.handlers;
    const loggerName: string = (name == null) ? DEFAULT_LOGGER_NAME : name.toLowerCase();

    if (!(loggerName in Logger.loggers)) {
      if (!(loggerName in handlersConfig)) {
        throw new Error(`Unable to create logger: no logger for ${loggerName} found in configuration`);
      }

      Logger.loggers[loggerName] = new Logger(handlersConfig.loggerName);
    }

    return Logger.loggers[loggerName];
  }
}

export default Logger;
