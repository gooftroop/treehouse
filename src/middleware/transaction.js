import domain from 'domain';
import uuidv4 from 'uuid/v4';

/**
 * Add a transaction identifier to every request to track a request's control flow. We use a transactoin ID instead of
 * the session ID or user since both are persistent(ish) identification.
 *
 * @param  {[type]}   ctx   [description]
 * @param  {Function} next  [description]
 * @return {[type]}         [description]
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
