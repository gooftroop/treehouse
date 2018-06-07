import Router from 'koa-router';

import v1 from 'axon/api/v1/routes';

const router = new Router();

router.use(v1);

export default router;
