import { AlertButton, Alert } from 'react-native';
import { Action } from '../state/tools/actions';

export abstract class NetworkError extends Error {
    public abstract action: undefined | ((...args: any) => Action<any>);
}

export class UnauthorizedError extends NetworkError {
    constructor(message?: string) {
        super(`Authorization error${message ? `: ${message}` : ''}`);
    }

    action: undefined;

    // action = resetApplication;
}

export class ErrorResponse extends NetworkError {
    constructor(message?: string) {
        super(`Backend error: ${message}`);
    }

    action: undefined;
}

export class UnexpectedResponseError extends NetworkError {
    constructor(body: string) {
        super('Unexpected response from server');
        console.log('Unexpected response error: ', body);
    }

    action: undefined;
}

const ErrorTitles = ['Woopsy!', 'Oops!', 'What in tarnation!', 'Whoopsy Daisy!', 'Sorry!'];
const chooseTitle = () => ErrorTitles[Math.round(Math.random() * (ErrorTitles.length - 1))];
export const alertError = (message: string, buttons?: AlertButton[], cancelable?: boolean) => new Promise((a) => {
    Alert.alert(chooseTitle(), message, buttons, {
        cancelable,
        onDismiss: a,
    });
});
