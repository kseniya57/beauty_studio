import * as R from 'ramda';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import axios from '@/modules/axios';
import history from '@/modules/history';
import sagaWrapper from '../helpers/sagaWrapper';

export const moduleName = 'auth';

export const ReducerRecord = {
  user: null,
  error: null,
  loading: false,
  activate: false,
  activation: null
};

export const REGISTER_REQUEST = `${moduleName}/REGISTER_REQUEST`;
export const REGISTER_SUCCESS = `${moduleName}/REGISTER_SUCCESS`;
export const LOGIN_REQUEST = `${moduleName}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${moduleName}/LOGIN_SUCCESS`;
export const LOGOUT_REQUEST = `${moduleName}/LOGOUT_REQUEST`;
export const LOGOUT_SUCCESS = `${moduleName}/LOGOUT_SUCCESS`;
export const ERROR = `${moduleName}/ERROR`;

export default function reducer(state = R.clone(ReducerRecord), action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
      return R.merge(state, { loading: true, error: null });
    case REGISTER_SUCCESS:
      return R.merge(state, { loading: false, error: null });
    case LOGIN_SUCCESS:
      return R.merge(state, { loading: false, error: null, user: payload });
    case ERROR:
      return R.merge(state, {
        loading: false,
        error: payload
      });
    case LOGOUT_SUCCESS:
      return R.clone(ReducerRecord);
    default:
      return R.set(R.lensProp('error'), null, state);
  }
}

export function register(user) {
  return {
    type: REGISTER_REQUEST,
    payload: user
  };
}

export function login(user) {
  return {
    type: LOGIN_REQUEST,
    payload: user
  };
}

export function logout() {
  return {
    type: LOGOUT_REQUEST
  };
}

export const registerSaga = function*(action) {
  yield call(axios.post, '/auth/register', action.payload);
  yield put({
    type: REGISTER_SUCCESS
  });
  history.push('/');
};

export const loginSaga = function*(action) {
  const {
    data: { user, token }
  } = yield call(axios.post, '/auth/login', action.payload);
  axios.defaults.headers.common['Authorization'] = token;
  localStorage.clear();
  localStorage.setItem('token', token);
  localStorage.setItem('user', user.id);
  yield put({
    type: LOGIN_SUCCESS,
    payload: user
  });
  history.push('/');
};

export const check = function*() {
  if (
    ['/login', '/auth', '/register'].some(p => location.pathname.startsWith(p))
  )
    return;
  axios.defaults.headers.common['Authorization'] = localStorage.getItem(
    'token'
  );
  try {
    yield call(axios.get, '/auth/check');
  } catch (error) {
    localStorage.clear();
    history.push('/auth');
  }
};

export const logoutSaga = function*() {
  try {
    yield axios.post('/auth/logout');
  } catch (_) {
    // eslint-disable-next-line no-console
    console.log('Logout error');
  }
};

export const saga = function*() {
  yield all([
    check(),
    takeEvery(REGISTER_REQUEST, sagaWrapper(registerSaga, ERROR)),
    takeEvery(LOGIN_REQUEST, sagaWrapper(loginSaga, ERROR)),
    takeEvery(LOGOUT_REQUEST, sagaWrapper(logoutSaga, ERROR))
  ]);
};
