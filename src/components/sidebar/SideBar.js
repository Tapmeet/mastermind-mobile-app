import React from "react";
import { Container, Text, List, ListItem, Thumbnail, View } from "native-base";
import { ScrollView } from "react-native-gesture-handler";
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

const SideBar = (props) => {
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
        <Container style={{ backgroundColor: "transparent", marginTop:60 }}>
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
        </Container>
      </ImageBackground>
    </ScrollView>
  );
};
export default SideBar;
