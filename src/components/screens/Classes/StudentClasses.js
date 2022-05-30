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
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
import { useFocusEffect } from '@react-navigation/native';
const apiUrl = API_URL.trim();
const key = 'value';
var uniqueStudent = [];
const placeholderStudent = {
    label: "Select Student",
};
const StudentClasses = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [eventListing, setEventListing] = React.useState([]);
    const [classListings, setClassListings] = React.useState([]);
    const [toggle, setToggle] = React.useState(false);
    const [studentIds, setStudentIds] = React.useState([]);
    const [selectedStudent, setSelectedStudent] = React.useState([]);
    const [studentData, setStudentData] = React.useState([]);
    const [totalStudent, setTotalStudent] = React.useState([]);
    const [personId, setPersonId] = React.useState('');
    const [selectedTaskId, setSelectedTaskId] = React.useState('');
    const [selectedCheckinTime, setSelectedCheckinTime] = React.useState('');
    const [togglePopup, setTogglePopup] = React.useState(false);
    const [loaderMessage, setLoaderMessage] = React.useState(false);
    const [SuccessMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [selectedTaskName, setSelectedTaskName] = React.useState('');
    const [checkinActive, setCheckinActive] = React.useState(false);
    const [checkedInArray, setCheckedInArray] = React.useState([]);
    useFocusEffect(
        React.useCallback(() => {
            setloader(true);
            fetchClasses()
        }, [])
    );
    const fetchClasses = () => {
        setCheckinActive(false)
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
                if (data.value) {
                    var dataCount = data.value.length;
                    setEventListing(data.value);
                    var newArray = data.value.filter(function (el) {
                        return el.WaitingList 
                      });
                      setCheckedInArray(newArray)
                    setloader(false);
                } else {
                    setloader(false);
                }
            });
    }
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
    function cancelClass(attendanceReservationId) {
        setCheckinActive(true)
        setLoaderMessage(true)
        setSuccessMessage('')
        setErrorMessage("")
        fetch(`${apiUrl}/public/CancelReservation`, {
            method: "POST",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                AttendanceReservationId: attendanceReservationId,
            }),
        })
            .then(response => response.text())
            .then(result => {
                setLoaderMessage(false)
                setSuccessMessage("Class Cancelled");
                setloader(true)
                setTimeout(function () {
                    fetchClasses()
                }, 1000);
            })
            .catch((response) => {
                setloader(true)
                fetchClasses()
            });

    }
    function checkinClass(StudentId, StudentName, StudentEmail, TaskId, CheckInTime) {
        setCheckinActive(true)
        setLoaderMessage(true)
        setSuccessMessage('')
        setErrorMessage("")
        fetch(`${apiUrl}/odata/StudentAttendance`, {
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
        }).then((response) => response.json())
            .then((response) => {
                setLoaderMessage(false)
                if (response["odata.error"]) {
                    setErrorMessage(response["odata.error"].message.value)
                    setTimeout(function () {
                        // fetchClasses()
                        setCheckinActive(false)
                    }, 3000);
                }
                else {
                    setSuccessMessage("Successfully! Checked In")
                    setTimeout(function () {
                        fetchClasses()
                        setCheckinActive(false)
                    }, 2000);
                }
            })
            .catch((response) => {
                setLoaderMessage(false)
                setErrorMessage("Error!")
                setTimeout(function () {
                    fetchClasses()
                    setTogglePopup(false)
                }, 3000);
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
                        padding: 15,
                    },
                ]}
            >
                <Text
                    onPress={() => setToggle(false)}
                    style={!toggle ? {
                        paddingTop: 15,
                        paddingBottom: 15,
                        fontSize: 16,
                        fontWeight: "bold",
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: "#52cbff",
                        flex: 1,
                        color: '#fff',
                        width: "50%",
                        justifyContent: "center",
                        textAlign: "center",
                        shadowColor: "#CCC",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.54,
                        shadowRadius: 3.84,
                        elevation: 7,

                    }
                        : {
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            paddingTop: 15,
                            paddingBottom: 15,
                            fontSize: 16,
                            fontWeight: "bold",
                            backgroundColor: "#fff",
                            flex: 1,
                            color: '#777',
                            width: "50%",
                            justifyContent: "center",
                            textAlign: "center",
                            shadowColor: "#CCC",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.54,
                            shadowRadius: 3.84,
                            elevation: 7,

                        }}
                >
                   Confirmed Reservations 
                </Text>
                <Text
                    onPress={() => setToggle(true)}
                    style={toggle ? {
                        paddingTop: 15,
                        paddingBottom: 15,
                        fontSize: 16,
                        fontWeight: "bold",
                        borderBottomRightRadius: 20,
                        borderTopRightRadius: 20,
                        backgroundColor: "#52cbff",
                        flex: 1,
                        color: '#fff',
                        width: "50%",
                        justifyContent: "center",
                        textAlign: "center",
                        shadowColor: "#CCC",
                        shadowOffset: {
                            width: 0,
                            height: 5,
                        },
                        shadowOpacity: 0.54,
                        shadowRadius: 3.84,
                        elevation: 7,

                    }
                        : {
                            paddingTop: 15,
                            paddingBottom: 15,
                            fontSize: 16,
                            fontWeight: "bold",
                            borderBottomRightRadius: 20,
                            borderTopRightRadius: 20,
                            backgroundColor: "#fff",
                            flex: 1,
                            color: '#777',
                            width: "50%",
                            justifyContent: "center",
                            textAlign: "center",
                            shadowColor: "#CCC",
                            shadowOffset: {
                                width: 0,
                                height: 5,
                            },
                            shadowOpacity: 0.54,
                            shadowRadius: 3.84,
                            elevation: 7,

                        }}
                >
                     Waitlist Reservations  
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) :
                    !toggle ?
                        typeof eventListing !== "undefined" && eventListing.length > 0 ? (
                            eventListing.sort((a, b) => a.AttendanceReservationId < b.AttendanceReservationId ? 1:-1).map(function (event, index) {
                                const date = moment().toDate();
                                const dateIsAfter = moment(event.CheckInTime).isAfter(moment(date));
                                let starttime = moment(event.CheckInTime).format("MM-DD-YYYY, hh:mm a ");
                                let classDate = moment(event.CheckInTime).format("YYYY-MM-DD");
                                var GivenDate = classDate;
                                var CurrentDate = new Date();
                                CurrentDate.setHours(0, 0, 0, 0)
                                GivenDate = new Date(GivenDate);
                                return (
                                    dateIsAfter && !event.WaitingList && event.Confirmed ?
                                        <View style={{ marginBottom: 10 }} key={index}>
                                            <View >
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
                                                            {event.ClassName}
                                                        </Text>
                                                            <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                                {event.StudentName}
                                                            </Text>
                                                            {/* <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                                {event.StudentEmail}
                                                            </Text> */}
                                                            <Text style={{ fontSize: 18, color: "#555", lineHeight: 26 }}>
                                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>Class Time: </Text>
                                                                {starttime}
                                                            </Text>
                                                            {event.isAlreadyCheckedIn ?
                                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>
                                                                    Checked In
                                                                </Text>
                                                                :
                                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                                                                    {/* <Button disabled={event.isReadyForCheckIn ? false : true}
                                                                    style={event.isReadyForCheckIn ? { alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 } : { alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#ccc", borderRadius: 6 }}
                                                                    onPress={() => checkinClass(event.StudentId, event.StudentName, event.StudentEmail, event.TaskId, event.CheckInTime)
                                                                    }
                                                                //onPress={() => activeCheckin(event.CheckInTime, event.TaskId)}
                                                                >
                                                                    <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check In</Text>
                                                                </Button>  */}

                                                                     <Button
                                                                        style={[{ alignSelf: "center", width: 200, justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6,  }]}
                                                                        onPress={() =>
                                                                            alertCancel(event.AttendanceReservationId)}
                                                                    >
                                                                        <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Cancel Class</Text>
                                                                    </Button>
                                                                </View>
                                                            }
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        : null

                                );
                            })
                        ) : (
                            <View style={globalStyle.tableList}>
                                <Text>No Classes Available </Text>
                            </View>
                        )
                        :
                        typeof checkedInArray !== "undefined" && checkedInArray.length > 0 ? (
                            
                            checkedInArray.sort((a, b) => a.AttendanceReservationId < b.AttendanceReservationId ? 1:-1).map(function (event, index) {
                                const date = moment().toDate();
                                const dateIsAfter = moment(event.CheckInTime).isAfter(moment(date));
                                let starttime = moment(event.CheckInTime).format("MM-DD-YYYY, hh:mm a ");
                                let classDate = moment(event.CheckInTime).format("YYYY-MM-DD");
                                var GivenDate = classDate;
                                var CurrentDate = new Date();
                                CurrentDate.setHours(0, 0, 0, 0)
                                GivenDate = new Date(GivenDate);
                                return (
                                    dateIsAfter && event.WaitingList ?
                                        <View style={{ marginBottom: 10 }} key={index}>
                                            <View >
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
                                                            {event.ClassName}
                                                        </Text>
                                                            <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                                {event.StudentName}
                                                            </Text>
                                                            {/* <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                                {event.StudentEmail}
                                                            </Text> */}
                                                            <Text style={{ fontSize: 18, color: "#555", lineHeight: 26 }}>
                                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>Class Time: </Text>
                                                                {starttime}
                                                            </Text>
                                                            {event.isAlreadyCheckedIn ?
                                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>
                                                                    Checked In
                                                                </Text>
                                                                :
                                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                                                                    {/* <Button disabled={event.isReadyForCheckIn ? false : true}
                                                                    style={event.isReadyForCheckIn ? { alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 } : { alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#ccc", borderRadius: 6 }}
                                                                    onPress={() => checkinClass(event.StudentId, event.StudentName, event.StudentEmail, event.TaskId, event.CheckInTime)
                                                                    }
                                                                //onPress={() => activeCheckin(event.CheckInTime, event.TaskId)}
                                                                >
                                                                    <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check In</Text>
                                                                </Button>  */}

                                                                     <Button
                                                                        style={[{ alignSelf: "center", width: 200, justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6, }]}
                                                                        onPress={() =>
                                                                            alertCancel(event.AttendanceReservationId)}
                                                                    >
                                                                        <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Cancel Class</Text>
                                                                    </Button>
                                                                </View>
                                                            }
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                        : null

                                );
                            })
                        ) : (
                            <View style={globalStyle.tableList}>
                                <Text>No Confirmed Reservations </Text>
                            </View>
                        )
                }
            </Content>
            {checkinActive ?
                <View style={globalStyle.popup}>
                    <View style={globalStyle.eventsListingWrapper}>
                        <View style={{ minHeight: 100, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "row" }}>
                            <View>
                                {loaderMessage ? (
                                    <View style={[styles.container, styles.horizontal]}>
                                        <ActivityIndicator size="large" color="#29ABE2" />
                                    </View>
                                ) : null}
                                {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
                                {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
                            </View>
                        </View>
                    </View>
                </View>
                : null}
            <FooterTabs navigation={props.navigation} />

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
