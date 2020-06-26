import React from 'react';
import {
    View, Text, ActivityIndicator,
} from 'react-native';
import { ThemeProvider, Theme } from 'react-native-elements';
import { connect } from 'react-redux';
import { sharedStyles } from './shared_styles';
import { AuthorizationScreen } from './authentication/authorization_screen';
import { VampeerState } from '../state/app_state';
import { LobbyStack } from './lobby/lobby_stack';

const LoadingScreen = () => (
    <View style={sharedStyles.centeredText}>
        <Text style={[sharedStyles.centeredText, { textAlignVertical: 'bottom' }]}>Vampeer</Text>
        <ActivityIndicator style={{ flex: 1, justifyContent: 'flex-start' }} size="large" />
    </View>
);

interface AuthProps {
    credentials?: VampeerState['credentials'];
    theme: Theme;
}

function getComponent(credentials: AuthProps['credentials']) {
    switch (credentials) {
    case null:
        return <AuthorizationScreen />;
    case undefined:
        return <LoadingScreen />;
    default:
        return <LobbyStack />;
    }
}

function AppEntryRouterComponent({ credentials, theme }: AuthProps) {
    return (
        <View style={{ flex: 1 }}>
            <ThemeProvider theme={theme}>
                {getComponent(credentials)}
            </ThemeProvider>
        </View>
    );
}

export const AppEntryRouter = connect(
    ({ credentials, theme }: VampeerState) => ({ credentials, theme }),
    null,
)(AppEntryRouterComponent);
