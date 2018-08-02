/**
 * @module utils/sigInitHandler
 * @exports sigInitHandler
 */
import Logger from 'treehouse/utils/logger';

/**
 * Handler for capturing a the <code>siginit</code> event and stopping the
 * current process.
 * @return {void}
 */
export default function sigInitHandler(): void {
  Logger.getLogger().info('Captured ctrl-c');

  process.exit(0);
}
