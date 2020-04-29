import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export const Authentication = {
    Login: undefined,
    SignUp: undefined,
    ForgotPassword: { email: undefined },
};

const Global = {
    Settings: { section: undefined },
    Profile: undefined,
    About: undefined,
};

const Lobby = {
    CreateGame: undefined,
    History: undefined,
    Stats: undefined,
};

const Game = {
    Timeline: undefined,
    Actions: undefined,
};

export type Nav<Routes extends Record<string, object | undefined>, RouteName extends keyof Routes> = {
    navigation: StackNavigationProp<Routes, RouteName>,
    route: RouteProp<Routes, RouteName>,
}
