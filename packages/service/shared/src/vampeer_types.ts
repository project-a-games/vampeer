export interface Village {
    id: string;
    name: string;
    villagers: User[];
}

export interface User {
    email: string;
    gameData: {
        villages: Village[];
    };
}
