import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Text,
  Card,
  CardItem,
  Content,
} from "native-base";
import { Image } from "react-native";
import React from "react";
import FooterTabs from "../footer/Footer";
import { SideBarMenu } from "../sidebar";
const Home = (props) => {
  return (
    <Container>
      <SideBarMenu title={"Upcoming Events"} navigation={props.navigation} />
      <Content padder>
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  "https://pmcontent.blob.core.windows.net/e949b61ad61940b5862e4f557469cfc3/publicImages/wokc20201920Copelands20Flyer202800329.jpg",
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry....
                </Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  "https://www.santenkarate.com/uploads/7/6/2/1/76217999/black-belt-college-flyer-180408-fb-event-image_3_orig.jpg",
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry....
                </Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  "https://lh3.googleusercontent.com/proxy/AtM_Ijn65eexXGbBKwx_-JsMR-3zgd59iORFIvSiYm3qtFkrfGxqMudAydPu227bLybYEY2wfaso3gSn8VBRu9tVdOX_rTsz1ksN6eaC2Bsfcmo01R_OZoEQXoRATnWnQw",
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry....
                </Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem cardBody>
            <Image
              source={{
                uri:
                  "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/SnrBIe4yliufvlmcr/hd-loopable-background-with-nice-abstract-green-light-and-particles_s0xuiinyg_thumbnail-full01.png",
              }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry....
                </Text>
              </Button>
            </Left>
          </CardItem>
        </Card>
      </Content>

      <FooterTabs />
    </Container>
  );
};
export default Home;
