import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'services';

export const ReducerRecord = {
  services: [],
  service: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'services', 'service', ReducerRecord);

export default reducer;

export const servicesActionCreators = actionCreators;

export const saga = makeSaga('/services', actions);
