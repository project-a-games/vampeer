import React from 'react';
import {
    createStackNavigator, StackNavigationOptions, CardStyleInterpolators, HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { Nav, RouteProps, RouteNames } from '../routes';
import { LobbyScreen } from './lobby_screen';

const Stack = createStackNavigator();

const screenOptions: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitleAlign: 'center',
    headerStyleInterpolator: HeaderStyleInterpolators.forSlideLeft,
};

export const LobbyStack = () => (
    <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={RouteNames.Lobby} component={LobbyScreen} />
    </Stack.Navigator>
);
