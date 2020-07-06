import Koa from 'koa';

import controllers from './controllers';
import middlewares from './middlewares';

const app = new Koa();

middlewares.forEach(middleware => app.use(middleware));

controllers.forEach(controller => app.use(controller.routes()));

app.listen(process.env.WEB_PORT || 7777);
