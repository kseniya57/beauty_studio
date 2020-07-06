import { put, call } from 'redux-saga/effects';

export default (f, errorType) => function*(...params) {
  try {
    yield call(f, ...params)
  } catch (e) {
    yield  put ({
      type: errorType,
      payload: e
    })
  }
}