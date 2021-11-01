import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Accordion } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import loginStyle from "../../../style/login/loginStyle";
import { fontSize } from "styled-system";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import moment from 'moment';
import { set } from "react-native-reanimated";
const apiUrl = API_URL.trim();
const EventDetails = (props) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [eventid, setEventid] = React.useState('');
  const userId = useSelector((state) => state);
  const [personId, setPersonId] = React.useState('');
  const [studentIds, setStudentIds] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [student, setStudent] = React.useState();
  const [loader, setloader] = React.useState(true);
  const [eventListing, setEventListing] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [step1, setStep1] = React.useState(false);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed2(true);
    setCollapsed3(true);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
    setCollapsed3(true);
    setCollapsed(true);
  };
  const toggleExpanded3 = () => {
    setCollapsed2(true);
    setCollapsed(true);
    setCollapsed3(!collapsed3);
  };
  const toggleExpanded4 = () => {
    setCollapsed2(true);
    setCollapsed(true);
    setCollapsed3(true);
    setCollapsed4(!collapsed4);
  };


  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setSelectedStudent([])
      setStep1(false)
      setShowModal(false)
      if (eventListing == "") {
        async function getData() {
          try {
            await AsyncStorage.removeItem('studentIds')
            const value = await AsyncStorage.getItem("eventId");
            setEventid(value)
            //  console.log(value)
          } catch (e) { }
        }
        getData();
        if (loader == true) {
          getStudents()
        }
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
            //  console.log(data.events)
            if (data.events) {
              //console.log(data.events)
              setEventListing(data.events)
              setloader(false);
            } else {
              setloader(false);
            }
          });

      }
    });
  }, [eventListing]);
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
                  setStudentIds((prevState) => [...prevState, dataArray]);
                  setloader(false)
                }
              });
          });

        }
      });
  }
  const toggle = async (value, price) => {
    console.log('here')
    if (value != undefined) {
      setShowModal(!showModal)
      let eventId = JSON.stringify(value);
      let eventPrice = JSON.stringify(price);

      //console.log(eventId)
      try {
        await AsyncStorage.setItem("eventId", eventId);
        await AsyncStorage.setItem("eventPrice", eventPrice);

      } catch (e) {
        // saving error
      }
    }

  }
  function unique(array) {
    return array.filter(function (el, index, arr) {
      return index == arr.indexOf(el);
    });
  }
  const purchase = async () => {
    try {
      const studentarray = unique(selectedStudent)
      let stringyfy = JSON.stringify(studentarray);
      await AsyncStorage.setItem("studentIds", stringyfy);
      props.navigation.navigate("Purchase Event");
    } catch (e) {
      // saving error
    }

  };
  const setselectedStudent = (value) => {
    if (value != '') {
      setStudent(value);
    }
  };
  const addStudent = () => {
    setSelectedStudent((prevState) => [...prevState, student]);
    setStep1(true)
  };

  const { navigation } = props;
  const placeholderStudent = {
    label: "Select Student",
  };


  return (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <SideBarMenu title={"Event Detail"} navigation={props.navigation} />
      {loader ? (
        <Content>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        </Content>
      ) : (
        typeof eventListing !== "undefined" &&
          eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.StartDateTime).format("MMMM Do, YYYY");
            let starttime = moment(event.StartDateTime).format("hh:mm a ");
            let endtime = moment(event.EndDateTime).format("hh:mm a ");
            //console.log(event)
            return (
              event.PosItemId == eventid ?
                <Content key={index}>
                  <Image source={require("./../../../../assets/eventImage.png")} style={{ width: "100%", height: 220 }} />
                  <View style={{ margin: 15, marginTop: 25 }}>
                    <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Title>
                    <View style={{ paddingLeft: 5, marginTop: 10, paddingBottom: 10, marginBottom: 25, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
                      <View style={globalStyle.eventDetailLocations}>
                        <AntDesign name="calendar" size={18} color="black" style={{ marginRight: 10 }} />
                        <Text>{startDate} | {starttime} -{endtime}</Text>
                      </View>
                      <View style={globalStyle.eventDetailLocations}>
                        <Entypo name="location-pin" size={25} color="black" style={{ marginRight: 5, marginLeft: -2, marginTop: -3 }} />
                        <Text>{event.Location}</Text>
                      </View>
                    </View>
                    <TouchableOpacity onPress={() => { toggleExpanded() }}>
                      <View style={globalStyle.accordianStyle}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 22,
                            marginBottom: 0,
                            fontWeight: "bold",
                          }}
                        >
                          About
                        </Text>
                        {collapsed ? (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/down-arrow.png")}
                            resizeMode={"contain"}
                          />
                        ) : (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/up-arrow.png")}
                            resizeMode={"contain"}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed} align="center">
                      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                        <Text style={globalStyle.p}>{event.Description}</Text>
                      </View>
                    </Collapsible>
                    <TouchableOpacity onPress={() => { toggleExpanded2() }}>
                      <View style={globalStyle.accordianStyle}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 22,
                            marginBottom: 0,
                            fontWeight: "bold",
                          }}
                        >
                          Trainers
                        </Text>
                        {collapsed2 ? (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/down-arrow.png")}
                            resizeMode={"contain"}
                          />
                        ) : (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/up-arrow.png")}
                            resizeMode={"contain"}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed2} align="center">
                      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 25, alignItems: "center", display: "flex", flexDirection: "row" }}>
                          <Image
                            style={globalStyle.trainersimg}
                            source={require("./../../../../assets/person1.png")}
                            resizeMode={"contain"}
                          />
                          <View style={{ paddingLeft: 15 }}>
                            <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 22, paddingBottom: 5, color: "#000", fontWeight: "bold" }}>Johnathan William</Title>
                            <Text style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 22, color: "#222", fontWeight: "600" }}>Black Belt</Text>
                          </View>
                        </View>
                        <View style={{ paddingLeft: 10, paddingRight: 10, marginBottom: 25, alignItems: "center", display: "flex", flexDirection: "row" }}>
                          <Image
                            style={globalStyle.trainersimg}
                            source={require("./../../../../assets/person2.png")}
                            resizeMode={"contain"}
                          />
                          <View style={{ paddingLeft: 15 }}>
                            <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 22, paddingBottom: 5, color: "#000", fontWeight: "bold" }}>Michell Richardson</Title>
                            <Text style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 22, color: "#222", fontWeight: "600" }}>Shaolin Matrial Arts</Text>
                          </View>
                        </View>
                      </View>
                    </Collapsible>
                    <TouchableOpacity onPress={() => { toggleExpanded3() }}>
                      <View style={globalStyle.accordianStyle}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 22,
                            marginBottom: 0,
                            fontWeight: "bold",
                          }}
                        >
                          Event Itinerary
                        </Text>
                        {collapsed2 ? (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/down-arrow.png")}
                            resizeMode={"contain"}
                          />
                        ) : (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/up-arrow.png")}
                            resizeMode={"contain"}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed3} align="center">
                      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                        <Text style={globalStyle.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</Text>
                      </View>
                    </Collapsible>
                    <TouchableOpacity onPress={() => { toggleExpanded4() }}>
                      <View style={globalStyle.accordianStyle}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 22,
                            marginBottom: 0,
                            fontWeight: "bold",
                          }}
                        >
                          Terms & Conditions
                        </Text>
                        {collapsed4 ? (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/down-arrow.png")}
                            resizeMode={"contain"}
                          />
                        ) : (
                          <Image
                            style={globalStyle.arrows}
                            source={require("./../../../../assets/up-arrow.png")}
                            resizeMode={"contain"}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                    <Collapsible collapsed={collapsed4} align="center">
                      <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                        <Text style={globalStyle.p}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.</Text>
                      </View>
                    </Collapsible>
                    {event.HasPaymentOption ?
                      <View style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 20,
                        paddingBottom: 20
                      }}>
                        <Text style={{ color: "#1873e8", fontSize: 24, fontWeight: "bold" }}>${event.Price}</Text>
                        <TouchableOpacity style={globalStyle.purchaseBtn} onPress={() => toggle(event.PosItemId, event.Price)} >
                          <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, paddingBottom: 15, paddingLeft: 30, paddingRight: 30, paddingTop: 15, fontSize: 22, fontWeight: "bold", borderRadius: 15 }}>Purchase</Text>
                        </TouchableOpacity>
                      </View>
                      : null
                    }
                  </View>
                </Content>
                : null
            );
          })
        ) : null
      )}

      <FooterTabs />
      {showModal ?
        <View style={{ position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", height: windowHeight, width: windowWidth, top: 0, bottom: 0, left: 0, right: 0, display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
          <View style={{ width: "90%", minHeight: 300, backgroundColor: "#fff", padding: 15 }}>
            {selectedStudent != undefined && selectedStudent.length > 0 ?
              <Text style={globalStyle.p}>Would you like to register another student for this event?</Text>
              : <Text style={globalStyle.p}>Which student would you like to register?</Text>
            }
            {step1 ?
              <View style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "space-between", marginTop: 20, flexDirection: "row", width: "100%" }}>
                <TouchableOpacity style={{ width: "45%" }}
                  onPress={() => { setStep1(false); setStudent('') }}
                >
                  <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, textAlign: "center", marginTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, paddingTop: 15, fontSize: 18, fontWeight: "bold", borderRadius: 15 }}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: "45%" }}
                  onPress={() => purchase()}
                >
                  <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, textAlign: "center", marginTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, paddingTop: 15, fontSize: 18, fontWeight: "bold", borderRadius: 15 }}>No</Text>
                </TouchableOpacity>
              </View> :
              <View style={{ borderColor: "#ccc", borderWidth: 1, marginTop: 20, borderRadius: 5 }}>
                <RNPickerSelect
                  value={student}
                  items={studentIds}
                  placeholder={placeholderStudent}
                  onValueChange={(value) => setselectedStudent(value)}
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
                        source={require("../../../../assets/arrow-down.png")}
                        resizeMode={"contain"}
                      />
                    );
                  }}
                />
              </View>
            }
            {!step1 ?
              <View style={{ display: "flex", textAlign: "center", alignItems: "center", justifyContent: "center", flexDirection: "row", width: "100%" }}>
                <TouchableOpacity style={{ width: "50%" }}
                  onPress={() => addStudent()}
                >
                  <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, textAlign: "center", marginTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, paddingTop: 15, fontSize: 18, fontWeight: "bold", borderRadius: 15 }}>Register</Text>
                </TouchableOpacity>
              </View>
              : null}
          </View>

        </View>
        : null}
    </Container>
  );
};

export default EventDetails;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 122,
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
    minWidth: 122,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
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