import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware]
if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

const enhancer = applyMiddleware(
    ...middlewares
);

const store = createStore(reducer, enhancer);
window.store = store;

sagaMiddleware.run(rootSaga);

export default store;
