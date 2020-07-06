import { call, put } from 'redux-saga/effects';
import axios from '@/modules/axios';

export default (actionType, path) =>
  function*(action) {
    const response = yield call(
      axios.get,
      typeof path === 'function' ? path(action.payload) : path
    );
    yield put({
      type: actionType,
      payload: response.data.data
    });
  };
