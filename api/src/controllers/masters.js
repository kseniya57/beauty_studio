import Controller from '../models/Controller';
import db from '../utils/db';

class MastersController extends Controller {
  async all(ctx) {
    const [masters, services] = await Promise.all([
      this.table.all(),
      db.query('SELECT mastersId, servicesId, price, name FROM masters_services JOIN services ON masters_services.servicesId = services.id'),
    ]);

    masters.forEach(master => master.services = services.filter(service => service.mastersId === master.id).sort((a, b) => a.price - b.price));
    ctx.body = {
      data: masters,
    };
  }
}

export default new MastersController('/masters', 'masters', {
  all: {
    pagination: {
      order: ['sort'],
    },
  },
});
