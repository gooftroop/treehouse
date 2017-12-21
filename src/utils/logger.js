import Bunyan from 'bunyan';
import process from 'process';

const DEFAULT_CODE: number = 0;
const DEFAULT_MESSAGE: string = 'This is not the message you are looking for';
const DEFAULT_STATUS: number = 500;

const loggers: Object = {};

/**
 *
 */
class Logger extends Bunyan {

  /**
   * [debug description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  debug(...args) {
    return super.debug(this.format(args));
  }

  /**
   * [error description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  error(...args) {
    return super.error(this.format(args));
  }

  /**
   * [info description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  info(...args) {
    return super.info(this.format(args));
  }

  /**
   * [trace description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  trace(...args) {
    return super.trace(this.format(args));
  }

  /**
   * [warn description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  warn(...args) {
    return super.warn(this.format(args));
  }

  /**
   * [format description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  format(args: Array<any>): Object {
    return {
      ...formatInput(args),
      ...formatTransaction(),
    };
  }

  /**
   * [formatInput description]
   * @param  {[type]} args [description]
   * @return {[type]}      [description]
   */
  formatInput(args): Object {
    let payload: Object = {};

    // Arrays shouldn't exist, but in the
    // off-chance they do, turn it into a string
    const arg1: any = Array.isArray(args[0]) ? JSON.stringify(args[0]) : args[0];

    switch (typeof arg1) {
      case 'object':
        payload = {
          code: DEFAULT_CODE,
          status: DEFAULT_STATUS,
          ...arg1,
        };
        break;
      default:

        // Attempt to convert the parameter to JSON object,
        // falling back to just applying it to the message attribute
        try {
          payload.message = JSON.parse(arg1);
        } catch (e) {
          payload.message = arg1;
        }

        payload.status = args.length > 1 ? args[1] : DEFAULT_STATUS;
        payload.code = args.length > 2 ? args[2] : DEFAULT_CODE;
        break;
    }

    return payload;
  }

  /**
   * [formatTransaction description]
   * @param  {[type]} Object [description]
   * @return {[type]}        [description]
   */
  formatTransaction(): Object {
    const payload: Object = {};
    const transaction: Object = process.domain;

    if (transaction && transaction.data) {
      const { request } = transaction.data;

      payload.sessionId = request.session && request.session.id;
      payload.transactionId = transaction.data.id;

      if (request.user) {
        payload.user = {
          id: request.user.id,
          username: request.user.username,
        };
      }
    }

    return payload;
  }
}


/**
 * [getLogger description]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
export function getLogger(name: string, opts: ?Object): Object {
  const loggerName = (name == null) ? 'app' : name.toLowerCase();

  return loggers[loggerName];
}

/**
 * [createLogger description]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export function createLoggers(config: Object): Object {
  // breadth-first search of opts
  // if name is under another logger, then is child. get parent logger and create child on it

  const pending = [];
  const seen = [];

  for (const [ currName, currConfig] of config.entries()) {
    pending.push([currName, currConfig]);
    seen.push(currName);
  }

  while (!pending.length) {
    const [currName, currConfig, parentName] = pending.pop();

    if (parentName != null) {
      loggers[currName] = loggers[parentName].child({
        component: currName,
        ...currConfig,
      });
    } else {
      loggers[currName] = new Logger(currConfig);
    }

    for (const [childName, childConfig] of currConfig.entries()) {
      if (!seen.includes(childName)) {
        pending.push([childName, childConfig, currName]);
        seen.push(childName);
      }
    }
  }
}

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
