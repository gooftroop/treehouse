import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('error');

/**
 * [uncaughtExceptionHandler description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
export default function uncaughtExceptionHandler(e: Error): void {
  if (LOGGER) {
    LOGGER.error('An unhandled exception occurred. Server is exiting...');
    LOGGER.error(e);
  }

  process.exit(1);
}
