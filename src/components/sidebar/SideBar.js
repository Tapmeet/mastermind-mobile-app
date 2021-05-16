import React from "react";
import { Container, Text, List, ListItem, Thumbnail } from "native-base";
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
  "Payment Method"
 
];
import sideBar from "../../style/home/sidebarStyle";

const SideBar = (props) => {
  return (
    <ScrollView>
      <ImageBackground
        style={{ width: undefined, padding: 16, paddingTop: 48 }}
        source={{
          uri:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB32gm3H-fkGKgKlTtsZRXyWQ97dyt2BN8vg&usqp=CAU",
        }}
      >
        <Thumbnail
          source={{
            uri:
              "https://pickaface.net/gallery/avatar/20121015_175346_216_karatekid.png",
          }}
        />
        <Text style={sideBar.name}>Michael Jordan</Text>
      </ImageBackground>
      <Container>
        <List
          dataArray={routes}
          renderRow={(data) => {
            return (
              <ListItem
                button
                onPress={() => props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            );
          }}
        />
      </Container>
    </ScrollView>
  );
};
export default SideBar;
