import { StyleSheet } from "react-native";
import { colorPallete } from "./colorPallete";


export default StyleSheet.create({
    h2: {
        marginTop: 20,
        marginBottom: 0,
        fontWeight: "bold",
        fontSize: 40,
        lineHeight: 48,
        fontFamily: 'HKGrotesk-Bold'
    },
    h3: {
        marginTop: 20,
        marginBottom: 0,
        fontWeight: "bold",
        fontSize: 29,
        lineHeight: 32,
        fontFamily: 'HKGrotesk-Bold'
    },
    small: {
        fontSize: 20
    },
    hyperlink: {
        color: colorPallete.primary,
        fontWeight: "bold"

    },
    form :{
        padding:30,
        paddingTop:0
    },
    formControl: {
        height: 50,
        borderRadius: 26,
        borderColor: '#888',
        paddingLeft: 20,
        borderWidth: 2,
        marginBottom: 0,
        marginLeft: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        backgroundColor:"#fff"
    },
    formControlError: {
        height: 55,
        borderRadius: 26,
        borderColor: 'red',
        paddingLeft: 20,
        borderWidth: 2,
        marginBottom: 0,
        marginLeft: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
        backgroundColor:"#fff"
    },
    textRight: {
        display: 'flex',
        alignSelf: "flex-end",
        marginTop: -10,
        flexDirection: "row-reverse",
        marginLeft:30

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

})