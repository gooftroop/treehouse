module.exports = {
  loggers: {
    handlers: {
      access: {
        name: 'access',
        level: 'debug',
      },
      error: {
        name: 'root',
        level: 'debug',
      },
      root: {
        name: 'root',
        level: 'debug',
      },
    },
    streams: {},
  },
  server: {
    backlog: 99,
    hostname: 'test',
    port: 123,
  },
}
