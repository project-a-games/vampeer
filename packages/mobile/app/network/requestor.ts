import Auth0 from 'react-native-auth0';
import { User } from '@project-a/vampeer-shared';
import auth0Config from '../util/auth0.json';
import { Credentials } from '../state/app_state';
import { UnauthorizedError, UnexpectedResponseError } from '../util/errors';

const auth0 = new Auth0(auth0Config);
const ProdApi = 'https://vampeer-service.herokuapp.com/api';

const ApiUrl = __DEV__ // eslint-disable-line no-undef
    ? 'http://192.168.1.52:5000/api'
    : ProdApi;

const Scope = 'openid profile email offline_access';

const paths = {
    public: `${ApiUrl}`,
    auth: `${ApiUrl}/auth`,
};

enum Status {
    Unauthorized = 401,
}

async function apiRequest<Response = any>(url: string, name: string, input: any, jwt?: string) {
    const response = await fetch(url, { // eslint-disable-line no-undef
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestName: name,
            requestInput: input,
        }),
    });

    if (response.status === Status.Unauthorized) {
        throw new UnauthorizedError('API rejected token');
    }

    if (isJson(response)) {
        return response.json() as Promise<Response>;
    }

    throw new UnexpectedResponseError(await response.text());
}

export async function requestAuthorization(): Promise<Credentials> {
    try {
        return await auth0.webAuth.authorize({ scope: Scope, audience: `'${ProdApi}'` });
    } catch (e) {
        console.log('WebAuth failed: ', e.message);
        throw new UnauthorizedError(`WebAuth failed${e.message ? `: ${e.message}` : ''}`);
    }
}

export function requestLogout() {
    return auth0.webAuth.clearSession();
}

export function refreshCredentials({ refreshToken }: Credentials): Promise<Credentials> {
    // Todo - what happens if refresh fails?
    return auth0.auth.refreshToken({ refreshToken });
}

export function requestUserData(credentials: Credentials) {
    return apiRequest<User>(paths.auth, 'getUserData', {}, credentials.accessToken);
}
