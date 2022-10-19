import React, { Component } from 'react';
//import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Content, View, Accordion, Footer, FooterTab } from 'native-base';
import { ImageBackground, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Text, View, Dimensions } from 'react-native';
import globalStyle from "../../../style/globalStyle";
import { SideBarMenu } from "./../../sidebar";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../Utility/AppConst";
import loginStyle from "../../../style/login/loginStyle"
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";;
import { ADD_TO_EVENT, UPDATE_EVENT } from "./../../../redux/Event";
var total = 0;
const apiUrl = API_URL.trim();
const CartEvents = (props) => {
    const win = Dimensions.get("window");
    const retail = useSelector((state) => state);
    const userId = useSelector((state) => state);
    const [personId, setPersonId] = React.useState('');
    const [studentIds, setStudentIds] = React.useState([]);
    const [totalStudent, setTotalStudent] = React.useState([]);
    const [loader, setloader] = React.useState(true);
    const [retailProducts, setRetailProducts] = React.useState([]);
    const dispatch = useDispatch();
    const updateRetail = (updateRetail) =>
        dispatch({ type: "UPDATE_EVENT", payload: updateRetail });
    React.useEffect(() => {
        props.navigation.addListener("focus", () => {
            total = 0;
            if (retail.eventReducer.length > 0) {
                setRetailProducts(retail.eventReducer);
            }
            if (loader == true) {
                getStudents()
            }


        });
        total = 0;
        if (retail.eventReducer.length > 0) {
            setRetailProducts(retail.eventReducer);
        }

    }, []);
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
                                    setStudentIds((prevState) => [...prevState, dataArray]);
                                    setloader(false)
                                }
                            });
                    });

                }
            });
    }
    const setproductsQuantities = (productindex, value) => {
        if (value != '' && value != undefined) {
            let retails = retail.eventReducer;
            let newArr = [...retails];

            newArr[productindex] = {
                id: newArr[productindex].eventId,
                studentIds: newArr[productindex].studentIds,
                eventPrice: newArr[productindex].eventPrice,
                productTitle: newArr[productindex].productTitle,
            };
            total = 0;
            updateRetail(newArr);
            setRetailProducts(newArr);
        }
    }
    const deleteProduct = (productindex) => {
        if (productindex != '' || productindex != undefined) {
            let retails = retail.eventReducer;
            let newRetails = retails.filter(function (product, index) {
                return index != productindex
            });
            total = 0;
            updateRetail(newRetails);
            setRetailProducts(newRetails);
        }
    }
        ;
    total = 0
    retail.eventReducer.length > 0 ?
        retail.eventReducer.map(function (product, index) {
            total = parseInt(total) + parseInt(product.eventPrice)
        })
        : null
    return (
         <View
            style={{
                backgroundColor: "#FFFFFF",
            }}
        >
            <SideBarMenu title={"Cart"} navigation={props.navigation} />
            {loader ? (
                 <View>
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                 </View  >
            ) : (
                 <View padder style={{ marginTop: 10 }}>
                    {studentIds.length > 0 ?
                        <View style={{ marginBottom: 10 }} >
                            {retail.eventReducer.length > 0 ?
                                retail.eventReducer.map(function (product, index) {
                                    return <View style={globalStyle.eventsListingWrapper} key={index}>
                                        <View style={globalStyle.eventsListingTopWrapper}>
                                            <View style={{ paddingLeft: 15, paddingRight: 15 }}>
                                                <View style={{ display: "flex", position: "relative", alignItems: "flex-end", justifyContent: "space-between", flexDirection: "row", width: "100%", borderBottomColor: "#f4f4f4", paddingBottom: 5, marginBottom: 20, borderBottomWidth: 2 }}>
                                                    <Text style={{ fontSize: 22, fontWeight: "bold", color: "#000", width: "100%" }}>
                                                        {product.productTitle}
                                                    </Text>
                                                    <TouchableOpacity
                                                        style={{
                                                            width: 18,
                                                            position: "absolute",
                                                            top: Platform.OS === "android" ? -15 : -28,
                                                            right: 0,
                                                            opacity: 0.8,
                                                            zIndex: 99,

                                                        }}
                                                        onPress={() => {
                                                            Alert.alert(" Alert",
                                                                "Are you sure you want to remove this event ?",
                                                                [{
                                                                    text: 'OK',
                                                                    onPress: () => deleteProduct(index)
                                                                }, {
                                                                    text: 'Cancel',
                                                                    style: 'cancel',
                                                                },]);
                                                        }}
                                                    >
                                                        <Image

                                                            style={{
                                                                width: 18,
                                                            }}
                                                            source={require("../../../../assets/garbage.png")}
                                                            resizeMode={"contain"}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                                <View>
                                                    {
                                                        studentIds.map(function (student, index) {
                                                            return (
                                                                student.value == product.studentIds[0] ?
                                                                    (<Text key={index}>{student.label}</Text>)
                                                                    : null
                                                            )
                                                        })
                                                    }
                                                </View>
                                                <View style={{ borderTopColor: "#f4f4f4", paddingTop: 5, marginTop: 20, borderTopWidth: 2 }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            fontWeight: "bold",
                                                            color: "#898989",
                                                            paddingBottom: 5,
                                                            justifyContent: "flex-end",
                                                            alignItems: "flex-end",
                                                            display: "flex",
                                                            width: "100%",
                                                            textAlign: "right"
                                                        }}
                                                    >
                                                        Price: ${product.eventPrice}
                                                    </Text>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                })
                                : <View style={[globalStyle.tableList, { width: "100%", justifyContent: "center" }]}>
                                    <Text style={{ textAlign: "center", fontSize: 20 }}>No Items in the Bag </Text>
                                </View>
                            }
                            <View style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 0, paddingLeft: 40, paddingRight: 40, marginTop: 0 }}>
                                {retail.eventReducer.length > 0 ?
                                    <ImageBackground
                                        style={[globalStyle.BtnHalf, { width: "100%" }]
                                        }
                                        source={require('../../../../assets/Oval.png')}
                                        resizeMode={'stretch'}
                                    >
                                        <TouchableOpacity
                                            style={[loginStyle.buttonSave, { alignSelf: "center" }]}

                                            full
                                            onPress={() => props.navigation.navigate("Purchase Event")}
                                        >
                                            <Text style={loginStyle.buttonText}>Proceed to Payments</Text>
                                        </TouchableOpacity>
                                    </ImageBackground>
                                    : null}
                                <TouchableOpacity
                                    style={[loginStyle.buttonSecondarys, { marginTop: 20, width: "100%" }]}
                                    onPress={() => props.navigation.navigate("Events")}
                                >
                                    <Text style={[loginStyle.buttonText, { color: "#333" }]}>Additional  Registration</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                 </View  >

            )}
            <ImageBackground
               style={[globalStyle.barStylingfooter, {
                height: 70,
                top: win.height - 30
            }]}
                source={require('./../../../../assets/bgBottom.png')}
                resizeMode={'stretch'}
            >
                <View >
                    <View style={{ paddingBottom: 10, paddingTop: 10, display: "flex", flexDirection: 'row', width: "100%", justifyContent: "space-around", alignItems: "center" }}>
                        <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 20 }}>Total </Text>
                        <Text style={{ color: "#fff", fontSize: 25, paddingRight: 20 }}>
                            ${total}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
         </View>
    )
}
export default CartEvents;
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        minWidth: 100,
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