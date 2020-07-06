import * as R from 'ramda';
import { all, takeLatest } from 'redux-saga/effects';
import sagaWrapper from '../helpers/sagaWrapper';
import get from '../helpers/get';

export const moduleName = 'data';

export const ReducerRecord = {
  cards: [],
  images: [],
  features: [],
  masters: [],
  services: [],
  vacancies: [],
  reviews: [],
  error: null,
  loading: false,
};

export const CARDS_REQUEST = `${moduleName}/CARDS_REQUEST`;
export const CARDS_SUCCESS = `${moduleName}/CARDS_SUCCESS`;
export const IMAGES_REQUEST = `${moduleName}/IMAGES_REQUEST`;
export const IMAGES_SUCCESS = `${moduleName}/IMAGES_SUCCESS`;
export const MASTERS_REQUEST = `${moduleName}/MASTERS_REQUEST`;
export const MASTERS_SUCCESS = `${moduleName}/MASTERS_SUCCESS`;
export const FEATURES_REQUEST = `${moduleName}/FEATURES_REQUEST`;
export const FEATURES_SUCCESS = `${moduleName}/FEATURES_SUCCESS`;
export const SERVICES_REQUEST = `${moduleName}/SERVICES_REQUEST`;
export const SERVICES_SUCCESS = `${moduleName}/SERVICES_SUCCESS`;
export const VACANCIES_REQUEST = `${moduleName}/VACANCIES_REQUEST`;
export const VACANCIES_SUCCESS = `${moduleName}/VACANCIES_SUCCESS`;
export const REVIEWS_REQUEST = `${moduleName}/REVIEWS_REQUEST`;
export const REVIEWS_SUCCESS = `${moduleName}/REVIEWS_SUCCESS`;
export const ERROR = `${moduleName}/ERROR`;

export default function reducer(state = R.clone(ReducerRecord), action) {
  const { type, payload } = action;
  switch (type) {
    case CARDS_REQUEST:
    case IMAGES_REQUEST:
    case MASTERS_REQUEST:
    case FEATURES_REQUEST:
    case SERVICES_REQUEST:
      return R.merge(state, { loading: true, error: null });
    case CARDS_SUCCESS:
      return R.merge(state, { loading: false, error: null, cards: payload });
    case MASTERS_SUCCESS:
      return R.merge(state, { loading: false, error: null, masters: payload });
    case FEATURES_SUCCESS:
      return R.merge(state, { loading: false, error: null, features: payload });
    case IMAGES_SUCCESS:
      return R.merge(state, { loading: false, error: null, images: payload });
    case SERVICES_SUCCESS:
      return R.merge(state, { loading: false, error: null, services: payload });
    case VACANCIES_SUCCESS:
      return R.merge(state, { loading: false, error: null, vacancies: payload });
    case REVIEWS_SUCCESS:
      return R.merge(state, { loading: false, error: null, reviews: payload.filter(item => item.isShown && item.stars > 0) });
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

export const getCards = (payload) => ({
  type: CARDS_REQUEST,
  payload
});

export const getImages = (payload) => ({
  type: IMAGES_REQUEST,
  payload
});

export const getFeatures = (payload) => ({
  type: FEATURES_REQUEST,
  payload
});

export const getMasters = (payload) => ({
  type: MASTERS_REQUEST,
  payload
});

export const getServices = (payload) => ({
  type: SERVICES_REQUEST,
  payload
});

export const getVacancies = (payload) => ({
  type: VACANCIES_REQUEST,
  payload
});

export const getReviews = (payload) => ({
  type: REVIEWS_REQUEST,
  payload
});

export const saga = function*() {
  yield all([
    sagaWrapper(get(CARDS_SUCCESS, '/cards'), ERROR)(),
    takeLatest(IMAGES_REQUEST, sagaWrapper(get(IMAGES_SUCCESS, '/images'), ERROR)),
    takeLatest(MASTERS_REQUEST, sagaWrapper(get(MASTERS_SUCCESS, '/masters'), ERROR)),
    takeLatest(FEATURES_REQUEST, sagaWrapper(get(FEATURES_SUCCESS, '/features'), ERROR)),
    takeLatest(SERVICES_REQUEST, sagaWrapper(get(SERVICES_SUCCESS, '/services'), ERROR)),
    takeLatest(VACANCIES_REQUEST, sagaWrapper(get(VACANCIES_SUCCESS, '/vacancies'), ERROR)),
    takeLatest(REVIEWS_REQUEST, sagaWrapper(get(REVIEWS_SUCCESS, '/reviews'), ERROR)),
  ]);
};
