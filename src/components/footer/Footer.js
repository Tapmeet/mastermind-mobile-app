import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import globalStyle from "../../style/globalStyle";
export default class FooterTabs extends Component {
  render() {
    return (
      <Footer>
        <FooterTab  style={globalStyle.barStyling}>
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
    );
  }
}