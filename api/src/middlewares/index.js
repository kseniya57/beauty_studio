import bodyParser from 'koa-body';
import cors from '@koa/cors';
import serve from 'koa-static';

import errors from './errors';
import params from './params';

export default [
  cors(),
  serve((process.env.UPLOADS_PATH || 'uploads').replace('./', '')),
  errors,
  bodyParser(),
  params,
];
