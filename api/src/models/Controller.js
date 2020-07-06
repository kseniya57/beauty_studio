import Router from 'koa-router';
import Table from './Table';

export const photosCache = {};

export default class Controller {
  constructor(prefix = '/', tableName, config, additionalRoutes = []) {
    this.prefix = prefix;
    this.tableName = tableName;
    this.table = new Table(tableName, config);
    this.initializeRouter(additionalRoutes);
  }

  initializeRouter(additionalRoutes) {
    const router = new Router({ prefix: this.prefix });

    this.router = router;
    additionalRoutes.forEach(item => this.addRoute(...item));
    router.get('/', this.all.bind(this));
    router.get('/:id', this.get.bind(this));
    router.post('/', this.add.bind(this));
    router.post('/reorder', this.reorder.bind(this));
    router.get('/aggregate', this.aggregate.bind(this));
    router.put('/', this.update.bind(this));
    router.delete('/:id', this.remove.bind(this));
    router.get('/:id/:relation', this.allRelated.bind(this));
    router.post('/:id/:relation', this.addRelated.bind(this));
    router.put('/:id/:relation', this.updateRelated.bind(this));
    router.delete('/:id/:relation/:relatedId', this.removeRelated.bind(this));
  }

  routes() {
    return this.router.routes();
  }

  addRoute(method, path, handler) {
    this.router[method](path, handler.bind(this));
  }

  async all(ctx) {
    ctx.body = {
      data: await this.table.all(ctx.params),
    };
  }

  async get(ctx) {
    ctx.body = {
      data: await this.table.get(ctx.params.id),
    };
  }

  setPhoto(ctx) {
    const key = `${ctx.params.data.id || 'add'}-${this.tableName}`;
    if (photosCache[key]) {
      ctx.params.data[photosCache[key].param] = photosCache[key].photo;
      delete photosCache[key];
    }
  }

  async add(ctx) {
    this.setPhoto(ctx);
    const id = await this.table.add(ctx.params.data);

    ctx.body = {
      data: await this.table.get(id),
    };
  }

  async update(ctx) {
    this.setPhoto(ctx);
    const { data, meta } = ctx.params;

    await this.table.update(data.id, data);
    ctx.body = {
      data: await this.table.get(data.id),
      meta,
    };
  }

  async remove(ctx) {
    const { id } = ctx.params;

    const countOfDeletedRows = await this.table.remove(id);

    ctx.body = {
      data: countOfDeletedRows > 0 ? id : 0,
    };
  }

  async aggregate(ctx) {
    ctx.body = {
      data: await this.table.aggregate(ctx.params),
    };
  }

  async allRelated(ctx) {
    const { relation, id } = ctx.params;

    ctx.body = {
      data: {
        relation,
        relatedId: +id,
        data: await this.table.allRelated(ctx.params),
      },
    };
  }

  async addRelated(ctx) {
    await this.table.addRelated(ctx.params);
    const {
      relation, id, data, meta,
    } = ctx.params;

    ctx.body = {
      data: {
        relation,
        relatedId: +id,
        id: data[`${relation}Id`],
        data: await this.table.getRelated(id, relation, data[`${relation}Id`]),
      },
      meta,
    };
  }

  async updateRelated(ctx) {
    const { relation, id, data } = ctx.params;

    await this.table.updateRelated(data[`${relation}Id`], ctx.params);
    ctx.body = {
      data: {
        relation,
        relatedId: +id,
        data,
      },
    };
  }

  async removeRelated(ctx) {
    const { id, relation, relatedId } = ctx.params;

    await this.table.removeRelated(relation, id, relatedId);
    ctx.body = {
      data: {
        relation,
        relatedId: +id,
        id: +relatedId,
      },
    };
  }

  async reorder(ctx) {
    const { updateMap } = ctx.params.data;

    await Promise.all(
      Object.entries(updateMap)
        .map(async ([id, sort]) => this.table.update(id, { sort })),
    );
    ctx.body = { error: false };
  }
}
