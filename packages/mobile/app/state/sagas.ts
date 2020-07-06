import {
    takeEvery, call, put, select,
} from 'redux-saga/effects';
import {
    getInternetCredentials, setInternetCredentials, resetInternetCredentials,
} from 'react-native-keychain';
import {
    receiveCredentials, appStarted, recieveUserData,
} from './app_actions';
import {
    requestUserData, refreshCredentials, requestLogout,
} from '../network/requestor';
import { VampeerState, Credentials } from './app_state';
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
    // Comment out to retain login
    // console.log('resetting');
    // yield call(resetInternetCredentials, ServerName);
    // console.log('requesting logout');
    // yield call(requestLogout);
    // ---n

    // yield call(sleep, 1);

    console.log('getting keychain');
    const keychainCredentials: CallType<typeof getInternetCredentials> = yield call(getInternetCredentials, ServerName);

    if (keychainCredentials) {
        console.log('got keychain: ', keychainCredentials);
        const credentials: Credentials = JSON.parse(keychainCredentials.password);
        // Todo - only refresh when needed (decode token and compare expiry)
        const refreshedCredentials: CallType<typeof refreshCredentials> = yield call(refreshCredentials, credentials);
        yield put(receiveCredentials(refreshedCredentials));
    } else {
        console.log('Setting creds to null');
        yield put(receiveCredentials(null));
    }
}
// 3aa44d0890ef532c4c89
function* receiveCredentialsSaga({ payload }: ReturnType<typeof receiveCredentials>) {
    if (payload) {
        yield call(setInternetCredentials, ServerName, 'DEFAULT', JSON.stringify(payload));
        yield call(loadUserData);
    } else {
        yield put(recieveUserData(undefined));
    }
}

function wrapSaga(fn: (...args: any[]) => Generator) {
    return function* wrappedSaga(...args: any[]) {
        console.log('Running Saga: ', fn.name);
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
    yield takeEvery(receiveCredentials.type, wrapSaga(receiveCredentialsSaga));
}
