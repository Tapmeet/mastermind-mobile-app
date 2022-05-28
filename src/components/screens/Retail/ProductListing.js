import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, RefreshControl, SafeAreaView, Dimensions, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import Dropdown from "../../../common-functions/checkbox";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CartWidget from "../../cart/Cartwidget"
import { API_URL } from "../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { useFocusEffect } from '@react-navigation/native';
import { flex } from "styled-system";
const apiUrl = API_URL.trim();
const ProductListing = (props) => {

  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [eventListing, setEventListing] = React.useState([]);
  const [filter, setFilter] = React.useState([]);
  const filterList = [
    { label: "Recently Added", value: "recently" },
    { label: "Price High - Low", value: "high" },
    { label: "Price Low - High", value: "low" },
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    console.log("herer")
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);
  const getData = () => {
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
        // console.log(data)
        if (data.retails) {
          setEventListing(data.retails);
          setloader(false);
        } else {
          setloader(false);
        }
      });
  }
  useFocusEffect(
    //navigation.addListener("focus", () => {
    React.useCallback(() => {
      getData()
      //   });
      // });
    }, [])
  );
  const placeholderFiler = {
    label: "Sort by",
  };
  const storeData = async (value, title) => {
    console.log(value);
    let eventId = JSON.stringify(value);
    // console.log(eventId);
    try {
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      props.navigation.navigate("Product Details");
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
                    top: Platform.OS === "android" ? -10 : -28,
                    right: Platform.OS === "android" ? 8 : 5,
                  }}
                  source={require("../../../../assets/arrow-down.png")}
                  resizeMode={"contain"}
                />
              );
            }}
          />
        </View>
      </View>
      <SafeAreaView >
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (

          <FlatList
            data={eventListing}
            refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
            renderItem={({ item, index, separators }) => (
              <View style={{ margin: 10, marginBottom: 0 }} key={index}>
                <TouchableOpacity onPress={() => storeData(item.PosItemId, item.Title)}>
                  <View style={globalStyle.eventsListingWrapper}>
                    <View style={globalStyle.eventsListingTopWrapper}>
                      <View style={{ borderRadius: 25, overflow: "hidden" }}>
                        <Image source={require("./../../../../assets/retails.jpg")} style={{ height: 110, width: 130, resizeMode: "contain" }} />
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
                          {item.Title}
                        </Text>

                        <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Sizes:

                          {item.Sizes.map(function (size, index) {
                            return (
                              <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {size}
                                {index < item.Sizes.length - 1 ? ',' : null
                                } </Text>
                            )
                          })}

                        </Text>
                        <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Colors:

                          {item.Colors.map(function (colors, index) {
                            return (
                              <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {colors}
                                {index < item.Colors.length - 1 ? ',' : null
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
                          {item.IsAvailable ?
                            'Available' : " Out of stock"}
                        </Text>
                      </View>
                    </View>
                    <View style={[globalStyle.eventsListingBottomWrapper, { "flexDirection": "row", justifyContent: "flex-end" }]}>
                      <Text style={{ fontSize: 12, color: "#46454B", alignSelf: "flex-end", justifyContent: "flex-end" }}> ${item.Price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

        ) : (
          <View style={globalStyle.tableList}>
            <Text>No Events Available </Text>
          </View>
        )}
      </SafeAreaView>
      <View style={{ zIndex: 999, position: "absolute", width: "100%", left: 0, right: 0, bottom: 0 }}>
        <CartWidget navigation={props.navigation} />
      </View>
    </Container>
  );
};
export default ProductListing;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 130,
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
    minWidth: 130,
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
