import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../../Utility/AppConst";
const apiUrl = API_URL.trim();
const ClassList = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [eventListing, setEventListing] = React.useState([]);
    React.useEffect(() => {
        navigation.addListener("focus", () => {
            fetch(`${apiUrl}/odata/OrganizationClass`, {
                method: "get",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                   // console.log(data)
                    if (data.value) {
                        setEventListing(data.value);
                        setloader(false);
                    } else {
                        setloader(false);
                    }
                });
        });
    });

    const storeData = async (value, title) => {
        console.log(value);
        let eventId = JSON.stringify(value);
        // console.log(eventId);
        try {
            await AsyncStorage.setItem("eventId", eventId);
            await AsyncStorage.setItem("eventTitle", title);
            props.navigation.navigate("Class Tasks");
        } catch (e) {
            // saving error
        }
    };

    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Classes"} navigation={props.navigation} />
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
                    {eventListing.length} Classes
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
                    eventListing.map(function (event, index) {

                        return (
                            <View style={{ marginBottom: 10 }} key={index}>
                                <TouchableOpacity onPress={() => storeData(event.ClassId, event.Name)}>
                                    <View style={globalStyle.eventsListingWrapper}>
                                        <View style={globalStyle.eventsListingTopWrapper}>
                                            <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    {event.Name}
                                                </Text>
                                                {event.Description != '' && event.Description != null ?
                                                    <Text style={{ fontSize: 16, color: "#555" }}>Description: {event.Description} </Text>
                                                    : null}

                                            </View>
                                        </View>
                                        <View style={globalStyle.eventsListingBottomWrapper}>
                                            <Text
                                                style={
                                                    event.OnlineClass ?
                                                        globalStyle.online
                                                        :
                                                        globalStyle.offline
                                                }
                                            >
                                                {event.OnlineClass ? "Online" : "Offline"}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                ) : (
                    <View style={globalStyle.tableList}>
                        <Text>No Classes Available </Text>
                    </View>
                )}
            </Content>
            {<FooterTabs />}

        </Container>
    );
};
export default ClassList;
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
