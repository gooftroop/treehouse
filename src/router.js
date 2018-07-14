/**
 * Builds and exports the Treehouse router.
 * Typically version Routers (i.e. v1) would be mounted to the root Router with
 * a url prefix like <code>/v1</code>, but in this case, the Treehouse Router only
 * provides global endpoints like a health check and does not need to be
 * versioned. However, this file does establish a good pattern for organizing
 * and building application-specific Routers, so I do recommend using this as
 * boilerplate.
 * @see {@link https://github.com/alexmingoia/koa-router}
 * @module router
 * @exports Router
 */

import Router from 'koa-router';

import v1 from 'treehouse/api/v1/routes';

const router = new Router();

router.use(v1.routes());

export default router;
