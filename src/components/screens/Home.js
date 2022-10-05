import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, useWindowDimensions, ScrollView } from "react-native";
import React from "react";
import FooterTabs from "../footer/Footer";
import { SideBarMenu } from "../sidebar";
import globalStyle from "../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import moment from "moment";
import { API_URL } from "./../Utility/AppConst";
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import loginStyle from "../../style/login/loginStyle";
import HTML from "react-native-render-html";
import TextTicker from 'react-native-text-ticker'
import * as Notifications from 'expo-notifications';
import { wrap } from "lodash";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
const apiUrl = API_URL.trim();
const key = 'value';
var uniqueStudent = [];
const placeholderStudent = {
  label: "Select Student",
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 115,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 100,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    marginRight: 15,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const Home = (props) => {
  const [notification, setNotification] = React.useState(false);
  const isCarousel = React.useRef(null);
  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [eventListing, setEventListing] = React.useState([]);
  const [classListing, setClassListing] = React.useState([]);
  const [retailListing, setRetailListing] = React.useState([]);
  const [threshold, setThreshold] = React.useState('');
  const [studentGuid, setStudentGuid] = React.useState('');
  const [organizationLogo, setOrganizationLogo] = React.useState('');
  const [school, setSchoolInfo] = React.useState([])
  const contentWidth = useWindowDimensions().width;

  const [classListings, setClassListings] = React.useState([]);
  const [studentIds, setStudentIds] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [studentData, setStudentData] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [personId, setPersonId] = React.useState('');
  const [selectedTaskId, setSelectedTaskId] = React.useState('');
  const [selectedCheckinTime, setSelectedCheckinTime] = React.useState('');
  const [togglePopup, setTogglePopup] = React.useState(false);
  const [loaderMessage, setLoaderMessage] = React.useState(false);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedTaskName, setSelectedTaskName] = React.useState('');
  const [announcements, setAnnouncements] = React.useState('');
  async function registerForPushNotificationsAsync() {
    let token;
    const studentGUID = await AsyncStorage.getItem("studentGuid");
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    if (token) {
      // console.log(token)
      // console.log('studentGuid')
      // console.log(studentGUID)
      fetch(`${API_URL}odata/Message`, {
        method: "post",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
        },
        body: JSON.stringify({
          StudentAccountGuid: studentGUID,
          DeviceHandle: token,
        }),
      })
        .then(response => response.text())
        .then(result => { console.log(result); console.log('result') })
        .catch(error => console.log('error', error));
    }

  }

  useFocusEffect(
    React.useCallback(() => {

      fetchClasses()
      getStudents()
      fetch(`${apiUrl}/odata/OrganizationEvent`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.events) {
            setEventListing(data.events);
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
          setThreshold(data.threshold)
          if (data.classes) {
            var classes = [];
            data.classes.map(function (event, index) {
              if (index <= 50) {
                classes.push(event)
              }
            })
            setClassListing(classes);
          }
        });
      fetch(`${apiUrl}/odata/OrganizationRetail`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setloader(false);
          //console.log(data.retailsDTO)
          if (data.retailsDTO) {
            setRetailListing(data.retailsDTO);
            setloader(false);
          } else {
            setloader(false);
          }
        });
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
          getSchoolData(data.SchoolId)
          if (data.StudentIds.length > 0) {

            getOrganisationLogo(data.OrganizationGuid)
          }
        });
      getData()
      registerForPushNotificationsAsync();
    }, [])
  );

  function getSchoolData(SchoolId) {
    fetch(`${apiUrl}/odata/SchoolData(${SchoolId})`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAnnouncements(data.MobileAnnouncement)
      });
  }
  async function getData() {
    try {
      const value = await AsyncStorage.getItem("studentGuid");
      setStudentGuid(value)
    } catch (e) { }

  }

  const getOrganisationLogo = (organizationGuids) => {
    fetch(`${apiUrl}/public/OrganizationLogo?guid=${organizationGuids}`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.text())
      .then((data) => {

        if (data !== '') {
          setOrganizationLogo(data)
        }
      });
  }
  const storeData = async (value, title) => {
    let eventId = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      props.navigation.navigate("Product Details");
    } catch (e) {
    }
  };
  const storeDataClass = async (value, title, img) => {

    let eventId = JSON.stringify(value);
    try {
      let thresholdString = threshold.toString()
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      if (img != null) {
        await AsyncStorage.setItem("classThumb", img);
      }
      else {
        await AsyncStorage.setItem("classThumb", '');
      }
      await AsyncStorage.setItem("threshold", thresholdString);
      props.navigation.navigate("Class Tasks");
    } catch (e) {
    }
  };
  const data = [
    {
      rating: "4.9",
      title: "Kids Master Karate",
      text: "06 Months",
    },
    {
      rating: "4.8",
      title: "Kids Master Karate",
      text: "03 Months",
    },
    {
      rating: "4.7",
      title: "Kids Master Karate",
      text: "05 Months",
    },
  ];
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  const fetchClasses = () => {

    fetch(`${apiUrl}odata/ActiveClass`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.value) {
          setloader(false);
          setClassListings(data.value);
        } else {
          setloader(false);
        }
      });
  }
  function getStudents() {
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
        setPersonId(data.PersonId)
        setStudentIds([]);
        if (data.StudentIds.length > 0) {
          var students = data.StudentIds.length;
          setTotalStudent(data.StudentIds.length)
          setStudentIds([]);
          data.StudentIds.map((id, index) => {
            fetch(`${apiUrl}/odata/StudentData(${id})`, {
              method: "get",
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
              },
            })
              .then((response) => response.json())
              .then((data) => {
                if (studentIds.length <= students) {
                  let dataArray = { label: data.FirstName + " " + data.LastName, value: data.StudentId }
                  setStudentData((prevState) => [...prevState, data]);
                  uniqueStudent.push(dataArray)
                  let uniquestudentList = [...new Map(uniqueStudent.map(item =>
                    [item[key], item])).values()];
                  setStudentIds(uniquestudentList);

                }
              });
          });
        }
      });
  }
  const checkinActiveClass = () => {
    setSuccessMessage('')
    setErrorMessage('')
    if (selectedStudent == '') {
      setErrorMessage('Please Select Student')
      return false
    }
    let studentName = '';
    let studentEmail = '';
    studentData.map(function (student, index) {
      if (selectedStudent == student.StudentId) {
        studentName = student.FirstName + ' ' + student.LastName
        studentEmail = student.Email
      }

    })
    setLoaderMessage(true)
    fetch(`${apiUrl}/odata/StudentAttendance`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: JSON.stringify({
        "StudentId": selectedStudent,
        "StudentName": studentName,
        "StudentEmail": studentEmail,
        "TaskId": selectedTaskId,
        "CheckInTime": selectedCheckinTime
      }),
    }).then((response) => response.json())
      .then((response) => {
        setLoaderMessage(false)
        if (!response["odata.error"]) {
          setSuccessMessage(studentName + " has successfully checked In")
          setTimeout(function () {
            setSelectedStudent([])
            setSuccessMessage('')
          }, 2000);

        }
        else {
          setErrorMessage(response["odata.error"].message.value)
        }


      })
      .catch((response) => {
        setLoaderMessage(false)
        setTimeout(function () {
          fetchClasses()
          setTogglePopup(false)
        }, 2000);
      });
  }
  const activeCheckin = (selectedCheckintime, selectetaskIn, className) => {
    setSelectedStudent([])
    setTogglePopup(true);
    setSelectedCheckinTime(selectedCheckintime)
    setSelectedTaskId(selectetaskIn);
    setSelectedTaskName(className)
    setErrorMessage('')
    setSuccessMessage('')
  }


  const { navigation } = props;
  const SLIDER_WIDTH = Dimensions.get("window").width + 60;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const CarouselCardItem = ({ item, index }) => {
    return (
      <ImageBackground
        style={[
          globalStyle.slider,
          {
            width: "100%",
            height: 180,
            justifyContent: "center",
          },
        ]}
        source={require("./../../../assets/sliderbg.png")}
        resizeMode={"stretch"}
      >
        <TouchableOpacity onPress={() => storeDataClass(item.ClassId, item.Name, item.ImagePhotoPath)}>
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <Image source={require("./../../../assets/karate.png")} style={{ height: 60, width: 60, marginRight: 15 }} />
            <View style={{ flexShrink: 1 }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "bold",
                  color: "#fff",
                  paddingBottom: 10,
                  flexShrink: 1
                }}
              >
                {item.Name}
              </Text>
              <Text style={{ fontSize: 18, color: "#fff" }}>Reserve Class > </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ImageBackground>
    );
  };

  const CarouselCardItemActiveClass = ({ item, index }) => {
    let starttime = moment(item.ClassStartTime).format("MM-DD-YYYY, hh:mm a ");
    let classDate = moment(item.ClassStartTime).format("YYYY-MM-DD");
    var GivenDate = classDate;
    var CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0)
    GivenDate = new Date(GivenDate);
    return (

      <View style={{ marginBottom: 10 }} key={index}>
        <View >
          <View style={globalStyle.eventsListingWrapper}>
            <View style={globalStyle.eventsListingTopWrapper}>
              <View style={{ paddingLeft: 0, paddingRight: 10, flexShrink: 1 }}>
                <Text style={{ fontSize: 22, fontWeight: "bold", color: "#555", lineHeight: 26, marginBottom: 10, flexShrink: 1 }}>
                  {item.ClassName}
                </Text>

                <Text style={{ fontSize: 18, color: "#555", lineHeight: 26 }}>
                  <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>Class Start Time: </Text>
                  {starttime}
                </Text>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                  <Button
                    style={{ alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 }}
                    onPress={() => activeCheckin(item.ClassStartTime, item.TaskId, item.ClassName)
                    }
                  >
                    <Text style={loginStyle.buttonText, { textAlign: "center", color: "#fff" }}>Check In</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View>
      <SideBarMenu title={"Home"} navigation={props.navigation} />
      <ScrollView style={{marginBottom:150}}>
        {announcements != '' ?
          <View style={{ fontFamily: 'Poppins', display: "flex", fontSize: 14, color: "#777", textAlign: "center", justifyContent: "center", backgroundColor: "#eee", padding: 8 }}>
            <TextTicker
              style={{ fontSize: 14 }}
              duration={25000}
              loop
              bounce
              repeatSpacer={50}
            >
              {announcements}
            
            </TextTicker>
          </View>
          : null}
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) :
          <View padder>

            <View style={{ display: "flex", marginTop: 30, padding: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 24, paddingTop:10 }}>Classes</Text>
              <Image
                source={{
                  uri: "data:image/png;base64," + organizationLogo,
                }}
                //source={require("./../../../../assets/img1.png")}
                style={{ height: 80, width: 80, resizeMode: 'contain' }} />
            </View>
            <View
              style={{
                marginLeft: -70,
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              {typeof classListings !== "undefined" && classListings.length > 0 ?
                <Carousel
                  ref={isCarousel}
                  data={classListings}
                  renderItem={CarouselCardItemActiveClass}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  useScrollView={false}
                /> :
                <Carousel
                  ref={isCarousel}
                  data={classListing}
                  renderItem={CarouselCardItem}
                  sliderWidth={SLIDER_WIDTH}
                  itemWidth={ITEM_WIDTH}
                  useScrollView={false}
                />
              }
            </View>
            <View style={{ display: "flex", paddingLeft: 5, paddingRight: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  fontSize: 24,
                  marginBottom: 15,
                  paddingTop:10
                }}
              >
                Events
              </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Events")}><Text>View all > </Text></TouchableOpacity>
            </View>
            {typeof eventListing !== "undefined" && eventListing.length > 0 ? (
              eventListing.map(function (event, index) {
                let startDate = moment(event.EventStartDateTime).format("MMMM Do, YYYY");
                let starttime = moment(event.EventStartDateTime).format("hh:mm a ");
                let endtime = moment(event.EventEndDateTime).format("hh:mm a ");
                return (
                  index <= 4 && studentGuid
                    ? <View style={{ marginBottom: 10 }} key={index}>
                      <TouchableOpacity
                        onPress={() => openLink(apiUrl + '/Public/EventDetails/' + event.OrganizationEventGuid + '?StudentAccountGuid=' + studentGuid)}
                      // onPress={() => storeData(event.PosItemId, event.Title)}
                      >
                        {/* <Text> {apiUrl + '/Public/EventDetails/' + event.OrganizationEventGuid + '?StudentAccountGuid=' + studentGuid}</Text> */}
                        <View style={globalStyle.eventsListingWrapper}>
                          <View style={globalStyle.eventsListingTopWrapper}>
                            <View style={{ borderRadius: 25, overflow: "hidden" }}>
                              {event.ThumbnailImageBase64 != null ?
                                <Image
                                  source={{
                                    uri: "data:image/png;base64," + event.ThumbnailImageBase64,
                                  }}
                                  style={{ height: 110, width: 130, resizeMode: 'contain' }} />
                                :
                                <Image
                                  source={require("./../../../assets/img1.png")}
                                  style={{ height: 110, width: 130 }} />
                              }
                            </View>
                            <View style={{ paddingLeft: 15, paddingRight: 10, flexShrink: 1 }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: "bold",
                                  color: "#16161D",
                                  paddingBottom: 10,
                                  flexShrink: 1
                                }}
                              >
                                {event.EventTitle}
                              </Text>

                              <Text style={{ fontSize: 16, color: "#555" }}>{startDate} </Text>
                              <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>
                                {starttime} -{endtime}
                              </Text>
                            </View>
                          </View>
                          <View style={globalStyle.eventsListingBottomWrapper}>
                            <Text style={{ fontSize: 12, color: "#46454B", justifyContent: "flex-end" }}> ${event.Price}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    : null
                );
              })
            ) : (
              <View style={globalStyle.tableList}>
                <Text>No Events Available </Text>
              </View>
            )}
            <View style={{ display: "flex", paddingLeft: 5, paddingRight: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text
                style={{
                  marginTop: 10,
                  fontWeight: "bold",
                  fontSize: 24,
                  marginBottom: 15,
                  paddingTop:10
                }}
              >
                Products
              </Text>
              <TouchableOpacity onPress={() => props.navigation.navigate("Retail")}><Text>View all > </Text></TouchableOpacity>
            </View>
            {typeof retailListing !== "undefined" && retailListing.length > 0 ? (
              retailListing.map(function (event, index) {
                return (
                  index <= 4
                    ?
                    <View style={{ marginBottom: 10 }} key={index}>
                      <TouchableOpacity onPress={() => storeData(event.PosItemId, event.Title)}>
                        <View style={globalStyle.eventsListingWrapper}>
                          <View style={globalStyle.eventsListingTopWrapper}>
                            <View style={{ borderRadius: 25, overflow: "hidden" }}>
                              {event.ThumbnailImageBase64 != null ?
                                <Image
                                  source={{
                                    uri: "data:image/png;base64," + event.ThumbnailImageBase64,
                                  }}
                                  style={{ height: 110, width: 130, resizeMode: 'contain' }} />
                                :
                                <Image
                                  source={require("./../../../assets/retails.jpg")}
                                  style={{ height: 110, width: 130 }} />
                              }
                              {/* <Image source={require("./../../../assets/retails.jpg")} style={{ height: 110, width: 130, resizeMode: 'contain' }} /> */}
                            </View>
                            <View style={{ paddingLeft: 15, paddingRight: 10, flexShrink: 1 }}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  fontWeight: "bold",
                                  color: "#16161D",
                                  paddingBottom: 10,
                                  flexShrink: 1
                                }}
                              >
                                {event.Title}
                              </Text>

                              <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Sizes:

                                {event.Sizes.map(function (size, index) {
                                  return (
                                    <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {size}
                                      {index < event.Sizes.length - 1 ? ',' : null
                                      } </Text>
                                  )
                                })}

                              </Text>
                              <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Colors:

                                {event.Colors.map(function (colors, index) {
                                  return (
                                    <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {colors}
                                      {index < event.Colors.length - 1 ? ',' : null
                                      } </Text>
                                  )
                                })}

                              </Text>
                              <Text
                                style={{
                                  fontSize: 15,
                                  color: "#44454A",
                                  marginTop: 8,
                                  paddingTop: 2,
                                  paddingLeft: 8,
                                  paddingRight: 8,
                                  paddingBottom: 2,
                                  backgroundColor: "#E9ECF1",
                                  alignSelf: "flex-start",
                                  borderRadius: 15,
                                }}
                              >
                                {event.IsAvailable ?
                                  'Available' : " Out of stock"}
                              </Text>
                            </View>
                          </View>
                          <View style={[globalStyle.eventsListingBottomWrapper, { "flexDirection": "row", justifyContent: "flex-end" }]}>
                            <Text style={{ fontSize: 12, color: "#46454B", alignSelf: "flex-end", justifyContent: "flex-end" }}> ${event.Price}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                    : null
                );
              })
            ) : (
              <View style={globalStyle.tableList}>
                <Text>No Products Available </Text>
              </View>
            )}

          </View  >
        }
        {togglePopup ?
          <View style={globalStyle.popup}>
            <View style={globalStyle.eventsListingWrapper}>
              <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                {selectedTaskName}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Class Start Time:
                <Text style={{ fontSize: 18, fontWeight: "normal", color: "#555", paddingLeft: 10, lineHeight: 26, marginBottom: 10 }}>
                  {moment(selectedCheckinTime).format("MM-DD-YYYY, hh:mm a ")}
                </Text> </Text>
              <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Select Student</Text>
              <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                {studentIds.length > 0 && studentIds.length != undefined ?
                  <RNPickerSelect
                    value={selectedStudent}
                    items={studentIds}
                    placeholder={placeholderStudent}
                    onValueChange={(value) => { setSelectedStudent(value), setErrorMessage('') }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: Platform.OS === "android" ? 20 : 30,
                        right: 10,
                      },
                      placeholder: {
                        color: "#8a898e",
                        fontSize: 12,
                        fontWeight: "bold",
                      },
                    }}
                    Icon={() => {
                      return (
                        <Image
                          style={{
                            width: 12,
                            position: "absolute",
                            top: Platform.OS === "android" ? -15 : -28,
                            right: 5,
                          }}
                          source={require("../../../assets/arrow-down.png")}
                          resizeMode={"contain"}
                        />
                      );
                    }}
                  />
                  : null}
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                <Button
                  style={{ alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 }}
                  onPress={() => checkinActiveClass()
                  } >
                  <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check In</Text>
                </Button>

                <Button
                  style={[{ alignSelf: "center", width: '48%', justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6, marginLeft: 18 }]}
                  onPress={() => setTogglePopup(false)}
                >
                  <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Close</Text>
                </Button>
              </View>
              <View style={{ padding: 15 }}>
                {loaderMessage ? (
                  <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#29ABE2" />
                  </View>
                ) : null}
                {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
                {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
              </View>
            </View>
          </View>
          : null}
      </ScrollView>
      <FooterTabs navigation={props.navigation} />
    </View>
    
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
