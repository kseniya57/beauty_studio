import Controller from '../models/Controller';

export default new Controller('/professionalFeatures', 'professionalFeatures', {
    all: {
        pagination: {
            order: ['sort'],
        },
    },
});
