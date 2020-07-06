import { makeReducer, makeSaga } from '@/store/helpers';

export const moduleName = 'vacancies';

export const ReducerRecord = {
    vacancies: [],
    vacancy: null,
    error: null,
    loading: false,
};

const { reducer, actions, actionCreators } = makeReducer(moduleName, 'vacancies', 'vacancy', ReducerRecord);

export default reducer;

export const vacanciesActionCreators = actionCreators;

export const saga = makeSaga('/vacancies', actions);
