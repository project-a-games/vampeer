import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { sharedStyles } from '../shared_styles';
import { launchAuthorization } from '../../state/app_actions';

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        textAlignVertical: 'bottom',
        textAlign: 'center',
        fontSize: 40,
    },
    indicator: {
        flex: 1,
        justifyContent: 'flex-start',
    },
});

export const AuthorizationScreen = () => {
    const dispatch = useDispatch();

    const onAuthPress = () => dispatch(launchAuthorization());

    useEffect(() => {
        console.log('Auth screen effect - launching auth');
        dispatch(launchAuthorization());
    });

    return (
        <View style={sharedStyles.centeredView}>
            <Text style={styles.loading}>Vampeer</Text>
            <View style={{ flex: 1 }}>
                <Button
                    raised
                    title="Login/Sign Up"
                    onPress={onAuthPress}
                    containerStyle={{
                        flex: 1,
                        margin: 10,
                        marginHorizontal: 80,
                        justifyContent: 'flex-start',
                        maxHeight: 40,
                    }}
                />
            </View>
        </View>
    );
};
