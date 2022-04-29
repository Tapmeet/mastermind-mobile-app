import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";
import { ImageBackground, Image } from "react-native";
import globalStyle from "../../style/globalStyle";
import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "./../Utility/AppConst";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
const apiUrl = API_URL.trim();
const FooterTabs = (props) => {
  const [loader, setloader] = React.useState(true);
  const [schoolId, setSchoolId] = React.useState(true);
  const userId = useSelector((state) => state);
  const [school, setSchoolInfo] = React.useState([]);
  useFocusEffect(
    //navigation.addListener("focus", () => {
    React.useCallback(() => {
      getSchoolData()
    }, [])
  );


  function getSchoolData() {
    fetch(`${apiUrl}/odata/ExternalLinks`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data) {
          setSchoolInfo(data.value);
          setloader(false);
        } else {
          setloader(false);
        }
      });
  }
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };
  return (
    <ImageBackground
      style={{
        height: 70,
      }}
      source={require("./../../../assets/bgBottom.png")}
      resizeMode={"stretch"}
    >
      <Footer style={globalStyle.barStyling}>
        <FooterTab style={[globalStyle.barStyling, { paddingBottom: 10, paddingTop: 10 }]}>
          <Button onPress={() => props.navigation.navigate("Home")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/home.png")} />
          </Button>
          <Button onPress={() => props.navigation.navigate("Reserved Classes")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/calendar.png")} />
          </Button>
          <Button onPress={() => props.navigation.navigate("Profile")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/user-icon.png")} />
          </Button>
          <Button onPress={() => props.navigation.navigate("Share")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/share-footer.png")} />
          </Button>
          {typeof school !== "undefined" && school.length > 0 ? (
            school.map(function (school, index) {
              return (
                school.ExternalLinkType == 'ReferAFriend' ?
                  <Button onPress={() => openLink(school.Address)}>
                    <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/people.png")} />
                  </Button>
                  : null
              )
            })
          ) : null}
        </FooterTab>
      </Footer>
    </ImageBackground>

  );
};
export default FooterTabs;
