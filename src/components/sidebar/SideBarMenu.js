import { Header, Left, Button, Icon, Body, Title, Right, Text } from "native-base";
import React from "react";
import globalStyle from "../../style/globalStyle";
  const SideBarMenu = (props) => {
    return (
      <Header style={globalStyle.barStyling}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={globalStyle.titleBody}>
          <Title><Text style={globalStyle.titleStyling}>{props.title}</Text></Title>
        </Body>
        <Right />
      </Header>
    )
}
export default SideBarMenu;