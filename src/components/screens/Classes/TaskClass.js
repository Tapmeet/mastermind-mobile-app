import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import Collapsible from "react-native-collapsible";
import moment from 'moment';
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
                                console.log(data)
                                console.log('data')
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



    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Class Details"} navigation={props.navigation} />
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
                        return (
                            <Content key={index}>
                                <Image source={require("./../../../../assets/retails.jpg")} style={{ width: "100%", height: 220 }} />
                                <View style={{ margin: 15, marginTop: 25 }}>
                                    <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Title>
                                    <TouchableOpacity onPress={() => { toggleExpanded() }}>
                                        <View style={globalStyle.accordianStyle}>
                                            <Text
                                                style={{
                                                    color: "#000",
                                                    fontSize: 22,
                                                    marginBottom: 0,
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                Description
                                            </Text>
                                            {collapsed ? (
                                                <Image
                                                    style={globalStyle.arrows}
                                                    source={require("./../../../../assets/down-arrow.png")}
                                                    resizeMode={"contain"}
                                                />
                                            ) : (
                                                <Image
                                                    style={globalStyle.arrows}
                                                    source={require("./../../../../assets/up-arrow.png")}
                                                    resizeMode={"contain"}
                                                />
                                            )}
                                        </View>
                                    </TouchableOpacity>
                                    <Collapsible collapsed={collapsed} align="center">
                                        <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                                            <Text style={globalStyle.p}>{event.Description}</Text>
                                        </View>
                                    </Collapsible>
                                    <Text style={{ fontSize: 18, color: "#555", fontWeight:"bold", marginBottom: 10 }}>Start Date: <Text style={{ fontSize: 18, color: "#555", fontWeight:"normal" }}>{startDate}</Text></Text>
                                    <Text style={{ fontSize: 18, color: "#555", fontWeight:"bold", marginBottom: 10 }}>Start Time: <Text style={{ fontSize: 18, color: "#555", fontWeight:"normal"  }}>{starttime}</Text></Text>
                                    <Text style={{ fontSize: 18, color: "#555", fontWeight:"bold", marginBottom: 10 }}>End Date: <Text style={{ fontSize: 18, color: "#555" , fontWeight:"normal" }}>{endtime}</Text></Text>
                                </View>
                            </Content>

                        );
                    })
                ) : null
            )}
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
