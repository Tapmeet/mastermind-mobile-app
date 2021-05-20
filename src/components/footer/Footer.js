import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { ImageBackground } from 'react-native';
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
              <Icon name="library" />
            </Button>
            <Button>
              <Icon name="chatbox" />
            </Button>
            <Button>
              <Icon name="logo-facebook" />
            </Button>
          </FooterTab>
        </Footer>
      </ImageBackground>
    );
  }
}