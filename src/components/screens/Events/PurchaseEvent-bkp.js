import React, { Children } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity, ActivityIndicator,
  TextInput,
  ImageBackground,
  Dimensions
} from "react-native";
import Carousel from "react-native-snap-carousel";


import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Body,
  H2,
  Icon,
} from "native-base";
import loginStyle from "../../../style/login/loginStyle";
import globalStyle from "../../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../../sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./../../Utility/AppConst";
import moment from 'moment';
var checkStudentIds = [];
const apiUrl = API_URL.trim();
var selected = [];
const PurchaseEvent = (props) => {
  const isCarousel = React.useRef(null);
  const [loader, setloader] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [purchaseStatus, setPurchaseStatus] = React.useState(false);
  const [eventid, setEventid] = React.useState('');
  const [eventPrice, setEventPrice] = React.useState('');
  const [eventDefaultPrice, setEventDefaultPrice] = React.useState('');
  const userId = useSelector((state) => state);
  const [studentIds, setStudentIds] = React.useState([]);
  const [totalStudent, setTotalStudent] = React.useState([]);
  const [personId, setPersonId] = React.useState('');
  const [paymentMethod, setPaymentMethod] = React.useState([])
  const [defaultId, setDefaultId] = React.useState('');
  const [activeindex, setActiveIndex] = React.useState('0');
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [selectedStudents, setSelectedStudents] = React.useState([]);
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      clearData();
    });

  });
  const clearData = () => {
    setPaymentMethod([])
    setSuccessMessage("")
    setErrorMessage("")
    setPurchaseStatus(false)
  }
  const selectStudent = (id) => {
    let temp = studentIds.map((studentIds) => {
      if (id === studentIds.id) {
        return { ...studentIds, isChecked: !studentIds.isChecked };
      }
      return studentIds;
    });
    let selectedstudent = temp.filter(
      (studentIds) => studentIds.isChecked
    );
    let selectedStudentArray = selectedstudent.map((a) => a.id);
    let price = 0;
    let uniqueArray = unique(selectedStudentArray);
    // console.log(uniqueArray)
    if (uniqueArray.length > 0) {
      price = parseFloat(eventDefaultPrice) * parseFloat(uniqueArray.length);
      // console.log(price)
      setEventPrice(price);
    }
    else {
      setEventPrice(eventDefaultPrice);
    }

    setStudentIds(temp);
  };


  const selectAccount = (id) => {
    setDefaultId(id)
  };
  async function getData() {
    try {
      const value = await AsyncStorage.getItem("eventId");
      const eventPrice = await AsyncStorage.getItem("eventPrice");
      const selectedstudents = await AsyncStorage.getItem("studentIds");
      selected = JSON.parse(selectedstudents);
      if (selected.length > 0) {
        let price = parseFloat(eventPrice) * parseFloat(selected.length);
        console.log(price)
        setSelectedStudents(selected)
        setEventid(value)
        setEventDefaultPrice(eventPrice);
        setEventPrice(price)
        getStudent()
      }

    } catch (e) { }
  }

  React.useEffect(() => {
    navigation.addListener("focus", async () => {
      setStudentIds([]);
      setPersonId('')
      setloader(true)
      if (personId == '' && loader == true) {
        await getData();
      }
    });
  }, [personId]);
  function getStudent() {
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
        getPaymentMethod(data.PersonId)
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
                  if (selected.length > 0) {
                    var checkSelectedid = false;
                    selected.map(function (student, index) {
                      if (student == data.StudentId) {
                        checkSelectedid = true;
                      }
                    })
                    if (checkSelectedid) {
                      console.log('hrerer')
                      let dataArray = { id: data.StudentId, name: data.FirstName + " " + data.LastName, isChecked: true }
                      setStudentIds((prevState) => [...prevState, dataArray]);
                      setloader(false)
                    }
                    else {
                      console.log('threrer')
                      let dataArray = { id: data.StudentId, name: data.FirstName + " " + data.LastName, isChecked: false }
                      setStudentIds((prevState) => [...prevState, dataArray]);
                      setloader(false)
                    }
                  }
                  else {
                    let dataArray = { id: data.StudentId, name: data.FirstName + " " + data.LastName, isChecked: false }
                    setStudentIds((prevState) => [...prevState, dataArray]);
                    setloader(false)
                  }
                }
              });
          });
        } else {
          setloader(false);
        }
      });
  }
  function getPaymentMethod(personIds) {
    fetch(`${apiUrl}/odata/People(${personIds})/PersonPaymentMethods`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId.userDataReducer[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.value) {
          // setloader(false)
          setPaymentMethod(data.value)
          // console.log(data.value)
          data.value.length > 0 ?
            data.value.map(function (payment, index) {
              setActiveIndex(index)
              payment.IsDefault ? setDefaultId(payment.PersonPaymentMethodId) : null
            })
            : null
        }
        else {
          //  setloader(false)
        }
      });
  }
  function unique(array) {
    return array.filter(function (el, index, arr) {
      return index == arr.indexOf(el);
    });
  }
  const submitForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    let selectedstudent = studentIds.filter(
      (studentIds) => studentIds.isChecked
    );
    let selectedStudentArray = selectedstudent.map((a) => a.id);

    //console.log(selectedStudentArray);
    // console.log(defaultId);
    // console.log(eventid)
    if (selectedStudentArray.length <= 0) {
      setErrorMessage("Please Select Student");
      return false
    }
    setProcessing(true)
    let uniqueArray = unique(selectedStudentArray);
    fetch(`${apiUrl}/odata/PurchaseOfSale`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: JSON.stringify({
        PosItemId: eventid,
        LinkedStudentIds: uniqueArray,
        PersonPaymentMethodId: defaultId,
        PurchaseType: "1"
      }),
    })
      .then((response) => response.json())
      .then(async (response) => {
        setProcessing(false)
        // console.log(response);
        // setLoaderMessage(false);
        if (response["order"]) {
          setSuccessMessage("Event Purchased  Successfully");
          await AsyncStorage.removeItem('studentIds')
          // setTimeout(function () {
          //   props.navigation.navigate("Events");
          //   setSuccessMessage("");
          // }, 3000);
          setPurchaseStatus(true)
        } else {
          setErrorMessage(response["odata.error"].message.value);
          //  setErrorMessage("An error has occurred.");
          setTimeout(function () {
            //props.navigation.navigate("Payment Methods");
            setErrorMessage("");
          }, 3000);
        }
      })
      .catch(function (data) {
        setProcessing(false)
        console.log("Error", data);
      });
    // .then((response) => {
    //   console.log(response);
    //   setLoaderMessage(false);
    //   let jsonData = JSON.stringify(response);
    //   console.log(jsonData);
    //   let jsonDataPrase = JSON.parse(jsonData);
    //   console.log(jsonDataPrase.status);
    //   if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
    //     setSuccessMessage("Event Purchased  Successfully");
    //     // setTimeout(function () {
    //     //   props.navigation.navigate("Payment Methods");
    //     //   setSuccessMessage("");
    //     // }, 3000);
    //   } else {
    //     setErrorMessage("An error has occurred.");
    //     setTimeout(function () {
    //       setErrorMessage("");
    //     }, 3000);
    //   }
    // })
    // .catch((response) => {
    //   setErrorMessage("An error has occurred.");
    //   setTimeout(function () {
    //     setErrorMessage("");
    //   }, 3000);
    // });

  };
  const { navigation } = props;
  const SLIDER_WIDTH = Dimensions.get("window").width + 60;
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const CarouselCardItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => selectAccount(item.PersonPaymentMethodId)}>
        {defaultId == item.PersonPaymentMethodId ?
          <ImageBackground
            style={[
              globalStyle.slider,
              {
                width: "100%",
                height: 180,
                justifyContent: "center",
              },
            ]}
            source={require("./../../../../assets/sliderbg.png")}
            resizeMode={"stretch"}
          >

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#fff",
                paddingBottom: 10,
              }}
            >
              {"XXXX-XXXX-XXXX-" + item.Last4Digits}
            </Text>
            <Text style={{ fontSize: 18, color: "#fff" }}>{item.Nickname}</Text>
            <View style={[globalStyle.sliderWrapper, { justifyContent: "flex-end", alignSelf: "flex-end", marginTop: 10, marginRight: 20 }]}>
              <Text style={{ fontSize: 18, color: "#333", marginRight: 5 }}>  {item.PaymentTypeId != 2 ? "Card" : "Account"}</Text>
              {item.PaymentTypeId != 2 ?
                <Image source={require("./../../../../assets/credit-card.png")} style={{ height: 20, width: 20 }} />
                : <Image source={require("./../../../../assets/museum.png")} style={{ height: 20, width: 20 }} />}
            </View>
          </ImageBackground>
          :
          <View
            style={[
              globalStyle.slider,
              {
                width: "100%",
                height: 180,
                justifyContent: "center",
                backgroundColor: "#333",
                borderRadius: 25
              },
            ]}
          >

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                color: "#fff",
                paddingBottom: 10,
              }}
            >
              {"XXXX-XXXX-XXXX-" + item.Last4Digits}
            </Text>
            <Text style={{ fontSize: 18, color: "#fff" }}>{item.Nickname}</Text>
            <View style={[globalStyle.sliderWrapper, { justifyContent: "flex-end", alignSelf: "flex-end", marginTop: 10, marginRight: 20 }]}>
              <Text style={{ fontSize: 18, color: "#333", marginRight: 5 }}>  {item.PaymentTypeId != 2 ? "Card" : "Account"}</Text>
              {item.PaymentTypeId != 2 ?
                <Image source={require("./../../../../assets/credit-card.png")} style={{ height: 20, width: 20 }} />
                : <Image source={require("./../../../../assets/museum.png")} style={{ height: 20, width: 20 }} />}
            </View>
          </View>
        }
      </TouchableOpacity>
    );
  };
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"PURCHASE EVENT"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          <Form style={{ marginBottom: 20 }}>
            <View
              style={{
                marginTop: 10,
                padding: 15,
                paddingBottom: 10,
              }}
            >
              <View>
                <View style={{ display: "flex", position: "relative", alignItems: "flex-end", justifyContent: "space-between", flexDirection: "row", width: "84%", borderBottomColor: "#f4f4f4", paddingBottom: 10, marginBottom: 20, borderBottomWidth: 2 }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 26,
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    Purchase
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginBottom: 2,
                    }}
                  >
                    ${eventPrice}
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#555",
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 20,
                  }}
                >
                  Please check the details below
                </Text>
              </View>
            </View>
            {loader ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#29ABE2" />
              </View>
            ) : (
              <View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    fontWeight: "bold",
                    lineHeight: 26,
                    marginBottom: 10,
                    marginTop: 20,
                  }}
                >
                  Selected students:
                </Text>
                <View>
                  {studentIds.map(function (student, index) {
                    return (
                      index < totalStudent ?
                        <TouchableOpacity
                          key={index}
                          style={
                            student.isChecked
                              ? [
                                globalStyle.inquiryBox,
                                { backgroundColor: "#4895FF" },
                              ]
                              : globalStyle.inquiryBox
                          }
                          onPress={() => selectStudent(student.id)}
                        >
                          <Text
                            style={
                              student.isChecked
                                ? { color: "#fff", fontSize: 20, marginBottom: 0 }
                                : { color: "#000", fontSize: 20, marginBottom: 0 }
                            }
                          >
                            {student.name}
                          </Text>
                        </TouchableOpacity>
                        : null
                    )
                  })
                  }
                </View>
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 18,
                      fontWeight: "bold",
                      lineHeight: 26,
                      marginBottom: 10,
                      marginTop: 20,
                    }}
                  >
                    Select Payment Method:
                  </Text>
                </View>
                <View
                  style={{
                    marginLeft: -70,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  {loader == false ?
                    <Carousel
                      ref={isCarousel}
                      data={paymentMethod}
                      renderItem={CarouselCardItem}
                      sliderWidth={SLIDER_WIDTH}
                      itemWidth={ITEM_WIDTH}
                      useScrollView={false}
                      currentIndex={activeindex}
                    />
                    : null}
                </View>
                {errorMessage != "" ? (
                  <Text style={globalStyle.errorText}>{errorMessage}</Text>
                ) : null}
                {SuccessMessage != "" ? (
                  <Text style={globalStyle.sucessText}>
                    {SuccessMessage}
                  </Text>
                ) : null}
                <Content style={loginStyle.formContainer}>
                  {!purchaseStatus ?
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
                      <Button onPress={submitForm} style={loginStyle.buttons} full>
                        <Text style={loginStyle.buttonText}>Proceed</Text>
                      </Button>
                    </ImageBackground>
                    : <ImageBackground
                      style={[
                        globalStyle.Btn,
                        {
                          width: "100%",
                        },
                      ]}
                      source={require("./../../../../assets/Oval.png")}
                      resizeMode={"stretch"}
                    >
                      <Button onPress={() => props.navigation.navigate("Purchase History")} style={loginStyle.buttons} full>
                        <Text style={loginStyle.buttonText}>View Order</Text>
                      </Button>
                    </ImageBackground>}
                  {processing ? (
                    <View style={[styles.container, styles.horizontal]}>
                      <ActivityIndicator size="large" color="#29ABE2" />
                    </View>
                  ) : null}
                </Content>
              </View>
            )
            }
          </Form>
        </View>
      </Content>
    </Container>
  );
};
export default PurchaseEvent;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    minWidth: 105,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 18,
    minWidth: 105,
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