import { Theme } from 'react-native-elements';
import { defineAction } from './tools/actions';
import { VampeerState } from './app_state';

export const appStarted = defineAction<void>('appStarted');
export const receiveCredentials = defineAction<VampeerState['credentials'] | undefined>('receiveCredentials');
export const updateTheme = defineAction<Theme>('updateTheme');
export const recieveUserData = defineAction<VampeerState['userData']>('recieveUserData');
export const resetApplication = defineAction<void>('resetApplication');
