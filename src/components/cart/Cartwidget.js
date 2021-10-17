import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { ImageBackground, Image, TouchableOpacity } from 'react-native';
import globalStyle from "../../style/globalStyle";
import { useSelector, useDispatch } from "react-redux";
const CartWidget = (props) => {
    const retail = useSelector((state) => state);
    return (
        <ImageBackground
            style={{
                height: 70
            }}
            source={require('./../../../assets/bgBottom.png')}
            resizeMode={'stretch'}
        >
            <Footer style={globalStyle.barStyling}>
                <FooterTab style={[globalStyle.barStyling, { paddingBottom: 10, paddingTop: 15 }]}>
                    <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 20 }}>Cart Items ({retail.cartItemsReducer.length})</Text>
                    <TouchableOpacity  onPress={() =>  props.navigation.navigate("Cart")} >
                        <Text style={{ borderColor: "#fff", color: "#fff", textTransform: "uppercase", borderWidth: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 10, fontSize: 16, fontWeight: "bold", marginRight: 10,borderRadius: 10 }}>View cart</Text>
                    </TouchableOpacity>
                </FooterTab>
            </Footer>
        </ImageBackground>
    );
}
export default CartWidget;