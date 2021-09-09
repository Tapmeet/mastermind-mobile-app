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
import { flex } from "styled-system";
const apiUrl = API_URL.trim();
const EventOrdersListing = (props) => {
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
      setloader(true)
      fetch(`${apiUrl}/odata/PurchaseOfSale`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
        //  console.log(data)
          if (data.orders) {
            setEventListing(data.orders);
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
    console.log(eventId);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      props.navigation.navigate("Event Detail");
    } catch (e) {
      // saving error
    }
  };
  const { navigation } = props;
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Orders"} navigation={props.navigation} />
      <View style={globalStyle.flexStandard}>
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
          {eventListing.length} Orders
        </Text>
      </View>
      <Content padder style={{ marginTop: 10 }}>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            let startDate = moment(event.DateCreated).format("MMMM Do, YYYY");
            let starttime = moment(event.DateCreated).format("hh:mm a ");
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                <View style={globalStyle.eventsListingWrapper}>
                  <View style={globalStyle.eventsListingTopWrapper}>
                    <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "bold",
                          color: "#16161D",
                          paddingBottom: 10,
                        }}
                      >
                        {event.purchaseTitle}
                      </Text>
                      <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}><Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>Order Id:  </Text>{event.PosOrderId} </Text>
                      <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}><Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>Order Date:  </Text>{startDate} </Text>
                      <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}><Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>BuyerName:  </Text>{event.BuyerName} </Text>
                      <Text style={{ fontSize: 16, color: "#555", marginBottom: 5 }}><Text style={{ fontSize: 16, color: "#000", fontWeight: "bold" }}>{event.PaymentTypeId != 2 ? 'Card Number: ' : "Account: "}</Text> XXXX-XXXX-XXXX- {event.Last4Digits} </Text>

                    </View>
                  </View>
                  <View style={globalStyle.eventsListingBottomWrapper}>
                    <Text style={{ fontSize: 16, paddingLeft: 15, color: "#46454B", justifyContent: "flex-end" }}><Text style={{ fontSize: 18, color: "#000", fontWeight: "bold" }}>Total Price :  </Text> ${event.TotalPrice}</Text>
                  </View>
                </View>
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
export default EventOrdersListing;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 105,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 105,
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
