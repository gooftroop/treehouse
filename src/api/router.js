import Router from 'koa-router';

import { api } from 'axon/api/controllers/meta';
import { health } from 'axon/api/controllers/health';
import { notFound } from 'axon/api/controllers/404';

const router = new Router();

router.get('/heath', health);
router.get('/meta/api', api());
router.all('*', notFound);

export default router;
