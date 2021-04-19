import { StyleSheet } from "react-native"
import { colorPallete } from "../colorPallete";

export default StyleSheet.create({
  container: {
    display: "flex",
    padding: 0,
    margin: 0
  },
  bodyContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colorPallete.primary,
    color: colorPallete.secondary,
    height: 60,
    borderRadius: 30,
  },
  buttonSecondary: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colorPallete.secondaryButton,
    color: 'white',
    height: 60,
    borderRadius: 30,
    width: "100%",
    textAlign:"center",
    alignSelf:"center"
  },
  buttonText: {
    fontSize: 18
  },
  logo: {
    height: 84,
    resizeMode: 'contain',
    width: 220,
    marginBottom: 20
  },
  spacing: {
    padding: 0,
  },
  signUpSection: {
    marginTop: 40,
    paddingBottom: 50
  },
  backWrapper: {
    marginBottom: 40,
    flexDirection: "row",
    display: "flex",
    justifyContent: "flex-start",
    lineHeight: 60,
    position: "absolute",
    top: 25,
    left: 20,
    zIndex: 99
  },
  backButton: {
    height: 45,
    resizeMode: 'contain',
    width: 45,
  },
  backButtonStyle: {
    height: 80,

  },
  radioSection: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center"
  },

  checkbox: {
    marginRight: 10,
    borderColor: "#485063",
    borderWidth: 2,
    borderRadius: 4,
  },
  text: {
    marginBottom: 0
  },
  contentContainer: {
    backgroundColor: "#fff",
    marginTop: 50,
    width: '90%',
    margin: "auto",
    alignSelf: "center"
  },
  textAccordian: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingBottom: 10,
    display:"flex",
    position:"relative",
    marginTop: 20,
    paddingLeft:40
  },
  arrow: {
    maxWidth: 15,
    position:"absolute",
    right:10,
    top:-20
  },
  iconLeft:{
    maxWidth:20,
    position:"absolute",
    left: 10,
    top:-20
  }
})