import { Header, Left, Button, Icon, Body, Title, Right, Text, View } from "native-base";
import React from "react";
import { ImageBackground, Image } from "react-native";
import { justifyContent } from "styled-system";
import globalStyle from "../../style/globalStyle";
const SideBarMenu = (props) => {
  const [navmenuLink, setNavmenuLink] = React.useState("");
  React.useEffect(() => {
    setNavmenuLink(props.title);

  });
  return (
    <ImageBackground
      style={{
        height: Platform.OS === "android" ? 90 : 120,
        zIndex: 999999,
        position: "relative"
      }}
      source={require("./../../../assets/bgtop.png")}
      resizeMode={"stretch"}
    >
      <View style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center", paddingTop: 35}}>
        <View>
          { props.title != "Home" ?

            <View style={{ display: "flex", flexDirection: "row", width: 80, alignItems: "center" }}>
              <Image
                style={{
                  width: 12,
                  marginRight: 0,
                  marginLeft:-5

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
        </View>
         <View style={[globalStyle.titleBody]}> 
          
            <Text style={[globalStyle.titleStyling,{paddingTop: 10}]}>{props.title}</Text>
         
        </View>
        <View>

          <Button style={{backgroundColor:"transparent", right: -15}} onPress={() => props.navigation.toggleDrawer()}>
            <Image style={{ height: 25, width: 25, resizeMode: "contain" }} source={require("./../../../assets/TopMenu.png")} />
          </Button>

        </View>
      </View>
    </ImageBackground>
  );
};
export default SideBarMenu;
