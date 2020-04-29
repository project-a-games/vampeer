import { Provider } from 'react-redux';
import { Store } from 'redux';
import React from 'react';
import { createStackNavigator, StackNavigationOptions, CardStyleInterpolators } from '@react-navigation/stack';
import { makeStore } from './state/store';
import { SignUpScreen } from './views/session/sign_up_screen';
import { LoginScreen } from './views/session/login_screen';
import { Authentication } from './views/session/screens';

const MainStack = createStackNavigator<typeof Authentication>();

const options: StackNavigationOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

export class VampeerMain extends React.PureComponent {
  private _store: Store;

  constructor(props: any) {
      super(props);

      this._store = makeStore();
  }

  render() {
      return (
          <Provider store={this._store}>
              <MainStack.Navigator screenOptions={options}>
                  <MainStack.Screen name="Login" component={LoginScreen} />
                  <MainStack.Screen name="SignUp" component={SignUpScreen} />
              </MainStack.Navigator>
          </Provider>
      );
  }
}
