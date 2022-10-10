import React from "react";
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator,TextInput, ScrollView } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import Collapsible from "react-native-collapsible";
import DatePicker from "react-native-datepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PhoneInput from "react-phone-number-input/react-native-input";
import { Container, Content, Form, Item, Input, Label, Button, Text, Body, H2, Icon } from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import profilestyle from "../../style/profile/profileStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import { set } from "react-native-reanimated";
import RNPickerSelect, { defaultStyles } from "react-native-picker-select";;
import moment from "moment";
const UserProfileMultiple = (props) => {
  const [loader, setloader] = React.useState(true);
  const [items, setItems] = React.useState([]);
  const [studentIds, setStudentIds] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [profileId, setProfileId] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [SchoolName, setSchoolName] = React.useState("");
  const [StudentNumber, setStudentNumber] = React.useState("");
  const [Rank, setRank] = React.useState("");
  const [MedicalInfo, setMedicalInfo] = React.useState("");
  const [AcademicSchool, setAcademicSchool] = React.useState("");
  const [Employer, setEmployer] = React.useState("");
  const [Occupation, setOccupation] = React.useState("");
  const [DOB, setDOB] = React.useState("");
  const [adult, setAdult] = React.useState("");

  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [UniformSizeList, setUniformSizeList] = React.useState([]);
  const [UniformSize, setUniformSize] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState(" ");
  const [zipCode, setZipCode] = React.useState("");
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");
  const [EmergencyContact, setEmergencyContact] = React.useState("");
  const [checkCity, setCheckCity] = React.useState(false);
  const [checkState, setCheckState] = React.useState(false);
  const [checkZipCode, setCheckZipCode] = React.useState(false);

  const [checkSchoolName, setCheckSchoolName] = React.useState(false);
  const [checkAddress1, setCheckAddress1] = React.useState(false);
  const [checkPhone1, setCheckPhone1] = React.useState(false);
  const [checkPhone2, setCheckPhone2] = React.useState(false);
  const [checkEmployer, setCheckEmployer] = React.useState(false);
  const [checkOccupation, setCheckOccupation] = React.useState(false);

  const [BeltSizeList, setBeltSizeList] = React.useState([]);
  const [BeltSize, setBeltSize] = React.useState("");
  const [data, setData] = React.useState("");
  const userId = useSelector((state) => state);
  const [SuccessMessage, setSuccessMessage] = React.useState("");
  const onChangePhone = (text, setVariable) => {
    let formatedNo = formatMobileNumber(text);
    if (formatedNo.length <= 14) {
      setVariable(formatedNo);
    }

  };

  const formatMobileNumber = (text) => {
    var cleaned = ("" + text).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "",
        number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
          ""
        );
      return number;
    }
    return text;
  }
  const setschoolName = (event) => {
    setSchoolName(event);
  };
  const setaddress1 = (event) => {
    setAddress1(event);
    if (event == "") {
      setCheckAddress1(true);
    } else {
      setCheckAddress1(false);
    }
  };
  const setaddress2 = (event) => {
    setAddress2(event);
  };
  const setphone1 = (event) => {
    setPhone1(event);
    if (event == "") {
      setCheckPhone1(true);
    } else {
      setCheckPhone1(false);
    }
  };
  const setphone2 = (event) => {
    setPhone2(event);
  };
  const setcity = (event) => {
    setCity(event);
    if (event == "") {
      setCheckCity(true);
    } else {
      setCheckCity(false);
    }
  };
  const setstate = (event) => {
    setState(event.itemValue);
    if (event == "") {
      setCheckState(true);
    } else {
      setCheckState(false);
    }
  };
  const setzipCode = (event) => {
    setZipCode(event);
    if (event == "") {
      setCheckZipCode(true);
    } else {
      const check = isValidZip(event);
      if (!check) {
        setCheckZipCode(true);
      } else {
        setCheckZipCode(false);
      }

    }
  };
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed2(true);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
    setCollapsed(true);
  };
  const isValidZip = (zip) => {
    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
  }
  const stateList = [
    { label: "Arizona", value: "AZ" },
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
  ];
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  // Setting data to variables and validations
  const setfirstName = (event) => {
    setFirstName(event);
    if (event == "") {
      setCheckFirstname(true);
    } else {
      setCheckFirstname(false);
    }
  };

  const setlasttName = (event) => {
    setLastName(event);
    if (event == "") {
      setChecklastName(true);
    } else {
      setChecklastName(false);
    }
  };
  const setemail = (event) => {
    setEmail(event);
    if (event == "") {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  };

  //Form Submission
  const submitForm = () => {
    setSuccessMessage("");
    if (firstName == "") {
      setCheckFirstname(true);
      return false;
    }
    if (lastName == "") {
      setChecklastName(true);
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }
    if (phone1 != '' && phone1 != null) {
      if (  phone1.length < 10) {
        setCheckPhone1(true)
        return false
      }
      else {
        setCheckPhone1(false)
      }
    }
   
    if (phone2 != '' && phone2 != null) {
      if (phone2.length < 10) {
        setCheckPhone2(true)
        return false
      }
      else {
        setCheckPhone2(false)
      }
    }
    if (checkZipCode) {
      return false
    }
    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/StudentData(${profileId})`, {
      method: "patch",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Address1: address1,
        Address2: address2,
        DOB: DOB,
        Phone1: phone1,
        Phone2: phone2,
        Phone1IsCell: false,
        Phone2IsCell: false,
        Employer: Employer,
        EmergencyContact: EmergencyContact,
        Occupation: Occupation,
        MedicalInfo: MedicalInfo,
        BeltSizeId: BeltSize,
        UniformSizeId: UniformSize,
        AcademicSchool: AcademicSchool,
        City: city,
        State: state,
        PostalCode: zipCode,
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        let jsonDataPrase = JSON.parse(jsonData);
        if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
          setSuccessMessage("Successfully Updated");
        } else {
          setErrorMessage("An error has occurred.");
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  };

  React.useEffect(() => {
    if (SuccessMessage !== "") {
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, [SuccessMessage]);

  const clearData = () => {
    setFirstName("");
    setCheckFirstname(false);
    setLastName("");
    setEmail("");
    setErrorMessage("");
    setSchoolName();
    setStudentNumber("");
    setRank();
    setMedicalInfo("");
    setAcademicSchool("");
    setState("");
    setCity("");
    setEmployer("");
    setZipCode("");
    setAddress1("");
    setAddress2("");
    setPhone1("");
    setPhone2("");
    setCheckPhone1(false);
    setCheckPhone2(false);
    setData("");
    setSuccessMessage("");
  };
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      setloader(true);
      clearData();
      if (data == "") {
        async function getData() {
          try {
            const value = await AsyncStorage.getItem("profileId");
            if (value !== null) {
              setProfileId(value);
              const apiUrl = API_URL.trim();
              getdata(value);
              function getdata(id) {
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
                    setFirstName(data.FirstName);
                    setLastName(data.LastName);
                    setEmail(data.Email);
                    setStudentNumber(data.StudentNumber);
                    setMedicalInfo(data.MedicalInfo);
                    setAcademicSchool(data.AcademicSchool);
                    setOccupation(data.Occupation);
                    setRank(data.Rank);
                    setEmployer(data.Employer);
                    setAddress1(data.Address1);
                    setAddress2(data.Address2);

                    setCity(data.City);
                    setZipCode(data.PostalCode);
                    setPhone1(data.Phone1);
                    setPhone2(data.Phone2);
                    setUniformSize(data.UniformSizeId);
                    setBeltSize(data.BeltSizeId);
                    setEmergencyContact(data.EmergencyContact);
                    setAdult(data.IsAdult);
                    let dob = new Date(data.DOB).toISOString().slice(0, 10);
                    setDOB(dob);
                    setState(data.State);
                    setData("set");
                    setloader(false);
                  });
              }
              fetch(`${apiUrl}/odata/UniformSize`, {
                method: "get",
                headers: {
                  Accept: "*/*",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  setUniformSizeList(data.value);
                  let uniforms = [];
                  data.value.map((uniform) => {
                    uniforms.push({
                      label: uniform.Name,
                      value: uniform.UniformSizeId,
                    });
                  });
                  setItems(uniforms);
                });
              fetch(`${apiUrl}/odata/BeltSize`, {
                method: "get",
                headers: {
                  Accept: "*/*",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  let belts = [];
                  data.value.map((belt) => {
                    belts.push({ label: belt.Name, value: belt.BeltSizeId });
                  });
                  setBeltSizeList(belts);
                });
            }
          } catch (e) { }
        }
        getData();
      }
    });
  }, [data]);
  const { navigation } = props;
  return (
     <View style={loginStyle.container}>
      <SideBarMenu title={studentIds.length !== 1 ? "My Profiles" : "My Profile"} navigation={props.navigation} />
      <ScrollView style={[loginStyle.spacing, {marginBottom: 100,height:"100%", backgroundColor:"#fff"}]}>
        <View style={[loginStyle.contentContainer]}>
          <View>
              <Text style={globalStyle.h3}>Student Profile </Text>
          </View>
        </View>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) : (
           <View style={globalStyle.form}>
            <TouchableOpacity onPress={toggleExpanded}>
              <View style={loginStyle.textAccordians}>
                <Image style={loginStyle.iconLefts} source={require("../../../assets/businessman-information.png")} resizeMode={"contain"} />
                <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Personal Information</Text>
                {collapsed ? (
                  <Image style={loginStyle.arrows} source={require("../../../assets/down-arrow.png")} resizeMode={"contain"} />
                ) : (
                  <Image style={loginStyle.arrows} source={require("../../../assets/up-arrow.png")} resizeMode={"contain"} />
                )}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View style={{ paddingBottom: 10, paddingTop: 10 }}>
                <View style={checkFirstname ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>First Name</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={firstName}
                      onChangeText={(text) => setfirstName(text)}
                      style={globalStyle.formControls}
                      placeholder="First Name"
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                {checkFirstname ? <Text style={globalStyle.error}>Enter First Name</Text> : null}
                <View style={checklastName ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Last Name</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={lastName}
                      onChangeText={(text) => setlasttName(text)}
                      style={globalStyle.formControls}
                      placeholder="Last Name"
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                {checklastName ? <Text style={globalStyle.error}>Enter Last Name </Text> : null}
                <View style={checkEmail ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Email</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={email}
                      onChangeText={(text) => setemail(text)}
                      style={globalStyle.formControls}
                      placeholder="Email "
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                {checkEmail ? <Text style={globalStyle.error}>Enter Valid Email</Text> : null}
                <View style={[globalStyle.formField, { backgroundColor: "#eee" }]}>
                  <Text style={globalStyle.formLabel}>Rank</Text>
                   <View 
                    style={[
                      globalStyle.formGroup,
                      {
                        marginBottom: 10,
                        marginTop: 0,
                        borderWidth: 0,
                        elevation: 0,
                      },
                    ]}
                    floatingLabel
                  >
                    <TextInput
                      value={Rank}
                      //   onChangeText={(text) => setemail(text)}
                      style={[globalStyle.formControls, { color: "#999", backgroundColor: "#eee" }]}
                      editable={false}
                      placeholder="Rank"
                      placeholderTextColor="#000"
                    />
                   </View >
                </View>
                <View style={globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Medical Info</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={MedicalInfo}
                      onChangeText={(text) => setMedicalInfo(text)}
                      style={[globalStyle.formControls, { color: "#999" }]}
                      placeholder="Medical Info"
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                {!adult ? (
                  <View style={[globalStyle.formField]}>
                    <Text style={globalStyle.formLabel}>Academic School</Text>
                     <View 
                      style={[
                        globalStyle.formGroup,
                        {
                          marginBottom: 10,
                          marginTop: 0,
                          borderWidth: 0,
                          elevation: 0,
                        },
                      ]}
                      floatingLabel
                    >
                      <TextInput
                        value={AcademicSchool}
                        onChangeText={(text) => setAcademicSchool(text)}
                        style={[globalStyle.formControls, { color: "#999" }]}
                        placeholder="Academic School"
                        placeholderTextColor="#ddd"
                      />
                     </View >
                  </View>
                ) : null}
                <View>
                  <View style={[globalStyle.formField]}>
                    <Text style={globalStyle.formLabel}>DOB</Text>
                    <View style={globalStyle.formControls}>
                      <DatePicker
                        showIcon={false}
                        androidMode="spinner"
                        date={DOB}
                        mode="date"
                        placeholder="YYYY-MM-DD"
                        format="YYYY-MM-DD"
                        maxDate={moment().format("YYYY-MM-DD")}
                        confirmBtnText="Ok"
                        cancelBtnText="Cancel"
                        style={{ fontSize: 20 }}
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                            borderColor: "black",
                            width: "100%",
                          },
                        }}
                        onDateChange={(date) => {
                          setDOB(date);
                        }}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View style={[globalStyle.formField]}>
                    <Text style={globalStyle.formLabel}>Uniform Size</Text>
                    <View style={[globalStyle.formControls, { position: "relative", zIndex: 999 }]}>
                    <RNPickerSelect
                        value={UniformSize}
                        items={items}
                        onValueChange={(value) => setUniformSize(value)}
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
                <View>
                  <View style={[globalStyle.formField]}>
                    <Text style={globalStyle.formLabel}>Belt Size</Text>
                    <View style={globalStyle.formControls}>
                    <RNPickerSelect
                        value={BeltSize}
                        items={BeltSizeList}
                        onValueChange={(value) => setBeltSize(value)}
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
                {adult ? (
                  <View>
                    <View style={[globalStyle.formField]}>
                      <Text style={globalStyle.formLabel}>Employer</Text>
                       <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                        <TextInput
                          value={Employer}
                          onChangeText={(text) => setEmployer(text)}
                          style={[globalStyle.formControls, { color: "#999" }]}
                          placeholder="Employer"
                          placeholderTextColor="#ddd"
                        />
                       </View >
                    </View>
                    <View style={[globalStyle.formField]}>
                      <Text style={globalStyle.formLabel}>Occupation</Text>
                       <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                        <TextInput
                          value={Occupation}
                          onChangeText={(text) => setOccupation(text)}
                          style={globalStyle.formControls}
                          placeholder="Occupation"
                          placeholderTextColor="#ddd"
                        />
                       </View >
                    </View>
                  </View>
                ) : null}
              </View>
            </Collapsible>
            <TouchableOpacity onPress={toggleExpanded2}>
              <View style={loginStyle.textAccordians}>
                <Image style={loginStyle.iconLefts} source={require("../../../assets/contacts.png")} resizeMode={"contain"} />
                <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Contact Information</Text>
                {collapsed2 ? (
                  <Image style={loginStyle.arrows} source={require("../../../assets/down-arrow.png")} resizeMode={"contain"} />
                ) : (
                  <Image style={loginStyle.arrows} source={require("../../../assets/up-arrow.png")} resizeMode={"contain"} />
                )}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed2} align="center">
              <View style={{ paddingBottom: 20, paddingTop: 30 }}>
                <View style={checkAddress1 ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Permanent Address</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={address1}
                      onChangeText={(text) => setaddress1(text)}
                      style={globalStyle.formControls}
                      placeholder="Permanent Address"
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                <View style={globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Current Address</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={address2}
                      onChangeText={(text) => setaddress2(text)}
                      style={globalStyle.formControls}
                      placeholder="Current Address"
                      placeholderTextColor="#ddd"
                    />
                   </View >
                </View>
                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>City</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={city}
                      onChangeText={(text) => setcity(text)}
                      style={[globalStyle.formControls, { color: "#999" }]}
                      placeholder="City "
                    />
                   </View >
                </View>
                {checkCity ? <Text style={globalStyle.error}>Enter City</Text> : null}
                <View
                  style={{
                    marginTop: 30,
                  }}
                >
                  <View style={[globalStyle.formField]}>
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
                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>Postal Code</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput value={zipCode} onChangeText={(text) => { setzipCode(text) }} style={[globalStyle.formControls]} placeholder="Postal Code" />
                   </View >
                </View>
                {checkZipCode ? <Text style={globalStyle.error}>Enter Valid Postal Code</Text> : null}

                <View style={checkPhone1 ? globalStyle.formFieldError : globalStyle.formField}>
                  <Text style={globalStyle.formLabel}>Phone1</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput value={phone1} onChangeText={(text) => onChangePhone(text, setPhone1)} style={globalStyle.formControls} placeholder="Phone1" />
                   </View >
                </View>
                {checkPhone1 ? <Text style={globalStyle.error}>Enter Valid Phone Number </Text> : null}

                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>Phone2</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput value={phone2} onChangeText={(text) => onChangePhone(text, setPhone2)} style={globalStyle.formControls} placeholder="Phone2" />
                   </View >
                </View>
                {checkPhone2 ? <Text style={globalStyle.error}>Enter Valid Phone Number </Text> : null}
                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>Emergency Contact</Text>
                   <View  style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <TextInput
                      value={EmergencyContact}
                      onChangeText={(text) => onChangePhone(text, setEmergencyContact)}
                      style={globalStyle.formControls}
                      placeholder="Emergency Contact"
                    />
                   </View >
                </View>
              </View>
            </Collapsible>
            {errorMessage != "" ? <Text style={globalStyle.errorText}>{errorMessage}</Text> : null}
            {SuccessMessage != "" ? <Text style={globalStyle.sucessText}>{SuccessMessage}</Text> : null}
             <View style={loginStyle.formContainer}>
              <ImageBackground
                style={[
                  globalStyle.Btn,
                  {
                    width: "100%",
                    marginTop:0
                  },
                ]}
                source={require("./../../../assets/Oval.png")}
                resizeMode={"stretch"}
              >
                <Button onPress={submitForm} style={loginStyle.buttons} full>
                  <Text style={loginStyle.buttonText}>Update</Text>
                </Button>
              </ImageBackground>
             </View  >
        </View>
        )}
       </ScrollView  >
     </View>
  );
};
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
export default UserProfileMultiple;
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
