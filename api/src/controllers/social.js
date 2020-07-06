import Controller from '../models/Controller';

export default new Controller('/social', 'social', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
