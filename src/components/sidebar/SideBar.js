import React from "react";
import { Container, Text, List, ListItem, Thumbnail, View } from "native-base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground, Dimensions } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import sideBar from "../../style/home/sidebarStyle";
import { color } from "react-native-reanimated";
import { useSelector, useDispatch } from "react-redux";
import LOGGED_OUT_USER from "./../../redux/User";
import EMPTY_CART from "./../../redux/Retail";
import EMPTY_EVENT from "./../../redux/Event";
import { EventDetails } from "../screens";
import * as ImagePicker from 'expo-image-picker'; 
import * as FileSystem from 'expo-file-system';
const routes = ["Home", "Link Student", "Inquiry", "Memberships", "Awards", "Events", "Retail", "Class Reservation","Reserved Classes","Class Check In", "Payment Methods", "Purchase History"];

const SideBar = (props) => {
  const dispatch = useDispatch();
  const userData = (userInfo) => dispatch({ type: "LOGGED_OUT_USER", payload: userInfo });
  const updateRetail = (updateRetail) =>
    dispatch({ type: "EMPTY_CART", payload: updateRetail });
  const updateEvent = (updateEvent) =>
    dispatch({ type: "EMPTY_EVENT", payload: updateEvent });
  const userId = useSelector((state) => state);
  const [data, setData] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [img, setImg] = React.useState("");
  const [loader, setloader] = React.useState(true);
  const [guid, setGuid] = React.useState("");
  const [studentIds, setStudentIds] = React.useState([]);
  const [PhotoPath, setPhotoPath] = React.useState("");
  const win = Dimensions.get("window");
  const [image, setImage] = React.useState(null);
  const apiUrl = API_URL.trim();
  const logout = () => {
    updateRetail([]);
    updateEvent([])
    userData(userId.userDataReducer[0].id);
  };
  const getprofilePic = (guids) => {
    fetch(`${apiUrl}/Public/GetProfilePicture?guid=${guids}`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.text())
      .then((data) => {
     //    console.log(data); 
        setImg(data)
        // if (data.StudentIds.length > 0) {
        //   setPhotoPath(data.PhotoPath);
        // } else {
        // }
      });
  }
 
const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  //console.log(result);
  if (!result.cancelled) {
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
    const base64 = await FileSystem.readAsStringAsync(result.uri, {
      encoding: 'base64'
    });
    //console.log(base64);
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `${match[1]}` : `image`;

    // // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // // Assume "photo" is the name of the form field the server expects
     formData.append('base64', base64);
     formData.append('fileType', type);
    setImg(base64);
    console.log(base64);

    fetch(`${apiUrl}/odata/StudentAccount`, {
      method: "post",
      headers: {
        Accept: "*/*",
        'Content-Type': 'multipart/form-data; ',
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: formData
    })
    .then((response) => {
      let jsonData = JSON.stringify(response);
      let jsonDataPrase = JSON.parse(jsonData);
      //console.log(jsonDataPrase)
      
    })
    .catch((response) => {
      console.log(response)
    });
  }
};
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    if (typeof data !== "undefined" && data == "") {
      fetch(`${apiUrl}/odata/StudentAccount`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
        //  console.log(data)
          if (data.StudentIds.length > 0) {
            setStudentIds(data.StudentIds);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setGuid(data.StudentAccountGuid);
            setloader(false);
            getprofilePic(data.StudentAccountGuid)
          } else {
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setloader(false);
          }
        });
    }
  }, [data]);

  return (
    <ScrollView >
      <ImageBackground
        style={{ padding: 15, paddingTop: 50, height: win.height }}
        source={require("./../../../assets/menu.png")}
        resizeMode={"stretch"}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity onPress={pickImage} >
            {img ? (
              <Thumbnail
                source={{
                  uri: "data:image/png;base64," + img,
                }}
              />
            ) : (
              <Thumbnail
                source={{
                  uri: "https://pickaface.net/gallery/avatar/20121015_175346_216_karatekid.png",
                }}
              />
            )}
          </TouchableOpacity>
          <Text style={[sideBar.name, { color: "#333", marginLeft: 15, fontWeight: "bold" }]}>
            {firstName ? firstName + " " + lastName : "Michael Jordan"}
          </Text>
        </View>
        <Container style={{ backgroundColor: "transparent", paddingTop: 30}}>
          <List style={{ backgroundColor: "transparent"}}>
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
            paddingLeft: 15
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
