import { StyleSheet } from "react-native"
import { colorPallete } from "../colorPallete"

export default StyleSheet.create({
  container: {
    flex: 1
  },
  name: {
    color: colorPallete.secondary,
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8
  }
})