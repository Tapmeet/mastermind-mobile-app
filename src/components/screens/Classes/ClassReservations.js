import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
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
import { CalendarList, Calendar } from 'react-native-calendars';
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
const apiUrl = API_URL.trim();
var uniqueStudent = [];
const key = 'value';
const ClassReservations = (props) => {
    var todayDate = new Date();
    todayDate = moment(todayDate).format('YYYY-MM-DD');
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [studentIds, setStudentIds] = React.useState([]);
    const [selectedStudent, setSelectedStudent] = React.useState([]);
    const [studentData, setStudentData] = React.useState([]);
    const [totalStudent, setTotalStudent] = React.useState([]);
    const [retailProducts, setRetailProducts] = React.useState([]);
    const [personId, setPersonId] = React.useState('');
    const [classId, setClassId] = React.useState('');
    const [taskId, setTaskId] = React.useState('');
    const [taskTitle, setTaskTitle] = React.useState('');
    const [eventListing, setEventListing] = React.useState([]);
    const [loaderMessage, setLoaderMessage] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState('');
    const [SuccessMessage, setSuccessMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [recurrenceText, setRecurrenceText] = React.useState('');

    const [startDateUnformatted, setStartDateUnformatted] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [recurrenceRule, setRecurrenceRule] = React.useState({});
    const [description, setDescription] = React.useState('');


    const [collapsed, setCollapsed] = React.useState(false);
    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };
    React.useEffect(() => {
        navigation.addListener("focus", async () => {
            if (loader) {
                async function getData() {
                    try {
                        const value = await AsyncStorage.getItem("eventId");
                        const taskId = await AsyncStorage.getItem("taskId");
                        const title = await AsyncStorage.getItem("eventTitle");
                        // console.log(taskId)
                        // console.log(value)
                        // console.log(title)
                        setClassId(value)
                        setTaskTitle(title)
                        setTaskId(taskId)
                        fetchdata(value, taskId)
                    } catch (e) { }
                }
                getData();
                if (personId == '') {
                    getStudents()
                }

            }
        });
    });

    const fetchdata = (value, taskId) => {
        clearData()
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
                setEventListing(data);
                setloader(false);
                data.map(function (event, index) {
                    // console.log('event')
                    if (event.Id == taskId) {
                        let startDate = moment(event.StartDate).format("MMMM Do, YYYY");
                        let starttime = moment(event.StartDate).format("hh:mm a ");
                        let enddate = moment(event.EndDate).format("MMMM Do, YYYY");
                        setStartDateUnformatted(event.StartDate)
                        setStartDate(startDate);
                        setStartTime(starttime);
                        setEndDate(enddate);
                        setDescription(event.Description)
                        // const rule = new RRule()
                        //var options = RRule.fromString(event.RecurrenceRule)
                        var options = RRule.fromString('FREQ=WEEKLY;UNTIL=20220528T235959Z;BYDAY=SU;WKST=SU')
                        const rrule = options.all();

                        var datesArray = {};
                        const complete = { key: 'complete', color: 'green' };
                        if (rrule.length > 0) {
                            rrule.map(function (rules, index) {
                                let dates = moment(rules).format('YYYY-MM-DD');
                                Object.assign(datesArray, {
                                    [dates]: {
                                        selected: true,
                                        selectedColor: '#4895FF',
                                        disabled: false,
                                        disableTouchEvent: false,
                                        marked: true
                                    },
                                })
                            })
                        }
                        setRecurrenceText(options.toText())
                        setRecurrenceRule(datesArray)
                        //options.toText()
                        // console.log(options.toText())
                        console.log('optionsss')

                        //   console.log(options.all())
                    }
                })
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
                                    setloader(false)
                                }
                            });
                    });
                }
            });
    }
    const getSelectedDayEvents = date => {
        console.log(date)
        //console.log(startDate)

        let starttime = moment(startDateUnformatted).format("HH:mm:ss");
        let startDate = moment(date).format("DD/MM/YYYY");
        let datesCheck = new Date(date + ' ' + starttime);
        console.log(datesCheck)
        console.log(startDate + ' ' + starttime)
        setSelectedDate(startDate + ' ' + starttime)


    };
    const reserveClass = () => {

        if (selectedStudent == undefined) {
            Alert.alert(" Alert",
                "Please select student",
                [{
                    text: 'Ok',
                    //onPress: () => //console.log('Cancel Pressed'),
                    style: 'cancel',
                },]);
            return false
        }
        if (selectedDate == '') {
            Alert.alert(" Alert",
                "Please select date",
                [{
                    text: 'Ok',
                    //onPress: () => //console.log('Cancel Pressed'),
                    style: 'cancel',
                },]);
            return false
        }
        const apiUrl = API_URL.trim();
        let studentName = '';
        let studentEmail = '';
        studentData.map(function (student, index) {
            if (selectedStudent == student.StudentId) {
                studentName = student.FirstName + ' ' + student.LastName
                studentEmail = student.Email
            }

        })
        console.log(studentName)
        console.log(studentEmail)
        fetch(`${apiUrl}public/ClassReservation`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                taskId: taskId,
                CheckInTime: selectedDate,
                StudentId: selectedStudent,
                StudentName: studentName,
                StudentEmail: studentEmail,
            }),
        })
            .then((response) => {
                console.log("response")
                let jsonData = JSON.stringify(response);
                console.log(jsonData)
                let jsonDataPrase = JSON.parse(jsonData);
                // console.log(jsonDataPrase.status)
                if (jsonDataPrase.status != 200) {
                    setLoaderMessage(false)
                    setErrorMessage("An error has occurred.");
                } else {
                    setLoaderMessage(false)
                    setSuccessMessage("Successfully Submitted.");
                    setTimeout(function () {
                        setSelectedDate('')
                        setSelectedStudent('')
                        setSuccessMessage('')
                        setErrorMessage('')
                    }, 3000);
                }
            });
    }
    const clearData = () => {
        setStartDate('')
        setEndDate('')
        setSelectedDate('')
        setSelectedStudent('')
        setSuccessMessage('')
        setErrorMessage('')
        setLoaderMessage(false)
    }
    const placeholderStudent = {
        label: "Select Student",
    };
    const { navigation } = props;
    return (
        <Container
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Class Reservation"} navigation={props.navigation} />
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
                        <View style={{ marginBottom: 10, marginTop: 10 }} >
                            {/* <TouchableOpacity
                            //  onPress={() => storeData(event.ClassId, event.Name)}
                            > */}
                            <View style={globalStyle.eventsListingWrapper}>
                                <View style={globalStyle.eventsListingTopWrapper}>
                                    <View style={{ paddingLeft: 15, paddingRight: 10, width: "100%" }}>
                                        <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {taskTitle}</Title>
                                        <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, paddingTop: 20, marginTop: 20 }}>
                                            {description != '' && description != null ?
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
                                        {description != '' && description != null ?
                                            <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                                                <Text style={globalStyle.p}>{description}</Text>
                                            </View>
                                            : null}
                                        <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{startDate}</Text></Text>
                                        <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Time: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{startTime}</Text></Text>
                                        <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>End Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{endDate}</Text></Text>
                                        <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}> <Text style={{ fontSize: 18, color: "#555", lineHeight: 30, fontWeight: "normal", textTransform: "capitalize" }}>{recurrenceText}</Text></Text>

                                    </View>
                                </View>

                            </View>
                            <View style={globalStyle.eventsListingWrapper}>
                                <Calendar
                                    // markingType={'custom'}
                                    markingType={'multi-dot'}
                                    markedDates={recurrenceRule}
                                    onDayPress={day => {
                                        getSelectedDayEvents(day.dateString);
                                    }}
                                    disabledByDefault={true}
                                    disableAllTouchEventsForDisabledDays={true}
                                    // minDate={'2021-05-10'} 
                                    // maxDate={'2021-05-30'}
                                    // onDayPress={day => this.onDayPress(day)}
                                    // onMonthChange={months => this.onMonthChange(months)}
                                    theme={{
                                        selectedDayBackgroundColor: '#30B3AB',
                                        selectedDayTextColor: '#ffffff',
                                        todayTextColor: '#30B3AB',
                                        todayTextBackgroundColor: 'black',
                                        textMonthFontSize: 15,
                                    }}>
                                    <CalendarList
                                        pastScrollRange={24}
                                        futureScrollRange={24}
                                        displayLoadingIndicator={true}
                                        scrollEnabled={true}
                                        showScrollIndicator={true}
                                        horizontal={true}
                                        pagingEnabled={true}
                                        current={todayDate}
                                        // onVisibleMonthsChange={months => this.onMonthChange(months)}
                                        // pagingEnabled
                                        style={{ borderBottomWidth: 1, borderBottomColor: ' black' }}
                                    />
                                </Calendar>
                            </View>
                            <View style={globalStyle.eventsListingWrapper}>
                                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Select Student</Text>
                                <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                                    <RNPickerSelect
                                        value={selectedStudent}
                                        items={studentIds}
                                        placeholder={placeholderStudent}
                                        onValueChange={(value) => setSelectedStudent(value)}
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
                                </View>
                            </View>
                            {selectedDate ?
                                <View style={globalStyle.eventsListingWrapper}>
                                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Check In</Text>
                                    <Text style={{ fontWeight: "normal", marginBottom: 10 }}>{selectedDate}</Text>
                                </View>
                                : null}
                            {/* </TouchableOpacity> */}

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
                                <Button onPress={() => reserveClass()} style={loginStyle.buttons} full>
                                    <Text style={loginStyle.buttonText}>Reserve Class</Text>
                                </Button>
                            </ImageBackground>
                            {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
                            {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
                            {loaderMessage ? (
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator size="large" color="#29ABE2" />
                                </View>
                            ) : null}
                        </View>
                    ) : null
                )}
            </Content>
        </Container>
    );
};
export default ClassReservations;

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
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        minWidth: 122,
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
        minWidth: 122,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderWidth: 0,
        borderColor: "#fff",
        borderRadius: 0,
        color: "#8a898e",
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

