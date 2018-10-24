const logger = {
  info: jest.fn(),
  error: jest.fn(),
};

module.exports = {
  configure: jest.fn(),
  getLogger: jest.fn(() => logger),
};
