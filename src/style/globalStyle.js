import { StyleSheet } from "react-native";
import { colorPallete } from "./colorPallete";

export default StyleSheet.create({
  h2: {
    marginTop: 20,
    marginBottom: 0,
    fontWeight: "bold",
    fontSize: 40,
    lineHeight: 48,
    fontFamily: "HKGrotesk-Regular",
  },
  h3: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 29,
    lineHeight: 32,
    fontFamily: "HKGrotesk-Regular",
  },
  small: {
    fontSize: 26,
    fontWeight: "bold",
  },
  hyperlink: {
    color: colorPallete.primary,
    fontWeight: "bold",
    fontSize: 18
  },
  form: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
  },
  formControl: {
    height: 50,
    borderRadius: 26,
    borderColor: "#D9E5E9",
    paddingLeft: 20,
    borderWidth: 2,
    marginBottom: 0,
    marginLeft: 0,
    backgroundColor: "#F7F8F9",
  },
  Boxshadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    backgroundColor: "#fff",
    margin: 10,
    marginBottom: 30,
    borderRadius: 15,
  },
  formControls: {
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 5,
    color: "#8a898e",
    fontSize: 18,
  },
  formControlError: {
    height: 55,
    borderRadius: 26,
    borderColor: "red",
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
    backgroundColor: "#F7F8F9",
  },
  textRight: {
    display: "flex",
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
    marginLeft: 30,
  },
  formGroup: {
    marginLeft: 0,
    borderWidth: 0,
    borderColor: "white",
    paddingBottom: 0,
    marginBottom: 0,
  },
  flex: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  error: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
    alignSelf: "flex-end",
    color: "red",
    marginTop: 10,
    marginBottom: -10,
  },
  errorText: {
    display: "flex",
    flexDirection: "row-reverse",
    alignSelf: "center",
    color: "red",
    marginTop: 10,
    marginBottom: -10,
  },
  sucessText: {
    display: "flex",
    flexDirection: "row-reverse",
    alignSelf: "center",
    color: "green",
    marginTop: 30,
    marginBottom: -5,
  },
  barStyling: {
    backgroundColor: "transparent",
  },
  formField: {
    borderWidth: 2,
    borderColor: "#D9E5E9",
    borderRadius: 12,
    marginTop: 30,
    paddingLeft: 30,
  },
  formFieldError: {
    borderWidth: 1,
    borderColor: "#ff0000",
    borderRadius: 12,
    marginTop: 30,
    paddingLeft: 30,
  },
  formLabel: {
    marginTop: -23,
    flex: 1,
    color: "#16161D",
    fontSize: 20,
    padding: 8,
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    fontWeight: "bold",
    textTransform: "uppercase",
    
  },
  barStylings: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderColor: "transparent",
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 0,
  },
  titleStyling: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 24,
    color: "#fff",
    textTransform: "uppercase",
  },
  titleBody: {
    minWidth: 200,
    paddingLeft: 0,
    alignSelf: "center",
    justifyContent: "center",
    display: "flex",
    textAlign: "center",
    alignItems: "center",
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
    width: 15,
  },
  Btn: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
    height: 70,
  },
  BtnFull: {
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
    height: 70,
  },
  BtnHalf: {
    width: "50%",
    borderRadius: 15,
    overflow: "hidden",
    marginTop: 20,
    height: 70,
  },

  tableList: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginTop: 5,
    alignItems: "center",
    minHeight: 60,
  },
  tableListOdd: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    backgroundColor: "#f2f6ff",
    padding: 15,
    marginTop: 5,
    alignItems: "center",
    minHeight: 60,
  },
  tableBoxshadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    backgroundColor: "#fff",
    width: "95%",
    margin: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  tableBoxshadowContract: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  signatureField: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 7,
    backgroundColor: "#fff",
    borderRadius: 20,
    height: 180,
    overflow: "hidden",
    marginTop: 10,
  },
  dflex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    flexWrap: "nowrap",
    alignItems: "center",
    marginBottom: 30,
    width: "90%",
    position: "relative",
    alignSelf: "center",
  },
  TopSection: {
    flex: 1,
    alignItems: "stretch",
    width: "50%",
    position: "relative",
    justifyContent: "space-between",
    zIndex: 99,
  },
  line: {
    position: "absolute",
    backgroundColor: "#eee",
    width: "100%",
    height: 2,
  },
  slider: {
    justifyContent: "flex-start",
    textAlign: "left",
    paddingTop: 10,
    paddingLeft: 30,
  },
  sliderWrapper: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "flex-start",
    marginBottom: 15,
    justifyContent: "flex-start",
    borderRadius: 30,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff",
  },
  homeEvents: {
    shadowColor: "#CCC",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.54,
    shadowRadius: 3.84,
    elevation: 7,
    backgroundColor: "#fff",
    width: "97%",
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 15,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    padding: 15,
  },
});
