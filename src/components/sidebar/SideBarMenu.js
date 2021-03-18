import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";
import React from "react";
  const SideBarMenu = (props) => {
    return (
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.toggleDrawer()}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{props.title}</Title>
        </Body>
        <Right />
      </Header>
    )
}
export default SideBarMenu;