import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../footer/Footer";
import { SideBarMenu } from "../sidebar";
import globalStyle from "../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { API_URL } from "./../Utility/AppConst";
import { useFocusEffect } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
const apiUrl = API_URL.trim();
const Home = (props) => {
  const isCarousel = React.useRef(null);
  const [loader, setloader] = React.useState(true);
  const userId = useSelector((state) => state);
  const [eventListing, setEventListing] = React.useState([]);
  const [classListing, setClassListing] = React.useState([]);
  const [retailListing, setRetailListing] = React.useState([]);
  const [threshold, setThreshold] = React.useState('');
  const [studentGuid, setStudentGuid] = React.useState('');
  useFocusEffect(
    //navigation.addListener("focus", () => {
    React.useCallback(() => {
      
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
            //   console.log(data.events)
            // setEventList(data.events)
            // setloader(false);
          } else {
            // setloader(false);
          }
        });
      fetch(`${apiUrl}/odata/OrganizationClass`, {
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
          setThreshold(data.threshold)
          if (data.classes) {
            var classes = [];
            data.classes.map(function (event, index) {
              if (index <= 5) {
                classes.push(event)
              }
            })
            setClassListing(classes);
            // setloader(false);
          } else {
            // setloader(false);
          }
        });
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
          setloader(false);
          if (data.retails) {
            setRetailListing(data.retails);
            setloader(false);
          } else {
            setloader(false);
          }
        });
        getData()
      //   });
      // });
    }, [])
  );
  async function getData() {
    try {
      const value = await AsyncStorage.getItem("studentGuid");
      setStudentGuid(value)
    } catch (e) { }

  }
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
  const storeDataClass = async (value, title) => {
    console.log(value);
    let eventId = JSON.stringify(value);
    // console.log(eventId);
    try {
      let thresholdString = threshold.toString()
      await AsyncStorage.setItem("eventId", eventId);
      await AsyncStorage.setItem("eventTitle", title);
      await AsyncStorage.setItem("threshold", thresholdString);
      props.navigation.navigate("Class Tasks");
    } catch (e) {
      // saving error
    }
  };
  const data = [
    {
      rating: "4.9",
      title: "Kids Master Karate",
      text: "06 Months",
    },
    {
      rating: "4.8",
      title: "Kids Master Karate",
      text: "03 Months",
    },
    {
      rating: "4.7",
      title: "Kids Master Karate",
      text: "05 Months",
    },
  ];
  const openLink = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
};
  const { navigation } = props;
  const SLIDER_WIDTH = Dimensions.get("window").width + 60;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const CarouselCardItem = ({ item, index }) => {
    return (
      <ImageBackground
        style={[
          globalStyle.slider,
          {
            width: "100%",
            height: 180,
            justifyContent: "center",
          },
        ]}
        source={require("./../../../assets/sliderbg.png")}
        resizeMode={"stretch"}
      >
        <TouchableOpacity onPress={() => storeDataClass(item.ClassId, item.Name)}>
          <View style={globalStyle.sliderWrapper}>
            <Text style={{ fontSize: 18, color: "#333", marginRight: 5 }}>4.8</Text>
            <Image source={require("./../../../assets/star.png")} style={{ height: 20, width: 20 }} />
          </View>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: "#fff",
              paddingBottom: 10,
            }}
          >
            {item.Name}
          </Text>
          <Text style={{ fontSize: 18, color: "#fff" }}>{Math.floor(threshold / 7)} Weeks </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  };
  return (
    <Container>
      <SideBarMenu title={"Home"} navigation={props.navigation} />

      {loader ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#29ABE2" />
        </View>
      ) :
        <Content padder>
          <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>Classes</Text>
          <View
            style={{
              marginLeft: -70,
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Carousel
              ref={isCarousel}
              data={classListing}
              renderItem={CarouselCardItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              useScrollView={false}
            />
          </View>
          <View style={{ display: "flex", paddingLeft: 5, paddingRight: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 24,
                marginBottom: 15,
              }}
            >
              Events
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Events")}><Text>View all > </Text></TouchableOpacity>
          </View>
          {typeof eventListing !== "undefined" && eventListing.length > 0 ? (
            eventListing.map(function (event, index) {
              let startDate = moment(event.EventStartDateTime).format("MMMM Do, YYYY");
              let starttime = moment(event.EventStartDateTime).format("hh:mm a ");
              let endtime = moment(event.EventEndDateTime).format("hh:mm a ");
              return (
                index <= 4
                  ? <View style={{ marginBottom: 10 }} key={index}>
                    <TouchableOpacity 
                     onPress={() => openLink('https://mmasmastermind.azurewebsites.net/Public/EventDetails/'+ event.OrganizationEventGuid+'?StudentAccountGuid='+ studentGuid)}
                   // onPress={() => storeData(event.PosItemId, event.Title)}
                    >
                      <View style={globalStyle.eventsListingWrapper}>
                        <View style={globalStyle.eventsListingTopWrapper}>
                          <View style={{ borderRadius: 25, overflow: "hidden" }}>
                            <Image source={require("./../../../assets/img1.png")} style={{ height: 110, width: 130 }} />
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
                          {/* <Text style={{ fontSize: 12, color: "#46454B", flex: 1 }}>61 People Purchased</Text> */}
                          <Text style={{ fontSize: 12, color: "#46454B", justifyContent: "flex-end" }}> ${event.Price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  : null
              );
            })
          ) : (
            <View style={globalStyle.tableList}>
              <Text>No Events Available </Text>
            </View>
          )}
          <View style={{ display: "flex", paddingLeft: 5, paddingRight: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
            <Text
              style={{
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 24,
                marginBottom: 15,
              }}
            >
              Products
            </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Retail")}><Text>View all > </Text></TouchableOpacity>
          </View>
          {typeof retailListing !== "undefined" && retailListing.length > 0 ? (
            retailListing.map(function (event, index) {
              return (
                index <= 4
                  ?
                  <View style={{ marginBottom: 10 }} key={index}>
                    <TouchableOpacity onPress={() => storeData(event.PosItemId, event.Title)}>
                      <View style={globalStyle.eventsListingWrapper}>
                        <View style={globalStyle.eventsListingTopWrapper}>
                          <View style={{ borderRadius: 25, overflow: "hidden" }}>
                            <Image source={require("./../../../assets/retails.jpg")} style={{ height: 110, width: 130 }} />
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
                                  <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {size}
                                    {index < event.Sizes.length - 1 ? ',' : null
                                    } </Text>
                                )
                              })}

                            </Text>
                            <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold" }}>Colors:

                              {event.Colors.map(function (colors, index) {
                                return (
                                  <Text key={index} style={{ fontSize: 16, color: "#555", fontWeight: "normal" }}> {colors}
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
                          <Text style={{ fontSize: 12, color: "#46454B", alignSelf: "flex-end", justifyContent: "flex-end" }}> ${event.Price}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  : null
              );
            })
          ) : (
            <View style={globalStyle.tableList}>
              <Text>No Products Available </Text>
            </View>
          )}
        </Content>
      }
  <FooterTabs navigation={props.navigation}  />
    </Container>
  );
};
export default Home;
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
