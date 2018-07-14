/**
 * @module utils/uncaughtExceptionHandler
 * @exports uncaughtExceptionHandler
 */
import Logger from 'treehouse/utils/logger';

const LOGGER: Object = Logger.getLogger('error');

/**
 * Called when the process encounters an uncaught <code>Error</code>.
 * The <code>Error</code> is logged and the process exits in error.
 * @param  {Error} e
 * @return {void}
 */
export default function uncaughtExceptionHandler(e: Error): void {
  if (LOGGER) {
    LOGGER.error('An unhandled exception occurred. Server is exiting...');
    LOGGER.error(e);
  }

  process.exit(1);
}
