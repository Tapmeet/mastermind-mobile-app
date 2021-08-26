import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Accordion } from "native-base";
import { Image, ImageBackground, Dimensions } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { AntDesign, Entypo } from "@expo/vector-icons";

// const dataArray = [
//   { title: "About", content: "Lorem ipsum dolor sit amet Hello" },
//   { title: "Trainers", content: "Lorem ipsum dolor sit amet" },
//   { title: "Event Itinerary", content: "Lorem ipsum dolor sit amet" },
//   { title: "Terms & Conditions", content: "Lorem ipsum dolor sit amet" },
// ];

const EventDetails = (props) => {
  // const _renderHeader = (item, expanded) => {
  //   debugger;
  //   return (
  //     <View
  //       style={{
  //         flexDirection: "row",
  //         padding: 10,
  //         justifyContent: "space-between",
  //         alignItems: "center",
  //         backgroundColor: "#A9DAD6",
  //       }}
  //     >
  //       <Text style={{ fontWeight: "600" }}> {item.title} Hello</Text>
  //       {expanded ? <Icon style={{ fontSize: 18 }} name="remove-circle" /> : <Icon style={{ fontSize: 18 }} name="add-circle" />}
  //     </View>
  //   );
  // };

  // const _renderContent = (item) => {
  //   debugger;
  //   return (
  //     <Text
  //       style={{
  //         backgroundColor: "#e3f1f1",
  //         padding: 10,
  //         fontStyle: "italic",
  //       }}
  //     >
  //       {item.content}
  //     </Text>
  //   );
  // };

  return (
    <Container
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <SideBarMenu title={"Event Detail"} navigation={props.navigation} />
      <Content>
        <Image source={require("./../../../../assets/eventImage.png")} style={{ width: "100%", height: 220 }} />
        <View style={{ margin: 15, marginTop: 25 }}>
          <Title style={{ justifyContent: "flex-start", textAlign: "left", fontSize: 20 }}>Kids Karate Workshop</Title>
          <View style={{ paddingLeft: 5, marginTop: 10, paddingBottom: 10, marginBottom: 25, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
            <View style={globalStyle.eventDetailLocations}>
              <AntDesign name="calendar" size={18} color="black" style={{ marginRight: 10 }} />
              <Text>Aug 12, 2021 | 05:00 - 07:00 PM</Text>
            </View>
            <View style={globalStyle.eventDetailLocations}>
              <Entypo name="location-pin" size={25} color="black" style={{ marginRight: 5, marginLeft: -2, marginTop: -3 }} />
              <Text>200 Old Carriage Drive, Kitchener, Ontario</Text>
            </View>
          </View>
          {/* <Accordion dataArray={dataArray} animation={true} expanded={true} renderHeader={_renderHeader} renderContent={_renderContent} /> */}
        </View>
      </Content>
      <FooterTabs />
    </Container>
  );
};

export default EventDetails;
