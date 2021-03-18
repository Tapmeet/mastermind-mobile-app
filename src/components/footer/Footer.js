import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';

export default class FooterTabs extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
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