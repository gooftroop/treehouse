let instance: Object = null;

function config(configuration: ?Object = null): Object {
  if (instance == null) {
    instance = configuration;
  }

  return instance;
}

export { config };
