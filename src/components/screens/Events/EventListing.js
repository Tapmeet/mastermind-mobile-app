import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";
import Dropdown from "./../../../common-functions/checkbox";

const EventListing = (props) => {
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Events"} navigation={props.navigation} />
      <View style={globalStyle.flexStandard}>
        <Text
          style={{
            paddingTop: 10,
            fontWeight: "bold",
            fontSize: 24,
            paddingLeft: 15,
            paddingBottom: 10,
            backgroundColor: "white",
            flex: 1,
          }}
        >
          254 Events
        </Text>
        {/* <Text style={{ color: "#46454B", justifyContent: "flex-end", paddingRight: 20, alignSelf: "center" }}>
          <Dropdown />
        </Text> */}
      </View>
      <Content
        padder
        style={{
          marginTop: 10,
        }}
      >
        <View style={{ marginBottom: 30 }}>
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
                  Kids Karate Workshop
                </Text>
                <Text style={{ fontSize: 16, color: "#555" }}>May 12, 2021</Text>
                <Text style={{ fontSize: 16, color: "#555", marginTop: 5 }}>05:00 - 07:00 PM</Text>
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
              <Text style={{ fontSize: 12, color: "#46454B", justifyContent: "flex-end" }}>$32.00</Text>
            </View>
          </View>
        </View>
      </Content>
      <FooterTabs />
    </Container>
  );
};
export default EventListing;
