import { call, put } from 'redux-saga/effects';
import axios from '@/modules/axios';

export default method => (actionType, path) =>
  function*({ payload = {} }) {
    const response = yield call(
      axios[method],
      payload.relation
        ? method === 'delete'
          ? `${path}/${payload.data.id}/${payload.relation}/${payload.data.relatedId}`
          : `${path}/${payload.id}/${payload.relation}`
        :  method === 'delete' ? `${path}/${payload.id}` : path,
      method === 'get' ? { params: payload } : payload
    );
    const data = {
        type: actionType,
        payload: response.data.data
    }
    yield put(data);
    return data;
  };
