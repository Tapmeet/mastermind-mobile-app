import { Header, Left, Button, Icon, Body, Title, Right, Text } from "native-base";
import React from "react";
import { ImageBackground, Image } from 'react-native';
import globalStyle from "../../style/globalStyle";
const SideBarMenu = (props) => {
  return (
    <ImageBackground
      style={{
        height: 80
      }}
      source={require('./../../../assets/bgtop.png')}
      resizeMode={'stretch'}
    >
      <Header style={globalStyle.barStylings}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.toggleDrawer()}>
            {/* <Icon name="menu" /> */}
            <Image style={{ height: 25, width: 25, resizeMode: 'contain', }} source={require('./../../../assets/TopMenu.png')} />
          </Button>
        </Left>
        <Body style={globalStyle.titleBody}>
          <Title><Text style={globalStyle.titleStyling}>{props.title}</Text></Title>
        </Body>
        <Right />
      </Header>
    </ImageBackground>
  )
}
export default SideBarMenu;