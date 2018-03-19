import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('root');

/**
 * [errorMiddleware description]
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
export default async (ctx: Object, next: Function): void => {
  try {
    await next();
  } catch (e) {
    debugger;
    LOGGER.error(e, ctx);
    ctx.status = e.status || 500;
    ctx.body = e.message;
    ctx.app.emit('error', e, ctx);
  }
};
