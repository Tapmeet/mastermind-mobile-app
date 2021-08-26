import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View } from "native-base";
import { Image, ImageBackground, Dimensions } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import Carousel from "react-native-snap-carousel";

const EventDetails = (props) => {
  return (
    <Container
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <SideBarMenu title={"Event Detail"} navigation={props.navigation} />
      <Content>
        <Image source={require("./../../../../assets/eventImage.png")} style={{ width: "100%", height: 220 }} />
        <View style={{ margin: 15, marginTop: 25 }}>
          <Title style={{justifyContent: "flex-start", textAlign: "left", fontSize: 20}}>Kids Karate Workshop</Title>
          <Text><Icon name="menu" /></Text>
        </View>
      </Content>
      <FooterTabs />
    </Container>
  );
};
export default EventDetails;
