import Controller from '../models/Controller';

export default new Controller('/images', 'images', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
