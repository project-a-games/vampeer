/**
 * @format
 */
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { VampeerMain } from './app/main.tsx';

function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <VampeerMain />
            </NavigationContainer>
        </SafeAreaView>
    );
}

AppRegistry.registerComponent(appName, () => App);
