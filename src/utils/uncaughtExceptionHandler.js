/**
 * @module utils/uncaughtExceptionHandler
 * @exports uncaughtExceptionHandler
 */

/**
 * Called when the process encounters an uncaught <code>Error</code>.
 * The <code>Error</code> is logged and the process exits in error.
 *
 * @param  {Object} logger The logger instance to record the error
 * @return {void}
 */
export default function (logger: Object): Function {
  return function uncaughtExceptionHandler(e: Error): void {
    logger.error('An unhandled exception occurred. Server is exiting...');
    logger.error(e);

    process.exit(1);
  };
}
