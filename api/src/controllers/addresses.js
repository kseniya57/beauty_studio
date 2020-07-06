import Controller from '../models/Controller';

export default new Controller('/addresses', 'addresses', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
