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
import { SideBarMenu } from "../../sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../Utility/AppConst";
import moment from 'moment';
import { useSelector, useDispatch } from "react-redux";
import { ADD_TO_CART, UPDATE_CART } from "./../../../redux/Retail";
var total = 0;
var checkStudentIds = [];
const apiUrl = API_URL.trim();

const PurchaseProduct = (props) => {
  const retail = useSelector((state) => state);
  const isCarousel = React.useRef(null);
  const [purchaseStatus, setPurchaseStatus] = React.useState(false);
  const [loader, setloader] = React.useState(true);
  const [processing, setProcessing] = React.useState(false);
  const [eventid, setEventid] = React.useState('');
  const [eventPrice, setEventPrice] = React.useState('');
  const [size, setSize] = React.useState('');
  const [colors, setColors] = React.useState('');
  const [quantity, setQuantity] = React.useState('');
  const [productTitle, setProductTitle] = React.useState('');
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
  const dispatch = useDispatch();
  const updateRetail = (updateRetail) =>
    dispatch({ type: "UPDATE_CART", payload: updateRetail });
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
    console.log(uniqueArray)
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
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setStudentIds([]);
      setPersonId('')
      if (personId == '') {
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
                      let dataArray = { id: data.StudentId, name: data.FirstName + " " + data.LastName, isChecked: false }
                      setStudentIds((prevState) => [...prevState, dataArray]);
                      setloader(false)
                    }
                  });
              });
            } else {
              setloader(false);
            }
          });
      }
    });
  }, [personId]);
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
          console.log(data.value)
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
    // let selectedstudent = studentIds.filter(
    //   (studentIds) => studentIds.isChecked
    // );
    // let selectedStudentArray = selectedstudent.map((a) => a.id);

    // console.log(selectedStudentArray);
    // // console.log(defaultId);
    // // console.log(eventid)
    // if (selectedStudentArray.length <= 0) {
    //   setErrorMessage("Please Select Student");
    //   return false
    // }
    setProcessing(true)
    // let uniqueArray = unique(selectedStudentArray);
    retail.cartItemsReducer.length > 0 ?
      retail.cartItemsReducer.map(function (product, index) {
        console.log('productproductproductproductproductproduct')
        console.log(product)

        fetch(`${apiUrl}/odata/PurchaseOfSale`, {
          method: "post",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
          },
          body: JSON.stringify({
            PosItemId: product.id,
            LinkedStudentIds: product.studentIds,
            PersonPaymentMethodId: defaultId,
            PurchaseType: "2",
            Quantity: product.quantity,
            Color: product.colors,
            Size: product.size
          }),
        })
          .then((response) => response.json())
          .then((response) => {
            setProcessing(false)
            console.log('response');
            console.log(response);
            // setLoaderMessage(false);
            if (response["order"]) {
              setSuccessMessage("Product Purchased  Successfully");
              setPurchaseStatus(true)
              // setTimeout(function () {
              //   props.navigation.navigate("Purchase History");
              // }, 3000);
              // let retails = retail.cartItemsReducer;
              // console.log(index)
              // let newRetails = retails.filter(function (products, productindex) {
              //     return productindex != index
              // });
              // total = 0;
              // updateRetail(newRetails);
              // setTimeout(function () {
              //   props.navigation.navigate("Retail");
              //   setSuccessMessage("");
              // }, 3000);
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
      })
      : null
    setTimeout(function () {
      updateRetail([]);
    }, 5000);
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
  total = 0
  retail.cartItemsReducer.length > 0 ?
    retail.cartItemsReducer.map(function (product, index) {
      total = total + product.eventPrice * product.quantity
    })
    : null
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
      <SideBarMenu title={"PURCHASE Product"} navigation={props.navigation} />
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
                    ${total}
                  </Text>
                </View>
                {/* <Text
                  style={{
                    color: "#555",
                    fontSize: 20,
                    fontWeight: "600",
                    marginBottom: 20,
                  }}
                >
                  Please provide the details below
                </Text> */}
              </View>
            </View>
            {loader ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#29ABE2" />
              </View>
            ) : (
              <View>
                <View>

                  {loader == false && paymentMethod.length > 0 && paymentMethod != undefined ?
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

                      <View
                        style={{
                          marginLeft: -70,
                          marginTop: 20,
                          marginBottom: 20,
                        }}
                      >

                        <Carousel
                          ref={isCarousel}
                          data={paymentMethod}
                          renderItem={CarouselCardItem}
                          sliderWidth={SLIDER_WIDTH}
                          itemWidth={ITEM_WIDTH}
                          useScrollView={false}
                          currentIndex={activeindex}
                        />
                      </View>
                    </View>
                    :
                    <View
                      style={{
                        marginLeft: 0,
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    >
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
                        <Button onPress={() => props.navigation.navigate("Payment Methods")} style={loginStyle.buttons} full>
                          <Text style={loginStyle.buttonText}>Add Payment Method</Text>
                        </Button>
                      </ImageBackground>
                    </View>
                  }

                  {errorMessage != "" ? (
                    <Text style={globalStyle.errorText}>{errorMessage}</Text>
                  ) : null}
                  {SuccessMessage != "" ? (
                    <Text style={globalStyle.sucessText}>
                      {SuccessMessage}
                    </Text>
                  ) : null}
                  <Content style={loginStyle.formContainer}>
                    {!purchaseStatus && paymentMethod.length > 0 && paymentMethod != undefined ?
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
              </View>
            )
            }
          </Form>
        </View>
      </Content>
    </Container>
  );
};
export default PurchaseProduct;
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