/**
 * @module utils/sigInitHandler
 * @exports sigInitHandler
 */

/**
 * Handler for capturing a the <code>siginit</code> event and stopping the
 * current process.
 *
 * @param  {Object} logger The logger instance to record the exit request
 * @return {void}
 */
export default function (logger: Object): Function {
  return function sigInitHandler(): void {
    logger.info('Captured ctrl-c');

    process.exit(0);
  };
}
