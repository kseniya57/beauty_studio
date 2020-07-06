import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'professionalFeatures';

export const ReducerRecord = {
  professionalFeatures: [],
  feature: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'professionalFeatures', 'feature', ReducerRecord);

export default reducer;

export const professionalFeaturesActionCreators = actionCreators;

export const saga = makeSaga('/professionalFeatures', actions);
