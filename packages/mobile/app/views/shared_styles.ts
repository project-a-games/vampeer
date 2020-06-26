import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    centeredView: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },
    centeredText: {
        flex: 1,
        fontSize: 40,
        textAlign: 'center',
        textAlignVertical: 'center',
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
        borderWidth: 3,
        borderRadius: 10,
        paddingVertical: 0,
        lineHeight: 15,
    },
    buttonsView: {
        flex: 3,
        marginHorizontal: 50,
        margin: 5,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        height: 40,
        margin: 10,
        borderRadius: 10,
    },
});
