import * as R from 'ramda';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from '@/modules/axios';
import sagaWrapper from '../helpers/sagaWrapper';
import defaultTheme from '@/lib/theme';

export const moduleName = 'settings';

export const ReducerRecord = {
  settings: {
    theme: defaultTheme
  },
  error: null,
  loading: false
};

export const SETTINGS_REQUEST = `${moduleName}/REQUEST`;
export const SETTINGS_SUCCESS = `${moduleName}/SUCCESS`;
export const SETTINGS_UPDATE_REQUEST = `${moduleName}/UPDATE_REQUEST`;
export const SETTINGS_UPDATE_SUCCESS = `${moduleName}/UPDATE_SUCCESS`;
export const ERROR = `${moduleName}/ERROR`;

export default function reducer(state = R.clone(ReducerRecord), action) {
  const { type, payload } = action;
  switch (type) {
    case SETTINGS_REQUEST:
      return R.merge(state, { loading: true, error: null });
    case SETTINGS_SUCCESS:
      return R.merge(state, {
        loading: false,
        error: null,
        settings: { ...state.settings, ...payload }
      });
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

export const settingsActionCreators = {
  get: payload => ({
    type: SETTINGS_REQUEST,
    payload
  }),
  update: payload => ({
    type: SETTINGS_UPDATE_REQUEST,
    payload
  })
};

export const settingsSaga = function*() {
  const response = yield call(axios.get, '/settings');
  yield put({
    type: SETTINGS_SUCCESS,
    payload: response.data.data
  });
};

export const updateSettingsSaga = function*(action) {
  const response = yield call(axios.put, '/settings', action.payload);
  yield put({
    type: SETTINGS_UPDATE_SUCCESS,
    payload: response.data.data
  });
};

export const saga = function*() {
  yield all([
    sagaWrapper(settingsSaga, ERROR)(),
    takeEvery(SETTINGS_UPDATE_REQUEST, sagaWrapper(updateSettingsSaga, ERROR))
  ]);
};
