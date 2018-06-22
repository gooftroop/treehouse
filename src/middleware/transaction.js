/**
 * @module middleware/transaction
 * @exports trasnactionMiddleware
 */
import domain from 'domain';
import uuidv4 from 'uuid/v4';

/**
 * Adds a transaction identifier to every request to track a request's control
 * flow through the entire lifetime of the request, including across
 * asynchronous calls. We use a transactoin ID instead of the session ID or
 * user since both are persistent(ish) identification.
 *
 * @see {@link https://nodejs.org/api/domain.html}
 *
 * @param  {Object}   ctx  The Koa context
 * @param  {Function} next The next middleware or handler in the connect chain
 * @return {void}
 */
export default (ctx: Object, next: Function): void => {
  const transactionId: string = uuidv4();
  const transaction: Object = domain.create();

  // eslint-disable-next-line no-param-reassign
  ctx.transactionId = transactionId;

  transaction.add(ctx);
  transaction.data = {
    id: transactionId,
    ctx,
  };

  return new Promise((resolve, reject) => {
    transaction.run(async () => {
      try {
        await next();
        return resolve();
      } catch (e) {
        return reject(e);
      }
    });
  });
};
