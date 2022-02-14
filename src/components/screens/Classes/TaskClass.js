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

    const toggleExpanded = () => {
        setCollapsed(!collapsed);
    };
    useFocusEffect(
        React.useCallback(() => {
            //  navigation.addListener("focus", () => {
            console.log("here")
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
            const threshold = await AsyncStorage.getItem("threshold");
            // console.log(value);
            //  console.log('value')
            setThreshold(threshold)
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
                    setEventListing(data);
                    setDatesClasses([])
                    data.map(function (event, index) {
                        if (index == 0) {
                            setDatesClasses([])
                            datesCleassesArray = [];

                        }
                        var str = event.RecurrenceRule;
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

                        weekDays.map(function (rules, index) {
                            chars2.map(function (weekday, index) {
                                if (weekday == rules.name) {
                                    weekdays.push(rules.value)
                                }
                            })
                        })

                        var maxAttendance = '';
                        var confirmedRegistration = '';
                        var availableRegistartion = '';
                        var startDates = moment();
                        var endDate = moment(startDates, "DD-MM-YYYY").add(threshold, 'days');
                        maxAttendance = event.MaxAttendance;
                        if (event.MaxAttendance == null) {
                            availableRegistartion = 0;
                        } else {
                            confirmedRegistration = event.ConfirmedReservations.length;
                            availableRegistartion = parseFloat(event.MaxAttendance) - parseFloat(confirmedRegistration);
                        }
                        let starttime = '';
                        let starttimeUnformated = '';
                        starttime = moment(event.StartDate).format("hh:mm a ");
                        starttimeUnformated = moment(event.StartDate).format("HH:mm:ss");
                        // console.log(starttime)
                        // console.log('starttime')
                        setTimeout(function () {
                            setloader(false);
                        }, 1000);
                        if (index == 0) {
                            // setDatesClasses([])
                            // datesCleassesArray = [];

                            getDates(startDates, endDate, threshold, availableRegistartion, starttime, event.Title, event.Id, starttimeUnformated, 0);
                        }
                        else {
                            getDates(startDates, endDate, threshold, availableRegistartion, starttime, event.Title, event.Id, starttimeUnformated, 1);
                        }
                        if (index + 1 == data.length) {
                            setTimeout(function () {
                                setloader(false);
                            }, 1000);
                        }
                    })
                });
        } catch (e) { }
    }
    const getDates = (sDate, eDate, threshold, availableRegistartion, starttime, title, taskId, starttimeUnformated, index) => {
        const startDate = moment(sDate)
        const endDate = moment(eDate);
        const daysOfWeek = [];
        let i = 0;
        datesArray = recurrenceRule;
        datesCleassesArray = [];
        const complete = { key: 'complete', color: 'green' };
        while (i < parseInt(threshold) && startDate <= endDate) {
            //console.log(weekdays);
            weekdays.map(function (rules, index) {
                if (startDate.day() == rules) {
                    let dates = moment(startDate).format('YYYY-MM-DD');
                    Object.assign(datesArray, {
                        [dates]: {
                            selected: true,
                            selectedColor: '#4895FF',
                            disabled: false,
                            disableTouchEvent: false,
                            marked: true
                        },
                    })
                    let dats =
                    {
                        'classdate': dates,
                        "availableRegistartion": availableRegistartion,
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
        // console.log(datesCleassesArray);
        // console.log('weekdays array');
        weekdays = [];
        setRecurrenceRule(datesArray)

        //setDatesClasses(datesCleassesArray)
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

    const getSelectedDayEvents = date => {

        //console.log(startDate)

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

        // console.log("here")
        // console.log(markedDates)
        setRecurrenceRule(markedDates)

        setTimeout(function () {
            setloader(false);
        }, 1000);
    };
    const reserveClass = () => {
        if (selectedTaskDate == '') {
            Alert.alert(" Alert",
                "Please select class slot",
                [{
                    text: 'Ok',
                    //onPress: () => //console.log('Cancel Pressed'),
                    style: 'cancel',
                },]);
            return false
        }
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

        // console.log(selecteDate + ' ' + selectedTaskTime)

        // console.log(selectedStudent)
        // console.log('selectedStudent')
        // console.log(studentName)
        // console.log('studentName')
        // console.log(studentEmail)
        // console.log('studentEmail')
        // console.log(classId)
        // console.log('taskId')
        fetch(`${apiUrl}public/ClassReservation`, {
            method: "post",
            headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
            },
            body: JSON.stringify({
                taskId: classId,
                CheckInTime: selecteDate + ' ' + selectedTaskTime,
                StudentId: selectedStudent,
                StudentName: studentName,
                StudentEmail: studentEmail,
            }),
        })
            .then((response) => response.text())
            .then((data) => {
                console.log(data)
                if (data != "FAILURE:You are already signed up for this class") {
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
                    setErrorMessage(data);
                    setTimeout(function () {
                        setErrorMessage('');
                    }, 3000);
                }
            });
        // .then((response) => {
        //     console.log("response")
        //     let jsonData = JSON.stringify(response);
        //     console.log(jsonData)
        //     let jsonDataPrase = JSON.parse(jsonData);
        //     setLoaderMessage(false)
        //     // console.log(jsonDataPrase.status)
        //     if (jsonDataPrase.status != 200) {
        //         setLoaderMessage(false)
        //         setErrorMessage("An error has occurred.");
        //     } else {
        //         setSuccessMessage("Successfully Submitted.");
        //         setTimeout(function () {
        //             setSelectedDate('')
        //             setSelectedStudent('')
        //             setSuccessMessage('')
        //             setErrorMessage('')
        //             setSelectedTaskId('')
        //             setselectedTaskTime('')
        //             setSelectedTaskDate('')
        //             clearCalander()
        //         }, 3000);
        //     }
        // });
    }
    const clearData = async () => {
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
    const selectClass = (id, time, date) => {
        setSelectedTaskId(id)
        setselectedTaskTime(time)
        setSelectedTaskDate(date)
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
            <SideBarMenu title={"Class Schedule"} backLink="Class Reservation" navigation={props.navigation} />
            <Content padder>
                {loader ? (
                    <Content>
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#29ABE2" />
                        </View>
                    </Content>
                ) : (
                    //     typeof eventListing !== "undefined" &&
                    //         eventListing.length > 0 ? (
                    //         eventListing.map(function (event, index) {
                    //             let startDate = moment(event.StartDate).format("MMMM Do, YYYY");
                    //             let starttime = moment(event.StartDate).format("hh:mm a ");
                    //             let str = event.RecurrenceRule;
                    //             let chars = str.split(';');
                    //             let str1, chars1;
                    //             if (chars.length == 4) {
                    //                 str1 = chars[3];
                    //                 chars1 = str1.split('=');
                    //             }
                    //             else if (chars.length == 3) {
                    //                 str1 = chars[2];
                    //                 chars1 = str1.split('=');
                    //             }
                    //             else if (chars.length == 2) {
                    //                 str1 = chars[1];
                    //                 chars1 = str1.split('=');
                    //             }
                    //             let chars2;
                    //             if (chars1[0] == 'BYDAY' || chars1[0] == 'WKST') {
                    //                 chars2 = chars1[1].split(',');

                    //             }
                    //             let weekdayname = [];

                    //             weekDays.map(function (rules, index) {
                    //                 chars2.map(function (weekday, index) {
                    //                     if (weekday == rules.name) {
                    //                         weekdayname.push(rules.fullName)
                    //                     }
                    //                 })
                    //             })
                    //             return (
                    //                 <View style={{ marginBottom: 10, marginTop: 10 }} key={index}>
                    //                     {/* <TouchableOpacity
                    //                     //  onPress={() => storeData(event.ClassId, event.Name)}
                    //                     >
                    //                         <View style={globalStyle.eventsListingWrapper}>
                    //                             <View style={globalStyle.eventsListingTopWrapper}>
                    //                                 <View style={{ paddingLeft: 15, paddingRight: 10, width: "100%" }}>
                    //                                     <Title style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Title>
                    //                                     <View style={{ borderTopColor: "#ccc", borderTopWidth: 1, paddingTop: 20, marginTop: 20 }}>
                    //                                         {event.Description != '' && event.Description != null ?
                    //                                             <Text
                    //                                                 style={{
                    //                                                     color: "#000",
                    //                                                     fontSize: 22,
                    //                                                     marginBottom: 0,
                    //                                                     fontWeight: "bold",
                    //                                                     width: "100%"
                    //                                                 }}
                    //                                             >
                    //                                                 Description
                    //                                             </Text>
                    //                                             : null}
                    //                                     </View>
                    //                                     {event.Description != '' && event.Description != null ?
                    //                                         <View style={{ borderBottomColor: "#ccc", borderBottomWidth: 1, paddingBottom: 20, marginBottom: 20 }}>
                    //                                             <Text style={globalStyle.p}>{event.Description}</Text>
                    //                                         </View>
                    //                                         : null}
                    //                                     <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Date: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{startDate}</Text></Text>
                    //                                     <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Start Time: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{starttime}</Text></Text>
                    //                                     <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Weekday: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{weekdayname.toString()}</Text></Text>
                    //                                     {/* <ImageBackground
                    //                                         style={[
                    //                                             globalStyle.Btn,
                    //                                             {
                    //                                                 width: "100%",
                    //                                             },
                    //                                         ]}
                    //                                         source={require("./../../../../assets/Oval.png")}
                    //                                         resizeMode={"stretch"}
                    //                                     >
                    //                                         <Button onPress={() => storeData(event.Id)} style={loginStyle.buttons} full>
                    //                                             <Text style={loginStyle.buttonText}>Select</Text>
                    //                                         </Button>
                    //                                     </ImageBackground> */}
                    //                                 </View>
                    //                             </View>
                    //                         </View>
                    //                     </TouchableOpacity> */}


                    //                 </View>

                    //             );
                    //         })
                    //     ) : null
                    // )}
                    <View>
                        {typeof eventListing !== "undefined" &&
                            eventListing.length > 0 ?
                            <View>
                                <Title style={{ justifyContent: "flex-start", textAlign: "left", marginLeft: 5, marginBottom: 10, fontSize: 26, color: "#222", fontWeight: "bold", paddingBottom: 20, }}>  {eventListing['0'].Title}</Title>
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
                                    // onVisibleMonthsChange={months => this.onMonthChange(months)}
                                    // pagingEnabled
                                    style={{ borderBottomWidth: 1, borderBottomColor: ' black' }}
                                />
                            </Calendar>
                        </View>
                        <View>
                            {selectedDate != '' ?
                                datesClasses.map(function (classes, index) {
                                    // console.log('classes')
                                    // console.log(classes)
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
                                                            <Text style={{ fontSize: 18, color: "#555", fontWeight: "bold", marginBottom: 10 }}>Available Slots: <Text style={{ fontSize: 18, color: "#555", fontWeight: "normal" }}>{classes.availableRegistartion > 0 ? classes.availableRegistartion : 0}</Text></Text>
                                                            {/* {classes.availableRegistartion > 0 ? */}
                                                            <Button
                                                                onPress={() => selectClass(classes.Id, classes.starttimeUnformated, classes.classdate)}
                                                                style={classes.Id == selectedTaskId && classes.starttimeUnformated == selectedTaskTime && classes.classdate == selectedTaskDate ? { width: '48%', backgroundColor: "#4585ff", borderRadius: 6 } : { width: '48%', backgroundColor: "#aaa", borderRadius: 6 }}
                                                                full>
                                                                <Text style={loginStyle.buttonText}>
                                                                    {classes.Id == selectedTaskId && classes.starttimeUnformated == selectedTaskTime && classes.classdate == selectedTaskDate ?
                                                                        "Selected" : "Select"}
                                                                </Text>
                                                            </Button>
                                                            {/* // : null} */}

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
                                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>Select Student</Text>
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
                        {selectedDate != '' && selectedStudent != '' && selectedStudent != null ?
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
                                        Alert.alert(" Alert",
                                            "Are you sure you want to make a reservation?",
                                            [{
                                                text: 'OK',
                                                onPress: () => reserveClass()
                                            }, {
                                                text: 'Cancel',
                                                //onPress: () => //console.log('Cancel Pressed'),
                                                style: 'cancel',
                                            },]);
                                    }}
                                    style={loginStyle.buttons} full>
                                    <Text style={loginStyle.buttonText}>Reserve Class</Text>
                                </Button>
                            </ImageBackground>
                            : null}
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
