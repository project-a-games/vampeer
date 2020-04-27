import {
    createStore, Reducer, Action, applyMiddleware,
} from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';

const mainReducer: Reducer = (state: any, action: Action) => {
    if (!state) {
        return { someProp: 123 };
    }

    return state;
};

function* mainSaga() {
    yield call(() => {});
    console.log('main saga run');
}

export function makeStore() {
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        mainReducer,
        applyMiddleware(sagaMiddleware),
    );

    sagaMiddleware.run(mainSaga);

    return store;
}
