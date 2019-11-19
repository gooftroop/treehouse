/**
 * @module middleware/accessLogger
 * @exports formatter
 * @exports morgan
 */
import morgan from 'koa-morgan';

import Logger from 'treehouse/utils/logger';

/**
 * Morgan log formatter.
 * Returns an object containing the desired request and response attributes.
 * The expected output should be a JSON string as <code>bunyan</code> will
 * take the string and merge that JSON with the output (which is the desired
 * result). The expected format is:
 * ```
 * {
 *   remote-addr: <string>,
 *   date: <clf>,
 *   method: <string>,
 *   url: <fqd string>,
 *   HTTP: <version string>,
 *   user-agent: <string>,
 *   referrer: <string>,
 *   status: <number>,
 *   res[content-length]: <number>,
 *   response-time: <number> ms,
 * }
 * ```
 *
 * @see {@link https://www.npmjs.com/package/koa-morgan}
 *
 * @param  {Object} tokens    The map of morgan tokens
 * @param  {Object} request   The request context
 * @param  {Object} response  The response context
 * @return {Object}           The format meta object
 */
export const formatter = function (tokens, request, response) {
  const responseTime = tokens['response-time'](request, response);

  return JSON.stringify({
    'remote-addr': tokens['remote-addr'](request),
    date: tokens.date(request, response, 'clf'),
    method: tokens.method(request),
    url: tokens.url(request),
    HTTP: tokens['http-version'](request),
    'user-agent': tokens['user-agent'](request),
    referrer: tokens.referrer(request),
    status: tokens.status(request, response),
    'res[content-length]': tokens.res(request, response, 'content-length'),
    'response-time': `${responseTime} ms`,
  });
};

export default () => {
  const logger: Object = Logger.getLogger('access');

  return morgan(formatter, {
    stream: {
      write(message) {
        logger.info(JSON.parse(message));
      },
    },
  });
};
