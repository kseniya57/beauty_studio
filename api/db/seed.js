import Table from '../src/models/Table';
import db from '../src/utils/db';
import randomInt from '../src/utils/randomInt';

import addresses from './data/addresses';
import cards from './data/cards';
import courses from './data/courses';
import faq from './data/faq';
import features from './data/features';
import masters from './data/mastrers';
import services from './data/services';
import professionalFeatures from './data/professionalFeatures';
import images from './data/images';
import social from './data/social';
import settings from './data/settings';
import vacancies from './data/vacancies';
import reviews from './data/reviews';

const normalizeRecord = record => Object.entries(record).reduce((result, [key, value]) => Object.assign(
    result,
    {[key]: typeof value === 'object' ? JSON.stringify(value) : value }
), {});

const addAll = async (tableName, data) => {
    const table = new Table(tableName);
    await table.remove();
    return Promise.all(data.map(item => table.add(normalizeRecord(item))));
};

(async () => {
    try {
        await addAll('addresses', addresses);
        await addAll('cards', cards);
        await addAll('courses', courses);
        await addAll('faq', faq);
        await addAll('features', features);
        await addAll('professionalFeatures', professionalFeatures);
        await addAll('social', social);
        await addAll('images', images);
        await addAll('vacancies', vacancies);
        await addAll('reviews', reviews);

        await addAll('masters', masters);
        await addAll('services', services);

        const addedMasters = await new Table('masters').all();
        const addedServices = await new Table('services').all();
        await addAll('masters_services', addedMasters.reduce((result, master) => result.concat(addedServices.reduce((arr, service) => arr.concat({ mastersId: master.id, servicesId: service.id, price: randomInt(1000, 5000)}), [])), []));

        const addedCards = await new Table('cards').all();
        const addedImages = await new Table('images').all();
        await addAll('cards_images',
            addedImages.reduce((arr, image) => arr.concat({ cardsId: addedCards[0].id, imagesId: image.id }), [])
                .concat([{ cardsId: addedCards[1].id, imagesId: addedImages[0].id }, { cardsId: addedCards[2].id, imagesId: addedImages[1].id }])
        );

        const settingsTable = new Table('settings');
        await Promise.all(Object.entries(settings).map(([key, value]) => settingsTable.add({
            key,
            value: typeof value === 'object' ? JSON.stringify(value) : value,
        })))
    } catch (e) {
        console.error(e)
    } finally {
        db.end();
    }
})();
