import { Theme } from 'react-native-elements';

export interface Credentials {
    accessToken: string;
    expiresIn: number;
    idToken: string;
    scope: string;
    tokenType: string;
    refreshToken: string;
}

interface Village {
    id: string;
    name: string;
    villagers: UserData[];
}

interface GameState {
    activeVillage: Village;
}

export interface UserData {
    email: string;
    villages: Village[];
}

export interface VampeerState {
    credentials?: Credentials | null;
    theme?: Theme;
    userData?: UserData;
    gameState?: GameState;
}

export const initialState: VampeerState = {
};
