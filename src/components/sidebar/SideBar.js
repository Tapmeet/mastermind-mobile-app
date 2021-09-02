import React from "react";
import { Container, Text, List, ListItem, Thumbnail, View } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, Dimensions } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import sideBar from "../../style/home/sidebarStyle";
import { color } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import LOGGED_OUT_USER from "./../../redux/User";
import { EventDetails } from "../screens";

const routes = ["Home", "Link Student", "Profile", "Inquiry", "Memberships", "Payment Methods", "Events"];

const SideBar = (props) => {
  const dispatch = useDispatch();
  const userData = (userInfo) => dispatch({ type: "LOGGED_OUT_USER", payload: userInfo });
  const userId = useSelector((state) => state);
  const [data, setData] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [loader, setloader] = React.useState(true);
  const [studentIds, setStudentIds] = React.useState([]);
  const [PhotoPath, setPhotoPath] = React.useState("");
  const win = Dimensions.get("window");

  const logout = () => {
    userData(userId[0].id);
  };
  React.useEffect(() => {
    const apiUrl = API_URL.trim();
    if (typeof data !== "undefined" && data == "") {
      fetch(`${apiUrl}/odata/StudentAccount`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          if (data.StudentIds.length > 0) {
            setStudentIds(data.StudentIds);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setPhotoPath(data.PhotoPath);
            setloader(false);
          } else {
            setloader(false);
          }
        });
    }
  }, [data]);

  return (
    <ScrollView>
      <ImageBackground
        style={{ padding: 16, paddingTop: 48, height: win.height }}
        source={require("./../../../assets/menu.png")}
        resizeMode={"stretch"}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {PhotoPath ? (
            <Thumbnail
              source={{
                uri: "data:image/png;base64," + PhotoPath,
              }}
            />
          ) : (
            <Thumbnail
              source={{
                uri: "https://pickaface.net/gallery/avatar/20121015_175346_216_karatekid.png",
              }}
            />
          )}
          <Text style={[sideBar.name, { color: "#333", marginLeft: 15, fontWeight: "bold" }]}>
            {firstName ? firstName + " " + lastName : "Michael Jordan"}
          </Text>
        </View>
        <Container style={{ backgroundColor: "transparent", marginTop: 60 }}>
          <List style={{ backgroundColor: "transparent" }}>
            {routes.map((item, index) => {
              return (
                <ListItem key={index} button underlayColor="transparent" onPress={() => props.navigation.navigate(item)}>
                  <Text style={{ color: "#fff", fontWeight: "bold", backgroundColor: "transparent" }}>{item}</Text>
                </ListItem>
              );
            })}
          </List>
        </Container>
        <TouchableOpacity
          style={{
            backgroundColor: "transparent",
            paddingLeft: 15,
            position: "relative",
            marginBottom: 20,
            zIndex: 99,
          }}
          button
          onPress={logout}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      </ImageBackground>
    </ScrollView>
  );
};
export default SideBar;
