/**
 * @module middleware/error
 * @exports errorMiddleware
 */
import Logger from 'treehouse/utils/logger';
import { ApiException, InternalException } from 'treehouse/exception';

/**
 * Wraps all subsequent async calls to middleware or handlers in a
 * <code>try/catch</code> block to properly handle and format errors
 * prior to sending an error response.
 * If the caught <code>Error</code> is not a subclass of the
 * <code> ApiException </code>, it is converted into either an
 * <code> InternalException </code> if no <code>status</code > is attached
 * to the error or the < code > status < /code> is 500, or a generic
 * <code>ApiException</code>. The error is logged, the response status is set
 * to the error <code>status</code>, and the response body is set to the error.
 * Finally the <code>error</code> event is emitted on the <code>app</code>.
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

    if (!(e instanceof ApiException)) {
      err = (!err.status || err.status === 500) ? new InternalException(e.message, e) : new ApiException(e.message, e);
    }

    Logger.getLogger().error(err, ctx);
    ctx.status = err.status;
    ctx.body = err;

    ctx.app.emit('error', err, ctx);
  }
};
