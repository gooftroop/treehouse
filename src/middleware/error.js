import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('root');

/**
 * [errorParser description]
 * @param  {[type]}   e     [description]
 * @param  {[type]}   ctx   [description]
 * @return {[type]}         [description]
 */
export default function errorMiddleware(e: Error, ctx: Object): void {
  return ctx ? LOGGER.error(e, ctx) : LOGGER.error(e);
}
