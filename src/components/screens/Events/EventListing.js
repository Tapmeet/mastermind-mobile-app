import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import CartWidget from "./Cartwidget"
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import Dropdown from "./../../../common-functions/checkbox";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { API_URL } from "./../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { useFocusEffect } from '@react-navigation/native';
import { flex } from "styled-system";
import * as WebBrowser from 'expo-web-browser';
const apiUrl = API_URL.trim();
const EventListing = (props) => {
  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [eventListing, setEventListing] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const [eventsList, setEventList] = React.useState([]);
  const [categoryList, setCategoryList] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [studentGuid, setStudentGuid] = React.useState('');
  const filterList = [
    { label: "Recently Added", value: "recently" },
    { label: "Price High - Low", value: "high" },
    { label: "Price Low - High", value: "low" },
    { label: "This Month", value: "month" },
  ];
  function unique(array) {
    return array.filter(function (el, index, arr) {
      return index == arr.indexOf(el);
    });
  }
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
};
async function getData() {
  try {
    const value = await AsyncStorage.getItem("studentGuid");
    setStudentGuid(value)
  } catch (e) { }

}
  useFocusEffect( 
    React.useCallback(() => {
      setCategoryList([])
      setEventList([])
      setFilter([])
      setSelectedCategory([])
      setloader(true)
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
            // console.log(data.events)
            setEventList(data.events)
            var category = [];
            data.events.map(function (event, index) {
              if(event.Category != '' && event.Category  != null){
                
                category.push(event.Category)
              }
            })
            const uniqueArray = unique(category);
            var categorylist = [];
            uniqueArray.map(function (event, index) {
              categorylist.push({ label: event, value: event },)
            })
            setCategoryList(categorylist);
            setloader(false);

          } else {
            setloader(false);
          }
        });
      getData()
    }, [])
  );

  const storeData = async (value, title) => {
    //console.log(value);
    let eventId = JSON.stringify(value);
    // console.log(eventId);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      props.navigation.navigate("Event Detail");
    } catch (e) {
      // saving error
    }
  };
  const setcategory = (value) => {
  
    if ( value != undefined) {
      setSelectedCategory(value)
      var newArray = eventsList.filter(function (el) {
        return el.Category == value;
      });

      if (newArray.length > 0) {
        setEventListing(newArray);
      }
    } else {
      setEventListing(eventsList);
    }
  }
  const setfilter = (value) => {
    console.log(value)
    setFilter(value);
    setEventListing(eventsList);
    if (value == 'low') {
      eventListing.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
      if (selectedCategory != '') {
        var newArray = eventListing.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
    }
    else if (value == 'high') {

      eventListing.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
      if (selectedCategory != '') {
        var newArray = eventListing.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
    }
    else if (value == 'recently') {
      eventListing.sort((a, b) => parseFloat(b.PosItemId) - parseFloat(a.PosItemId));
      // console.log(selectedCategory);
      if (selectedCategory != '') {
        var newArray = eventListing.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
    }
    else if (value == 'month') {
      var date = new Date();
      var fromDate = new Date(date.getFullYear(), date.getMonth(), 0);
      var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const eventlisting = eventsList.filter((item) => {
        // console.log(new Date(item.EventStartDateTime).getTime())
        // console.log('from')
        // console.log(fromDate.getTime())
        // console.log('to')
        // console.log(toDate.getTime())
        // console.log(item)
        if (new Date(item.EventStartDateTime).getTime() >= fromDate.getTime() &&
          new Date(item.EventStartDateTime).getTime() <= toDate.getTime()) {
          return item
        }
      });
      //  console.log(eventlisting)
      if (selectedCategory != '') {
        var newArray = eventlisting.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      } else {
        setEventListing(eventlisting);
      }
    }
  }
  const placeholderFiler = {
    label: "Filter",
  };
  const placeholderCategory = {
    label: "Category",
  };

  const { navigation } = props;
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Events"} navigation={props.navigation} />
      <View
        style={[
          globalStyle.flexStandard,
          {
            paddingTop: 15,
            paddingBottom: 15,
          },
        ]}
      >
        <View style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
          <View style={{ borderColor: "#ccc", width:' 45%', borderWidth: 1, marginRight: 10, borderRadius: 5, marginLeft: 10 }}>
            <RNPickerSelect
              value={selectedCategory}
              items={categoryList}
              placeholder={placeholderCategory}
              onValueChange={(value) => setcategory(value)}
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
          <View style={{ borderColor: "#ccc",  width:' 45%', borderWidth: 1, marginRight: 10, borderRadius: 5, }}>
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
        </View>
      </View>
      <Content padder>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.EventStartDateTime).format("MMMM Do, YYYY");
            let starttime = moment(event.EventStartDateTime).format("hh:mm a ");
            let endtime = moment(event.EventEndDateTime).format("hh:mm a ");
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                {/* <TouchableOpacity onPress={() => storeData(event.PosItemId, event.Title)}> */}
                <TouchableOpacity  onPress={() => openLink('https://mmasmastermind.azurewebsites.net/Public/EventDetails/'+ event.OrganizationEventGuid+'?StudentAccountGuid='+ studentGuid)} >
                  <View style={globalStyle.eventsListingWrapper}>
                    <View style={globalStyle.eventsListingTopWrapper}>
                      <View style={{ borderRadius: 25, overflow: "hidden" }}>
                        <Image source={require("./../../../../assets/img1.png")} style={{ height: 110, width: 130 }} />
                      </View>
                      <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: "#16161D",
                            paddingBottom: 10,
                          }}
                        >
                          {event.EventTitle}
                        </Text>

                        <Text style={{ fontSize: 16, color: "#555" }}>{startDate} </Text>
                        <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>
                          {starttime} -{endtime}
                        </Text>
                        {/* <Text
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
                          Online
                        </Text> */}
                      </View>
                    </View>
                    <View style={globalStyle.eventsListingBottomWrapper}>
                      {/* <Text style={{ fontSize: 12, color: "#46454B", flex: 1 }}>61 People Purchased</Text> */}
                      <Text style={{ fontSize: 12, color: "#46454B", justifyContent: "flex-end" }}> ${event.Price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <View style={globalStyle.tableList}>
            <Text>No Events Available </Text>
          </View>
        )}
      </Content>
      {/*<FooterTabs navigation={props.navigation}  /> */}
      <CartWidget navigation={props.navigation} />
    </Container>
  );
};
export default EventListing;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    fontWeight: "bold",
    minWidth: 115,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
   width: "50%",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 12,
    width: "50%",
    fontWeight: "bold",
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
