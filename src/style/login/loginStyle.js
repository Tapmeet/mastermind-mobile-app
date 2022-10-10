import { StyleSheet } from "react-native";
import { flex } from "styled-system";
import { colorPallete } from "../colorPallete";

export default StyleSheet.create({
  container: {
    flex: 1,
    background:'#fff',
    width: '100%',
    height: '100%',
  },
  scrollView: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
  container: {
    display: "flex",
    padding: 0,
    margin: 0,
  },
  bodyContainer: {
    flexDirection: "column",
    justifyContent: "center",
    marginBottom: 20,
   
  },
  formContainer: {
    marginTop: 20,
    marginBottom: 0,
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colorPallete.primary,
    color: colorPallete.secondary,
    height: 60,
    borderRadius: 30
  },
  buttonSave: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: colorPallete.secondary,
    height: 70,
    borderRadius: 0,
    borderColor: "transparent",
    elevation: 0,
    borderWidth: 0,
    width: "100%",
    justifyContent: "center",
  },
  buttons: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "transparent",
    color: colorPallete.secondary,
    height: 70,
    borderRadius: 0,
    borderColor: "transparent",
    elevation: 0,
    borderWidth: 0,
  },
  buttonSecondarys: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: "#fff",
    color: colorPallete.secondary,
    height: 65,
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: "#4574fe", 
    borderWidth: 2,
  },
  buttonsSecondary: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: colorPallete.secondaryButton,
    color: "white",
    height: 65,
    borderRadius: 17,
    width: "100%",
    textAlign: "center",
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 18,
    color:'#fff',
    fontWeight: "600",
  },
  logo: {
    height: 84,
    resizeMode: "contain",
    width: 220,
    marginBottom: 20,
  },
  spacing: {
    padding: 0,
  },
  signUpSection: {
    // position: "absolute",
    //bottom: 25,
   textAlign:"center",
   display: 'flex',
   width: '100%',
   paddingLeft:30,

   justifyContent:"center",
   marginTop: 20
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
    zIndex: 99,
  },
  backButton: {
    height: 45,
    resizeMode: "contain",
    width: 45,
  },
  backButtonStyle: {
    height: 80,
  },
  radioSection: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    marginRight: 10,
    borderColor: "#485063",
    borderWidth: 2,
    borderRadius: 4,
  },
  text: {
    marginBottom: 0,
  },
  contentContainer: {
    backgroundColor: "#fff",
    marginTop: 30,
    width: "90%",
    margin: "auto",
    alignSelf: "center",
  },
  textAccordian: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingBottom: 10,
    display: "flex",
    position: "relative",
    marginTop: 20,
    paddingLeft: 40,
  },
  textAccordians: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingBottom: 25,
    paddingTop: 25,
    paddingRight: 10,
    display: "flex",
    position: "relative",
    marginTop: 20,
    paddingLeft: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  textAccordiansContract: {
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingBottom: 25,
    paddingTop: 25,
    paddingRight: 10,
    display: "flex",
    position: "relative",
    marginTop: 20,
    paddingLeft: 70,
    shadowColor: "#000",
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
  },
  arrow: {
    maxWidth: 15,
    position: "absolute",
    right: 10,
    top: -20,
  },
  arrows: {
    maxWidth: 20,
    position: "absolute",
    right: 15,
    top: 10,
  },
  iconLeft: {
    maxWidth: 20,
    position: "absolute",
    left: 10,
    top: -20,
  },
  iconLefts: {
    maxWidth: 30,
    position: "absolute",
    left: 15,
    top: 10,
  },
  iconLeftss: {
    maxWidth: 40,
    position: "absolute",
    left: 15,
    top: -10,
  },
  welcomeLogo: {
    height: 380,
    resizeMode: "contain",
    width: 480,
    marginBottom: 20,
  },
  welcomeLogoLast: {
    height: 175,
    width: 480,
    resizeMode: "contain",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
});
