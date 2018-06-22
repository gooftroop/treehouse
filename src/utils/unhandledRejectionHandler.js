/**
 * @module utils/unhandledRejectionHandler
 * @exports unhandledRejectionHandler
 */
import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('error');

/**
 * Called when the process encounteres an unhandled Promise rejection.
 * The <code>Error</code> from the rejected Promise is logged and the event
 * loop is allowed to continue.
 * @param  {Error} e
 * @return {void}
 */
export default function unhandledRejectionHandler(e: Error): void {
  if (LOGGER) {
    LOGGER.error(`An unhandled promise rejection occurred: ${e}`);
  }
}
