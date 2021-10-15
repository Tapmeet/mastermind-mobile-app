import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Accordion } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
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
import { API_URL } from "../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import moment from 'moment';
import { color } from "react-native-reanimated";
const apiUrl = API_URL.trim();
const ProductDetails = (props) => {
  const [eventid, setEventid] = React.useState('');
  const [productTitle, setProductTitle] = React.useState('');
  const userId = useSelector((state) => state);
  const [loader, setloader] = React.useState(true);

  const [eventListing, setEventListing] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const [size, setSize] = React.useState('');
  const [colors, setColors] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
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
  const quanity = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
  ];

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      if (eventListing == "") {
        async function getData() {
          try {
            const value = await AsyncStorage.getItem("eventId");
            setEventid(value)
            //  console.log(value)
          } catch (e) { }
        }
        getData();

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
            //  console.log(data.events)
            if (data.retails) {
              //console.log(data.events)
              setEventListing(data.retails)
              setloader(false);
            } else {
              setloader(false);
            }
          });

      }
    });
  }, [eventListing]);
  const storeData = async (value, price) => {
    //  console.log(value)
    if (size == '') {
      Alert.alert(" Alert",
        "Please select Size",
        [{
          text: 'Ok',
          //onPress: () => //console.log('Cancel Pressed'),
          style: 'cancel',
        },]);
      return false
    }

    if (colors == '') {
      Alert.alert(" Alert",
        "Please select color",
        [{
          text: 'Ok',
          //onPress: () => //console.log('Cancel Pressed'),
          style: 'cancel',
        },]);
      return false
    }
    if (quantity == '') {
      Alert.alert(" Alert",
        "Please select quantity",
        [{
          text: 'Ok',
          //onPress: () => //console.log('Cancel Pressed'),
          style: 'cancel',
        },]);
      return false
    }
    let eventId = JSON.stringify(value);
    let eventPrice = JSON.stringify(price);
    //console.log(eventId)
    try {
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventPrice", eventPrice);
      await AsyncStorage.setItem("productTitle", productTitle);
      await AsyncStorage.setItem("size", size);
      await AsyncStorage.setItem("colors", colors);
      await AsyncStorage.setItem("quantity", quantity);
      props.navigation.navigate("Purchase Product");
    } catch (e) {
      // saving error
    }
  };
  const { navigation } = props;
  const placeholderQuantity = {
    label: "Select Quantity",
  };
  return (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <SideBarMenu title={"Product Detail"} navigation={props.navigation} />
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
            if (event.PosItemId == eventid) {

              var sizeList = [];
              var colorList = [];
              event.Sizes.map(function (size, index) {
                let data = { label: size, value: size }
                sizeList.push(data)
              })
              event.Colors.map(function (colors, index) {
                let data = { label: colors, value: colors }
                colorList.push(data)
              })
            }
            const placeholderColor = {
              label: "Select Colors",
            };
            const placeholderSize = {
              label: "Select Size",
            };
            if ((event.PosItemId == eventid) && productTitle == '') {

              setProductTitle(event.Title)
            }
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
                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Select Size</Text>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                      <RNPickerSelect
                        value={size}
                        items={sizeList}
                        placeholder={placeholderSize}
                        onValueChange={(value) => setSize(value)}
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
                    <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Select Colors</Text>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                      <RNPickerSelect
                        value={colors}
                        items={colorList}
                        placeholder={placeholderColor}
                        onValueChange={(value) => setColors(value)}
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
                    <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Select Quantity</Text>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                      <RNPickerSelect
                        value={quantity}
                        items={quanity}
                        placeholder={placeholderQuantity}
                        onValueChange={(value) => setQuantity(value)}
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
                    {event.IsAvailable ?
                      <View style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 40,
                        paddingBottom: 20
                      }}>
                        <Text style={{ color: "#1873e8", fontSize: 24, fontWeight: "bold" }}>${event.Price}</Text>
                        <TouchableOpacity style={globalStyle.purchaseBtn} onPress={() => storeData(event.PosItemId, event.Price)} >
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
    </Container>
  );
};

export default ProductDetails;
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