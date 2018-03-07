/**
 * [notFound description]
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
export default async function notFound(ctx: Object): void {
  // Koa defaults to 404 status
  ctx.body = "You shouldn't be here!";
}
