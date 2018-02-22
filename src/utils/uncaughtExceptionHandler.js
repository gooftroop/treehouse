import { getLogger } from 'axon/utils/logger';

const LOGGER: Object = getLogger('error');

/**
 * [uncaughtExceptionHandler description]
 * @param  {[type]} e [description]
 * @return {[type]}   [description]
 */
function uncaughtExceptionHandler(e: Error): void {
  if (LOGGER) {
    LOGGER.error('An unhandled exception occurred. Server is exiting...');
    LOGGER.error(e);
  }

  process.exit(1);
}

export { uncaughtExceptionHandler };
