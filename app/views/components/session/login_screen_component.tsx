import {
    TextInput, View, Text, Button, KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { emailInputProps, passwordInputProps, styles } from './shared_props';

const appTitleProps: Text['props'] = {
    style: styles.appTitleText,
};

const signInButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Sign In',
};

const signUpButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Sign Up',
};

export interface LoginScreenEvents {
    onEmailChanged: (text: string) => void;
    onPasswordChanged: (text: string) => void;
    onSignUp: () => void;
    onSignIn: () => void;
}

export const LoginScreenComponent = (props: LoginScreenEvents) => {
    const {
        onEmailChanged, onPasswordChanged, onSignIn, onSignUp,
    } = props;

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleView}>
                <Text {...appTitleProps}>Vampeer</Text>
            </View>
            <View style={styles.loginView}>
                <TextInput {...emailInputProps} onChangeText={onEmailChanged} />
                <TextInput {...passwordInputProps} onChangeText={onPasswordChanged} />
            </View>
            <View style={styles.buttonsView}>
                <View style={styles.button}>
                    <Button {...signUpButtonProps} onPress={onSignUp} />
                </View>
                <View style={styles.button}>
                    <Button {...signInButtonProps} onPress={onSignIn} />
                </View>
            </View>
        </View>
    );
};
