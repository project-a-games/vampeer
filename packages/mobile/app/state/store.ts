import {
    createStore, applyMiddleware, Store,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { mainReducer } from './reducers';
import { mainSaga } from './sagas';

export function makeStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        mainReducer,
        applyMiddleware(sagaMiddleware),
    );

    sagaMiddleware.run(mainSaga);

    return store;
}
