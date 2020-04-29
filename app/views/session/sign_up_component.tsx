import React, { useState } from 'react';
import {
    View, Text, Button,
} from 'react-native';
import { styles } from './styles';
import { UserInfoFields } from './components/user_info_fields';

const appTitleProps: Text['props'] = {
    style: styles.appTitleText,
};

const createAccountButtonProps: Omit<Button['props'], 'onPress'> = {
    title: 'Create account',
};

interface SignUpProps {
    onCreateAccount: (username: string, password: string) => void;
}

export const SignUpComponent = ({ onCreateAccount }: SignUpProps) => {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    const onSignUpPress = () => {
        if (email && password) {
            onCreateAccount(email, password);
        } else {
            throw new Error(`Email and password aren't valid: ${{ email, password }}`);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.titleView}>
                <Text {...appTitleProps}>Sign Up</Text>
            </View>
            <UserInfoFields onEmailChanged={setEmail} onPasswordChanged={setPassword} />
            <View style={styles.buttonsView}>
                <View style={styles.buttonsView}>
                    <View style={styles.button}>
                        <Button {...createAccountButtonProps} onPress={onSignUpPress} />
                    </View>
                </View>
            </View>
        </View>
    );
};
