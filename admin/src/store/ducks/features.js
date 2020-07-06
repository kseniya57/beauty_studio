import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'features';

export const ReducerRecord = {
  features: [],
  feature: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'features', 'feature', ReducerRecord);

export default reducer;

export const featuresActionCreators = actionCreators;

export const saga = makeSaga('/features', actions);
