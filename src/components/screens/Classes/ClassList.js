import { Container, Header, Title, Left, Icon, Right, Button, Body, Text, Card, CardItem, Content, View, Select } from "native-base";
import { Image, RefreshControl, SafeAreaView, Dimensions, ScrollView, ImageBackground, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../../Utility/AppConst";
import loginStyle from "../../../style/login/loginStyle";
import { useFocusEffect } from '@react-navigation/native';
const apiUrl = API_URL.trim();
const ClassList = (props) => {
    const [loader, setloader] = React.useState(true);
    const userId = useSelector((state) => state);
    const [eventListing, setEventListing] = React.useState([]);
    const [threshold, setThreshold] = React.useState('');
    const [refreshing, setRefreshing] = React.useState(false);
    const win = Dimensions.get("window");
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getData(false);
        //wait(2000).then(() => setRefreshing(false));
    }, []);
    useFocusEffect(
        //navigation.addListener("focus", () => {
        React.useCallback(() => {
            getData(true);
            // });
            setRefreshing(false)
        }, [])
    );
    const getData = (check) => {
        if(check==false){
            setloader(false)
        }else{
            setloader(true)
        }
       
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
                setThreshold(data.threshold)
                setRefreshing(false)
                if (data.classes) {
                    setEventListing(data.classes);
                    setloader(false);
                } else {
                    setloader(false);
                }
            });
    }
    const storeData = async (value, title, img) => {
        let eventId = JSON.stringify(value);
        try {

            let thresholdString = threshold.toString()
            await AsyncStorage.setItem("eventId", eventId);
            if (img != null) {
                await AsyncStorage.setItem("classThumb", img);
            }
            else {
                await AsyncStorage.setItem("classThumb", '');
            }
            await AsyncStorage.setItem("eventTitle", title);
            await AsyncStorage.setItem("threshold", thresholdString);
            props.navigation.navigate("Class Tasks");
        } catch (e) {
            // saving error
        }
    };

    const { navigation } = props;
    return (

         <View
            style={{
                backgroundColor: "#f1f1f1",
            }}
        >
            <SideBarMenu title={"Classes"} navigation={props.navigation} backLink="Home" />
            {/* <View
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
                    Classes
                </Text>
            </View> */}
            <View style={{ marginBottom: 120 }}>
                <SafeAreaView >
                    {loader ? (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#29ABE2" />
                        </View>
                    ) : typeof eventListing !== "undefined" && eventListing.length > 0 ? (

                        <FlatList
                            data={eventListing}
                            refreshControl={<RefreshControl enabled={true} refreshing={refreshing} onRefresh={onRefresh} />}
                            renderItem={({ item, index, separators }) => (
                                <View style={{ margin: 10, marginBottom:0 }} key={index}>
                                    <TouchableOpacity onPress={() => storeData(item.ClassId, item.Name)}>
                                        <View style={globalStyle.eventsListingWrapper}>
                                            <View style={globalStyle.eventsListingTopWrapper}>
                                                <View style={{ borderRadius: 25, overflow: "hidden" }}>
                                                    {item.ImagePhotoPath == null ?
                                                        <Image source={require("./../../../../assets/img-dummy.jpg")} style={{ height: 110, width: 130 }} />
                                                        :
                                                        <Image source={{
                                                            uri: "data:image/png;base64," + item.ImagePhotoPath,
                                                        }}
                                                            style={{ resizeMode: 'contain', height: 110, width: 130 }} />
                                                    }
                                                </View>
                                                <View style={{ paddingLeft: 15, paddingRight: 10 }}>
                                                    <Text
                                                        style={{
                                                            fontSize: 18,
                                                            fontWeight: "bold",
                                                            color: "#16161D",
                                                            paddingBottom: 10,

                                                        }}
                                                    >
                                                        {item.Name}
                                                    </Text>
                                                    {/* {event.OnlineClass ?
                                                    <View style={[globalStyle.eventsListingBottomWrapper, { borderTopWidth: 0 }]}>

                                                        <Text
                                                            style={globalStyle.online}>
                                                            Online
                                                        </Text>

                                                    </View>
                                                    : null} */}
                                                    <Button onPress={() => storeData(item.ClassId, item.Name, item.ImagePhotoPath)}
                                                        style={{ marginTop: 10, justifyContent: "center", width: '80%', backgroundColor: "#4585ff", borderRadius: 6 }}
                                                    >
                                                        <Text style={[loginStyle.buttonText, { textAlign: "center", color: "#fff" }]}>Reserve Class</Text>
                                                    </Button>
                                                </View>
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />

                    ) : (
                        <View style={globalStyle.tableList}>
                            <Text>No Classes Available </Text>
                        </View>
                    )}
                </SafeAreaView>
            </View>
            <View style={{ zIndex: 999, position:"absolute", width:"100%", left:0, right:0, bottom:0 }}>
                <FooterTabs navigation={props.navigation} />
            </View>
         </View>
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
        marginTop:10
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
