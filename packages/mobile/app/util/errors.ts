import { AlertButton, Alert } from 'react-native';
import { resetApplication } from '../state/app_actions';
import { Action } from '../state/tools/actions';

export abstract class SagaError extends Error {
    public abstract action: undefined | ((...args: any) => Action<any>);
}

export class AuthError extends SagaError {
    constructor() {
        super('Authorization error');
    }

    action = resetApplication;
}

export class ErrorResponse extends SagaError {
    constructor(message?: string) {
        super(`Backend error: ${message}`);
    }

    action: undefined;
}

export class InvalidResponseError extends SagaError {
    constructor(body: string) {
        super('Invalid response from server');
        console.log('Invalid respnose error: ', body);
    }

    action: undefined;
}

const ErrorTitles = ['Woopsy!', 'Oops!', 'What in tarnation!', 'Whoopsy Daisy!', 'Sorry!'];
const chooseTitle = () => ErrorTitles[Math.round(Math.random() * ErrorTitles.length)];
export const alertError = (message: string, buttons?: AlertButton[], cancelable?: boolean) => new Promise((a) => {
    Alert.alert(chooseTitle(), message, buttons, {
        cancelable,
        onDismiss: a,
    });
});
