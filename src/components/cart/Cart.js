import React, { Component } from 'react';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Content, View, Accordion } from 'native-base';
import { ImageBackground, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import globalStyle from "../../style/globalStyle";
import { SideBarMenu } from "./../sidebar";
import { useSelector, useDispatch } from "react-redux";
const Cart = (props) => {
    const retail = useSelector((state) => state);
    const [loader, setloader] = React.useState(true);
    return (
        <Container
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Product Detail"} navigation={props.navigation} />
            {loader ? (
                <Content>
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                </Content>
            ) : (
                <Content key={index}>
                </Content>

            )}
        </Container>
    )
}
export default Cart;