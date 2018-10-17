module.exports = {
  configure: jest.fn(),
  getLogger: jest.fn(() => {
    return {
      info: jest.fn(),
      error: jest.fn(),
    };
  }),
};
