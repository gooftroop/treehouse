/**
 * @module utils/sigInitHandler
 * @exports sigInitHandler
 */
import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger();

/**
 * Handler for capturing a the <code>siginit</code> event and stopping the
 * current process.
 * @return {void}
 */
export default function sigInitHandler(): void {
  if (LOGGER) {
    LOGGER.info('Captured ctrl-c');
  }

  process.exit(0);
}
