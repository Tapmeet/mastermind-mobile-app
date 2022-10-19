//import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Linking, Alert, View, Text } from "react-native";
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
    const [school, setSchoolInfo] = React.useState({});
    useFocusEffect(
        //navigation.addListener("focus", () => {
        React.useCallback(() => {
            fetch(`${apiUrl}/odata/StudentAccount`, {
                method: "get",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setSchoolId(data.SchoolId)
                    getSchoolData(data.SchoolId)
                });

        }, [])
    );


    function getSchoolData(SchoolId) {
        fetch(`${apiUrl}/odata/SchoolData(${SchoolId})`, {
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
                    setSchoolInfo(data);
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
         <View
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Follow Us"} navigation={props.navigation} backLink="Home" />
             <View padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) :
                    <View style={{ marginBottom: 10 }}>
                        {school.Address1 != null ?
                            <View>
                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.OrgFacebookUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://www.facebook.com/aksmorrobay/")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/facebook-icon.png")} style={{ height: 40, width: 40 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>Facebook</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        : null}
                                </View>

                                <View style={globalStyle.eventsListingWrapper}>
                                    <View style={globalStyle.eventsListingTopWrapper}>
                                        {/* <View style={{ borderRadius: 25, overflow: "hidden" }}>
                                            <Image source={require("./../../../../assets/medal.png")} style={{ height: 64, width: 64 }} />
                                        </View> */}
                                        <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: "normal",
                                                    color: "#16161D",
                                                    paddingBottom: 10,
                                                }}
                                            >
                                                {school.Address1}
                                            </Text>
                                            {school.Address2 != null ?
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "normal",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    {school.Address2}
                                                </Text>
                                                : null}

                                            {school.City != null ?
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    City:   {school.City}
                                                </Text>
                                                : null}
                                            {school.SchoolEmail != null ?
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    Email:   {school.SchoolEmail}
                                                </Text>
                                                : null}
                                            {school.PostalCode != null ?
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    PostalCode:   {school.PostalCode}
                                                </Text>
                                                : null}
                                            {school.PrimaryPhone != null ?
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    Phone:   {school.PrimaryPhone}
                                                </Text>
                                                : null}
                                        </View>

                                    </View>
                                </View>




                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.FacebookUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://www.facebook.com/aksmorrobay/")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/facebook-icon.png")} style={{ height: 40, width: 40 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>{school.Name}</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        : null}
                                </View>
                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.TwitterUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://twitter.com/aksmorrobay")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/twitter-icon.png")} style={{ height: 40, width: 40 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>Twitter</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        : null}
                                </View>
                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.InstagramUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://www.instagram.com/kaizen_karate_academy/")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/instagram.png")} style={{ height: 40, width: 40 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>Instagram</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        : null}
                                </View>

                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.ReferAFriendUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://www.npmjs.com/package/react-native-inappbrowser-reborn")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/share.png")} style={{ height: 30, width: 30 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>Refer to friend</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        : null}
                                </View>

                                <View style={globalStyle.eventsListingWrapper}>
                                    {school.RateUsUri == null ?
                                        <TouchableOpacity onPress={() => openLink("https://www.npmjs.com/package/react-native-inappbrowser-reborn")}>
                                            <View style={{ paddingRight: 10, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ justifyContent: "center", alignItems: "center", paddingRight: 10, display: "flex", flexDirection: "row" }}>
                                                    <Image source={require("./../../../../assets/rate.png")} style={{ height: 40, width: 40 }} />
                                                    <Text style={{ paddingLeft: 10, fontSize: 18, }}>Write a review</Text>
                                                </View>
                                                <View>
                                                    <Image source={require("./../../../../assets/right.png")} style={{ height: 30, width: 30 }} />
                                                </View>
                                            </View>
                                        </TouchableOpacity>

                                        : null}
                                </View>
                            </View>
                            : null}

                    </View>
                }
             </View  >
            <FooterTabs navigation={props.navigation}  />

         </View>
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
