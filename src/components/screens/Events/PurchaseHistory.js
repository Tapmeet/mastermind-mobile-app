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
import _ from "lodash";
const apiUrl = API_URL.trim();
var eventsList = [];
var filterList = [
  { label: "Last 30 days", value: "30" },
  { label: "Last 60 days", value: "60" },
  { label: "Last 90 days", value: "90" },
  { label: "Last 180 days", value: "180" },
  { label: "Purchase Type - Event", value: "Event" },
  { label: "Purchase Type - Retail", value: "Retail" },
];
var uniqueStudent = [];
const key = "value";
const EventOrdersListing = (props) => {
  const [loader, setloader] = React.useState(true);
  const [filterLoader, setfilterLoader] = React.useState(false);
  const userId = useSelector((state) => state);
  const [personId, setPersonId] = React.useState("");
  const [studentIds, setStudentIds] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [eventListing, setEventListing] = React.useState([]);
  const [eventsList, setEventList] = React.useState([]);
  const [filter, setFilter] = React.useState();
  const [selectedStudent, setSelectedStudent] = React.useState();
  function getStudents() {
    if (studentIds.length <= 0) {
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
          setPersonId(data.PersonId);
          setStudentIds([]);
          if (data.StudentIds.length > 0) {
            var students = data.StudentIds.length;
            setTotalStudent(data.StudentIds.length);
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
                    let dataArray = { label: "History by student - " + data.FirstName + " " + data.LastName, value: data.StudentId };
                    let dataArray2 = { label: data.FirstName + " " + data.LastName, value: data.StudentId };
                    //setStudentIds((prevState) => [...prevState, dataArray]);
                    uniqueStudent.push(dataArray2);
                    filterList.push(dataArray);
                    let uniquestudentList = [...new Map(uniqueStudent.map((item) => [item[key], item])).values()];
                    filterList = [...new Map(filterList.map((item) => [item[key], item])).values()];
                    setStudentIds(uniquestudentList);
                    setloader(false);
                  }
                });
            });
          }
        });
    }
  }
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setloader(true);
      setStudentIds([]);
      setEventListing([]);
      setEventList([]);
      setSelectedStudent("");
      if (eventListing.length <= 0) {
        getEvents();
      }
    });
  });
  function getEvents() {
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
        if (data.orders) {
          setEventListing(data.orders);
          setEventList(data.orders);
          if (loader == true) {
            getStudents();
          }
          setloader(false);
        } else {
          setloader(false);
        }
      });
  }
  const placeholderFiler = {
    label: "Filter By",
  };
  const placeholderStudent = {
    label: "History By Student",
  };
  const setfilter = (value) => {
    setfilterLoader(true);
    if (value != undefined) {
      setfilterLoader(true);
      setFilter(value);
      if (value == "30") {
        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 30);
        console.log(fromDate);
        console.log(toDate);
        // var fromDate = new Date(date.getFullYear(), date.getMonth() - 20, 1);
        toDate.setDate(fromDate.getDate());
        //console.log(toDate)
        const eventlisting = eventsList.filter((item) => {
          return new Date(item.DateCreated).getTime() >= fromDate.getTime() && new Date(item.DateCreated).getTime() <= toDate.getTime();
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else if (value == "60") {
        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 60);
        console.log(fromDate);
        // var fromDate = new Date(date.getFullYear(), date.getMonth() - 20, 1);
        toDate.setDate(fromDate.getDate());
        console.log(toDate);
        const eventlisting = eventsList.filter((item) => {
          return new Date(item.DateCreated).getTime() >= fromDate.getTime() && new Date(item.DateCreated).getTime() <= toDate.getTime();
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else if (value == "90") {
        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 90);
        console.log(fromDate);
        // var fromDate = new Date(date.getFullYear(), date.getMonth() - 20, 1);
        toDate.setDate(fromDate.getDate());
        console.log(toDate);
        const eventlisting = eventsList.filter((item) => {
          return new Date(item.DateCreated).getTime() >= fromDate.getTime() && new Date(item.DateCreated).getTime() <= toDate.getTime();
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else if (value == "180") {
        var toDate = new Date();
        var fromDate = new Date();
        fromDate.setDate(fromDate.getDate() - 180);
        console.log(fromDate);
        // var fromDate = new Date(date.getFullYear(), date.getMonth() - 20, 1);
        toDate.setDate(fromDate.getDate());
        console.log(toDate);
        const eventlisting = eventsList.filter((item) => {
          return new Date(item.DateCreated).getTime() >= fromDate.getTime() && new Date(item.DateCreated).getTime() <= toDate.getTime();
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else if (value == "Event") {
        const eventlisting = eventsList.filter((item) => {
          return item.PurchaseType == "Event";
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else if (value == "Retail") {
        const eventlisting = eventsList.filter((item) => {
          return item.PurchaseType == "Retail";
        });
        if (selectedStudent != "") {
          const newArray = eventlisting.filter((item) => {
            return item.LinkedStudentIds.indexOf(selectedStudent) >= 0;
          });
          setEventListing(newArray);
        } else {
          setEventListing(eventlisting);
        }
        setTimeout(function () {
          setfilterLoader(false);
        }, 300);
      } else {
        const newArray = eventsList.filter((item) => {
          return item.LinkedStudentIds.indexOf(value) >= 0;
        });
        if (newArray.length > 0) {
          setEventListing(newArray);
          setTimeout(function () {
            setfilterLoader(false);
          }, 300);
        }
      }
    } else {
      setFilter("");
      setTimeout(function () {
        setfilterLoader(false);
      }, 100);
      setEventListing(eventsList);
    }
  };
  const { navigation } = props;
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={" Purchase History"} navigation={props.navigation} />
      <View style={[globalStyle.flexStandard, { padding: 10, display: "flex", alignItems: "center", justifyContent: "center" }]}>
        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
          {studentIds.length > 0 ? (
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
          ) : null}
        </View>
      </View>
      <Content padder style={{ marginTop: 10 }}>
        {filterLoader || loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.DateCreated).format("MMM Do, YYYY");
            let starttime = moment(event.DateCreated).format("hh:mm a ");
            var studentDetail = [];
            var unique = [];
            var uniqueStudents = [];
            const key = "value";
            uniqueStudents = [...new Map(studentIds.map((item) => [item[key], item])).values()];
            event.LinkedStudentIds.map(function (studentid, index) {
              uniqueStudents.map(function (student, indexs) {
                if (student.value == studentid) {
                  studentDetail.push(student);
                }
              });
              unique = [...new Map(studentDetail.map((item) => [item[key], item])).values()];
            });
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                <View style={globalStyle.eventsListingWrapper}>
                  <View style={globalStyle.eventsListingTopWrapper}>
                    <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                      <View
                        style={{
                          display: "flex",
                          position: "relative",
                          alignItems: "flex-end",
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "84%",
                          borderBottomColor: "#f4f4f4",
                          paddingBottom: 10,
                          marginBottom: 20,
                          borderBottomWidth: 2,
                        }}
                      >
                        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000" }}>${event.TotalPrice}</Text>
                        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000" }}>{startDate}</Text>
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
                        {unique.map(function (student, indexs) {
                          return (
                            <Text
                              key={indexs}
                              style={{
                                fontSize: 16,
                                fontWeight: "600",
                                color: "#898989",
                                marginBottom: 5,
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: 16,
                                  fontWeight: "600",
                                  color: "#333",
                                }}
                              >
                                Student:{" "}
                              </Text>
                              {student.label}{" "}
                            </Text>
                          );
                        })}
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#898989",
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          Order Id:{" "}
                        </Text>
                        {event.PosOrderId}{" "}
                      </Text>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: "#898989",
                          marginBottom: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          Purchase Type:{" "}
                        </Text>
                        {event.PurchaseType}{" "}
                      </Text>
                      {event.Quantity != "0" ? (
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#898989",
                            marginBottom: 5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: "600",
                              color: "#333",
                            }}
                          >
                            {event.PurchaseType == "Event" ? (event.Quantity > 1 ? "Bookings:" : "Booking") : "Quantity:"}{" "}
                          </Text>
                          {event.Quantity}{" "}
                        </Text>
                      ) : null}

                      {event.Size ? (
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          Size: {event.Size}
                        </Text>
                      ) : null}
                      {event.Colors ? (
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: "#333",
                          }}
                        >
                          Color: {event.Colors}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={globalStyle.tableList}>
            <Text>No Purchase History </Text>
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
    minWidth: 180,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    width: "100%",
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 180,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    width: "100%",
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
