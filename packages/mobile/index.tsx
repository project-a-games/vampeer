import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, AppRegistry } from 'react-native';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import { VampeerState } from './app/state/app_state';
import { makeStore } from './app/state/store';
import { appStarted } from './app/state/app_actions';
import { AppEntryRouter } from './app/views/app_entry_router';
import { Action } from './app/state/tools/actions';

class App extends React.PureComponent {
    private _store: Store<VampeerState, Action<any>>;

    constructor(props: any) {
        super(props);

        this._store = makeStore();

        console.log('Dispatching appStarted');
        this._store.dispatch(appStarted());
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Provider store={this._store}>
                    <NavigationContainer>
                        <AppEntryRouter />
                    </NavigationContainer>
                </Provider>
            </SafeAreaView>
        );
    }
}

AppRegistry.registerComponent(appName, () => App);
