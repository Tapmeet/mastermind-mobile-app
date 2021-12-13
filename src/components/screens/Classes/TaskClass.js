import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import loginStyle from "../../../style/login/loginStyle";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import Collapsible from "react-native-collapsible";
import moment from 'moment';
import { RRule, RRuleSet, rrulestr } from 'rrule'
const apiUrl = API_URL.trim();
const TaskClass = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [classId, setClassId] = React.useState('');
    const [taskTitle, setTaskTitle] = React.useState('');
    const [eventListing, setEventListing] = React.useState([]);
    const [collapsed, setCollapsed] = React.useState(false);
    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };
    React.useEffect(() => {
        navigation.addListener("focus", async () => {
            if (eventListing == "") {
                async function getData() {
                    try {
                        const value = await AsyncStorage.getItem("eventId");
                        const title = await AsyncStorage.getItem("eventTitle");
                        console.log(value)
                        setClassId(value)
                        setTaskTitle(title)
                        fetch(`${apiUrl}public/GetClassOccurrences?classId=${value}`, {
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
                               // console.log('data')
                                setloader(false);
                                // if (data.value) {
                                setEventListing(data);
                                //     setloader(false);
                                // } else {
                                //     setloader(false);
                                // }
                            });
                    } catch (e) { }
                }
                await getData();


            }
        });
    });


    const storeData = async (value) => {
        console.log(value);
        let eventId = JSON.stringify(value);
        // console.log(eventId);
        try {
            await AsyncStorage.setItem("taskId", eventId);
            props.navigation.navigate("Class Reservations");
        } catch (e) {
            // saving error
        }
    };


    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Class Tasks"} navigation={props.navigation} />
            <Content padder>
                {loader ? (
                    <Content>
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#29ABE2" />
                        </View>
                    </Content>
                ) : (
                    typeof eventListing !== "undefined" &&
                        eventListing.length > 0 ? (
                        eventListing.map(function (event, index) {
                            let startDate = moment(event.StartDate).format("MMMM Do, YYYY");
                            let starttime = moment(event.StartDate).format("hh:mm a ");
                            let endtime = moment(event.EndDate).format("MMMM Do, YYYY");
                            // var options = RRule.fromString(event.RecurrenceRule)
                            // options.toText()
                            // console.log(options.toText())
                            // console.log('optionsss')
                            //  console.log(options.all())
                            return (
                                <View style={{ marginBottom: 10, marginTop: 10 }} key={index}>
                                    <TouchableOpacity
                                    //  onPress={() => storeData(event.ClassId, event.Name)}
                                    >
                                        <View style={globalStyle.eventsListingWrapper}>
                                            <View style={globalStyle.eventsListingTopWrapper}>
                                                <View style={{ paddingLeft: 15, paddingRight: 10, width: "100%" }}>
                                                    <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Title>
                                                    <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, paddingTop: 20, marginTop: 20 }}>
                                                        {event.Description != '' && event.Description != null ?
                                                            <Text
                                                                style={{
                                                                    color: "#000",
                                                                    fontSize: 22,
                                                                    marginBottom: 0,
                                                                    fontWeight: "bold",
                                                                    width: "100%"
                                                                }}
                                                            >
                                                                Description
                                                            </Text>
                                                            : null}
                                                    </View>
                                                    {event.Description != '' && event.Description != null ?
                                                        <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                                                            <Text style={globalStyle.p}>{event.Description}</Text>
                                                        </View>
                                                        : null}
                                                    <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{startDate}</Text></Text>
                                                    <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Time: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{starttime}</Text></Text>
                                                    <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>End Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{endtime}</Text></Text>
                                                    <ImageBackground
                                                        style={[
                                                            globalStyle.Btn,
                                                            {
                                                                width: "100%",
                                                            },
                                                        ]}
                                                        source={require("./../../../../assets/Oval.png")}
                                                        resizeMode={"stretch"}
                                                    >
                                                        <Button onPress={() => storeData(event.Id)} style={loginStyle.buttons} full>
                                                            <Text style={loginStyle.buttonText}>Book Class</Text>
                                                        </Button>
                                                    </ImageBackground>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                            );
                        })
                    ) : null
                )}
            </Content>
        </Container>
    );
};
export default TaskClass;

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
