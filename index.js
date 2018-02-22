// import 'module-alias/register';
import moduleAlias from 'module-alias';

moduleAlias('axon', `${__dirname}/package.json`);

// eslint-disable-next-line import/first
import Exception, { codes } from 'axon/exception';

const error = {
  Exception,
  codes,
};

export { Server } from 'axon/main';
export { Logger } from 'axon/utils/logger';
export { error };
