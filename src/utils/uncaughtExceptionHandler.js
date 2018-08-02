/**
 * @module utils/uncaughtExceptionHandler
 * @exports uncaughtExceptionHandler
 */
import Logger from 'treehouse/utils/logger';

/**
 * Called when the process encounters an uncaught <code>Error</code>.
 * The <code>Error</code> is logged and the process exits in error.
 * @param  {Error} e
 * @return {void}
 */
export default function uncaughtExceptionHandler(e: Error): void {
  const logger: Object = Logger.getLogger();

  logger.error('An unhandled exception occurred. Server is exiting...');
  logger.error(e);

  process.exit(1);
}
