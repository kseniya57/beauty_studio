import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { sagaWrapper, get, post, put, remove } from './';

export default (path, actions, ...sagas) => function*() {
  yield all([
    takeLatest(actions.request.get, sagaWrapper(get(actions.success.get, path), actions.error)),
    takeEvery(actions.request.add, sagaWrapper(post(actions.success.add, path), actions.error)),
    takeEvery(actions.request.update, sagaWrapper(put(actions.success.update, path), actions.error)),
    takeEvery(actions.request.remove, sagaWrapper(remove(actions.success.remove, path), actions.error)),
    takeEvery(actions.request.reorder, sagaWrapper(post(actions.success.reorder, `${path}/reorder`), actions.reorder)),
    takeLatest(actions.related.request.get, sagaWrapper(get(actions.related.success.get, path), actions.error)),
    takeEvery(actions.related.request.add, sagaWrapper(post(actions.related.success.add, path), actions.error)),
    takeEvery(actions.related.request.update, sagaWrapper(put(actions.related.success.update, path), actions.error)),
    takeEvery(actions.related.request.remove, sagaWrapper(remove(actions.related.success.remove, path), actions.error)),
    ...sagas
  ]);
};
