import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon } from "native-base";
import { ImageBackground, Image } from "react-native";
import globalStyle from "../../style/globalStyle";
import { LinearGradient } from "expo-linear-gradient";

const FooterTabs = (props) => {
  return (
    <ImageBackground
      style={{
        height: 70,
      }}
      source={require("./../../../assets/bgBottom.png")}
      resizeMode={"stretch"}
    >
      <Footer style={globalStyle.barStyling}>
        <FooterTab style={[globalStyle.barStyling, { paddingBottom: 10, paddingTop: 10 }]}>
          <Button onPress={() => props.navigation.navigate("Home")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/home.png")} />
          </Button>
          <Button onPress={() => props.navigation.navigate("Class Reservation")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/calendar.png")} />
          </Button>
          <Button onPress={() => props.navigation.navigate("Share")}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/share-footer.png")} />
          </Button>
        </FooterTab>
      </Footer>
    </ImageBackground>
  );
};
export default FooterTabs;
