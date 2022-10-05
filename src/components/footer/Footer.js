import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";
import { ImageBackground, Image, View,Dimensions } from "react-native";
import globalStyle from "../../style/globalStyle";
//import { LinearGradient } from "expo-linear-gradient";
import { API_URL } from "./../Utility/AppConst";
import { useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

const apiUrl = API_URL.trim();
const FooterTabs = (props) => {
  const win = Dimensions.get("window");
  const [loader, setloader] = React.useState(true);
  const [schoolId, setSchoolId] = React.useState(true);
  const userId = useSelector((state) => state);
  const [school, setSchoolInfo] = React.useState([]);
  const [studentschoolId, setstudentSchoolId] = React.useState('');
  const [studentorgId, setstudentorgId] = React.useState('');
  const [pdfUrl, setPdfUrl] = React.useState(false);

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
        if (data) {
          setSchoolInfo(data.value);
          setloader(false);
        } else {
          setloader(false);
        }
      });
    fetch(`${apiUrl}/odata/OrganizationClass`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPdfUrl(data.classSchedulePDFAvailable)
        if (data.classSchedulePDFAvailable) {
          getClassId()
        }
      });

  }
  const getClassId = () => {
    fetch(`${apiUrl}/odata/StudentAccount`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        setstudentSchoolId(data.SchoolGuid)
        setstudentorgId(data.OrganizationGuid)
      });
  }
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };
  return (
    <ImageBackground
      style={[globalStyle.barStylingfooter,{
        height: 70,
        top:  win.height - 70
      }]}
      source={require("./../../../assets/bgBottom.png")}
      resizeMode={"stretch"}
    >
      <View >
        <View style={{ paddingBottom: 10, paddingTop: 10, display:"flex", flexDirection:'row', width:"100%", justifyContent:"space-around" }}>
          <Button style={{backgroundColor:"transparent"}} onPress={() => props.navigation.navigate("Home")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/home.png")} />
          </Button>
          {pdfUrl ?
            <Button style={{backgroundColor:"transparent"}}  onPress={() => openLink(apiUrl + '/Public/GetClassSchedule/' + studentschoolId + '?organization=' + studentorgId )}>
              <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/calendar.png")} />
            </Button>
            :
            <Button style={{backgroundColor:"transparent"}}  onPress={() => props.navigation.navigate("Class Reservation")}>
              <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/calendar.png")} />
            </Button>
          }
          <Button style={{backgroundColor:"transparent"}}  onPress={() => props.navigation.navigate("Profile")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/user-icon.png")} />
          </Button>
          <Button style={{backgroundColor:"transparent"}}  onPress={() => props.navigation.navigate("Share")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/share-footer.png")} />
          </Button>
          {typeof school !== "undefined" && school.length > 0 ? (
            school.map(function (school, index) {
              return (
                school.ExternalLinkType == 'ReferAFriend' ?
                  <Button style={{backgroundColor:"transparent"}}  key={index} onPress={() => openLink(school.Address)}>
                    <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/people.png")} />
                  </Button>
                  : null
              )
            })
          ) : null}
        </View>
      </View>
    </ImageBackground>

  );
};
export default FooterTabs;
