import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { ImageBackground, Image } from 'react-native';
import globalStyle from "../../style/globalStyle";
import { LinearGradient } from "expo-linear-gradient";
export default class FooterTabs extends Component {
  render() {
    return (
      <ImageBackground
        style={{

        }}
        source={require('./../../../assets/bgBottom.png')}
        resizeMode={'stretch'}
      >
        <Footer style={globalStyle.barStyling}>
          <FooterTab style={globalStyle.barStyling}>
            <Button>
              <Image style={{ height: 25, width: 25, resizeMode: 'contain', }} source={require('./../../../assets/home.png')} />
              {/* <Icon name="library" /> */}
            </Button>
            <Button>
              {/* <Icon name="chatbox" /> */}
              <Image style={{ height: 25, width: 25, resizeMode: 'contain', }} source={require('./../../../assets/chat.png')} />
            </Button>
            <Button>
              {/* <Icon name="logo-facebook" /> */}
              <Image style={{ height: 20, width: 20, resizeMode: 'contain', }} source={require('./../../../assets/facebook.png')} />
            </Button>
          </FooterTab>
        </Footer>
      </ImageBackground>
    );
  }
}