import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import Dropdown from "../../../common-functions/checkbox";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { API_URL } from "../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { flex, marginBottom } from "styled-system";
const apiUrl = API_URL.trim();
var eventsList = [];
const EventOrdersListing = (props) => {
  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [personId, setPersonId] = React.useState('');
  const [studentIds, setStudentIds] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [eventListing, setEventListing] = React.useState([]);
  const [eventsList, setEventList] = React.useState([]);
  const [filter, setFilter] = React.useState();
  const filterList = [
    { label: "Last Week", value: "week" },
    { label: "Last Month", value: "month" },
    { label: "Last 6 Months", value: "6" },
    { label: "Purchase Type - Event", value: "Event" },
    { label: "Purchase Type - Retail", value: "Retail" },
  ];
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
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setloader(true)
      if (loader == true) {
        getStudents()
      }
      fetch(`${apiUrl}/odata/PurchaseOfSale`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data')
          console.log(data)
          console.log('data end')
          if (data.orders) {
            setEventListing(data.orders);
            setEventList(data.orders);
            setloader(false);
          } else {
            setloader(false);
          }
        });
    });
  });
  const placeholderFiler = {
    label: "Filter By",
  };
  // const storeData = async (value) => {
  //   console.log(value);
  //   let eventId = JSON.stringify(value);
  //   console.log(eventId);
  //   try {
  //     await AsyncStorage.setItem("eventId", eventId);
  //     props.navigation.navigate("Event Detail");
  //   } catch (e) {
  //     // saving error
  //   }
  // };
  const setfilter = (value) => {
    setFilter(value);
    if (value == 'week') {
      var d = new Date();
      var fromDate = d.setTime(d.getTime() - (d.getDay() ? d.getDay() : 7) * 24 * 60 * 60 * 1000);
      var toDate = d.setTime(d.getTime() - 6 * 24 * 60 * 60 * 1000);
      const eventlisting = eventsList.filter((item) => {
        return new Date(item.DateCreated).getTime() >= fromDate &&
          new Date(item.DateCreated).getTime() <= toDate;
      });
      console.log(eventlisting)
      setEventListing(eventlisting);
    }
    else if (value == 'month') {
      var date = new Date();
      var fromDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      var toDate = new Date(date.getFullYear(), date.getMonth(), 0);
      const eventlisting = eventsList.filter((item) => {
        if (new Date(item.DateCreated).getTime() >= fromDate.getTime() &&
          new Date(item.DateCreated).getTime() <= toDate.getTime()) {
          return item
        }
      });
      console.log(eventlisting)
      setEventListing(eventlisting);
    }
    else if (value == '6') {
      var date = new Date();
      var fromDate = new Date(date.getFullYear(), date.getMonth() - 6, 1);
      var toDate = new Date(date.getFullYear(), date.getMonth(), 0);
      const eventlisting = eventsList.filter((item) => {
        return new Date(item.DateCreated).getTime() >= fromDate &&
          new Date(item.DateCreated).getTime() <= toDate;
      });
      setEventListing(eventlisting);
    }
    else if(value == 'Event'){
      const eventlisting = eventsList.filter((item) => {
        return item.PurchaseType == 'Event'
      });
      setEventListing(eventlisting);
    }
    else if(value == 'Retail'){
      const eventlisting = eventsList.filter((item) => {
        return item.PurchaseType == 'Retail'
      });
      setEventListing(eventlisting);
    }
    else {
      setEventListing(eventsList);
    }
  }
  const { navigation } = props;
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={" Purchase History"} navigation={props.navigation} />
      <View style={[globalStyle.flexStandard, { display: "flex", alignItems: "center" }]}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            paddingLeft: 15,
            paddingTop: 15,
            backgroundColor: "white",
            flex: 1,
            paddingBottom: 15
          }}
        >
          Purchase History
        </Text>
        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
          <RNPickerSelect
            value={filter}
            items={filterList}
            placeholder={placeholderFiler}
            onValueChange={(value) => setfilter(value)}
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
                    top: Platform.OS === "android" ? -20 : -28,
                    right: 5,
                  }}
                  source={require("../../../../assets/arrow-down.png")}
                  resizeMode={"contain"}
                />
              );
            }}
          />
        </View>
      </View>
      <Content padder style={{ marginTop: 10 }}>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.DateCreated).format("MMM Do, YYYY");
            let starttime = moment(event.DateCreated).format("hh:mm a ");
            //console.log(event.Quantity)
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                <View style={globalStyle.eventsListingWrapper}>
                  <View style={globalStyle.eventsListingTopWrapper}>
                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                      <View style={{ display: "flex", position: "relative", alignItems: "flex-end", justifyContent: "space-between", flexDirection: "row", width: "84%", borderBottomColor: "#f4f4f4", paddingBottom: 10, marginBottom: 20, borderBottomWidth: 2 }}>
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000", }}>
                          ${event.TotalPrice}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", }}>
                          {startDate}
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#898989",
                          paddingBottom: 10,
                        }}
                      >
                        {event.purchaseTitle}
                      </Text>
                      <View>
                        {
                          studentIds.map(function (student, index) {
                            return (
                              student.value == event.LinkedStudentIds[0] ?
                                (<Text  key={index} style={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "#898989", marginBottom: 5
                                }}><Text style={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "#333",
                                }}>Student: </Text>{student.label} </Text>)
                                : null
                            )
                          })
                        }
                      </View>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#898989", marginBottom: 5
                      }}><Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#333",
                      }}>Order Id: </Text>{event.PosOrderId} </Text>
                      <Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#898989", marginBottom: 5
                      }}><Text style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: "#333",
                      }}>Purchase Type: </Text>{event.PurchaseType} </Text>
                      {event.Quantity != '0' ?
                        <Text style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#898989", marginBottom: 5
                        }}><Text style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#333",
                        }}>Quantity: </Text>{event.Quantity} </Text>
                        : null}
                      <View
                        style={[
                          globalStyle.flexStandard,
                          {
                            flexDirection: "row",
                            paddingTop: 15,
                            paddingBottom: 5,
                            justifyContent: "space-between",
                            width: '100%'
                          },
                        ]}
                      >
                        {event.Size ?
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              color: "#898989",
                              paddingBottom: 5,
                              width: "50%"
                            }}
                          >
                            Size:  {event.Size}
                          </Text>
                          : null}
                        {event.Colors ?
                          <Text
                            style={{
                              fontSize: 18,
                              fontWeight: "600",
                              color: "#898989",
                              paddingBottom: 5,
                              width: "50%",
                              textAlign: "right"
                            }}
                          >
                            Color: {event.Colors}
                          </Text>
                          : null}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={globalStyle.tableList}>
            <Text>No Purchase History  </Text>
          </View>
        )}
      </Content>
      <FooterTabs />
    </Container>
  );
};
export default EventOrdersListing;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 135,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 135,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 10, // to ensure the text is never behind the icon
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
