import Router from 'koa-router';

import health from 'axon/api/handlers/health';
import notFound from 'axon/api/handlers/404';

export default (router = new Router()) => {
  router.get('/heath', health);
  router.all('*', notFound);
  return router;
};
