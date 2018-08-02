export default module.exports = {
  body: {},
  cors: {},
  compress: {},
  loggers: {
    default_name: 'app',
    handlers: {
      access: {
        name: 'access',
        level: 'info',
      },
      app: {
        name: 'access',
        level: 'info',
      },
    },
    streams: {},
  },
};
