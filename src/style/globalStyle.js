import { StyleSheet } from "react-native";
import { colorPallete } from "./colorPallete";


export default StyleSheet.create({
    h2: {
        marginTop: 20,
        marginBottom: 0,
        fontWeight: "bold",
        fontSize: 40,
        lineHeight: 48,
        fontFamily: 'HKGrotesk-Regular'
    },
    h3: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: "bold",
        fontSize: 29,
        lineHeight: 32,
        fontFamily: 'HKGrotesk-Regular'
    },
    small: {
        fontSize: 26,
        fontWeight: "bold",
    },
    hyperlink: {
        color: colorPallete.primary,
        fontWeight: "bold"

    },
    form: {
        padding: 30,
        paddingTop: 0
    },
    formControl: {
        height: 50,
        borderRadius: 26,
        borderColor: '#D9E5E9',
        paddingLeft: 20,
        borderWidth: 2,
        marginBottom: 0,
        marginLeft: 0,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 7,
        backgroundColor: "#F7F8F9"
    },
    formControlError: {
        height: 55,
        borderRadius: 26,
        borderColor: 'red',
        paddingLeft: 20,
        borderWidth: 2,
        marginBottom: 0,
        marginLeft: 0,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 7,
        backgroundColor: "#F7F8F9"
    },
    textRight: {
        display: 'flex',
        alignSelf: "flex-end",
        marginTop: -10,
        flexDirection: "row-reverse",
        marginLeft: 30

    },
    formGroup: {
        marginLeft: 0,
        borderWidth: 0,
        borderColor: 'white',
        paddingBottom: 0,
        marginBottom: 0
    },
    flex: {
        display: 'flex',
        alignItems: "center",
        flexDirection: "row"
    },
    error: {
        display: "flex",
        justifyContent: "flex-end",
        flexDirection: "row-reverse",
        alignSelf: "flex-end",
        color: 'red',
        marginTop: 10,
        marginBottom: -10
    },
    errorText: {
        display: "flex",
        flexDirection: "row-reverse",
        alignSelf: "center",
        color: 'red',
        marginTop: 10,
        marginBottom: -10
    },
    sucessText: {
        display: "flex",
        flexDirection: "row-reverse",
        alignSelf: "center",
        color: 'green',
        marginTop: 30,
        marginBottom: -5
    },
    barStyling: {
        backgroundColor: "transparent",


    },
    formField: {
        borderWidth: 1,
        borderColor: "#A9A8A8",
        borderRadius: 22,
        marginTop: 30,
        paddingLeft: 30
    },
    formLabel: {
        marginTop: -20,
        flex: 1,
        color: '#16161D',
        fontSize: 20,
        padding: 5,
        backgroundColor: "#fff"
    },
    barStylings: {
        backgroundColor: "transparent",
        borderTopWidth: 0,
        borderColor: "transparent",
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,

    },
    titleStyling: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 24,
        color: "#fff",
        textTransform: "uppercase"
    },
    titleBody: {
        minWidth: 200,
        paddingLeft: 40
    },
    emptylist: {
        padding: 10,
        textAlign: "center",
        backgroundColor: "#f7f7f7",
        marginTop: 10,
        marginLeft: 30,
        marginRight: 30,
    },
    logo: {
        width: 15
    }

})