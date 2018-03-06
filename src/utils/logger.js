import Bunyan from 'bunyan';
import process from 'process';

import { config } from 'axon/utils/config';

const DEFAULT_LOGGER_NAME: string = 'root';

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
 *
 */
class Logger extends Bunyan {

  // loggers cache
  static loggers: Object = {};

  /**
   * [debug description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  _emit(rec, noemit) {
    const r: Object = this.serializeTransaction(rec);

    // eslint-disable-next-line no-underscore-dangle
    return super._emit(r, noemit);
  }

  /**
   * [formatTransaction description]
   * @param  {[type]} Object [description]
   * @return {[type]}        [description]
   */
  serializeTransaction(rec: Object): Object {
    const r: Object = rec;
    const transaction: Object = process.domain;

    if (transaction && transaction.data) {
      const { request } = transaction.data;

      r.sessionId = request.session && request.session.id;
      r.transactionId = transaction.data.id;

      if (request.user) {
        r.user = {
          id: request.user.id,
          username: request.user.username,
        };
      }
    }

    return rec;
  }

  /**
   * [getLogger description]
   * @param  {[type]} name [description]
   * @return {[type]}      [description]
   */
  static getLogger(name: string): Object {
    const handlersConfig: Object = config().get('loggers').get('handlers');
    const loggerName: string = (name == null) ? DEFAULT_LOGGER_NAME : name.toLowerCase();

    if (loggerName === DEFAULT_LOGGER_NAME && !(loggerName in Logger.loggers)) {
      Logger.loggers[loggerName] = new Logger(handlersConfig.get(DEFAULT_LOGGER_NAME));
    } else if (!(loggerName in Logger.loggers)) {
      const parent: Object = Logger.loggers[DEFAULT_LOGGER_NAME];
      const loggerConfig: Object = handlersConfig.get(loggerName) || {};

      Logger.loggers[loggerName] = parent.child(loggerConfig, loggerConfig.simple);
    }

    return Logger.loggers[loggerName];
  }
}

export default Logger;
