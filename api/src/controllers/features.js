import Controller from '../models/Controller';

export default new Controller('/features', 'features', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
