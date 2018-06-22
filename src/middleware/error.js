import ApiError, { InternalError } from 'axon/error';
import Logger from 'axon/utils/logger';

const LOGGER: Object = Logger.getLogger('root');

/**
 * Wraps all subsequent async calls to middleware or handlers in a
 * <code>try/catch</code> block to properly handle and format errors
 * prior to sending an error reponse.
 * If the caught <code>Error</code> is not a subclass of the
 * <code>ApiError</code>, it is converted into either an
 * <code>InternalError</code> if no <code>status</code> is attached to the
 * error or the <code>status</code> is 500, or a generic <code>ApiError</code>.
 * The error is logged, the response status is set to the error
 * <code>status</code>, and the response body is set to the error. Finally the
 * `error` event is emitted on the <code>app</code>.
 *
 * @see {@link ApiError}
 * @see {@link InternalError}
 * 
 * @param  {Object}   ctx  The Koa context
 * @param  {Function} next The next middleware or handler in the connect chain
 * @return {void}
 * @async
 */
export default async (ctx: Object, next: Function): void => {
  try {
    await next();
  } catch (e) {
    let err = e;

    if (!(e instanceof ApiError)) {
      err = (!err.status || err.status === 500) ? new InternalError(e.message, e) : new ApiError(e.message, e);
    }

    LOGGER.error(err, ctx);
    ctx.status = err.status;
    ctx.body = err;

    ctx.app.emit('error', err, ctx);
  }
};
