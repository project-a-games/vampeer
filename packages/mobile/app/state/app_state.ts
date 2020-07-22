import { Theme } from 'react-native-elements';
import { Village, User } from '@project-a/vampeer-shared';

export interface Credentials {
    accessToken: string;
    expiresIn: number;
    idToken: string;
    scope: string;
    tokenType: string;
    refreshToken: string;
}

interface GameState {
    activeVillage: Village;
}

export interface VampeerState {
    credentials?: Credentials | null;
    theme?: Theme;
    gameState?: GameState;
    user?: User;
}

export const initialState: VampeerState = {
};
