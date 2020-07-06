import * as R from 'ramda';
import { all, call, put } from 'redux-saga/effects';
import defaultTheme from '@/lib/theme';
import axios from '@/modules/axios';
import sagaWrapper from '../helpers/sagaWrapper';

export const moduleName = 'settings';

export const ReducerRecord = {
  theme: defaultTheme,
  addresses: [],
  social: [],
  meta: null,
  error: null,
  loading: false
};

export const SETTINGS_REQUEST = `${moduleName}/REQUEST`;
export const SETTINGS_SUCCESS = `${moduleName}/SUCCESS`;
export const ERROR = `${moduleName}/ERROR`;

export default function reducer(state = R.clone(ReducerRecord), action) {
  const { type, payload } = action;
  switch (type) {
    case SETTINGS_REQUEST:
      return R.merge(state, { loading: true, error: null });
    case SETTINGS_SUCCESS:
      return R.merge(state, { loading: false, error: null, ...payload });
    case ERROR:
      return R.merge(state, {
        loading: false,
        activate: false,
        error: payload
      });
    default:
      return R.set(R.lensProp('error'), null, state);
  }
}

export const getSettings = payload => ({
  type: SETTINGS_REQUEST,
  payload
});

export const settingsSaga = function*() {
  const response = yield call(axios.get, '/settings');
  yield put({
    type: SETTINGS_SUCCESS,
    payload: response.data.data
  });
};

export const saga = function*() {
  yield all([sagaWrapper(settingsSaga, ERROR)()]);
};
