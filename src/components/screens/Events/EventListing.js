import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
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
import { flex } from "styled-system";
const apiUrl = API_URL.trim();
const EventListing = (props) => {
  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [eventListing, setEventListing] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const filterList = [
    { label: "Popular", value: "Popular" },
    { label: "By Price", value: "By Price" },
    { label: "Latest", value: "Latest" },
  ];
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      fetch(`${apiUrl}/odata/OrganizationEvent`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.events) {
            setEventListing(data.events);
            setloader(false);
          } else {
            setloader(false);
          }
        });
    });
  });
  const placeholderFiler = {
    label: "Filter",
  };
  const storeData = async (value) => {
    console.log(value);
    let eventId = JSON.stringify(value);
    // console.log(eventId);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      props.navigation.navigate("Event Detail");
    } catch (e) {
      // saving error
    }
  };
  const setfilter = (value) => {
    setFilter(value);
    if (value == 'low') {
      eventListing.sort((a, b) => parseFloat(a.Price) - parseFloat(b.Price));
    }
    else if (value == 'high') {
      eventListing.sort((a, b) => parseFloat(b.Price) - parseFloat(a.Price));
    }
    else if (value == 'recently') {
      eventListing.sort((a, b) => parseFloat(b.OrganizationRetailId) - parseFloat(a.OrganizationRetailId));
    }
  }
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
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            paddingLeft: 15,
            backgroundColor: "white",
            flex: 1,
          }}
        >
          {eventListing.length} Events
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
      <Content padder>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.StartDateTime).format("MMMM Do, YYYY");
            let starttime = moment(event.StartDateTime).format("hh:mm a ");
            let endtime = moment(event.EndDateTime).format("hh:mm a ");
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                <TouchableOpacity onPress={() => storeData(event.PosItemId)}>
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
                          {event.Title}
                        </Text>

                        <Text style={{ fontSize: 16, color: "#555" }}>{startDate} </Text>
                        <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>
                          {starttime} -{endtime}
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
                          Online
                        </Text>
                      </View>
                    </View>
                    <View style={globalStyle.eventsListingBottomWrapper}>
                      <Text style={{ fontSize: 12, color: "#46454B", flex: 1 }}>61 People Purchased</Text>
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
      <FooterTabs />
    </Container>
  );
};
export default EventListing;
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
