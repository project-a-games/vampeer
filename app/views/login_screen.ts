import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginScreenComponent, LoginScreenEvents } from './components/session/login_screen_component';

function handleEmail(dispatch: Dispatch, text: string) {
    console.log(`Email changed: ${text}`);
}

function handlePassword(dispatch: Dispatch, text: string) {
    console.log(`Password chnaged: ${text}`);
}

function handleSignIn(dispatch: Dispatch) {
    console.log('Sign in click');
}

function handleSignUp(dispatch: Dispatch) {
    console.log('Sign up click');
}


function mapDispatchToProps(dispatch: Dispatch): LoginScreenEvents {
    return {
        onEmailChanged: (text: string) => handleEmail(dispatch, text),
        onPasswordChanged: (text: string) => handlePassword(dispatch, text),
        onSignIn: () => handleSignIn(dispatch),
        onSignUp: () => handleSignUp(dispatch),
    };
}

export const LoginScreen = connect(
    () => ({}),
    mapDispatchToProps,
)(LoginScreenComponent);
