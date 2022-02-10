import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import loginStyle from "../../../style/login/loginStyle";
const apiUrl = API_URL.trim();
const Share = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [awardsListing, setAwardsListing] = React.useState([]);
    React.useEffect(() => {
        navigation.addListener("focus", () => {
            fetch(`${apiUrl}/odata/SchoolData`, {
                method: "get",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data)
                    if (data.value) {
                        setAwardsListing(data.value);
                        setloader(false);
                    } else {
                        setloader(false);
                    }
                });
        });
    });



    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Share"} navigation={props.navigation} backLink="Home" />
            <View
                style={[
                    globalStyle.flexStandard,
                    {
                        paddingTop: 15,
                        paddingBottom: 15,
                    },
                ]}
            >
                <Text
                    style={{
                        fontWeight: "bold",
                        fontSize: 24,
                        paddingLeft: 15,
                        backgroundColor: "white",
                        flex: 1,
                    }}
                >
                    School Data
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) : typeof awardsListing !== "undefined" && awardsListing.length > 0 ? (
                    awardsListing.map(function (school, index) {
                        return (
                            <View style={{ marginBottom: 10 }} key={index}>
                                {school.Address1 != null ?
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
                                                <View style={{ display: "flex", flexDirection: "row" }}>
                                                    {school.FacebookUri !=  null ?
                                                        <View style={{ overflow: "hidden", paddingRight: 10 }}>
                                                            <Image source={require("./../../../../assets/facebook-icon.png")} style={{ height: 30, width: 30 }} />
                                                        </View>
                                                        : null}
                                                    {school.OrgFacebookUri !=  null ?
                                                        <View style={{ overflow: "hidden", paddingRight: 10 }}>
                                                            <Image source={require("./../../../../assets/facebook-icon.png")} style={{ height: 30, width: 30 }} />
                                                        </View>
                                                        : null}
                                                    {school.TwitterUri != null ?
                                                        <View style={{ overflow: "hidden", paddingRight: 10 }}>
                                                            <Image source={require("./../../../../assets/twitter-icon.png")} style={{ height: 30, width: 30 }} />
                                                        </View>
                                                        : null}
                                                    {school.InstagramUri != null ?
                                                        <View style={{ overflow: "hidden", paddingRight: 10 }}>
                                                            <Image source={require("./../../../../assets/instagram.png")} style={{ height: 30, width: 30 }} />
                                                        </View>
                                                        : null}
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                    : null}
                            </View>
                        );
                    })
                ) : (
                    <View style={globalStyle.tableList}>
                        <Text>No Awards yet </Text>
                    </View>
                )}
            </Content>
            {<FooterTabs />}

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
