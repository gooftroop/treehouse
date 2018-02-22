import morgan from 'koa-morgan';

import Logger from '@axon/utils/logger';

const LOGGER: Object = Logger.getLogger('access');

/**
 * Morgan log formatter.
 * Returns an object containing the desired request and response attributes.
 * The expected output should be a JSON string as <code>bunyan</code> will
 * take the string and merge that JSON with the output (which is the desired
 * result). The expected format is:
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
 * @param  {Object} tokens The map of morgan tokens
 * @param  {Object} req    The request context
 * @param  {Object} res    The response context
 * @return {Object}        The format meta object
 */
export const formatter = function (tokens, req, res) {
  const responseTime = tokens['response-time'](req, res);

  return JSON.stringify({
    'remote-addr': tokens['remote-addr'](req),
    date: tokens.date(req, res, 'clf'),
    method: tokens.method(req),
    url: tokens.url(req),
    HTTP: tokens['http-version'](req),
    'user-agent': tokens['user-agent'](req),
    referrer: tokens.referrer(req),
    status: tokens.status(req, res),
    'res[content-length]': tokens.res(req, res, 'content-length'),
    'response-time': `${responseTime} ms`,
  });
};

export const accessLogger = morgan(formatter, {
  stream: {
    write(message) {
      LOGGER.info(JSON.parse(message));
    },
  },
});
