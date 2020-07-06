import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'social';

export const ReducerRecord = {
  social: [],
  cite: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'social', 'cite', ReducerRecord);

export default reducer;

export const socialActionCreators = actionCreators;

export const saga = makeSaga('/social', actions);
