import Router from 'koa-router';

import health from 'axon/api/v1/handlers/health';

const router = new Router();

router.get('/heath', health);

export default router;
