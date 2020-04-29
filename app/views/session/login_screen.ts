import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { LoginProps, LoginComponent } from './login_component';
import { Authentication, Nav } from './screens';

type LoginNav = Nav<typeof Authentication, 'Login'>;

function handleSignIn(dispatch: Dispatch, email: string, password: string) {
    console.log('Sign in click');
}

function handleSignUp(navigation: LoginNav['navigation']) {
    console.log('Sign up click - navigating to sign up');
    navigation.navigate('SignUp');
}

function mapDispatchToProps(dispatch: Dispatch, { navigation, route }: LoginNav): LoginProps {
    return {
        onSignIn: (email: string, password: string) => handleSignIn(dispatch, email, password),
        onSignUp: () => handleSignUp(navigation),
    };
}

export const LoginScreen = connect(
    null,
    mapDispatchToProps,
)(LoginComponent);
