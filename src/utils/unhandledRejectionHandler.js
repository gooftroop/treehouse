/**
 * @module utils/unhandledRejectionHandler
 * @exports unhandledRejectionHandler
 */

/**
 * Called when the process encounteres an unhandled Promise rejection.
 * The <code>Error</code> from the rejected Promise is logged and the event
 * loop is allowed to continue.
 *
 * @param  {Object} logger The logger instance to record the error
 * @return {void}
 */
export default function (logger: Object): Function {
  return function unhandledRejectionHandler(e: Error): void {
    logger.error(`An unhandled promise rejection occurred: ${e}`);
  };
}
