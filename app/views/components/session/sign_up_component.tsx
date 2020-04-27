import React from 'react';
import {
    View, Text, TextInput, StyleSheet, Button,
} from 'react-native';
import { emailInputProps, passwordInputProps, styles } from './shared_props';

const appTitleProps: Text['props'] = {
    style: styles.appTitleText,
};

const createAccountButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Create account',
};

interface SignUpScreenProps {
    onEmailChanged: (text: string) => void;
    onPasswordChanged: (text: string) => void;
    onCreateAccount: () => void;
}

export const SignUpScreenComponent = ({ onEmailChanged, onPasswordChanged, onCreateAccount }: SignUpScreenProps) => (
    <View style={{ flex: 1 }}>
        <View style={styles.titleView}>
            <Text {...appTitleProps}>Sign Up</Text>
        </View>
        <View style={styles.loginView}>
            <TextInput {...emailInputProps} onChangeText={onEmailChanged} />
            <TextInput {...passwordInputProps} onChangeText={onPasswordChanged} />
        </View>
        <View style={styles.buttonsView}>
            <View style={styles.buttonsView}>
                <View style={styles.button}>
                    <Button {...createAccountButtonProps} onPress={onCreateAccount} />
                </View>
            </View>
        </View>
    </View>
);
