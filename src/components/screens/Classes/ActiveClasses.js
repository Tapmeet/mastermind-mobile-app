import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground,FlatList, RefreshControl,SafeAreaView, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
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
const ActiveClasses = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [classListings, setClassListings] = React.useState([]);
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
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        console.log("herer")
        setRefreshing(true);
        fetchClasses()
        wait(2000).then(() => setRefreshing(false));
    }, []);
    useFocusEffect(
        React.useCallback(() => {
            // if (eventListing == '') {
            fetchClasses()
            getStudents()
            // }
        }, [])
    );
    const fetchClasses = () => {

        fetch(`${apiUrl}odata/ActiveClass`, {
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
                if (data.value) {
                    setloader(false);
                    setClassListings(data.value);
                } else {
                    setloader(false);
                }
            });
    }
    function getStudents() {
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
                setPersonId(data.PersonId)
                setStudentIds([]);
                if (data.StudentIds.length > 0) {
                    var students = data.StudentIds.length;
                    setTotalStudent(data.StudentIds.length)
                    setStudentIds([]);
                    data.StudentIds.map((id, index) => {
                        fetch(`${apiUrl}/odata/StudentData(${id})`, {
                            method: "get",
                            headers: {
                                Accept: "*/*",
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                //console.log(data)
                                // setStudentData(data)
                                if (studentIds.length <= students) {
                                    let dataArray = { label: data.FirstName + " " + data.LastName, value: data.StudentId }
                                    setStudentData((prevState) => [...prevState, data]);
                                    //setStudentIds((prevState) => [...prevState, dataArray]);
                                    uniqueStudent.push(dataArray)
                                    let uniquestudentList = [...new Map(uniqueStudent.map(item =>
                                        [item[key], item])).values()];
                                    setStudentIds(uniquestudentList);

                                }
                            });
                    });
                }
            });
    }
    const checkinActiveClass = () => {
        setSuccessMessage('')
        setErrorMessage('')
        if (selectedStudent == '') {
            setErrorMessage('Please Select Student')
            return false
        }
        let studentName = '';
        let studentEmail = '';
        studentData.map(function (student, index) {
            if (selectedStudent == student.StudentId) {
                studentName = student.FirstName + ' ' + student.LastName
                studentEmail = student.Email
            }

        })
        setLoaderMessage(true)
        fetch(`${apiUrl}/odata/StudentAttendance`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                "StudentId": selectedStudent,
                "StudentName": studentName,
                "StudentEmail": studentEmail,
                "TaskId": selectedTaskId,
                "CheckInTime": selectedCheckinTime
            }),
        }).then((response) => response.json())
            .then((response) => {
                console.log('response')
                console.log(response)
                setLoaderMessage(false)
                if (!response["odata.error"]) {
                    setSuccessMessage(studentName + " has successfully checked In")
                    console.log(SuccessMessage)
                    setTimeout(function () {
                        // fetchClasses()
                        // setTogglePopup(false)
                        setSelectedStudent([])
                        setSuccessMessage('')
                    }, 2000);
                   
                }
                else {
                    console.log('responses')
                    console.log(response["odata.error"].message.value)
                    setErrorMessage(response["odata.error"].message.value)
                  //setSuccessMessage(studentName + " has successfully checked In")
                }


            })
            .catch((response) => {
                setLoaderMessage(false)
                setTimeout(function () {
                    fetchClasses()
                    setTogglePopup(false)
                }, 2000);
            });
    }
    const activeCheckin = (selectedCheckintime, selectetaskIn, className) => {
        setSelectedStudent([])
        setTogglePopup(true);
        setSelectedCheckinTime(selectedCheckintime)
        setSelectedTaskId(selectetaskIn);
        setSelectedTaskName(className)
        setErrorMessage('')
        setSuccessMessage('')
    }
    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#f1f1f1",

            }}
        >
            <SideBarMenu title={"Class Check In"} navigation={props.navigation} />
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
                    Class Check In
                </Text>
            </View>
            <Content padder>
                {loader ? (
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                ) : typeof classListings !== "undefined" && classListings.length > 0 ? (
                        // console.log(event)
                        // console.log('event')
                        // let starttime = moment(event.ClassStartTime).format("MM-DD-YYYY, hh:mm a ");
                        // let classDate = moment(event.ClassStartTime).format("YYYY-MM-DD");
                        // var GivenDate = classDate;
                        // var CurrentDate = new Date();
                        // CurrentDate.setHours(0, 0, 0, 0)
                        // GivenDate = new Date(GivenDate);
                        //  console.log(GivenDate)
                        <SafeAreaView  nestedScrollEnabled={true}>
                        <FlatList
                            data={classListings}
                            refreshControl={<RefreshControl  enabled={true}  refreshing={refreshing} onRefresh={onRefresh} />}
                            renderItem={({ item, index, separators }) => (
                            <View style={{ marginBottom: 10 }} key={index}>
                                <View >
                                    <View style={globalStyle.eventsListingWrapper}>
                                        <View style={globalStyle.eventsListingTopWrapper}>
                                            <View style={{ paddingLeft: 0, paddingRight: 10 }}>
                                                <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26, marginBottom: 10 }}>
                                                    {item.ClassName}
                                                </Text>

                                                <Text style={{ fontSize: 18, color: "#555", lineHeight: 26 }}>
                                                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#555", lineHeight: 26 }}>CheckIn Time: </Text>
                                                    { moment(item.ClassStartTime).format("MM-DD-YYYY, hh:mm a ")}
                                                </Text>
                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                                                    <Button
                                                        style={{ alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 }}
                                                        onPress={() => activeCheckin(item.ClassStartTime, item.TaskId, item.ClassName)
                                                        }
                                                    >
                                                        <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check In</Text>
                                                    </Button>


                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        />
                    </SafeAreaView>
                ) : (
                    <View style={globalStyle.tableList}>
                        <Text>No Active Classes Available </Text>
                    </View>
                )
                }
            </Content>
            {togglePopup ?
                <View style={globalStyle.popup}>
                    <View style={globalStyle.eventsListingWrapper}>
                        <Text style={{ fontSize: 18, color: "#555", lineHeight: 26, marginBottom: 10 }}>
                            {selectedTaskName}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Check In time:
                            <Text style={{ fontSize: 18, fontWeight: "normal", color: "#555", paddingLeft: 10, lineHeight: 26, marginBottom: 10 }}>
                                {moment(selectedCheckinTime).format("MM-DD-YYYY, hh:mm a ")}
                            </Text> </Text>
                        <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Select Student</Text>
                        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                            {studentIds.length > 0 && studentIds.length != undefined ?
                                <RNPickerSelect
                                    value={selectedStudent}
                                    items={studentIds}
                                    placeholder={placeholderStudent}
                                    onValueChange={(value) => { setSelectedStudent(value), setErrorMessage('') }}
                                    style={{
                                        ...pickerSelectStyles,
                                        iconContainer: {
                                            top: Platform.OS === "android" ? 20 : 30,
                                            right: 10,
                                        },
                                        placeholder: {
                                            color: "#8a898e",
                                            fontSize: 12,
                                            fontWeight: "bold",
                                        },
                                    }}
                                    Icon={() => {
                                        return (
                                            <Image
                                                style={{
                                                    width: 12,
                                                    position: "absolute",
                                                    top: Platform.OS === "android" ? -15 : -28,
                                                    right: 5,
                                                }}
                                                source={require("../../../../assets/arrow-down.png")}
                                                resizeMode={"contain"}
                                            />
                                        );
                                    }}
                                />
                                : null}
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: 20, paddingBottom: 10, width: "100%" }}>

                            <Button
                                style={{ alignSelf: "center", justifyContent: "center", width: '48%', backgroundColor: "#4585ff", borderRadius: 6 }}
                                onPress={() => checkinActiveClass()
                                } >
                                <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Check In</Text>
                            </Button>

                            <Button
                                style={[{ alignSelf: "center", width: '48%', justifyContent: "center", backgroundColor: "#dc3545", borderRadius: 6, marginLeft: 18 }]}
                                onPress={() => setTogglePopup(false)}
                            >
                                <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff", }]}>Close</Text>
                            </Button>
                        </View>
                        <View style={{padding: 15}}>
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
                : null}

            <FooterTabs navigation={props.navigation} />

        </Container>
    );
};
export default ActiveClasses;
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
