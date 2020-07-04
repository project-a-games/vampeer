import React, { useEffect, useState } from 'react';
import {
    View, Text, StyleSheet, Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-elements';
import { Dispatch } from 'redux';
import { sharedStyles } from '../shared_styles';
import { launchAuthorization, receiveCredentials } from '../../state/app_actions';
import { requestAuthorization } from '../../network/requestor';
import { alertError } from '../../util/errors';
import { Action } from '../../state/tools/actions';

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

async function executeAuth(dispatch: Dispatch<Action<any>>) {
    try {
        const credentials = await requestAuthorization();
        dispatch(receiveCredentials(credentials));
    } catch (e) {
        alertError(e.message);
        e.action && dispatch(e.action);
    }
}

export const AuthorizationScreen = () => {
    const [showingWeb, setShowingWeb] = useState(false);
    const dispatch = useDispatch();

    const onAuthPress = async () => {
        setShowingWeb(true);
        await executeAuth(dispatch);
        setShowingWeb(false);
    };

    useEffect(() => {
        (async () => {
            setShowingWeb(true);
            await executeAuth(dispatch);
            setShowingWeb(false);
        })();
    }, [setShowingWeb, dispatch]);

    return (
        <View style={sharedStyles.centeredView}>
            <Text style={styles.loading}>Vampeer</Text>
            <View style={{ flex: 1 }}>
                <Button
                    raised
                    title="Login/Sign Up"
                    onPress={onAuthPress}
                    loading={showingWeb}
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
