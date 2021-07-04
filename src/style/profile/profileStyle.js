import { StyleSheet } from "react-native"
import { colorPallete } from "../colorPallete";

export default StyleSheet.create({
  list: {
    shadowColor: "#000",
    display:"flex",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    maxWidth: "90%",
    backgroundColor: "#fff",
    padding: 10,
    paddingTop:25,
    paddingBottom:25,
    marginLeft:30,
    marginRight:30,
    marginBottom:20,
    marginTop:10,
    paddingLeft:70,
    justifyContent:"space-between",
    flexDirection:"row",
    paddingRight:30,
   alignSelf:"center",
    
    borderRadius:15
  },
  iconLeft:{
    position:"absolute",
    left:20,
    maxWidth:50,
    top:8
  },
  iconRight:{
    width:10,
    marginLeft:10 
}
})