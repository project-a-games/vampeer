import {
    takeEvery, call, put, select,
} from 'redux-saga/effects';
import {
    getInternetCredentials,
} from 'react-native-keychain';
import {
    receiveCredentials, appStarted, recieveUserData,
} from './app_actions';
import {
    requestUserData, refreshCredentials,
} from '../network/requestor';
import { VampeerState, Credentials } from './app_state';
import { sleep } from '../util/utilities';
import {
    NetworkError, alertError,
} from '../util/errors';

type CallType<F extends (...args: any[]) => any> = ReturnType<F> extends PromiseLike<infer T> ? T : ReturnType<F>;

const ServerName = 'VAMPEER_SERVER';

function* loadUserData() {
    const credentials = yield select((state: VampeerState) => state.credentials);
    const payload: CallType<typeof requestUserData> = yield call(requestUserData, credentials);
    yield put(recieveUserData(payload));
}

function* appStartedSaga() {
    console.log('Running appStartedSaga!');

    // Comment out to retain login
    // yield call(resetInternetCredentials, ServerName);
    // yield call(requestLogout);
    // ---

    yield call(sleep, 1);

    const keychainCredentials: CallType<typeof getInternetCredentials> = yield call(getInternetCredentials, ServerName);

    if (keychainCredentials) {
        const credentials: Credentials = JSON.parse(keychainCredentials.password);
        const refreshedCredentials: CallType<typeof refreshCredentials> = yield call(refreshCredentials, credentials);
        yield put(receiveCredentials(refreshedCredentials));
        yield loadUserData();
    } else {
        yield put(receiveCredentials(null));
    }
}

function wrapSaga(fn: (...args: any[]) => Generator) {
    return function* wrappedSaga(...args: any[]) {
        try {
            yield call(fn, ...args);
        } catch (e) {
            console.log('Received error from saga - ', e.constructor.name);
            if (e instanceof NetworkError) {
                yield call(alertError, e.message);
                if (e.action) yield put(e.action());
            } else {
                console.log('rethrowing');
                throw e;
            }
        }
    };
}

export function* mainSaga() {
    yield takeEvery(appStarted.type, wrapSaga(appStartedSaga));
}
