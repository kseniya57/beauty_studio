import Controller from '../models/Controller';
import db from '../utils/db';

class CardsController extends Controller {
  async all(ctx) {
    const [cards, images] = await Promise.all([
      this.table.all(),
      db.query('SELECT images.id, cardsId, name FROM cards_images JOIN images ON cards_images.imagesId = images.id'),
    ]);

    cards.forEach(card => card.images = images.filter(image => image.cardsId === card.id));
    ctx.body = {
      data: cards,
    };
  }
}

export default new CardsController('/cards', 'cards', {
  fields: ['title', 'description', 'link', 'buttonText', 'pageText', 'pageImage'],
  relations: 'images',
  all: {
    pagination: {
      order: ['sort'],
    },
  },
});
