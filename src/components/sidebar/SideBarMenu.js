import { Header, Left, Button, Icon, Body, Title, Right, Text, View } from "native-base";
import React from "react";
import { ImageBackground, Image } from "react-native";
import globalStyle from "../../style/globalStyle";
const SideBarMenu = (props) => {
  const [navmenuLink, setNavmenuLink] = React.useState("");
  React.useEffect(() => {
    setNavmenuLink(props.title);

  });
  return (
    <ImageBackground
      style={{
        height: Platform.OS === "android" ? 60 : 110,
        zIndex: 999999,
        position: "relative"
      }}
      source={require("./../../../assets/bgtop.png")}
      resizeMode={"stretch"}
    >
      <Header style={globalStyle.barStylings}>
        <Left>
          { props.title != "Home" ?

            <View style={{ display: "flex", flexDirection: "row", width: 80, alignItems: "center" }}>
              <Image
                style={{
                  width: 12,
                  marginRight: 2,

                }}
                source={require('./../../../assets/prev2.png')}
                resizeMode={'contain'}
              />
              <Text
                style={[globalStyle.titleStyling, { fontSize: 15 }]}
                onPress={props.backLink != undefined ? () => props.navigation.navigate(props.backLink) : () => props.navigation.goBack()}
              >Back </Text>

            </View>
            : null
          }
        </Left>
         <View style={[globalStyle.titleBody]}> 
          <Title>
            <Text style={globalStyle.titleStyling}>{props.title}</Text>
          </Title>
        </View>
        <Right>

          <Button transparent onPress={() => props.navigation.toggleDrawer()}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/TopMenu.png")} />
          </Button>

        </Right>
      </Header>
    </ImageBackground>
  );
};
export default SideBarMenu;
