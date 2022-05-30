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
import { useFocusEffect } from '@react-navigation/native';
import { textAlign } from "styled-system";
import { cos } from "react-native-reanimated";
const apiUrl = API_URL.trim();
var uniqueStudent = [];
var datesArray = {};
var datesCleassesArray = [];
var classDate = '';
var classTitle = '';
var checkClass = false;

const key = 'value';
const weekDays = [
    { name: "SU", value: "0", fullName: "Sunday" },
    { name: "MO", value: "1", fullName: "Monday" },
    { name: "TU", value: "2", fullName: "Tuesday" },
    { name: "WE", value: "3", fullName: "Wednesday" },
    { name: "TH", value: "4", fullName: "Thursday" },
    { name: "FR", value: "5", fullName: "Friday" },
    { name: "SA", value: "6", fullName: "Saturday" },
]
var weekdays = [];
const TaskClass = (props) => {
    var todayDate = new Date();
    todayDate = moment(todayDate).format('YYYY-MM-DD');
    const [loader, setloader] = React.useState(true);
    const [loaderCheck, setLoaderCheck] = React.useState(true);
    const [checkClasses, setCheckClasses] = React.useState(true);
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
    const [threshold, setThreshold] = React.useState('');
    const [startDateUnformatted, setStartDateUnformatted] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [startTime, setStartTime] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [recurrenceRule, setRecurrenceRule] = React.useState({});
    const [datesClasses, setDatesClasses] = React.useState([]);
    const [description, setDescription] = React.useState('');

    const [selectedTaskId, setSelectedTaskId] = React.useState('');
    const [selectedTaskTime, setselectedTaskTime] = React.useState('');
    const [selectedTaskDate, setSelectedTaskDate] = React.useState('');
    const [slot, setSetSlot] = React.useState('');
    const [classImg, setClassImg] = React.useState('');
    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };
    useFocusEffect(
        React.useCallback(() => {
            //  navigation.addListener("focus", () => {

            clearData()
            // if (loader) {
            //     if (loaderCheck) {
            setDatesClasses([])
            getData();
            setLoaderCheck(false)
            setDatesClasses([])
            getStudents()
            //     }
            // }
            // });
        }, [classId])
    );
    async function getData() {
        setLoaderCheck(false)
        try {
            const value = await AsyncStorage.getItem("eventId");
            const title = await AsyncStorage.getItem("eventTitle");
            const classThumb = await AsyncStorage.getItem("classThumb");
            const threshold = await AsyncStorage.getItem("threshold");

            if (classThumb != null) {
                setClassImg(classThumb)
            }
            else {
                setClassImg('')
            }
            setThreshold(threshold)
            setClassId(value)
            setTaskTitle(title)
            fetch(`${apiUrl}/public/GetClassOccurrences?classId=${value}`, {
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
                    setDatesClasses([])

                    data.map(function (event, index) {
                        if (index == 0) {
                            setDatesClasses([])
                            datesCleassesArray = [];

                        }
                        var str = event.RecurrenceRule;

                        if (str != null) {
                            var chars = str.split(';');

                            var str1, chars1;
                            if (chars.length == 4) {
                                str1 = chars[3];
                                chars1 = str1.split('=');
                            }
                            else if (chars.length == 3) {
                                str1 = chars[2];
                                chars1 = str1.split('=');
                            }
                            else if (chars.length == 2) {
                                str1 = chars[1];
                                chars1 = str1.split('=');
                            }
                            var chars2;
                            if (chars1[0] == 'BYDAY' || chars1[0] == 'WKST') {
                                chars2 = chars1[1].split(',');

                            }
                            var j = 0;
                            var untill = false;
                            let dateIsAfter = false;
                            while (j < chars.length) {
                                var strcheck = chars[j];
                                var strcheckchars1 = strcheck.split('=');
                                if (strcheckchars1[0] == 'UNTIL') {
                                    untill = true
                                }
                                j++;
                            }
                            if (untill) {
                                dateIsAfter = moment(event.EndDate).isAfter(moment(date));
                            } else {
                                dateIsAfter = true
                            }
                            if (dateIsAfter) {
                                weekDays.map(function (rules, index) {
                                    chars2.map(function (weekday, index) {
                                        if (weekday == rules.name) {
                                            weekdays.push(rules.value)
                                        }
                                    })
                                })
                            }
                            var maxAttendance = '';
                            var confirmedRegistration = '';
                            var availableRegistartion = '';
                            var startDates = moment();
                            let classDate = moment(event.EndDate).format("YYYY-MM-DD");
                            var endDate = moment(startDates, "YYYY-MM-DD").add(threshold, 'days');
                            maxAttendance = event.MaxAttendance;

                            const date = moment().toDate();

                            if (dateIsAfter) {
                             
                                setCheckClasses(false)
                                confirmedRegistration = event.ConfirmedReservations.length;
                                //  availableRegistartion = parseFloat(event.MaxAttendance) - parseFloat(confirmedRegistration);
                                availableRegistartion = event.MaxAttendance;

                                let starttime = '';
                                let starttimeUnformated = '';
                                starttime = moment(event.StartDate).format("hh:mm a ");
                                starttimeUnformated = moment(event.StartDate).format("HH:mm:ss");
                                setTimeout(function () {
                                    setloader(false);
                                }, 3000);
                                getDates(startDates, endDate, threshold, availableRegistartion, starttime, event.Title, event.Id, starttimeUnformated, 1, event.ConfirmedReservations);
                            }
                            // else{
                            //     setCheckClasses(true)

                            //     setloader(false);
                            // }
                        }
                    })
                    if (checkClasses == true) {
                        setTimeout(function () {
                            setloader(false);
                        }, 3000);
                    }
                    else {
                        setTimeout(function () {
                            setloader(false);
                        }, 3000);
                    }
                });
        } catch (e) { }
    }
    const getDates = (sDate, eDate, threshold, availableRegistartion, starttime, title, taskId, starttimeUnformated, index, confirmedReservations) => {
        const startDate = moment(sDate)
        const endDate = moment(eDate);
        const daysOfWeek = [];
        let i = 0;
        datesArray = recurrenceRule;
        datesCleassesArray = [];
        const complete = { key: 'complete', color: 'green' };
        while (i < parseInt(threshold) && startDate <= endDate) {
            weekdays.map(function (rules, index) {
                if (startDate.day() == rules) {
                    let dates = moment(startDate).format('YYYY-MM-DD');
                    let datesCheck = moment(startDate).format('MM/DD/YYYY');
                    Object.assign(datesArray, {
                        [dates]: {
                            selected: true,
                            selectedColor: '#4895FF',
                            disabled: false,
                            disableTouchEvent: false,
                            marked: true
                        },
                    })
                    var dats;
                    var slotsavailable = availableRegistartion;

                    confirmedReservations.map(function (reserved, index) {
                        if (datesCheck == reserved.CheckInTime) {
                            if (availableRegistartion != 0 && availableRegistartion != null) {
                                slotsavailable = availableRegistartion - reserved.Count
                            } else {
                                slotsavailable = availableRegistartion
                            }

                        }
                    })


                    dats =
                    {
                        'classdate': dates,
                        "availableRegistartion": slotsavailable,
                        "starttime": starttime,
                        "title": title,
                        "taskId": taskId,
                        "starttimeUnformated": starttimeUnformated
                    }

                    setDatesClasses((prevStates) => [...prevStates, dats]);
                }
            })
            daysOfWeek.push(startDate.day());
            startDate.add(1, "day");
            i++;
        }
        weekdays = [];
        setRecurrenceRule(datesArray)
        datesCleassesArray = [];
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
                                if (studentIds.length <= students) {
                                    let dataArray = { label: data.FirstName + " " + data.LastName, value: data.StudentId }
                                    setStudentData((prevState) => [...prevState, data]);
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

    const getSelectedDayEvents = date => {
        let starttime = moment(startDateUnformatted).format("HH:mm:ss");
        let startDate = moment(date).format("MM/DD/YYYY");
        let datesCheck = new Date(date + ' ' + starttime);
        setSelectedDate(date)
        let markedDates = {};
        Object.entries(recurrenceRule).forEach(([key, value]) => {
            if (key == date) {
                Object.assign(markedDates, {
                    [key]: {
                        selected: true,
                        selectedColor: '#3db9adf0',
                        disabled: false,
                        disableTouchEvent: false,
                        marked: true
                    },
                })
            } else {
                Object.assign(markedDates, {
                    [key]: {
                        selected: true,
                        selectedColor: '#4895FF',
                        disabled: false,
                        disableTouchEvent: false,
                        marked: true
                    },
                })
            }
            setSelectedTaskId('')
            setselectedTaskTime('')
            setSelectedTaskDate('')
        });
        setRecurrenceRule(markedDates)

        setTimeout(function () {
            setloader(false);
        }, 3000);
    };
    const reserveClass = () => {
        setErrorMessage('');
        setSuccessMessage('')
        if (selectedTaskDate == '') {
            Alert.alert(" Alert",
                "Please select class slot",
                [{
                    text: 'Ok',
                    style: 'cancel',
                },]);
            return false
        }
        if (selectedStudent == undefined) {
            Alert.alert(" Alert",
                "Please select student",
                [{
                    text: 'Ok',
                    style: 'cancel',
                },]);
            return false
        }
        const apiUrl = API_URL.trim();
        let studentName = '';
        let studentEmail = '';
        let selecteDate = moment(selectedTaskDate).format("MM/DD/YYYY");
        studentData.map(function (student, index) {
            if (selectedStudent == student.StudentId) {
                studentName = student.FirstName + ' ' + student.LastName
                studentEmail = student.Email
            }

        })
        setLoaderMessage(true)
        fetch(`${apiUrl}public/ClassReservation`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                taskId: selectedTaskId,
                CheckInTime: selecteDate + ' ' + selectedTaskTime,
                StudentId: selectedStudent,
                StudentName: studentName,
                StudentEmail: studentEmail,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                if (data != "FAILURE:You are already signed up for this class" && data != "FAILURE:Failed to record class reservation") {
                    setLoaderMessage(false)
                    setSuccessMessage("Successfully Submitted.");
                    setTimeout(function () {
                        setSelectedDate('')
                        setSelectedStudent('')
                        setSuccessMessage('')
                        setErrorMessage('')
                        setSelectedTaskId('')
                        setselectedTaskTime('')
                        setSelectedTaskDate('')
                        clearCalander()
                        clearData()
                        setDatesClasses([])
                        getData();

                    }, 3000);
                }
                else {
                    setLoaderMessage(false)
                  ;
                    let cleanStr = data.replace(/FAILURE:/g, "");
                    setErrorMessage(cleanStr);
                    setTimeout(function () {
                        setErrorMessage('');
                    }, 6000);
                }
            });
    }
    const clearData = async () => {
        setCheckClasses(true)
        setDatesClasses([])
        setLoaderCheck(true)
        setStartDate('')
        setEndDate('')
        setSelectedDate('')
        setSelectedStudent('')
        setSuccessMessage('')
        setErrorMessage('')
        setLoaderMessage(false)
        weekdays = [];
        setRecurrenceRule({})
        setDatesClasses([])
        setloader(true);
        setSelectedTaskId('')
        setselectedTaskTime('')
        setSelectedTaskDate('')
        uniqueStudent = [];
        datesArray = {};
        datesCleassesArray = [];
    }
    const selectClass = (id, time, date, slots) => {

        setSelectedTaskId(id)
        setselectedTaskTime(time)
        setSelectedTaskDate(date)
        if (slots > 0) {
            setSetSlot(slots)
        }
        else if (slots == null) {
            setSetSlot(null)
        }
        else {
            setSetSlot('0')
        }
    }
    const placeholderStudent = {
        label: "Select Student",
    };
    const { navigation } = props;
    const clearCalander = () => {
        let markedDates = {};
        Object.entries(recurrenceRule).forEach(([key, value]) => {
            Object.assign(markedDates, {
                [key]: {
                    selected: true,
                    selectedColor: '#4895FF',
                    disabled: false,
                    disableTouchEvent: false,
                    marked: true
                },
            })
        });
        setRecurrenceRule(markedDates)
    }
    return (
        <Container
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Class Reservation"} backLink="Class Reservation" navigation={props.navigation} />
            <Content padder>
                {loader ? (
                    <Content>
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#29ABE2" />
                        </View>
                    </Content>
                ) : (
                    !checkClasses ?
                        <View>
                            {typeof eventListing !== "undefined" &&
                                eventListing.length > 0 ?
                                <View>
                                    <Title style={{ justifyContent: "flex-start", textAlign: "left", marginLeft: 5, marginBottom: 10, fontSize: 26, color: "#222", fontWeight: "bold", paddingBottom: 20, }}>
                                        {classImg != '' ?

                                            <Image source={{
                                                uri: "data:image/png;base64," + classImg,
                                            }}
                                                style={{ resizeMode: 'contain', height: 50, width: 60, marginRight: 10, paddingRight: 10 }} />
                                            : null}
                                          &nbsp; {eventListing['0'].Title} </Title>
                                </View>
                                : null}
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
                                        style={{ borderBottomWidth: 1, borderBottomColor: ' black' }}
                                    />
                                </Calendar>
                            </View>
                            <View>
                                {selectedDate != '' ?
                                    datesClasses.map(function (classes, index) {
                                        return (
                                            classes.classdate == selectedDate && eventListing['0'].Title == classes.title ?
                                                <View style={{ marginBottom: 10, marginTop: 10 }} key={index}>
                                                    <View style={globalStyle.eventsListingWrapper}>
                                                        <View style={globalStyle.eventsListingTopWrapper}>
                                                            <View style={{ paddingLeft: 15, paddingRight: 10, width: "100%" }}>
                                                                <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {classes.title}</Title>
                                                                <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, paddingTop: 20, marginTop: 20 }}>
                                                                    <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{moment(selectedDate).format("MMMM Do, YYYY")}</Text></Text>
                                                                </View>
                                                                <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Time: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{classes.starttime}</Text></Text>
                                                                {classes.availableRegistartion != null ? <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Available Slots: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{classes.availableRegistartion > 0 ? classes.availableRegistartion : 0}</Text></Text>
                                                                    : null}
                                                                <Button
                                                                    onPress={() => selectClass(classes.taskId, classes.starttimeUnformated, classes.classdate, classes.availableRegistartion)}
                                                                    style={classes.taskId == selectedTaskId && classes.starttimeUnformated == selectedTaskTime && classes.classdate == selectedTaskDate ? { width: '48%', backgroundColor: "#4585ff", borderRadius: 6 } : { width: '48%', backgroundColor: "#aaa", borderRadius: 6 }}
                                                                    full>
                                                                    <Text style={loginStyle.buttonText}>
                                                                        {classes.taskId == selectedTaskId && classes.starttimeUnformated == selectedTaskTime && classes.classdate == selectedTaskDate ?
                                                                            "Selected" : "Select"}
                                                                    </Text>
                                                                </Button>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                                : null
                                        )

                                    })
                                    : null
                                }
                            </View>
                            {selectedDate != '' ?
                                <View style={globalStyle.eventsListingWrapper}>
                                    <Text style={{ fontWeight: "bold", marginBottom: 10 }}>{studentIds.length > 0 && studentIds.length != undefined ? 'Select Student': "No students linked"}</Text>
                                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                                        {studentIds.length > 0 && studentIds.length != undefined ?
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
                                                                top: Platform.OS === "android" ? -10 : -28,
                                                                right: Platform.OS === "android" ? 7 : 5,
                                                            }}
                                                            source={require("../../../../assets/arrow-down.png")}
                                                            resizeMode={"contain"}
                                                        />
                                                    );
                                                }}
                                            />
                                            : null}
                                    </View>
                                </View>
                                : null}
                            {loaderMessage ? (
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator size="large" color="#29ABE2" />
                                </View>
                            ) : null}
                            {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
                            {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
                            {selectedDate == '' ? <View style={[globalStyle.eventsListingWrapper, { marginTop: 10 }]}>
                                <Text style={{ fontSize: 16, color: "#555", fontWeight: "bold", textAlign: "center", marginBottom: 0 }}>
                                    Select date to view class times and availability
                                </Text>
                            </View>
                                : null}
                            {selectedDate != '' && selectedStudent != '' && selectedStudent != null &&  !loaderMessage?  
                                <ImageBackground
                                    style={[
                                        globalStyle.Btn,
                                        {
                                            width: "100%",
                                            marginBottom: 30
                                        },
                                    ]}
                                    source={require("./../../../../assets/Oval.png")}
                                    resizeMode={"stretch"}
                                >
                                    <Button
                                        onPress={() => {
                                            slot > 0 || slot == null ?
                                                reserveClass() :
                                                Alert.alert(" Alert",
                                                    "There are no slots available for this class. You will be added to the waitlist. Are you sure you would like to reserve a slot for the waitlist?",
                                                    [{
                                                        text: 'OK',
                                                        onPress: () => reserveClass()
                                                    }, {
                                                        text: 'Cancel',
                                                        style: 'cancel',
                                                    },]);
                                        }}
                                        style={loginStyle.buttons} full>
                                        <Text style={loginStyle.buttonText}>Reserve Class</Text>
                                    </Button>
                                </ImageBackground>
                                : null}
                        </View>
                        :
                        <View style={{ marginTop: 20 }}>
                            <View style={globalStyle.eventsListingWrapper}>
                                <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "normal", color: "#555" }}>No  Class  Available </Text>
                            </View>
                        </View>
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
