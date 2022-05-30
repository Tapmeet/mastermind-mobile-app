import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../../Utility/AppConst";
import loginStyle from "../../../style/login/loginStyle";
import { useFocusEffect } from '@react-navigation/native';
import moment from "moment";
const apiUrl = API_URL.trim();
const Awards = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [awardsListing, setAwardsListing] = React.useState([]);
    useFocusEffect(
        //navigation.addListener("focus", () => {
        React.useCallback(() => {
            fetch(`${apiUrl}/odata/StudentAwards`, {
                method: "get",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.value) {
                        setAwardsListing(data.value);
                        setloader(false);
                    } else {
                        setloader(false);
                    }
                });
            //   });
            // });
        }, [])
    );



    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Awards"} navigation={props.navigation} backLink="Home" />
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
                    {awardsListing.length} Awards
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) : typeof awardsListing !== "undefined" && awardsListing.length > 0 ? (
                    awardsListing.map(function (awards, index) {
                        let startDate = moment(awards.AwardedDate).format("MMMM Do, YYYY");
                        return (
                            <View style={{ marginBottom: 10 }} key={index}>
                                <View style={globalStyle.eventsListingWrapper}>
                                    <View style={globalStyle.eventsListingTopWrapper}>
                                        <View style={{ borderRadius: 25, overflow: "hidden" }}>
                                            <Image source={require("./../../../../assets/medal.png")} style={{ height: 64, width: 64 }} />
                                        </View>
                                        <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#16161D",
                                                    paddingBottom: 10,
                                                }}
                                            >
                                                {awards.AwardName}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#16161D",
                                                    paddingBottom: 10,
                                                }}
                                            >
                                                {awards.StudentName}
                                            </Text>
                                            <Text style={{ fontSize: 16, color: "#555" }}>{startDate} </Text>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        );
                    })
                ) : (
                    <View style={globalStyle.tableList}>
                        <Text>No Awards yet </Text>
                    </View>
                )}
            </Content>
             <FooterTabs navigation={props.navigation}  />

        </Container>
    );
};
export default Awards;
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
