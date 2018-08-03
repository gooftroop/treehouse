import Module from 'module';
import sinon from 'sinon';

// Mock cache
const cache = {};

/**
 * [Mock description]
 */
class Mock {
  id = null;

  og = null;

  /**
   * [constructor description]
   * @param {[type]} id [description]
   * @param {[type]} og [description]
   */
  constructor(id, og) {
    this.id = id;
    this.og = og;
  }

  /**
   * [mockRestore description]
   * @return {[type]} [description]
   */
  mockRestore() {
    cache[this.id] = this.og;
  }
}

/**
 * [mocker description]
 * @type {Object}
 */
const mocker = {
  mock(id, implementation = null) {
    if (!(id in cache) || !(cache[id].meta instanceof Mock)) {
      const og = module.require(id);
      const meta = new Mock(id, og);
      const impl = (implementation != null) ? implementation : sinon.stub();

      impl.meta = meta;
      impl.mockRestore = meta.mockRestore;

      cache[id] = impl;
    }

    return cache[id];
  },
};

/**
 * [require description]
 * @param  {[type]} id [description]
 * @return {[type]}    [description]
 */
Module.prototype.require = function require(id) {
  if (typeof id !== 'string') {
    throw new Error(`The "id" ${typeof id} must be of string ${id}`);
  }

  if (id === '') {
    throw new Error(`The argument 'id' ${id}. Received must be a non-empty string`);
  }

  if (id in cache) {
    return cache[id];
  }

  // eslint-disable-next-line no-underscore-dangle
  return Module._load(id, this, /* isMain */ false);
};

export default mocker;
