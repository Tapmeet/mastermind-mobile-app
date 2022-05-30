import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import loginStyle from "../../../style/login/loginStyle";
import { useFocusEffect } from '@react-navigation/native';
import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import * as WebBrowser from 'expo-web-browser';

const apiUrl = API_URL.trim();
const Share = (props) => {
    const [loader, setloader] = React.useState(true);
    const [schoolId, setSchoolId] = React.useState(true);
    const userId = useSelector((state) => state);
    const [school, setSchoolInfo] = React.useState([]);
    useFocusEffect(
        //navigation.addListener("focus", () => {
        React.useCallback(() => {
            getSchoolData()
        }, [])
    );


    function getSchoolData() {
        fetch(`${apiUrl}/odata/ExternalLinks`, {
            method: "get",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setSchoolInfo(data.value);
                    setloader(false);
                } else {
                    setloader(false);
                }
            });
    }
    const openLink = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
    };
    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Follow Us"} navigation={props.navigation} backLink="Home" />
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) :
                    <View style={{ marginBottom: 10 }}>
                        {typeof school !== "undefined" && school.length > 0 ? (
                            school.map(function (school, index) {
                                return (
                                    school.ExternalLinkType == 'Facebook' || school.ExternalLinkType == 'Twitter' || school.ExternalLinkType == 'Instagram' || school.ExternalLinkType == 'Web' ?
                                        <View key={index}>
                                            <View style={globalStyle.eventsListingWrapper}>
                                                <TouchableOpacity onPress={() => openLink(school.Address)}>
                                                    <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                        <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                            {school.ExternalLinkType == 'Facebook' ? school.LinkIconBase64 == null ? <Image source={require("./../../../../assets/facebook-icon.png")} style={{ height: 40, width: 40 }} />
                                                                : <Image source={{
                                                                    uri: "data:image/png;base64," + school.LinkIconBase64,
                                                                }}
                                                                    style={{ height: 40, width: 40 }}
                                                                />
                                                                : null}
                                                            {school.ExternalLinkType == 'Twitter' ? school.LinkIconBase64 == null ? <Image source={require("./../../../../assets/twitter-icon.png")} style={{ height: 40, width: 40 }} />
                                                                : <Image source={{
                                                                    uri: "data:image/png;base64," + school.LinkIconBase64,
                                                                }}
                                                                    style={{ height: 40, width: 40 }}
                                                                /> : null}
                                                            {school.ExternalLinkType == 'Instagram' ? school.LinkIconBase64 == null ? <Image source={require("./../../../../assets/instagram.png")} style={{ height: 40, width: 40 }} />
                                                                : <Image source={{
                                                                    uri: "data:image/png;base64," + school.LinkIconBase64,
                                                                }}
                                                                    style={{ height: 40, width: 40 }}
                                                                /> : null}
                                                            {school.ExternalLinkType == 'Web' ? school.LinkIconBase64 == null ? <Image source={require("./../../../../assets/web.png")} style={{ height: 40, width: 40 }} />
                                                                : <Image source={{
                                                                    uri: "data:image/png;base64," + school.LinkIconBase64,
                                                                }}
                                                                    style={{ height: 40, width: 40 }}
                                                                /> : null}
                                                            <Text style={{ paddingLeft: 10, fontSize: 18, }}>{school.Name}</Text>
                                                        </View>
                                                        <View>
                                                            <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        : null 
                                
                            );
                            })
                        ) : null}

                    </View>
                }
            </Content>
            <FooterTabs navigation={props.navigation} />

        </Container>
    );
};
export default Share;
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        minWidth: 115,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: "#fff",
        borderRadius: 0,
        color: "#8a898e",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 18,
        minWidth: 100,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 0,
        borderColor: "#fff",
        borderRadius: 0,
        color: "#8a898e",
        marginRight: 15,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
