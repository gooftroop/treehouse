/**
 * [describe description]
 * @param  {[type]} doc [description]
 * @return {[type]}
 */
export function describe(doc: Object): Function {
  return (request: Object, response: Object): void => {
    return response.send(doc);
  }
}
