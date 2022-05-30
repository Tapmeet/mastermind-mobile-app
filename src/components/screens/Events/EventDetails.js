import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Accordion } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import CartWidget from "./Cartwidget"
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import loginStyle from "../../../style/login/loginStyle";
import { fontSize } from "styled-system";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import moment from 'moment';
import { color } from "react-native-reanimated";
import { ADD_TO_EVENT, UPDATE_EVENT } from "./../../../redux/Event";

const apiUrl = API_URL.trim();
var sizeList = [];
var colorList = [];
const EventDetails = (props) => {
  const [selectedMessage, setSelectedMessage] = React.useState(false);
  const [eventid, setEventid] = React.useState('');
  const [productTitle, setProductTitle] = React.useState('');
  const userId = useSelector((state) => state);
  const retail = useSelector((state) => state);
  const [studentIds, setStudentIds] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  
  const [selectedStudentName, setselectedStudentName] = React.useState('');
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [retailProducts, setRetailProducts] = React.useState([]);
  const [personId, setPersonId] = React.useState('');
  const [loader, setloader] = React.useState(true);
  const [eventListing, setEventListing] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const dispatch = useDispatch();
  const userRetail = (userEvent) =>
    dispatch({ type: "ADD_TO_EVENT", payload: userEvent });
  const updateRetail = (updateEvent) =>
    dispatch({ type: "UPDATE_EVENT", payload: updateEvent });
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
      setProductTitle('');
      if (retail.eventReducer.length > 0) {
        setRetailProducts(retail.eventReducer);
      }
      if (eventListing == "") {
        async function getData() {
          try {
            const value = await AsyncStorage.getItem("eventId");
            const title = await AsyncStorage.getItem("eventTitle");
            setEventid(value)
            setProductTitle(title)
          } catch (e) { }
        }
        getData();
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
  const storeData = async (value, price) => {
    setSelectedMessage(false);
    if (selectedStudent == undefined) {
      Alert.alert(" Alert",
        "Please select student",
        [{
          text: 'Ok',
          style: 'cancel',
        },]);
      return false
    }
    let eventPrice = JSON.stringify(price);
    let retails = retail.eventReducer;
    if (retails.length > 0) {
      var productindex = '';
      var productquantity = '';
      retails.map(function (product, index) {
        if (product.id == eventid && product.studentIds[0] == selectedStudent) {
          productindex = index;
        }
      })
      if (productindex === '') {
        setSelectedMessage(false);
        
        let dataArray = {
          id: eventid,
          studentIds: [selectedStudent],
          eventPrice: eventPrice,
          productTitle: productTitle,
        };
        
        setRetailProducts((prevState) => [...prevState, dataArray]);
      
        userRetail({
          id: eventid,
          studentIds: [selectedStudent],
          eventPrice: eventPrice,
          productTitle: productTitle,
        });
        setSelectedStudent([])
      }
      else {
        let studentName = '';
        studentIds.map(function (student, index) {
            if (selectedStudent == student.value) {
                studentName = student.label 
            }

        })
        setselectedStudentName(studentName)
        setSelectedMessage(true);
      }

    } else {
      setRetailProducts([{
        id: eventid,
        studentIds: [selectedStudent],
        eventPrice: eventPrice,
        productTitle: productTitle,
      }])
      userRetail({
        id: eventid,
        studentIds: [selectedStudent],
        eventPrice: eventPrice,
        productTitle: productTitle,
      });
      setSelectedStudent([])
    }
  };
  const placeholderStudent = {
    label: "Select Student",
  };
  const { navigation } = props;
  return (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <SideBarMenu title={"Event Details"} navigation={props.navigation} />
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
            return (
              event.PosItemId == eventid ?
                <Content key={index}>
                  <Image source={require("./../../../../assets/retails.jpg")} style={{ width: "100%", height: 220 }} />
                  <View style={{ margin: 15, marginTop: 25 }}>
                    <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Title>
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
                          Schedule
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
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Register Student</Text>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                      <RNPickerSelect
                        value={selectedStudent}
                        items={studentIds}
                        placeholder={placeholderStudent}
                        onValueChange={(value) => {setSelectedStudent(value), setSelectedMessage(false)}}
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
                    <View>
                      {selectedMessage != "" ? (
                        <Text style={[globalStyle.sucessText,{ color: "#ff0000", lineHeight: 25}]}>
                          You've have already registered {selectedStudentName}.  Please select a different student or view cart to complete purchase.
                        </Text>
                      ) : null}
                    </View>
                    {event.HasPaymentOption ?
                      <View style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 40,
                        paddingBottom: 20
                      }}>
                        <Text style={{ color: "#1873e8", fontSize: 24, fontWeight: "bold" }}>${event.Price}  </Text>
                        <TouchableOpacity style={globalStyle.purchaseBtn} onPress={() => storeData(event.PosItemId, event.Price)} >
                          <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, paddingBottom: 15, paddingLeft: 30, paddingRight: 30, paddingTop: 15, fontSize: 22, fontWeight: "bold", borderRadius: 15 }}>Add to cart</Text>
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
      <CartWidget navigation={props.navigation} />
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