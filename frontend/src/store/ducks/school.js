import * as R from 'ramda';
import { all, takeLatest } from 'redux-saga/effects';
import sagaWrapper from '../helpers/sagaWrapper';
import get from '../helpers/get';

export const moduleName = 'school';

export const ReducerRecord = {
  professionalFeatures: [],
  courses: [],
  course: null,
  faq: [],
  error: null,
  loading: false,
};

export const COURSES_REQUEST = `${moduleName}/COURSES_REQUEST`;
export const COURSES_SUCCESS = `${moduleName}/COURSES_SUCCESS`;
export const COURSE_REQUEST = `${moduleName}/COURSE_REQUEST`;
export const COURSE_SUCCESS = `${moduleName}/COURSE_SUCCESS`;
export const PROFESSIONAL_FEATURES_REQUEST = `${moduleName}/PROFESSIONAL_FEATURES_REQUEST`;
export const PROFESSIONAL_FEATURES_SUCCESS = `${moduleName}/PROFESSIONAL_FEATURES_SUCCESS`;
export const FAQ_REQUEST = `${moduleName}/FAQ_REQUEST`;
export const FAQ_SUCCESS = `${moduleName}/FAQ_SUCCESS`;
export const ERROR = `${moduleName}/ERROR`;

export default function reducer(state = R.clone(ReducerRecord), action) {
  const { type, payload } = action;
  switch (type) {
    case COURSES_REQUEST:
    case PROFESSIONAL_FEATURES_REQUEST:
    case FAQ_REQUEST:
      return R.merge(state, { loading: true, error: null });
    case COURSES_SUCCESS:
      return R.merge(state, { loading: false, error: null, courses: payload });
    case COURSE_SUCCESS:
      return R.merge(state, { loading: false, error: null, course: payload });
    case PROFESSIONAL_FEATURES_SUCCESS:
      return R.merge(state, { loading: false, error: null, professionalFeatures: payload });
    case FAQ_SUCCESS:
      return R.merge(state, { loading: false, error: null, faq: payload });
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

export const getCourses = () => ({
  type: COURSES_REQUEST,
});

export const getCourse = (id) => ({
  type: COURSE_REQUEST,
  payload: { id },
});

export const getProfessionalFeatures = () => ({
  type: PROFESSIONAL_FEATURES_REQUEST,
});

export const getFaq = () => ({
  type: FAQ_REQUEST,
});

export const saga = function*() {
  yield all([
    takeLatest(COURSES_REQUEST, sagaWrapper(get(COURSES_SUCCESS, '/courses'), ERROR)),
    takeLatest(COURSE_REQUEST, sagaWrapper(get(COURSE_SUCCESS, ({ id }) => `/courses/${id}`), ERROR)),
    takeLatest(PROFESSIONAL_FEATURES_REQUEST, sagaWrapper(get(PROFESSIONAL_FEATURES_SUCCESS, '/professionalFeatures'), ERROR)),
    takeLatest(FAQ_REQUEST, sagaWrapper(get(FAQ_SUCCESS, '/faq'), ERROR)),
  ]);
};
