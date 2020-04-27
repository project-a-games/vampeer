
enum Main {
    Login = 'Login',
    SignUp = 'SignUp',
    Profile = 'Profile',
    CreateJoinGame = 'CreateJoinGame',
}

enum Game {
    Create = 'Create',
    Members = 'Members',
    Overview = 'Overview',
    Timeline = 'Timeline',
    Actions = 'Actions',
}

export const Screens = {
    Main,
    Game,
};

export interface State {
    currentPage: typeof Screens
}

const initialState = {
    currentPage: Screens.Main.Login,
};
