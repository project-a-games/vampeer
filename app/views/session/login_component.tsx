import {
    View, Text, Button, KeyboardAvoidingView,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles';
import { UserInfoFields } from './components/user_info_fields';

const appTitleProps: Text['props'] = {
    style: styles.appTitleText,
};

const signInButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Sign In',
};

const signUpButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Sign Up',
};

export interface LoginProps {
    onSignUp: () => void;
    onSignIn: (email: string, password: string) => void;
}

export const LoginComponent = ({ onSignIn, onSignUp }: LoginProps) => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const onSignInPress = () => {
        if (email && password) {
            onSignIn(email, password);
        } else {
            throw new Error(`Email and password aren't valid: ${{ email, password }}`);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleView}>
                <Text {...appTitleProps}>Vampeer</Text>
            </View>
            <UserInfoFields onEmailChanged={setEmail} onPasswordChanged={setPassword} />
            <View style={styles.buttonsView}>
                <View style={styles.button}>
                    <Button {...signUpButtonProps} onPress={onSignUp} />
                </View>
                <View style={styles.button}>
                    <Button {...signInButtonProps} onPress={onSignInPress} />
                </View>
            </View>
        </View>
    );
};
