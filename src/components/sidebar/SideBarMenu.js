import { Header, Left, Button, Icon, Body, Title, Right, Text, View } from "native-base";
import React from "react";
import { ImageBackground, Image } from 'react-native';
import globalStyle from "../../style/globalStyle";
const SideBarMenu = (props) => {
  const [navmenuLink, setNavmenuLink] = React.useState("");
  React.useEffect(() => {
    setNavmenuLink(props.title);
  })
  return (
    <ImageBackground
      style={{
        height: Platform.OS === 'android' ? 60 : 110
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
        <Right>
          {navmenuLink != "Home" ?
            <View style={{display: "flex", flexDirection: "row", alignItems:"center"}}> 
              <Text
                style={[globalStyle.titleStyling, { fontSize: 15 }]}
                onPress={() => props.navigation.goBack()}
              >Back </Text>
              <Image
                style={{
                  width: 12
                }}
                source={require('./../../../assets/next.png')}
                resizeMode={'contain'}
              />
            </View>
            : null}

        </Right>
      </Header>
    </ImageBackground>
  )
}
export default SideBarMenu;