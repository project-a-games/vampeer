import React, { useCallback, useEffect, useState } from 'react';
import {
    View, Text, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import { sharedStyles } from '../shared_styles';
import { Nav, RouteNames } from '../routes';
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

type AuthProps = {
    onLaunchAuth: () => void;
} & Nav<RouteNames.Authorization>

const AuthComponent = ({ onLaunchAuth }: AuthProps) => {
    const [hasLaunched, setHasLaunched] = useState(false);

    const onAuthPress = useCallback(() => {
        onLaunchAuth();
    }, [onLaunchAuth]);

    useEffect(() => {
        onLaunchAuth();
        setHasLaunched(true);
    });

    return (
        <View style={sharedStyles.centeredView}>
            <Text style={styles.loading}>Vampeer</Text>
            <View style={{ flex: 1 }}>
                <Button
                    raised
                    title="Login/Sign Up"
                    onPress={onAuthPress}
                    loading={!hasLaunched}
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

export const AuthorizationScreen = connect(
    undefined,
    (dispatch) => ({
        onLaunchAuth: () => {
            dispatch(launchAuthorization());
        },
    }),
)(AuthComponent);
