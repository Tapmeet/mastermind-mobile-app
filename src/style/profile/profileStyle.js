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
    width: "90%",
    backgroundColor: "#fff",
    padding: 25,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 25,
    justifyContent:"space-between",
    flexDirection:"row",
    
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