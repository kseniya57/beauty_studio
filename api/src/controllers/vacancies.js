import Controller from '../models/Controller';

export default new Controller('/vacancies', 'vacancies', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
