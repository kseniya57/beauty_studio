import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'faq';

export const ReducerRecord = {
  faq: [],
  question: null,
  error: null,
  loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'faq', 'question', ReducerRecord);

export default reducer;

export const faqActionCreators = actionCreators;

export const saga = makeSaga('/faq', actions);
