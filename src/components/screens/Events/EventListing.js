
import { Image, RefreshControl, SafeAreaView, FlatList, ImageBackground, Dimensions, StyleSheet, TouchableOpacity,View, Text, ActivityIndicator } from "react-native";
import React from "react";
import CartWidget from "./Cartwidget"
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { API_URL } from "./../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";;
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
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getListings()
    wait(2000).then(() => setRefreshing(false));
  }, []);
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
      setRefreshing(false)
      getData()
      getListings()
    }, [])
  );
  const getListings = () => {
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
          setEventList(data.events)
          var category = [];
          data.events.map(function (event, index) {
            if (event.Category != '' && event.Category != null) {

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
  }

  const storeData = async (value, title) => {
    let eventId = JSON.stringify(value);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      props.navigation.navigate("Event Detail");
    } catch (e) {
    }
  };
  const setcategory = (value) => {

    if (value != undefined) {
      setSelectedCategory(value)
      var newArray = eventsList.filter(function (el) {
        return el.Category == value;
      });

      if (newArray.length > 0) {
        setEventListing(newArray);
      }
    } else {
      setSelectedCategory('')
      setEventListing(eventsList);
    }
  }
  const setfilter = (value) => {
    setFilter(value);
    setEventListing(eventsList);
    var eventlistings = eventsList;
  
    if (value == 'low') {
      eventlistings.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
      if (selectedCategory != '') {
        var newArray = eventlistings.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
      else{
        setEventListing(eventlistings);
      }
    }
    else if (value == 'high') {
     
      eventlistings.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
      if (selectedCategory != '') {
        var newArray = eventlistings.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
      else{
        setEventListing(eventlistings);
      }
    }
    else if (value == 'recently') {
     
      eventlistings.sort((a, b) => parseFloat(b.PosItemId) - parseFloat(a.PosItemId));
      if (selectedCategory != '') {
        var newArray = eventlistings.filter(function (el) {
          return el.Category == selectedCategory;
        });
        setEventListing(newArray);
      }
      else{
        setEventListing(eventlistings);
      }
      
    }
    else if (value == 'month') {
      var date = new Date();
      var fromDate = new Date(date.getFullYear(), date.getMonth(), 0);
      var toDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
      const eventlisting = eventsList.filter((item) => {
        if (new Date(item.EventStartDateTime).getTime() >= fromDate.getTime() &&
          new Date(item.EventStartDateTime).getTime() <= toDate.getTime()) {
          return item
        }
      });
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
    label: "Sort by",
  };
  const placeholderCategory = {
    label: "Category",
  };

  const { navigation } = props;
  return (
     <View
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Events"} navigation={props.navigation} />
      {eventsList.length > 1 ?
        <View
          style={[
            globalStyle.flexStandard,
            {
              paddingTop: 20,
              paddingBottom: 15,
            },
          ]}
        >
          <View style={{ display: "flex", justifyContent: "center", flexDirection: "row", width: "100%" }}>
            {typeof categoryList !== "undefined" &&
              categoryList.length > 0 ?
              <View style={{ borderColor: "#ccc", width: ' 45%', borderWidth: 1, marginRight: 10, borderRadius: 5, marginLeft: 10 }}>
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
                          top: Platform.OS === "android" ? -10 : -28,
                          right: Platform.OS === "android" ? 22 : 5,
                        }}
                        source={require("../../../../assets/arrow-down.png")}
                        resizeMode={"contain"}
                      />
                    );
                  }}
                />
              </View>
              : null}
            <View style={{ borderColor: "#ccc", width: ' 45%', borderWidth: 1, marginRight: 10, borderRadius: 5, }}>
            <RNPickerSelect
                value={filter}
                items={filterList}
                placeholder={placeholderFiler}
                onValueChange={(value) => setfilter(value)}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: Platform.OS === "android" ? 22 : 30,
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
                        top: Platform.OS === "android" ? -10 : -28,
                        right: Platform.OS === "android" ? 20 : 5,
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
        : null}
       <View padder>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 && studentGuid ? (
          <SafeAreaView style={{marginTop:10}} >
            <FlatList
              data={eventListing}
              refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
              renderItem={({ item, index, separators }) => (
                <View style={{ marginBottom: 10 }} key={index}>
                  {/* <TouchableOpacity onPress={() => storeData(event.PosItemId, event.Title)}> */}
                  <TouchableOpacity onPress={() => openLink('https://mmasmastermind.azurewebsites.net/Public/EventDetails/' + item.OrganizationEventGuid + '?StudentAccountGuid=' + studentGuid)} >
                    <View style={globalStyle.eventsListingWrapper}>
                      <View style={globalStyle.eventsListingTopWrapper}>
                        <View style={{ borderRadius: 25, overflow: "hidden" }}>
                          {typeof item.ThumbnailImageBase64 != null ?
                            <Image
                              source={{
                                uri: "data:image/png;base64," + item.ThumbnailImageBase64,
                              }}
                              style={{ height: 110, width: 130, resizeMode: "contain" }} />
                            :
                            <Image
                              source={require("./../../../../assets/img1.png")}
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
                              flexShrink: 1,
                              paddingTop:10
                            }}
                          >
                            {item.EventTitle}
                          </Text>

                          <Text style={{ fontSize: 16, color: "#555" }}>{moment(item.EventStartDateTime).format("MMMM Do, YYYY")} </Text>
                          <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>
                            {moment(item.EventStartDateTime).format("hh:mm a ")} -{moment(item.EventEndDateTime).format("hh:mm a ")}
                          </Text>
                        </View>
                      </View>
                      <View style={globalStyle.eventsListingBottomWrapper}>
                        <Text style={{ fontSize: 12, color: "#46454B", justifyContent: "flex-end" }}> ${item.Price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          </SafeAreaView>
        ) : (
          <View style={globalStyle.tableList}>
            <Text>No Events Available </Text>
          </View>
        )}
       </View  >
      <CartWidget navigation={props.navigation} />
     </View>
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
    minWidth: 170,
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
