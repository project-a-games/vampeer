import { Provider } from 'react-redux';
import { Store } from 'redux';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActionHelpers } from '@react-navigation/native';
import { makeStore } from './state/store';
import { Screens } from './state/app_state';
import { LoginScreen } from './views/login_screen';
import { SignUpScreen } from './views/sign_up_screen';

const Stack = createStackNavigator();

export class VampeerMain extends React.PureComponent {
  private _store: Store;

  constructor(props: any) {
      super(props);

      this._store = makeStore();
  }

  render() {
      return (
          <Provider store={this._store}>
              <Stack.Navigator>
                  <Stack.Screen name={Screens.Main.Login} component={LoginScreen} />
                  <Stack.Screen name={Screens.Main.SignUp} component={SignUpScreen} />
              </Stack.Navigator>
          </Provider>
      );
  }
}
