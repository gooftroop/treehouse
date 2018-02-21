
/**
 * [ping description]
 * @param  {[type]} ctx  [description]
 * @return {[type]}      [description]
 */
export async function health(ctx: Object): void {
  ctx.status = 200;
  ctx.body = 'ok';
}
