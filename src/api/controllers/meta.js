/**
 * [describe description]
 * @param  {[type]} meta [description]
 * @return {[type]}
 */
export async function describe(): Function {
  const meta: string = '';

  return (ctx: Object): void => {
    ctx.body = meta;
  };
}
