import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

export enum RouteNames {
    Authorization = 'Authorization',
    Settings = 'Settings',
    Profile = 'Profile',
    About = 'About',
    Lobby = 'Lobby',
    CreateGame = 'CreateGame',
    History = 'History',
    Stats = 'Stats',
    Timeline = 'Timeline',
    Actions = 'Actions',
}

export type RouteProps = {
    [RouteNames.Authorization]: undefined;
    [RouteNames.Settings]: undefined;
    [RouteNames.Profile]: undefined;
    [RouteNames.About]: undefined;
    [RouteNames.Lobby]: undefined;
    [RouteNames.CreateGame]: undefined;
    [RouteNames.History]: undefined;
    [RouteNames.Stats]: undefined;
    [RouteNames.Timeline]: undefined;
    [RouteNames.Actions]: undefined;

}

export type Nav<R extends RouteNames> = {
    navigation: StackNavigationProp<RouteProps, R>,
    route: RouteProp<RouteProps, R>,
}
