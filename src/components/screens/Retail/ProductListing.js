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
const ProductListing = (props) => {
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
      fetch(`${apiUrl}/odata/OrganizationRetail`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + userId[0].access_Token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.retails) {
            setEventListing(data.retails);
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
      props.navigation.navigate("Product Details");
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
      <SideBarMenu title={"Retail"} navigation={props.navigation} />
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
          {eventListing.length} Products
        </Text>
        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
          <RNPickerSelect
            value={filter}
            items={filterList}
            placeholder={placeholderFiler}
            onValueChange={(value) => setFilter(value)}
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
            return (
              <View style={{ marginBottom: 10 }} key={index}>
                <TouchableOpacity onPress={() => storeData(event.PosItemId)}>
                  <View style={globalStyle.eventsListingWrapper}>
                    <View style={globalStyle.eventsListingTopWrapper}>
                      <View style={{ borderRadius: 25, overflow: "hidden" }}>
                        <Image source={require("./../../../../assets/retails.jpg")} style={{ height: 110, width: 130 }} />
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

                        <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Sizes:

                          {event.Sizes.map(function (size, index) {
                            return (
                              <Text style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {size}
                                {index < event.Sizes.length - 1 ? ',' : null
                                } </Text>
                            )
                          })}

                        </Text>
                        <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Colors:

                          {event.Colors.map(function (colors, index) {
                            return (
                              <Text style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {colors}
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
                      <Text style={{ fontSize: 12, color: "#46454B", alignSelf:"flex-end", justifyContent: "flex-end" }}> ${event.Price}</Text>
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
export default ProductListing;
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
