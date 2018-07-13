/**
 * @module api/v1/handlers/health
 * @exports health
 */

/**
 * Health check handler.
 * Responds to requests with a 200 and an 'OK'.
 * Used by external services to determine if the application is alive or not.
 * @param  {Object} ctx  The Koa context
 * @return {void}
 * @async
 */
export default async function health(ctx: Object): void {
  ctx.status = 200;
  ctx.body = 'OK';
}
