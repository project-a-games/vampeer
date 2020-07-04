import Auth0 from 'react-native-auth0';
import auth0Config from '../../util/auth0.json';
import { Credentials, UserData } from '../app_state';
import { AuthError, InvalidResponseError } from '../../util/errors';
import { isJson } from '../../util/utilities';

const auth0 = new Auth0(auth0Config);

const ApiUrl = 'https://vampeer-service.herokuapp.com/api';
const Scope = 'openid profile email offline_access';

const AuthorizedApi = `${ApiUrl}/auth`;

enum Status {
    Unauthorized = 401,
}

async function apiRequest<Response = any>({ accessToken }: Credentials, name: string, input: any) {
    const response = await fetch(AuthorizedApi, { // eslint-disable-line no-undef
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            requestName: name,
            requestInput: input,
        }),
    });

    if (response.status === Status.Unauthorized) {
        throw new AuthError();
    }

    if (isJson(response)) {
        return response.json() as Promise<Response>;
    }

    throw new InvalidResponseError(await response.text());
}

export async function requestAuthorization(): Promise<Credentials> {
    try {
        console.log('Calling authorize');
        const result = await auth0.webAuth.authorize({ scope: Scope, audience: `'${ApiUrl}'` });
        console.log('Authorized');
        return result;
    } catch (e) {
        throw new AuthError();
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
    return apiRequest<UserData>(credentials, 'getUserData', {});
}
