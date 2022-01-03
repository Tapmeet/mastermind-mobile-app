import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import moment from 'moment';
import loginStyle from "../../../style/login/loginStyle";
const apiUrl = API_URL.trim();
const StudentClasses = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [eventListing, setEventListing] = React.useState([]);
    const [classListings, setClassListings] = React.useState([]);
    React.useEffect(() => {
        navigation.addListener("focus", () => {
            if (eventListing == '') {
                fetchClasses()
            }
        });
    });
    const fetchClasses = () => {
        fetch(`${apiUrl}/odata/StudentAttendance`, {
            method: "get",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data.value)
                if (data.value) {
                    setEventListing(data.value);
                    setClassListings([])
                    data.value.map(function (event, index) {
                        fetch(`${apiUrl}public/GetClassOccurrences?classId=${event.TaskId}`, {
                            method: "get",
                            headers: {
                                Accept: "*/*",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                            },
                        })
                            .then((responses) => responses.json())
                            .then((taskData) => {
                                // console.log(taskData)
                                let data = { ...event, ...taskData[0] }
                                console.log('taskData')
                                console.log(data)
                                setClassListings((prevState) => [...prevState, data]);

                            });

                    })
                    setloader(false);
                } else {
                    setloader(false);
                }
            });
    }
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
    function alertCancel(AttendanceReservationId) {
        Alert.alert(
            "Confirm",
            `Are you sure you want to Cancel this class ?`,
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => cancelClass(AttendanceReservationId) }
            ],
            { cancelable: false }
        );
    }
    function cancelClass(AttendanceReservationId) {
        fetch(`${apiUrl}/public/CancelReservation)`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                "AttendanceReservationId": AttendanceReservationId,
            }),
        })
            .then((response) => {
                fetchClasses()
            })
            .catch((response) => {
                fetchClasses()
            });
    }
    function checkinClass(StudentId, StudentName, StudentEmail, TaskId, CheckInTime) {
        fetch(`${apiUrl}/odata/StudentAttendance)`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                "StudentId": StudentId,
                "StudentName": StudentName,
                "StudentEmail": StudentEmail,
                "TaskId": TaskId,
                "CheckInTime": CheckInTime
            }),
        })
            .then((response) => {
                fetchClasses()
            })
            .catch((response) => {
                fetchClasses()
            });
    }
    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Reserved Classes"} navigation={props.navigation} />
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
                    {eventListing.length} Reserved Classes
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (
                    classListings.map(function (event, index) {
                        // console.log(event)
                        // console.log('event')
                        let starttime = moment(event.CheckInTime).format("MM-DD-YYYY, hh:mm a ");
                        return (
                            <View style={{ marginBottom: 10 }} key={index}>
                                <TouchableOpacity onPress={() => storeData(event.ClassId, event.Name)}>
                                    <View style={globalStyle.eventsListingWrapper}>
                                        <View style={globalStyle.eventsListingTopWrapper}>
                                            <View style={{ paddingLeft: 0, paddingRight: 10 }}>
                                                <Text
                                                    style={{
                                                        fontSize: 18,
                                                        fontWeight: "bold",
                                                        color: "#16161D",
                                                        paddingBottom: 10,
                                                    }}
                                                >
                                                    {event.Title}
                                                </Text>
                                                <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                    {event.StudentName}
                                                </Text>
                                                <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                    {event.StudentEmail}
                                                </Text>
                                                <Text style={{ fontSize: 18, color: "#555", lineHeight: 26 }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>CheckIn Time: </Text>
                                                    {starttime}
                                                </Text>
                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10 }}>
                                                    {event.WaitingList == false ?
                                                        <Button
                                                            style={{ alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 }}
                                                            onPress={() => checkinClass(event.StudentId, event.StudentName, event.StudentEmail, event.TaskId, event.CheckInTime)}
                                                        >
                                                            <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check-In</Text>
                                                        </Button>
                                                        : null}
                                                    <Button
                                                        style={[{ alignSelf: "center", width: '48%', justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6, marginLeft: 18 }]}
                                                        onPress={() =>
                                                            alertCancel(event.AttendanceReservationId)}
                                                    >
                                                        <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Cancel Class</Text>
                                                    </Button>
                                                </View>
                                            </View>

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
export default StudentClasses;
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
