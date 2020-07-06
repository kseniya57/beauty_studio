import Controller from '../models/Controller';
import db from '../utils/db';

class ServicesController extends Controller {
  async all(ctx) {
    const [services, masters] = await Promise.all([
      this.table.all(),
      db.query('SELECT mastersId, servicesId, masters.* FROM masters_services JOIN masters ON masters_services.mastersId = masters.id'),
    ]);

    services.forEach(service => service.masters = masters.filter(master => master.servicesId === service.id));
    ctx.body = {
      data: services,
    };
  }
}

export default new ServicesController('/services', 'services', {
  all: {
    pagination: {
      order: ['sort'],
    },
  },
});
