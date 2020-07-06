import request from './request';

export const get = request('get');
export const post = request('post');
export const put = request('put');
export const remove = request('delete');

export makeReducer from './makeReducer';
export sagaWrapper from './sagaWrapper';
export makeSaga from './makeSaga';
