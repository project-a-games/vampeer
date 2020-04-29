import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { styles } from '../styles';

export const emailInputProps: TextInput['props'] = {
    style: styles.textInputs,
    placeholderTextColor: 'grey',
    placeholder: 'Email',
    textContentType: 'emailAddress',
};

export const passwordInputProps: TextInput['props'] = {
    style: styles.textInputs,
    placeholder: 'Password',
    placeholderTextColor: emailInputProps.placeholderTextColor,
    textContentType: 'password',
    secureTextEntry: true,
};

export interface UserInfoProps {
    onEmailChanged: (text: string) => void;
    onPasswordChanged: (text: string) => void;
}

export const UserInfoFields = ({ onEmailChanged, onPasswordChanged }: UserInfoProps) => (
    <View style={styles.loginView}>
        <TextInput {...emailInputProps} onChangeText={onEmailChanged} />
        <TextInput {...passwordInputProps} onChangeText={onPasswordChanged} />
    </View>
);
