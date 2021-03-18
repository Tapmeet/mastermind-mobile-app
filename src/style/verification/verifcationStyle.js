import { StyleSheet } from "react-native"
import { colorPallete } from "../colorPallete";

export default StyleSheet.create({
  container: {
    paddingTop: 60
  },
  subHeading: {
    fontSize: 20,
    margin: 'auto',
    textAlign: "center",
    width: 240,
    padding: 10,
    lineHeight: 25
  },
  envelop: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
    margin: "auto",
    marginTop: 40,
    marginBottom: 50
  },
  resendSection: {
    paddingTop: 15,
    paddingBottom: 15
  },
  formControl: {
    height: 65,
    borderRadius: 10,
    borderColor: '#888',
    paddingLeft: 5,
    borderWidth: 2,
    marginBottom: 0,
    marginLeft: 5,
    textAlign: "center"
  },
  
  spaceBetween: {
    display: 'flex',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  redirectingWrapper: {
    backgroundColor: "white",
    height:80,
    display:"flex",
    justifyContent:"center",
    borderColor: '#fff',
    paddingTop:12,
    borderWidth:0,
  
  },
  redirectingText:{
    color:'#B0B0B0',
    fontSize:21,
    fontWeight:"bold"
  },
  subHeadingWrapper:{
    fontSize: 18,
    margin: 'auto',
    textAlign: "center",
    paddingTop: 10,
    lineHeight: 25
  },
  form:{
    paddingBottom:30
  },
  successText: {
    fontSize: 18,
    margin: 'auto',
    textAlign: "center",
    width: 240,
    padding: 10,
    lineHeight: 24
  },
  successIcon: {
    height: 200,
    resizeMode: 'contain',
    width: 200,
    margin: "auto",
    marginTop: 30,
    marginBottom: 10
  },
})