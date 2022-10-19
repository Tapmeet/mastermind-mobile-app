// import { Container, Header, Title, Left, Icon, Right, Button, Body,  Card, CardItem, Content,  Accordion } from "native-base";
import { Image, ImageBackground, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Alert,View,Text, ScrollView } from "react-native";
import React from "react";
import FooterTabs from "../../footer/Footer";
import CartWidget from "../../cart/Cartwidget"
import { SideBarMenu } from "../../sidebar";
import globalStyle from "../../../style/globalStyle";
import { AntDesign, Entypo } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import loginStyle from "../../../style/login/loginStyle";
import { fontSize } from "styled-system";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";;
import moment from 'moment';
import { color } from "react-native-reanimated";
import { ADD_TO_CART, UPDATE_CART } from "./../../../redux/Retail";

const apiUrl = API_URL.trim();
var sizeList = [];
var colorList = [];
const ProductDetails = (props) => {
  const [eventid, setEventid] = React.useState('');
  const [productTitle, setProductTitle] = React.useState('');
  const userId = useSelector((state) => state);
  const retail = useSelector((state) => state);
  const [studentIds, setStudentIds] = React.useState([]);
  const [selectedStudent, setSelectedStudent] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [retailProducts, setRetailProducts] = React.useState([]);
  const [personId, setPersonId] = React.useState('');
  const [loader, setloader] = React.useState(true);
  const [eventListing, setEventListing] = React.useState([]);
  const [collapsed, setCollapsed] = React.useState(false);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [collapsed3, setCollapsed3] = React.useState(true);
  const [collapsed4, setCollapsed4] = React.useState(true);
  const [size, setSize] = React.useState('');
  const [colors, setColors] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const dispatch = useDispatch();
  const userRetail = (userRetail) =>
    dispatch({ type: "ADD_TO_CART", payload: userRetail });
  const updateRetail = (updateRetail) =>
    dispatch({ type: "UPDATE_CART", payload: updateRetail });
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed2(true);
    setCollapsed3(true);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
    setCollapsed3(true);
    setCollapsed(true);
  };
  const toggleExpanded3 = () => {
    setCollapsed2(true);
    setCollapsed(true);
    setCollapsed3(!collapsed3);
  };
  const toggleExpanded4 = () => {
    setCollapsed2(true);
    setCollapsed(true);
    setCollapsed3(true);
    setCollapsed4(!collapsed4);
  };
  var quanity = [];
  for (var i = 1; i <= 100; i++) {
    quanity.push({ label: "" + i + "", value: i })
  }

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setProductTitle('');
      setSize('');
      setColors('');
      setQuantity('')
      if (retail.cartItemsReducer.length > 0) {
        setRetailProducts(retail.cartItemsReducer);
      }
      if (eventListing == "") {
        async function getData() {
          try {
            const value = await AsyncStorage.getItem("eventId");
            const title = await AsyncStorage.getItem("eventTitle");
            setEventid(value)
            setProductTitle(title)
          } catch (e) { }
        }
        getData();
        getStudents()
        fetch(`${apiUrl}/odata/OrganizationRetail`, {
          method: "get",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.retailsDTO) {
              setEventListing(data.retailsDTO)
              setloader(false);
            } else {
              setloader(false);
            }
          });

      }
    });
  }, [eventListing]);
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
  const storeData = async (value, price) => {
    if (selectedStudent == undefined) {
      Alert.alert(" Alert",
        "Please select student",
        [{
          text: 'Ok',
          style: 'cancel',
        },]);
      return false
    }
    if (sizeList.length > 0) {

      if (size == '' || size == undefined) {
        Alert.alert(" Alert",
          "Please select Size",
          [{
            text: 'Ok',
            style: 'cancel',
          },]);
        return false
      }
    }
    if (colorList.length > 0) {
      if (colors == '' || colors == undefined) {
        Alert.alert(" Alert",
          "Please select color",
          [{
            text: 'Ok',
            style: 'cancel',
          },]);
        return false
      }
    }
    if (quantity == '') {
      Alert.alert(" Alert",
        "Please select quantity",
        [{
          text: 'Ok',
          style: 'cancel',
        },]);
      return false
    }
    let eventPrice = JSON.stringify(price);
    let retails = retail.cartItemsReducer;
    if (retails.length > 0) {
      var productindex = '';
      var productquantity = '';
      retails.map(function (product, index) {
        if (product.id == eventid && product.studentIds[0] == selectedStudent && product.size == size && product.colors == colors) {
          productindex = index;
          productquantity = product.quantity;
        }
      })
      if (productindex === '') {
        let dataArray = {
          id: eventid,
          studentIds: [selectedStudent],
          eventPrice: eventPrice,
          productTitle: productTitle,
          size: size,
          colors: colors,
          quantity: quantity,
        };
        setRetailProducts((prevState) => [...prevState, dataArray]);
        userRetail({
          id: eventid,
          studentIds: [selectedStudent],
          eventPrice: eventPrice,
          productTitle: productTitle,
          size: size,
          colors: colors,
          quantity: quantity,
        });
      } else {
        let newArr = [...retails]; // copying the old datas array
        newArr[productindex] = {
          id: eventid,
          studentIds: [selectedStudent],
          eventPrice: eventPrice,
          productTitle: productTitle,
          size: size,
          colors: colors,
          quantity: parseInt(quantity) + parseInt(productquantity),
        };
        updateRetail(newArr);
        setRetailProducts(newArr);
      }

    } else {
      setRetailProducts([{
        id: eventid,
        studentIds: [selectedStudent],
        eventPrice: eventPrice,
        productTitle: productTitle,
        size: size,
        colors: colors,
        quantity: quantity,
      }])
      userRetail({
        id: eventid,
        studentIds: [selectedStudent],
        eventPrice: eventPrice,
        productTitle: productTitle,
        size: size,
        colors: colors,
        quantity: quantity,
      });
    }
  };
  const { navigation } = props;
  const placeholderQuantity = {
    label: "Select Quantity",
  };
  const placeholderStudent = {
    label: "Select Student",
  };
  return (
     <View
      style={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <SideBarMenu title={"Product Details"}  backLink="Retail" navigation={props.navigation} />
      {loader ? (
         <View>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
         </View  >
      ) : (
        typeof eventListing !== "undefined" &&
          eventListing.length > 0 ? (
          eventListing.map(function (event, index) {
            if (event.PosItemId == eventid) {
              if (sizeList.length <= 0) {
                event.Sizes.map(function (size, index) {
                  let data = { label: size, value: size }
                  sizeList.push(data)
                })
              }
              if (colorList.length <= 0) {
                event.Colors.map(function (colors, index) {
                  let data = { label: colors, value: colors }
                  colorList.push(data)
                })
              }
            }
            const placeholderColor = {
              label: "Select Color",
            };
            const placeholderSize = {
              label: "Select Size",
            };
            return (
              event.PosItemId == eventid ?
                 <ScrollView key={index} style={{marginBottom: 150}}>
                  <Image source={require("./../../../../assets/retails.jpg")} style={{ width: "100%", height: 220 }} />
                  <View style={{ margin: 15, marginTop: 25 }}>
                    <Text style={{ justifyContent: "flex-start", textAlign: "left", paddingLeft: 5, fontSize: 20, color: "#222", fontWeight: "600" }}> {event.Title}</Text>
                    <TouchableOpacity onPress={() => { toggleExpanded() }}>
                      <View style={globalStyle.accordianStyle}>
                        <Text
                          style={{
                            color: "#000",
                            fontSize: 22,
                            marginBottom: 0,
                            fontWeight: "bold",
                            paddingTop:10
                          }}
                        >
                          About
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
                                top: Platform.OS === "android" ? -8 : -28,
                                right: 7,
                              }}
                              source={require("../../../../assets/arrow-down.png")}
                              resizeMode={"contain"}
                            />
                          );
                        }}
                      />
                    </View>
                    {sizeList.length > 0 ?
                      <View>
                        <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Select Size</Text>
                        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                        <RNPickerSelect
                            value={size}
                            items={sizeList}
                            placeholder={placeholderSize}
                            onValueChange={(value) => setSize(value)}
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
                                    top: Platform.OS === "android" ? -8 : -28,
                                    right: 7,
                                  }}
                                  source={require("../../../../assets/arrow-down.png")}
                                  resizeMode={"contain"}
                                />
                              );
                            }}
                          />
                        </View>
                      </View>
                      : null}
                    {colorList.length > 0 ?
                      <View>
                        <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Select Color</Text>
                        <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                        <RNPickerSelect
                            value={colors}
                            items={colorList}
                            placeholder={placeholderColor}
                            onValueChange={(value) => setColors(value)}
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
                                    top: Platform.OS === "android" ? -8 : -28,
                                    right: 7,
                                  }}
                                  source={require("../../../../assets/arrow-down.png")}
                                  resizeMode={"contain"}
                                />
                              );
                            }}
                          />

                        </View>
                      </View>
                      : null}
                    <Text style={{ fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>Select Quantity</Text>
                    <View style={{ borderColor: "#ccc", borderWidth: 1, marginRight: 10, borderRadius: 5 }}>
                    <RNPickerSelect
                        value={quantity}
                        items={quanity}
                        placeholder={placeholderQuantity}
                        onValueChange={(value) => setQuantity(value)}
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
                                top: Platform.OS === "android" ? -8 : -28,
                                right: 7,
                              }}
                              source={require("../../../../assets/arrow-down.png")}
                              resizeMode={"contain"}
                            />
                          );
                        }}
                      />

                    </View>
                    {event.IsAvailable ?
                      <View style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingTop: 40,
                        paddingBottom: 20
                      }}>
                        <Text style={{ color: "#1873e8", fontSize: 24, fontWeight: "bold", paddingTop:10 }}>${event.Price}</Text>
                        {studentIds.length > 0 && studentIds.length != undefined ?
                        <TouchableOpacity style={globalStyle.purchaseBtn} onPress={() => storeData(event.PosItemId, event.Price)} >
                          <Text style={{ borderColor: "#1873e8", color: "#333", textTransform: "uppercase", borderWidth: 1, paddingBottom: 15, paddingLeft: 30, paddingRight: 30, paddingTop: 22, fontSize: 22, fontWeight: "bold", borderRadius: 15 }}>Add to cart</Text>
                        </TouchableOpacity>
                        : <Text>No students linked</Text> }
                      </View>
                      : null
                    }
                  </View> 
                 </ScrollView  >
                : null
            );
          })
        ) : null
      )}
      <CartWidget navigation={props.navigation} />
     </View>
  );
};

export default ProductDetails;
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