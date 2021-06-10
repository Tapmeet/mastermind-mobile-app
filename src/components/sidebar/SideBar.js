import React from "react";
import { Container, Text, List, ListItem, Thumbnail, View } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";
const routes = [
  "Home",
  "Attendance",
  "Memberships",
  "Merchandise",
  "Social Media",
  "Awards",
  "Link Student",
  "Profile",
  "Inquiry",
  "Contracts",
  "Payment Methods"

];
import sideBar from "../../style/home/sidebarStyle";
import { color } from "react-native-reanimated";
import { useSelector, useDispatch } from 'react-redux'
import LOGGED_OUT_USER from "./../../redux/User"


const SideBar = (props) => {
  const dispatch = useDispatch()
  const userData = userInfo => dispatch({ type: "LOGGED_OUT_USER", payload: userInfo });
  const userId = useSelector(state => state);
  const logout = () => {
    userData(userId[0].id)
  }
  return (
    <ScrollView>
      <ImageBackground
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
        source={require('./../../../assets/menu.png')}
        resizeMode={'stretch'}
      >
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <Thumbnail
            source={{
              uri:
                "https://pickaface.net/gallery/avatar/20121015_175346_216_karatekid.png",
            }}
          />
          <Text style={[sideBar.name, { color: "#333", marginLeft: 15, fontWeight: "bold" }]}>Michael Jordan</Text>
        </View>
        <Container style={{ backgroundColor: "transparent", marginTop: 60 }}>
          <List
            dataArray={routes}
            style={{ backgroundColor: "transparent" }}
            renderRow={(data) => {
              return (
                <ListItem
                  style={{ backgroundColor: "transparent" }}
                  button
                  onPress={() => props.navigation.navigate(data)}
                >
                  <Text style={{ color: '#fff', fontWeight: "bold" }}>{data}</Text>
                </ListItem>
              );
            }}
          />
          <TouchableOpacity
            style={{ backgroundColor: "transparent", paddingLeft:20, marginTop: -10, position:"relative", marginBottom:40, zIndex:99999 }}
            button
            onPress={logout}
          >
            <Text style={{ color: '#fff', fontWeight: "bold" }}>Logout</Text>
          </TouchableOpacity>
        </Container>
      </ImageBackground>
    </ScrollView>
  );
};
export default SideBar;
