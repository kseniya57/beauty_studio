import { all } from 'redux-saga/effects';
import { saga as settingsSaga }  from './ducks/settings';
import { saga as dataSaga }  from './ducks/data';
import { saga as schoolSaga }  from './ducks/school';

export default function* rootSaga() {
  yield all([
    settingsSaga(),
    dataSaga(),
    schoolSaga(),
  ]);
}
