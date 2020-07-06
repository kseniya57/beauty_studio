import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'masters';

export const ReducerRecord = {
  masters: [],
  master: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'masters', 'master', ReducerRecord);

export default reducer;

export const mastersActionCreators = actionCreators;

export const saga = makeSaga('/masters', actions);
