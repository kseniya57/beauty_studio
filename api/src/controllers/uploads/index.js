import Router from 'koa-router';

import upload from './upload';
import remove from './remove';

const router = new Router({ prefix: '/uploads' });

router.post('/save', ...upload);
router.delete('/remove', remove);

export default router;
