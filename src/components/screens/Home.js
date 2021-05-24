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
  View,
} from "native-base";
import { Image, ImageBackground, Dimensions } from "react-native";
import React from "react";
import FooterTabs from "../footer/Footer";
import { SideBarMenu } from "../sidebar";
import globalStyle from "../../style/globalStyle";
import Carousel from 'react-native-snap-carousel'
const Home = (props) => {
  const isCarousel = React.useRef(null)
  const data = [
    {
      rating: "4.9",
      title: "Kids Master Karate",
      text: "06 Months"
    },
    {
      rating: "4.8",
      title: "Kids Master Karate",
      text: "03 Months"
    },
    {
      rating: "4.7",
      title: "Kids Master Karate",
      text: "05 Months"
    },
  ]

  const SLIDER_WIDTH = Dimensions.get('window').width + 60
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
  const CarouselCardItem = ({ item, index }) => {
    return (
      <ImageBackground
        style={[globalStyle.slider, {
          width: '100%',
          height: 180,
          justifyContent: "center"
        }]}
        source={require('./../../../assets/sliderbg.png')}
        resizeMode={'stretch'}
      >
        <View style={globalStyle.sliderWrapper}>
          <Text style={{ fontSize: 18, color: "#333", marginRight: 5 }}>{item.rating}</Text>
          <Image
            source={require('./../../../assets/star.png')}
            style={{ height: 20, width: 20, }}
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff", paddingBottom: 10 }}>{item.title}</Text>
        <Text style={{ fontSize: 18, color: "#fff" }}>{item.text}</Text>
      </ImageBackground>
    )
  }
  return (
    <Container>
      <SideBarMenu title={"Home"} navigation={props.navigation} />
      <Content padder>
        <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 24 }}>Top Courses</Text>
        <View style={{
          marginLeft: -70, marginTop: 20,
          marginBottom: 20
        }}>
          <Carousel
            layout="dafault"

            ref={isCarousel}
            data={data}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            useScrollView={false}
          />
        </View>
        <Text style={{ marginTop: 10, fontWeight: "bold", fontSize: 24, marginBottom: 15 }}>Upcoming Classes</Text>
        <View style={globalStyle.homeEvents}>
          <View style={{ borderRadius: 25, overflow: "hidden" }}>
            <Image
              source={require('./../../../assets/img1.png')}
              style={{ height: 110, width: 130, }}
            />
          </View>
          <View style={{ paddingLeft: 15, paddingRight: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "#16161D", paddingBottom: 10 }}>Kids Karate Workshop</Text>
            <Text style={{ fontSize: 18, color: "#555" }}>May 12, 2021</Text>
            <Text style={{ fontSize: 18, color: "#555", marginTop: 5 }}>05:00 - 07:00 PM</Text>
          </View>
        </View>
        <View style={{ marginBottom: 30 }}>
          <View style={globalStyle.homeEvents}>
            <View style={{ borderRadius: 25, overflow: "hidden" }}>
              <Image
                source={require('./../../../assets/img2.png')}
                style={{ height: 110, width: 130, }}
              />
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#16161D", paddingBottom: 10 }}>Kids Karate Workshop</Text>
              <Text style={{ fontSize: 18, color: "#555" }}>May 12, 2021</Text>
              <Text style={{ fontSize: 18, color: "#555", marginTop: 5 }}>05:00 - 07:00 PM</Text>
            </View>
          </View>
          <View style={globalStyle.homeEvents}>
            <View style={{ borderRadius: 25, overflow: "hidden" }}>
              <Image
                source={require('./../../../assets/img3.png')}
                style={{ height: 110, width: 130, }}
              />
            </View>
            <View style={{ paddingLeft: 15, paddingRight: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#16161D", paddingBottom: 10 }}>Kids Karate Workshop</Text>
              <Text style={{ fontSize: 18, color: "#555" }}>May 12, 2021</Text>
              <Text style={{ fontSize: 18, color: "#555", marginTop: 5 }}>05:00 - 07:00 PM</Text>
            </View>
          </View>
        </View>
      </Content>
      <FooterTabs />
    </Container>
  );
};
export default Home;
