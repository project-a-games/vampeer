import { TextInput, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    titleView: {
        flex: 1,
        flexShrink: 10,
        margin: 20,
        justifyContent: 'flex-end',
    },
    loginView: {
        flex: 1,
        flexBasis: 1,
        marginHorizontal: 50,
        justifyContent: 'flex-start',
    },
    buttonsView: {
        flex: 3,
        flexDirection: 'row',
        marginHorizontal: 50,
        margin: 5,
        justifyContent: 'center',
    },
    appTitleText: {
        fontSize: 30,
        color: 'blue',
        textAlign: 'center',
        fontFamily: 'Avenir',
    },
    textInputs: {
        textAlign: 'center',
        backgroundColor: 'beige',
        margin: 5,
        fontSize: 15,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingVertical: 0,
        lineHeight: 15,
    },
    button: {
        flex: 1,
        height: 40,
        margin: 10,
    },
});
