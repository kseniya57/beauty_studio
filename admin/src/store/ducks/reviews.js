import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'reviews';

export const ReducerRecord = {
    reviews: [],
    review: null,
    error: null,
    loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'reviews', 'review', ReducerRecord);

export default reducer;

export const reviewsActionCreators = actionCreators;

export const saga = makeSaga('/reviews', actions);