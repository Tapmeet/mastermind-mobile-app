import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View } from "native-base";
import { Image, ImageBackground, Dimensions } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";

const EventListing = (props) => {
  const SLIDER_WIDTH = Dimensions.get("window").width + 60;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Events"} navigation={props.navigation} />
      <Text
        style={{
          paddingTop: 10,
          fontWeight: "bold",
          fontSize: 24,
          paddingLeft: 15,
          paddingBottom: 10,
          backgroundColor: "white",
        }}
      >
        254 Events
      </Text>
      <Content
        padder
        style={{
          marginTop: 10,
        }}
      >
        <View style={{ marginBottom: 30 }}>
          <View style={globalStyle.homeEvents}>
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
            </View>
          </View>
          <View style={globalStyle.homeEvents}>
            <View style={{ borderRadius: 25, overflow: "hidden" }}>
              <Image source={require("./../../../../assets/img2.png")} style={{ height: 110, width: 130 }} />
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
            </View>
          </View>
          <View style={globalStyle.homeEvents}>
            <View style={{ borderRadius: 25, overflow: "hidden" }}>
              <Image source={require("./../../../../assets/img3.png")} style={{ height: 110, width: 130 }} />
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
            </View>
          </View>
          <View style={globalStyle.homeEvents}>
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
            </View>
          </View>
        </View>
      </Content>
      <FooterTabs />
    </Container>
  );
};
export default EventListing;
