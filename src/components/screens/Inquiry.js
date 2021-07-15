import React, { Children } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { API_URL } from "./../Utility/AppConst";
import PhoneInput from "react-phone-number-input/react-native-input";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";
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
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import { SignatureView } from "react-native-signature-capture-view";
const Inquiry = (props) => {
  const signatureRef = React.useRef(null);
  const [counter, setCounter] = React.useState(0);
  const [signature, setSignature] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [secondaryemail, setSecondaryemail] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [phone3, setPhone3] = React.useState("");
  const [employer, setEmployer] = React.useState("");
  const [occupation, setOccupation] = React.useState("");
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [checkCity, setCheckCity] = React.useState(false);
  const [checkState, setCheckState] = React.useState(false);
  const [checkZipCode, setCheckZipCode] = React.useState(false);
  const [checkAddress1, setCheckAddress1] = React.useState(false);
  const [checkPhone1, setCheckPhone1] = React.useState(false);
  const [checkEmployer, setCheckEmployer] = React.useState(false);
  const [checkOccupation, setCheckOccupation] = React.useState(false);
  const [checkAdultBenifit, setCheckAdultBenifit] = React.useState(false);
  const [checkChildBenifit, setCheckChildBenifit] = React.useState(false);
  const [checkNSignature, setCheckNSignature] = React.useState(false);
  const [showSignature, setShowSignature] = React.useState(false);
  const [inquiry, setInquiry] = React.useState("");
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [schoolName, setSchoolName] = React.useState("");

  React.useEffect(() => {
    navigation.addListener("focus", () => {
      clearData();
    });
    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/StudentAccount`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setSchoolName(data.SchoolFullName);
      });
  });

  const clearData = () => {
    setFirstName("");
    setLastName("");
    setAddress1("");
    setAddress2("");
    setEmail("");
    setSecondaryemail("");
    setState("");
    setZipCode("");
    setOccupation("");
    setCity("");
    setCounter(0);
    setPhone1("");
    setPhone2("");
    setPhone3("");
    setSignature("");
    setEmployer("");
    setShowSignature(false);
    setInquiry("");
    setChildrenList([]);
    setCounters(0);
    setInquiryFor("");
    setAdultBenefits(adultBenefitsList);
    setAdultBenefits(childrenBenefitsList);
  };
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const userId = useSelector((state) => state);
  const enquiry = [
    {
      label: "Auction",
      value: "1",
    },
    {
      label: "Auto Show",
      value: "2",
    },
    {
      label: "Back to school pc",
      value: "3",
    },
    {
      label: "Birthday Party",
      value: "4",
    },
    {
      label: "Bring a Friend",
      value: "5",
    },
    {
      label: "Buddy Week",
      value: "6",
    },
  ];
  const stateList = [
    { label: "Arizona", value: "Arizona" },
    { label: "Alabama", value: "Alabama" },
    { label: "Alaska", value: "Alaska" },
    { label: "Arkansas", value: "Arkansas" },
    { label: "California", value: "California" },
    { label: "Colorado", value: "Colorado" },
    { label: "Connecticut", value: "Connecticut" },
    { label: "Delaware", value: "Delaware" },
    { label: "Florida", value: "Florida" },
    { label: "Georgia", value: "Georgia" },
    { label: "Hawaii", value: "Hawaii" },
    { label: "Idaho", value: "Idaho" },
    { label: "Illinois", value: "Illinois" },
    { label: "Indiana", value: "Indiana" },
    { label: "Iowa", value: "Iowa" },
    { label: "Kansas", value: "Kansas" },
    { label: "Kentucky", value: "Kentucky" },
    { label: "Louisiana", value: "Louisiana" },
    { label: "Maine", value: "Maine" },
    { label: "Maryland", value: "Maryland" },
    { label: "Massachusetts", value: "Massachusetts" },
    { label: "Michigan", value: "Michigan" },
    { label: "Minnesota", value: "Minnesota" },
    { label: "Mississippi", value: "Mississippi" },
    { label: "Missouri", value: "Missouri" },
    { label: "Montana", value: "Montana" },
    { label: "Nebraska", value: "Nebraska" },
    { label: "Nevada", value: "Nevada" },
    { label: "New Hampshire", value: "New Hampshire" },
    { label: "New Jersey", value: "New Jersey" },
    { label: "New Mexico", value: "New Mexico" },
    { label: "New York", value: "New York" },
    { label: "North Carolina", value: "North Carolina" },
    { label: "North Dakota", value: "North Dakota" },
    { label: "Ohio", value: "Ohio" },
    { label: "Oklahoma", value: "Oklahoma" },
    { label: "Oregon", value: "Oregon" },
    { label: "Pennsylvania", value: "Pennsylvania" },
    { label: "Rhode Island", value: "Rhode Island" },
    { label: "South Carolina", value: "South Carolina" },
    { label: "South Dakota", value: "South Dakota" },
    { label: "Tennessee", value: "Tennessee" },
    { label: "Texas", value: "Texas" },
    { label: "Utah", value: "Utah" },
    { label: "Vermont", value: "Vermont" },
    { label: "Virginia", value: "Virginia" },
    { label: "Washington", value: "Washington" },
    { label: "West Virginia", value: "West Virginia" },
    { label: "Wisconsin", value: "Wisconsin" },
    { label: "Wyoming", value: "Wyoming" },
  ];
  const adultBenefitsList = [
    { id: 1, txt: "Fitness", isChecked: false },
    { id: 2, txt: "Family Time", isChecked: false },
    { id: 3, txt: "Confidence", isChecked: false },
    { id: 4, txt: "Self Defense", isChecked: false },
    { id: 5, txt: "Improve Focus", isChecked: false },
    { id: 6, txt: "New Activity", isChecked: false },
  ];
  const childrenBenefitsList = [
    { id: 1, txt: "Fitness", isChecked: false },
    { id: 2, txt: "Confidence", isChecked: false },
    { id: 3, txt: "Socialization", isChecked: false },
    { id: 4, txt: "Discipline", isChecked: false },
    { id: 5, txt: "Fun Activity", isChecked: false },
    { id: 6, txt: "Focus", isChecked: false },
  ];

  const [adultBenefits, setAdultBenefits] = React.useState(adultBenefitsList);
  const [childrenBenefits, setChildrenBenefits] =
    React.useState(childrenBenefitsList);

  const [childrenList, setChildrenList] = React.useState([]);
  const [counters, setCounters] = React.useState(0);

  const [inquiryFor, setInquiryFor] = React.useState("");

  const setinquiryFor = (e) => {
    setInquiryFor(e);
  };
  const increment = () => {
    let lastCounter = parseInt(counter) + 1;
    if (lastCounter == 1) {
      if (inquiryFor == "") {
        return false;
      }
    }
    if (lastCounter == 2) {
      if (firstName == "") {
        setErrorMessage("Enter First Name");
        setCheckFirstname(true);
        return false;
      }
      if (lastName == "") {
        setErrorMessage("Enter Last Name");
        setChecklastName(true);
        return false;
      }
      if (address1 == "") {
        setErrorMessage("Enter Address ");
        setCheckAddress1(true);
        return false;
      }
      if (city == "") {
        setErrorMessage("Enter City ");
        setCheckCity(true);
        return false;
      }
      if (zipCode == "") {
        setErrorMessage("Enter Postal Code ");
        setCheckZipCode(true);
        return false;
      }
      if (state == "") {
        setErrorMessage("Enter State ");
        setCheckState(true);
        return false;
      }
      if (email == "") {
        setErrorMessage("Enter Email");
        setCheckEmail(true);
        return false;
      }
      let checkemail = ValidateEmail(email);
      if (checkemail == false) {
        setErrorMessage("Enter Valid Email");
        setCheckEmail(true);
        return false;
      }

      if (phone1 == "") {
        setErrorMessage("Enter Phone");
        setCheckPhone1(true);
        return false;
      }
    }
    if (lastCounter == 4) {
      let selected = adultBenefits.filter(
        (adultBenefits) => adultBenefits.isChecked
      );
      let adultSelectedBenifits = selected.map((a) => a.txt);

      if (
        Array.isArray(adultSelectedBenifits) &&
        !adultSelectedBenifits.length
      ) {
        setCheckAdultBenifit(true);
        return false;
      }
    }
    if (inquiryFor == "myself") {
      if (counter == 1) {
        setCounter(parseInt(counter) + 2);
      } else {
        setCounter(parseInt(counter) + 1);
      }
    } else {
      setCounter(parseInt(counter) + 1);
    }
  };
  const decrement = () => {
    if (inquiryFor == "myself") {
      if (counter == 3) {
        setCounter(parseInt(counter) - 2);
      } else {
        setCounter(parseInt(counter) - 1);
      }
    } else {
      setCounter(parseInt(counter) - 1);
    }
  };
  const addSection = () => {
    let newArr = [...childrenList];
    newArr[counters] = {
      FirstName: "",
      LastName: "",
      DOB: "",
    };
    setCounters(parseInt(counters) + 1);
    setChildrenList(newArr);
  };
  const deleteSection = (e) => {
    setCounters(parseInt(counters) - 1);
    childrenList.splice(e, 1);
  };

  const updateFirstNameField = (e, index) => {
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: e,
      LastName: newArr[index].LastName,
      DOB: newArr[index].DOB,
    };
    setChildrenList(newArr);
  };
  const updatelastNameField = (e, index) => {
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: newArr[index].FirstName,
      LastName: e,
      DOB: newArr[index].DOB,
    };
    setChildrenList(newArr);
  };
  function checkValue(str, max) {
    if (str.charAt(0) !== "0" || str == "00") {
      var num = parseInt(str);
      if (isNaN(num) || num <= 0 || num > max) num = 1;
      str =
        num > parseInt(max.toString().charAt(0)) && num.toString().length == 1
          ? "0" + num
          : num.toString();
    }
    return str;
  }
  const dateTimeInputChangeHandler = (e, index) => {
    var input = e;
    var expr = new RegExp(/\D\/$/);
    if (expr.test(input)) input = input.substr(0, input.length - 3);
    var values = input.split("/").map(function (v) {
      return v.replace(/\D/g, "");
    });
    if (values[1]) values[1] = checkValue(values[1], 12);
    if (values[0]) values[0] = checkValue(values[0], 31);
    var output = values.map(function (v, i) {
      return v.length == 2 && i < 2 ? v + "/" : v;
    });
    // this.setState({
    //   registrationDate: output.join('').substr(0, 14),
    // });
    let newArr = [...childrenList]; // copying the old datas array
    newArr[index] = {
      FirstName: newArr[index].FirstName,
      LastName: newArr[index].LastName,
      DOB: output.join("").substr(0, 14),
    };
    setChildrenList(newArr);
  };
  const handleChange = (id) => {
    let temp = adultBenefits.map((adultBenefits) => {
      if (id === adultBenefits.id) {
        return { ...adultBenefits, isChecked: !adultBenefits.isChecked };
      }
      return adultBenefits;
    });
    setAdultBenefits(temp);
    let selected = temp.filter((adultBenefits) => adultBenefits.isChecked);
    let adultSelectedBenifits = selected.map((a) => a.txt);

    if (
      Array.isArray(adultSelectedBenifits) &&
      adultSelectedBenifits.length > 0
    ) {
      setCheckAdultBenifit(false);
      // return false;
    }
  };
  const handleChangeBenifits = (id) => {
    let temp = childrenBenefits.map((childrenBenefits) => {
      if (id === childrenBenefits.id) {
        return { ...childrenBenefits, isChecked: !childrenBenefits.isChecked };
      }
      return childrenBenefits;
    });

    setChildrenBenefits(temp);
  };

  // Setting data to variables and validations

  const setfirstName = (event) => {
    setFirstName(event);
    if (event == "") {
      setCheckFirstname(true);
    } else {
      setErrorMessage("");
      setCheckFirstname(false);
    }
  };

  const setlasttName = (event) => {
    setLastName(event);
    if (event == "") {
      setChecklastName(true);
    } else {
      setErrorMessage("");
      setChecklastName(false);
    }
  };
  const setaddress1 = (event) => {
    setAddress1(event);
    if (event == "") {
      setCheckAddress1(true);
    } else {
      setErrorMessage("");
      setCheckAddress1(false);
    }
  };
  const setaddress2 = (event) => {
    setAddress2(event);
  };
  const setcity = (event) => {
    setCity(event);
    if (event == "") {
      setCheckCity(true);
    } else {
      setErrorMessage("");
      setCheckCity(false);
    }
  };
  const setstate = (event) => {
    setState(event.itemValue);
    if (event == "") {
      setCheckState(true);
    } else {
      setErrorMessage("");
      setCheckState(false);
    }
  };
  const setzipCode = (event) => {
    setZipCode(event);
    if (event == "") {
      setCheckZipCode(true);
    } else {
      setErrorMessage("");
      setCheckZipCode(false);
    }
  };

  const setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setErrorMessage("");
      setCheckEmail(false);
    }
  };
  const setsecondaryemail = (event) => {
    setSecondaryemail(event);
  };

  const setphone1 = (event) => {
    setPhone1(event);
    if (event == "") {
      setCheckPhone1(true);
    } else {
      setCheckPhone1(false);
      setErrorMessage("");
    }
  };
  const setphone2 = (event) => {
    setPhone2(event);
  };
  const setphone3 = (event) => {
    setPhone3(event);
  };
  const setemployer = (event) => {
    setEmployer(event);
    if (event == "") {
      setCheckEmployer(true);
    } else {
      setErrorMessage("");
      setCheckEmployer(false);
    }
  };
  const setoccupation = (event) => {
    setOccupation(event);
    if (event == "") {
      setCheckOccupation(true);
    } else {
      setErrorMessage("");
      setCheckOccupation(false);
    }
  };

  //Form Submission
  const submitForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setCheckAdultBenifit(false);
    setCheckChildBenifit(false);
    setCheckNSignature(false);
    if (firstName == "") {
      setErrorMessage("Enter First Name");
      setCheckFirstname(true);
      return false;
    }
    if (lastName == "") {
      setErrorMessage("Enter Last Name");
      setChecklastName(true);
      return false;
    }
    if (address1 == "") {
      setErrorMessage("Enter Address ");
      setCheckAddress1(true);
      return false;
    }
    if (city == "") {
      setErrorMessage("Enter City ");
      setCheckCity(true);
      return false;
    }
    if (zipCode == "") {
      setErrorMessage("Enter Postal Code ");
      setCheckZipCode(true);
      return false;
    }
    if (state == "") {
      setErrorMessage("Enter State ");
      setCheckState(true);
      return false;
    }
    if (email == "") {
      setErrorMessage("Enter Email");
      setCheckEmail(true);
      return false;
    }
    let checkemail = ValidateEmail(email);
    if (checkemail == false) {
      setErrorMessage("Enter Valid Email");
      setCheckEmail(true);
      return false;
    }

    if (phone1 == "") {
      setErrorMessage("Enter Phone");
      setCheckPhone1(true);
      return false;
    }

    let selected = adultBenefits.filter(
      (adultBenefits) => adultBenefits.isChecked
    );
    let selectedBenifts = childrenBenefits.filter(
      (childrenBenefits) => childrenBenefits.isChecked
    );
    let adultSelectedBenifits = selected.map((a) => a.txt);
    let childSelectedBenifits = selectedBenifts.map((a) => a.txt);

    if (Array.isArray(adultSelectedBenifits) && !adultSelectedBenifits.length) {
      setCheckAdultBenifit(true);
      return false;
    }
    var children = "";
    childrenList.map((data, index) => {
      if (data.FirstName) {
        if (index == 0) {
          children =
            children + data.FirstName + "|" + data.LastName + "|" + data.DOB;
        } else {
          children =
            children +
            "!" +
            data.FirstName +
            "|" +
            data.LastName +
            "|" +
            data.DOB;
        }
      }
    });
    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/Inquiry`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId[0].access_Token,
      },
      body: JSON.stringify({
        Person: {
          FirstName: firstName,
          LastName: lastName,
          Address1: address1,
          Address2: address1,
          City: city,
          StateName: state,
          PostalCode: zipCode,
          Email: email,
          Email2: secondaryemail,
          Phone1: phone1,
          Phone2: phone2,
          Phone3: phone3,
          Employer: employer,
          Occupation: occupation,
        },
        Children: children,
        InquiryTypeId: inquiry,
        ChildrenBenefits: childSelectedBenifits,
        AdultBenefits: adultSelectedBenifits,
        SignatureUri: signature,
      }),
    }).then((response) => {
      // console.log("hererssssssssss")
      let jsonData = JSON.stringify(response);
      // console.log(jsonData)
      let jsonDataPrase = JSON.parse(jsonData);
      // console.log(jsonDataPrase.status)
      if (jsonDataPrase.status != 200) {
        setErrorMessage("An error has occurred.");
      } else {
        setSuccessMessage("Successfully Submitted.");
      }
    });
  };

  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Inquiry"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={loginStyle.contentContainer}>
          <View style={globalStyle.dflex}>
            <View
              style={[globalStyle.TopSection, { justifyContent: "flex-start" }]}
            >
              {counter > 1 ? (
                <Image
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
                  source={require("./../../../assets/lastCheck.png")}
                />
              ) : (
                <Image
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                  source={require("./../../../assets/activeicon.png")}
                />
              )}
            </View>
            <View style={[globalStyle.TopSection, { marginLeft: 40 }]}>
              {counter == 2 ? (
                <Image
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                  source={require("./../../../assets/activeicon.png")}
                />
              ) : counter > 2 ? (
                <Image
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
                  source={require("./../../../assets/lastCheck.png")}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                  source={require("./../../../assets/iconTop.png")}
                />
              )}
            </View>
            <View style={[globalStyle.TopSection, { marginLeft: 40 }]}>
              {counter == 3 ? (
                <Image
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                  source={require("./../../../assets/activeicon.png")}
                />
              ) : counter > 3 ? (
                <Image
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
                  source={require("./../../../assets/lastCheck.png")}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                  source={require("./../../../assets/iconTop.png")}
                />
              )}
            </View>
            <View
              style={[
                globalStyle.TopSection,
                { justifyContent: "flex-end", alignItems: "flex-end" },
              ]}
            >
              {counter == 4 ? (
                <Image
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                  source={require("./../../../assets/activeicon.png")}
                />
              ) : counter > 4 ? (
                <Image
                  style={{ height: 35, width: 35, resizeMode: "contain" }}
                  source={require("./../../../assets/lastCheck.png")}
                />
              ) : (
                <Image
                  style={{ height: 20, width: 20, resizeMode: "contain" }}
                  source={require("./../../../assets/iconTop.png")}
                />
              )}
            </View>
            <View style={globalStyle.line}></View>
          </View>

          <Form>
            <View
              style={{
                marginTop: 10,
                padding: 15,
                paddingBottom: 10,
              }}
            >
              {counter == 0 ? (
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 20,
                    }}
                  >
                    {" "}
                    Inquiry For
                  </Text>
                  <TouchableOpacity
                    style={
                      inquiryFor == "child"
                        ? [
                            globalStyle.inquiryBox,
                            { backgroundColor: "#4895FF" },
                          ]
                        : globalStyle.inquiryBox
                    }
                    onPress={() => setinquiryFor("child")}
                  >
                    <Text
                      style={
                        inquiryFor == "child"
                          ? { color: "#fff", fontSize: 20, marginBottom: 0 }
                          : { color: "#000", fontSize: 20, marginBottom: 0 }
                      }
                    >
                      {" "}
                      For Child
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      inquiryFor == "family"
                        ? [
                            globalStyle.inquiryBox,
                            { backgroundColor: "#4895FF" },
                          ]
                        : globalStyle.inquiryBox
                    }
                    onPress={() => setinquiryFor("family")}
                  >
                    <Text
                      style={
                        inquiryFor == "family"
                          ? { color: "#fff", fontSize: 20, marginBottom: 0 }
                          : { color: "#000", fontSize: 20, marginBottom: 0 }
                      }
                    >
                      {" "}
                      For Family
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={
                      inquiryFor == "myself"
                        ? [
                            globalStyle.inquiryBox,
                            { backgroundColor: "#4895FF" },
                          ]
                        : globalStyle.inquiryBox
                    }
                    onPress={() => setinquiryFor("myself")}
                  >
                    <Text
                      style={
                        inquiryFor == "myself"
                          ? { color: "#fff", fontSize: 20, marginBottom: 0 }
                          : { color: "#000", fontSize: 20, marginBottom: 0 }
                      }
                    >
                      {" "}
                      For Myself
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {counter == 1 ? (
                <View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 24,
                      fontWeight: "bold",
                      marginBottom: 0,
                    }}
                  >
                    Personal Information
                  </Text>
                  <View
                    style={
                      checkFirstname
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>First Name</Text>
                    <Input
                      value={firstName}
                      onChangeText={(text) => setfirstName(text)}
                      style={globalStyle.formControls}
                      placeholder="First Name"
                    />
                  </View>
                  {checkFirstname ? (
                    <Text style={globalStyle.error}>Enter First Name</Text>
                  ) : null}
                  <View
                    style={
                      checklastName
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Last Name</Text>
                    <Input
                      value={lastName}
                      onChangeText={(text) => setlasttName(text)}
                      style={globalStyle.formControls}
                      placeholder="Last Name"
                    />
                  </View>
                  {checklastName ? (
                    <Text style={globalStyle.error}>Enter Last Name </Text>
                  ) : null}
                  <View
                    style={
                      checkAddress1
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Primary Address</Text>
                    <Input
                      value={address1}
                      onChangeText={(text) => setaddress1(text)}
                      style={globalStyle.formControls}
                      placeholder="Primary Address"
                    />
                  </View>
                  {checkAddress1 ? (
                    <Text style={globalStyle.error}>Enter Address </Text>
                  ) : null}
                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Address</Text>
                    <Input
                      value={address2}
                      onChangeText={(text) => setaddress2(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Address"
                    />
                  </View>

                  <View
                    style={
                      checkCity
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>City</Text>
                    <Input
                      value={city}
                      onChangeText={(text) => setcity(text)}
                      style={globalStyle.formControls}
                      placeholder="City"
                    />
                  </View>
                  {checkCity ? (
                    <Text style={globalStyle.error}>Enter City</Text>
                  ) : null}

                  <View
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <View
                      style={
                        checkState
                          ? globalStyle.formFieldError
                          : globalStyle.formField
                      }
                    >
                      <Text style={globalStyle.formLabel}>State</Text>
                      <View style={globalStyle.formControls}>
                        <RNPickerSelect
                          value={state}
                          items={stateList}
                          onValueChange={(value) => setState(value)}
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
                                  top: -15,
                                  right: 15,
                                }}
                                source={require("../../../assets/arrow-down.png")}
                                resizeMode={"contain"}
                              />
                            );
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  {checkState ? (
                    <Text style={globalStyle.error}>Enter State</Text>
                  ) : null}

                  <View
                    style={
                      checkZipCode
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Postal Code</Text>
                    <Input
                      value={zipCode}
                      onChangeText={(text) => setzipCode(text)}
                      style={globalStyle.formControls}
                      placeholder="Postal Code"
                    />
                  </View>
                  {checkZipCode ? (
                    <Text style={globalStyle.error}>Enter Postal Code</Text>
                  ) : null}

                  <View
                    style={
                      checkEmail
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Primary Email</Text>
                    <Input
                      value={email}
                      onChangeText={(text) => setemail(text)}
                      style={globalStyle.formControls}
                      autoCapitalize="none"
                      placeholder="Primary Email "
                    />
                  </View>
                  {checkEmail ? (
                    <Text style={globalStyle.error}>Enter Valid Email</Text>
                  ) : null}
                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Email</Text>
                    <Input
                      value={secondaryemail}
                      style={globalStyle.formControls}
                      autoCapitalize="none"
                      onChangeText={(text) => setsecondaryemail(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Email "
                    />
                  </View>

                  <View
                    style={
                      checkPhone1
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Primary Phone</Text>
                    <PhoneInput
                      defaultCountry="US"
                      placeholder="Primary Phone"
                      value={phone1}
                      style={globalStyle.formControls}
                      onChange={(text) => setphone1(text)}
                    />
                    {/* <Input
                      value={phone1}
                      onChangeText={(text) => setphone1(text)}
                      style={globalStyle.formControls
                      }
                      placeholder="Primary Phone"
                    /> */}
                  </View>
                  {checkPhone1 ? (
                    <Text style={globalStyle.error}>Enter Phone Number </Text>
                  ) : null}

                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Secondary Phone</Text>
                    {/* <Input
                      value={phone2}
                      onChangeText={(text) => setphone2(text)}
                      style={globalStyle.formControls}
                      placeholder="Secondary Phone"
                    /> */}
                    <PhoneInput
                      defaultCountry="US"
                      initialValueFormat="national"
                      placeholder="Secondary Phone"
                      style={globalStyle.formControls}
                      value={phone2}
                      onChange={(text) => setphone2(text)}
                    />
                  </View>

                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>Other Phone</Text>
                    {/* <Input
                      value={phone3}
                      onChangeText={(text) => setphone3(text)}
                      style={globalStyle.formControls}
                      placeholder="Other Phone"
                    /> */}
                    <PhoneInput
                      defaultCountry="US"
                      style={globalStyle.formControls}
                      placeholder="Other Phone"
                      value={phone3}
                      onChange={(text) => setphone3(text)}
                    />
                  </View>

                  <View
                    style={
                      checkEmployer
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Employer</Text>
                    <Input
                      value={employer}
                      onChangeText={(text) => setemployer(text)}
                      style={globalStyle.formControls}
                      placeholder="Employer"
                    />
                  </View>
                  {checkEmployer ? (
                    <Text style={globalStyle.error}>Enter Employement </Text>
                  ) : null}

                  <View
                    style={
                      checkEmployer
                        ? globalStyle.formFieldError
                        : globalStyle.formField
                    }
                  >
                    <Text style={globalStyle.formLabel}>Occupation</Text>
                    <Input
                      value={occupation}
                      onChangeText={(text) => setoccupation(text)}
                      style={globalStyle.formControls}
                      placeholder="Occupation"
                    />
                  </View>
                  {checkOccupation ? (
                    <Text style={globalStyle.error}>Enter Occupation </Text>
                  ) : null}
                </View>
              ) : null}
            </View>
            {counter == 2 ? (
              <View
                style={{
                  marginTop: -20,
                  padding: 10,
                  paddingLeft: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  Child Information
                </Text>
                {typeof childrenList != undefined && childrenList.length
                  ? childrenList.map((data, index) => {
                      return (
                        <View key={index}>
                          <Text
                            style={{
                              color: "#000",
                              fontSize: 20,
                              fontWeight: "bold",
                              marginBottom: 0,
                              marginTop: 20,
                            }}
                          >
                            Enter Details Below
                          </Text>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>
                              First Name
                            </Text>
                            <Input
                              value={data.FirstName}
                              onChangeText={(text) =>
                                updateFirstNameField(text, index)
                              }
                              style={globalStyle.formControls}
                              placeholder="First Name"
                            />
                          </View>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>Last Name</Text>
                            <Input
                              value={data.LastName}
                              onChangeText={(text) =>
                                updatelastNameField(text, index)
                              }
                              style={globalStyle.formControls}
                              placeholder="Last Name"
                            />
                          </View>
                          <View style={globalStyle.formField}>
                            <Text style={globalStyle.formLabel}>DOB</Text>
                            <TextInput
                              keyboardType="number-pad"
                              style={[
                                globalStyle.formControls,
                                { marginTop: 10 },
                              ]}
                              maxLength={10}
                              placeholder="DD/MM/YYYY"
                              onChangeText={(e) =>
                                dateTimeInputChangeHandler(e, index)
                              }
                              value={data.DOB}
                            />
                          </View>
                        </View>
                      );
                    })
                  : null}

                <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                  <Button
                    onPress={addSection}
                    style={[loginStyle.buttonsSecondary]}
                    full
                  >
                    <Image
                      style={{ height: 15, marginRight: -10 }}
                      source={require("../../../assets/plus.png")}
                      resizeMode={"contain"}
                    />
                    <Text style={loginStyle.buttonText}>Add Child Details</Text>
                  </Button>
                </View>
              </View>
            ) : null}
            {counter == 3 ? (
              <View
                style={{
                  marginTop: -30,
                  padding: 10,
                  paddingLeft: 20,
                }}
              >
                <Text
                  style={{
                    color: "#000",
                    fontSize: 24,
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  Additional Information
                </Text>
                <Text
                  style={{
                    color: "#000",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 10,
                  }}
                >
                  How did you find out about our school?
                </Text>
                {/* <View style={globalStyle.formControl}>
                  <Picker
                    selectedValue={inquiry}
                    style={{ height: 50, width: '100%' }}
                    onValueChange={(itemValue, itemIndex) => setInquiry(itemValue)}
                  >
                    {enquiry.map((data) => <Picker.Item key={data.label + data.value} label={data.label} value={data.value} />)}
                  </Picker>
                </View> */}
                <View>
                  <View style={globalStyle.formField}>
                    <Text style={globalStyle.formLabel}>
                      Information Source
                    </Text>
                    <View style={globalStyle.formControls}>
                      <RNPickerSelect
                        value={inquiry}
                        items={enquiry}
                        onValueChange={(value) => setInquiry(value)}
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
                                top: -15,
                                right: 15,
                              }}
                              source={require("../../../assets/arrow-down.png")}
                              resizeMode={"contain"}
                            />
                          );
                        }}
                      />
                    </View>
                  </View>
                </View>

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
                  Please check the benefits you are interested in:
                </Text>
                <View>
                  {adultBenefits.map((item) => (
                    <View
                      key={item.id + item.txt}
                      style={{
                        flexDirection: "row",
                        flex: 1,
                        alignItems: "center",
                        marginBottom: 15,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          borderColor: "#ddd",
                          borderRadius: 5,
                          borderWidth: 2,
                          height: 25,
                          width: 28,
                        }}
                        value={item.isChecked}
                        onPress={() => {
                          handleChange(item.id);
                        }}
                      >
                        {item.isChecked ? (
                          <Image
                            style={{ height: 15, marginRight: 0, marginTop: 2 }}
                            source={require("../../../assets/checkTick.png")}
                            resizeMode={"contain"}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 20,
                          paddingLeft: 15,
                        }}
                      >
                        {item.txt}
                      </Text>
                    </View>
                  ))}
                  {checkAdultBenifit ? (
                    <Text style={globalStyle.error}>Please Check Options </Text>
                  ) : null}
                </View>
                {typeof childrenList != undefined && childrenList.length ? (
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
                      Please check the benefits Child interested in:
                    </Text>
                    <View>
                      {childrenBenefits.map((item) => (
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            marginBottom: 15,
                          }}
                          key={item.id + 100}
                        >
                          <TouchableOpacity
                            style={{
                              borderColor: "#ddd",
                              borderRadius: 5,
                              borderWidth: 2,
                              height: 25,
                              width: 28,
                            }}
                            value={item.isChecked}
                            onPress={() => {
                              handleChangeBenifits(item.id);
                            }}
                          >
                            {item.isChecked ? (
                              <Image
                                style={{
                                  height: 15,
                                  marginRight: 0,
                                  marginTop: 2,
                                }}
                                source={require("../../../assets/checkTick.png")}
                                resizeMode={"contain"}
                              />
                            ) : null}
                          </TouchableOpacity>
                          <Text
                            style={{
                              fontSize: 20,
                              paddingLeft: 15,
                            }}
                          >
                            {item.txt}
                          </Text>
                        </View>
                      ))}
                      {checkChildBenifit ? (
                        <Text style={globalStyle.error}>
                          Please Check Options{" "}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                ) : null}
              </View>
            ) : null}
            {counter == 4 ? (
              showSignature == false ? (
                <View
                  style={{ marginTop: -30, paddingLeft: 20, paddingRight: 20 }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 30,
                      fontWeight: "bold",
                      marginBottom: 20,
                      textAlign: "center",
                    }}
                  >
                    Signature
                  </Text>
                  {signature != "" ? (
                    <View>
                      <Text
                        style={{
                          marginBottom: 20,
                        }}
                      >
                        I, for myself and my heirs, waive and release all rights
                        and claims I may have against <Text style={{fontWeight: "bold"}}> {schoolName}</Text> and its
                        principals and/or representatives, whatsoever, in any
                        manner, as a result of my child's participation in said
                        marital arts instruction. I attest that my child is
                        physically and mentally fit.
                      </Text>
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Signature
                      </Text>
                      <Image
                        style={{
                          height: 100,
                          width: 300,
                          resizeMode: "contain",
                        }}
                        source={{ uri: signature }}
                      />
                    </View>
                  ) : null}

                  <Button
                    style={[
                      loginStyle.buttonsSecondary,
                      { marginTop: 30, marginBottom: 30 },
                    ]}
                    onPress={() => {
                      setShowSignature(true);
                    }}
                    full
                  >
                    <Text style={loginStyle.buttonText}>
                      {signature != "" ? "Update Signature" : "Add Signature"}
                    </Text>
                  </Button>
                  <View style={{ paddingLeft: 0, paddingRight: 0 }}>
                    {checkNSignature != "" ? (
                      <Text style={globalStyle.errorText}>
                        Signature Required
                      </Text>
                    ) : null}
                    {errorMessage != "" ? (
                      <Text style={globalStyle.errorText}>{errorMessage}</Text>
                    ) : null}
                    {SuccessMessage != "" ? (
                      <Text style={globalStyle.sucessText}>
                        {SuccessMessage}
                      </Text>
                    ) : null}
                    {signature != "" ? (
                      <Content style={loginStyle.formContainer}>
                        <ImageBackground
                          style={[
                            globalStyle.Btn,
                            {
                              width: "100%",
                            },
                          ]}
                          source={require("./../../../assets/Oval.png")}
                          resizeMode={"stretch"}
                        >
                          <Button
                            onPress={submitForm}
                            style={loginStyle.buttons}
                            full
                          >
                            <Text style={loginStyle.buttonText}>Send</Text>
                          </Button>
                        </ImageBackground>
                      </Content>
                    ) : null}
                  </View>
                </View>
              ) : (
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Text
                    style={{
                      fontSize: 24,
                      paddingLeft: 10,
                      fontWeight: "bold",
                      paddingBottom: 10,
                    }}
                  >
                    Signature
                  </Text>
                  <SignatureView
                    style={[globalStyle.signatureField]}
                    ref={signatureRef}
                    onSave={(val) => {
                      setSignature(val);
                    }}
                    onClear={() => {
                      setSignature("");
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      height: 50,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        alignItems: "flex-end",
                        flex: 1,
                      }}
                      onPress={() => {
                        signatureRef.current.clearSignature();
                      }}
                    >
                      <Text
                        style={{
                          paddingRight: 15,
                          fontWeight: "bold",
                          fontSize: 18,
                        }}
                      >
                        Clear
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <ImageBackground
                      style={[
                        globalStyle.Btn,
                        {
                          width: "100%",
                          alignItems: "center",
                        },
                      ]}
                      source={require("./../../../assets/Oval.png")}
                      resizeMode={"stretch"}
                    >
                      <Button
                        style={[
                          loginStyle.buttonSave,
                          { alignSelf: "center", justifyContent: "center" },
                        ]}
                        onPress={() => {
                          signatureRef.current.saveSignature();
                          setShowSignature(false);
                          setCheckNSignature(false);
                        }}
                      >
                        <Text style={loginStyle.buttonText}>Save</Text>
                      </Button>
                    </ImageBackground>
                    <Button
                      style={[
                        loginStyle.buttonSecondarys,
                        { marginTop: 20, width: "100%" },
                      ]}
                      onPress={() => {
                        setShowSignature(false);
                      }}
                    >
                      <Text style={[loginStyle.buttonText, { color: "#333" }]}>
                        Previous
                      </Text>
                    </Button>
                  </View>
                </View>
              )
            ) : null}
            {showSignature == false ? (
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: 50,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 10,
                }}
              >
                {counter < 4 ? (
                  <ImageBackground
                    style={
                      counter <= 0
                        ? globalStyle.BtnFull
                        : [globalStyle.BtnHalf, { width: "100%" }]
                    }
                    source={require("./../../../assets/Oval.png")}
                    resizeMode={"stretch"}
                  >
                    <Button
                      style={[loginStyle.buttonSave, { alignSelf: "center" }]}
                      onPress={increment}
                      full
                    >
                      <Text style={loginStyle.buttonText}>Next</Text>
                    </Button>
                  </ImageBackground>
                ) : null}
                {counter > 0 ? (
                  <Button
                    style={
                      counter == 4
                        ? [
                            loginStyle.buttonSecondarys,
                            { marginTop: 0, width: "100%" },
                          ]
                        : [
                            loginStyle.buttonSecondarys,
                            { marginTop: 20, width: "100%" },
                          ]
                    }
                    onPress={decrement}
                  >
                    <Text style={[loginStyle.buttonText, { color: "#333" }]}>
                      Previous
                    </Text>
                  </Button>
                ) : null}
              </View>
            ) : null}
          </Form>
        </View>
      </Content>
    </Container>
  );
};
export default Inquiry;
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
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
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 0,
    borderColor: "#fff",
    borderRadius: 0,
    color: "#8a898e",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
