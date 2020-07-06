import { makeReducer, makeSaga } from '@/store/helpers';
import { call, put, takeEvery } from 'redux-saga/effects';
import { sagaWrapper } from '@/store/helpers';
import axios from '@/modules/axios';

export const moduleName = 'images';

export const ReducerRecord = {
  photos: [],
  photo: null,
  error: null,
  loading: false
};

const UPLOAD_REQUEST = 'UPLOAD_REQUEST';
const UPLOAD_ERROR = 'UPLOAD_ERROR';

export const upload = payload => ({
  type: UPLOAD_REQUEST,
  payload
});

function* uploadSaga(action) {
  const {
    data: { data, meta }
  } = yield call(axios.post, `uploads/save`, action.payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  if (meta && meta.notify === false) {
    return;
  }
  yield put({
    type:
      meta && meta.ref
        ? `${meta.ref}/add_${meta.ref}_relation_success`
        : photosActions.success[meta && meta.update ? 'update' : 'add'],
    payload: data
  });
}

const { reducer, actions, actionCreators } = makeReducer(
  moduleName,
  'photos',
  'photo',
  ReducerRecord
);

export default reducer;

export const photosActions = actions;

export const photosActionCreators = actionCreators;

export const saga = makeSaga(
  '/images',
  actions,
  takeEvery(UPLOAD_REQUEST, sagaWrapper(uploadSaga, UPLOAD_ERROR))
);
