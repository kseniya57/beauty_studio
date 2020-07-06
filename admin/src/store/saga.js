import { all } from 'redux-saga/effects';
import { saga as settingsSaga } from './ducks/settings';
import { saga as cardsSaga } from './ducks/cards';
import { saga as coursesSaga } from './ducks/courses';
import { saga as faqSaga } from './ducks/faq';
import { saga as featuresSaga } from './ducks/features';
import { saga as mastersSaga } from './ducks/masters';
import { saga as photosSaga } from './ducks/photos';
import { saga as professionalFeaturesSaga } from './ducks/professionalFeatures';
import { saga as addressesSaga } from './ducks/addresses';
import { saga as socialSaga } from './ducks/social';
import { saga as servicesSaga } from './ducks/services';
import { saga as vacanciesSaga } from './ducks/vacancies';
import { saga as reviewsSaga } from './ducks/reviews';
import { saga as authSaga } from './ducks/auth';

export default function* rootSaga() {
  yield all([
    settingsSaga(),
    cardsSaga(),
    coursesSaga(),
    faqSaga(),
    featuresSaga(),
    mastersSaga(),
    photosSaga(),
    professionalFeaturesSaga(),
    addressesSaga(),
    socialSaga(),
    servicesSaga(),
    vacanciesSaga(),
    reviewsSaga(),
    authSaga()
  ]);
}
