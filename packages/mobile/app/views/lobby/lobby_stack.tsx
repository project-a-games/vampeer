import React from 'react';
import {
    createStackNavigator, StackNavigationOptions, CardStyleInterpolators, HeaderStyleInterpolators,
} from '@react-navigation/stack';
import { LobbyScreen } from './lobby_screen';
import { RouteNames } from '../routes';

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
