import sinon from 'sinon';
import mocker from './utils/mock';

mocker.mock('koa-helmet', sinon.stub().returns(() => {}));
