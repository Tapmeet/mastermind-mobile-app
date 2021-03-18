import { StyleSheet } from "react-native"
import { colorPallete } from "../colorPallete";

export default StyleSheet.create({
  container: {
    display: "flex",
    padding: 0,

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
  logo: {
    height: 84,
    resizeMode: 'contain',
    width: 220,
    marginBottom: 20
  },
  spacing: {
    padding: 20
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
    lineHeight: 60
  },
  backButton: {
    height: 45,
    resizeMode: 'contain',
    width: 45,
  },
  backButtonStyle: {
    height: 80
  },
  radioSection: {
    marginTop: 30,
    flexDirection: "row",
    alignItems:"center"
  },

  checkbox: {
    marginRight: 10,
    borderColor: "#485063",
    borderWidth: 2,
    borderRadius: 4,
  },
  text: {
    marginBottom: 0
  }
})