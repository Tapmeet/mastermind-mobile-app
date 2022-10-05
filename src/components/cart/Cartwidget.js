import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { ImageBackground, Image, TouchableOpacity,View,Dimensions  } from 'react-native';
import globalStyle from "../../style/globalStyle";
import { useSelector, useDispatch } from "react-redux";
const CartWidget = (props) => {
    const win = Dimensions.get("window");
    const retail = useSelector((state) => state);
    return (
        <ImageBackground
            style={[globalStyle.barStylingfooter, {
                height: 70,
                top: win.height - 70
            }]}
            source={require("./../../../assets/bgBottom.png")}
            resizeMode={"stretch"}
        >
            <View >
                <View style={{ paddingBottom: 10, paddingTop: 10, display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-around", alignItems:"center" }}>
                    <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 20, paddingTop: 6 }}>Cart ({retail.cartItemsReducer.length})</Text>
                    {retail.cartItemsReducer.length > 0 ?
                        <TouchableOpacity onPress={() => props.navigation.navigate("Cart")} >
                            <Text style={{ borderColor: "#fff", color: "#fff", textTransform: "uppercase", borderWidth: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 10, fontSize: 15, fontWeight: "bold", marginRight: 10, borderRadius: 10, minHeight: 45 }}>View cart</Text>
                        </TouchableOpacity>
                        : null}
                    {retail.cartItemsReducer.length > 0 ?
                        <TouchableOpacity onPress={() => props.navigation.navigate("Retail")} >
                            <Text style={{ borderColor: "#fff", color: "#fff", textTransform: "uppercase", borderWidth: 1, paddingBottom: 10, paddingLeft: 10, paddingRight: 10, paddingTop: 10, fontSize: 15, fontWeight: "bold", marginRight: 10, borderRadius: 10, minHeight: 45 }}>Continue Shopping</Text>
                        </TouchableOpacity>
                        : null}
                </View>
            </View>
        </ImageBackground>
    );
}
export default CartWidget;