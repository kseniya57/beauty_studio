import Controller from '../models/Controller';

export default new Controller('/faq', 'faq', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
