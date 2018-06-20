import ApiError, { InternalError } from 'axon/error';
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
    let err = e;

    if (!(e instanceof ApiError)) {
      err = (ctx.status === 500) ? new InternalError(e.message, e) : new ApiError(e.message, e);
    }

    LOGGER.error(err, ctx);
    ctx.status = err.status;
    ctx.body = err;

    ctx.app.emit('error', err, ctx);
  }
};
