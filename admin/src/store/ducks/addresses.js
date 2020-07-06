import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'addresses';

export const ReducerRecord = {
  addresses: [],
  address: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'addresses', 'address', ReducerRecord);

export default reducer;

export const addressesActionCreators = actionCreators;

export const saga = makeSaga('/addresses', actions);
