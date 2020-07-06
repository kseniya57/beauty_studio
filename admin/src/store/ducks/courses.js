import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'courses';

export const ReducerRecord = {
  courses: [],
  course: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'courses', 'course', ReducerRecord);

export default reducer;

export const coursesActionCreators = actionCreators;

export const saga = makeSaga('/courses', actions);
