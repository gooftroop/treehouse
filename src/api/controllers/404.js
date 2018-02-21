/**
 * [notFound description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export async function notFound(ctx: Object): void {
  // Koa defaults to 404 status
  ctx.body = "You shouldn't be here!";
}
