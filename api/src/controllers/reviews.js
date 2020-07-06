import Controller from '../models/Controller';

export default new Controller('/reviews', 'reviews', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
