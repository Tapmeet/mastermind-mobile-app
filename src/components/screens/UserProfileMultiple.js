import React from "react";
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import Collapsible from 'react-native-collapsible';
import DatePicker from 'react-native-datepicker';
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
import profilestyle from "../../style/profile/profileStyle";
import { useSelector } from 'react-redux'
import { SideBarMenu } from "../sidebar";
import { Picker } from '@react-native-picker/picker';
import { set } from "react-native-reanimated";
import moment from 'moment';
const UserProfileMultiple = (props) => {
  const [studentIds, setStudentIds] = React.useState([]);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [SchoolName, setSchoolName] = React.useState("");
  const [StudentNumber, setStudentNumber] = React.useState("");
  const [Rank, setRank] = React.useState("");
  const [AcademicSchool, setAcademicSchool] = React.useState("");
  const [MedicalInfo, setMedicalInfo] = React.useState("");
  const [Employer, setEmployer] = React.useState("");
  const [Occupation, setOccupation] = React.useState("");
  const [DOB, setDOB] = React.useState("");

  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
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
  const [checkEmployer, setCheckEmployer] = React.useState(false);
  const [checkOccupation, setCheckOccupation] = React.useState(false);

  const [BeltSizeList, setBeltSizeList] = React.useState([]);
  const [BeltSize, setBeltSize] = React.useState("");
  const [data, setData] = React.useState('');
  const userId = useSelector(state => state);
  const [SuccessMessage, setSuccessMessage] = React.useState('');
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
      setCheckZipCode(false);
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
  const stateList = [
    ['Arizona', 'AZ'],
    ['Alabama', 'AL'],
    ['Alaska', 'AK'],
    ['Arkansas', 'AR'],
    ['California', 'CA'],
    ['Colorado', 'CO'],
    ['Connecticut', 'CT'],
    ['Delaware', 'DE'],
    ['Florida', 'FL'],
    ['Georgia', 'GA'],
    ['Hawaii', 'HI'],
    ['Idaho', 'ID'],
    ['Illinois', 'IL'],
    ['Indiana', 'IN'],
    ['Iowa', 'IA'],
    ['Kansas', 'KS'],
    ['Kentucky', 'KY'],
    ['Louisiana', 'LA'],
    ['Maine', 'ME'],
    ['Maryland', 'MD'],
    ['Massachusetts', 'MA'],
    ['Michigan', 'MI'],
    ['Minnesota', 'MN'],
    ['Mississippi', 'MS'],
    ['Missouri', 'MO'],
    ['Montana', 'MT'],
    ['Nebraska', 'NE'],
    ['Nevada', 'NV'],
    ['New Hampshire', 'NH'],
    ['New Jersey', 'NJ'],
    ['New Mexico', 'NM'],
    ['New York', 'NY'],
    ['North Carolina', 'NC'],
    ['North Dakota', 'ND'],
    ['Ohio', 'OH'],
    ['Oklahoma', 'OK'],
    ['Oregon', 'OR'],
    ['Pennsylvania', 'PA'],
    ['Rhode Island', 'RI'],
    ['South Carolina', 'SC'],
    ['South Dakota', 'SD'],
    ['Tennessee', 'TN'],
    ['Texas', 'TX'],
    ['Utah', 'UT'],
    ['Vermont', 'VT'],
    ['Virginia', 'VA'],
    ['Washington', 'WA'],
    ['West Virginia', 'WV'],
    ['Wisconsin', 'WI'],
    ['Wyoming', 'WY'],
  ]
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
      setChecklastName(true)
      return false;
    }
    if (email == "") {
      setCheckEmail(true);
      return false;
    }

    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/StudentData(${props.route.params.profileId})`, {
      method: "patch",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
      body: JSON.stringify({
        "FirstName": firstName,
        "LastName": lastName,
        "Email": email,
        "Address1": address1,
        "Address2": address2,
        "DOB": DOB,
        "Phone1": phone1,
        "Phone2": phone2,
        "Phone1IsCell": false,
        "Phone2IsCell": false,
        "Employer": Employer,
        "EmergencyContact": EmergencyContact,
        "Occupation": Occupation,
        "MedicalInfo": MedicalInfo,
        "BeltSizeId": BeltSize,
        "UniformSizeId": UniformSize
      }),
    })
      .then((response) => {
        let jsonData = JSON.stringify(response);
        console.log(jsonData)
        let jsonDataPrase = JSON.parse(jsonData);
        console.log(jsonDataPrase.status)
        if (jsonDataPrase.status >= 200 && jsonDataPrase.status < 300) {
          setSuccessMessage("Update Successfully");
        } else {
          setErrorMessage("An error has occurred.");
        }
      })
      .catch((response) => {
        setErrorMessage("An error has occurred.");
      });
  };
  React.useEffect(() => {
    const apiUrl = API_URL.trim();
    console.log("heress");
    console.log(props.route.params.profileId);
    if (data == '') {
      getdata(props.route.params.profileId)
      function getdata(id) {
        fetch(`${apiUrl}/odata/StudentData(${id})`, {
          method: "get",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + userId[0].access_Token
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setFirstName(data.FirstName)
            setLastName(data.LastName)
            setEmail(data.Email)
            setStudentNumber(data.StudentNumber)
            setAcademicSchool(data.AcademicSchool)
            setMedicalInfo(data.MedicalInfo)
            setOccupation(data.Occupation)
            setRank(data.Rank)
            setEmployer(data.Employer)
            setAddress1(data.Address1)
            setAddress2(data.Address2)

            setCity(data.City)
            setZipCode(data.PostalCode)
            setPhone1(data.Phone1)
            setPhone2(data.Phone2)
            setUniformSize(data.UniformSizeId)
            setBeltSize(data.BeltSizeId)
            setEmergencyContact(data.EmergencyContact)
            let dob = new Date(data.DOB).toISOString().slice(0, 10);
            setDOB(dob)
            console.log(dob);
            stateList.map((statedata, index) => {
              if (statedata[1] == data.State) {
                setState(statedata[0])
              }
            })
          });
      }
      fetch(`${apiUrl}/odata/UniformSize`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userId[0].access_Token
        },
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data.value)
          setUniformSizeList(data.value)
        });
      fetch(`${apiUrl}/odata/BeltSize`, {
        method: "get",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + userId[0].access_Token
        },
      })
        .then(response => response.json())
        .then(data => {
          //console.log(data.value)
          setBeltSizeList(data.value)
        });
    }
  }, [data]);
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Profile"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <View style={[loginStyle.contentContainer, { height: 100 }]}>
          <Body style={loginStyle.bodyContainer}>
            <H2 style={globalStyle.h3}>Student Profile!</H2>
          </Body>
        </View>
        <Form style={globalStyle.form}>
          <TouchableOpacity onPress={toggleExpanded}>
            <View style={loginStyle.textAccordians} >
              <Image
                style={loginStyle.iconLefts}
                source={require("../../../assets/businessman-information.png")}
                resizeMode={'contain'}
              />
              <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Personal Information</Text>
              {collapsed ?
                <Image
                  style={loginStyle.arrows}
                  source={require("../../../assets/down-arrow.png")}
                  resizeMode={'contain'}
                />
                : <Image
                  style={loginStyle.arrows}
                  source={require("../../../assets/up-arrow.png")}
                  resizeMode={'contain'}
                />}
            </View>
          </TouchableOpacity>
          {/*Content of Single Collapsible*/}
          <Collapsible collapsed={collapsed} align="center">
            <View style={{ paddingBottom: 30, paddingTop: 10 }}>
              <View style={checkFirstname
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>First Name</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={firstName}
                    onChangeText={(text) => setfirstName(text)}
                    style={globalStyle.formControls
                    }
                    placeholder="First Name"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              {checkFirstname ? (
                <Text style={globalStyle.error}>Enter First Name</Text>
              ) : null}
              <View style={checklastName
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Last Name</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={lastName}
                    onChangeText={(text) => setlasttName(text)}
                    style={globalStyle.formControls}
                    placeholder="Last Name"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              {checklastName ? (
                <Text style={globalStyle.error}>Enter Last Name </Text>
              ) : null}
              <View style={checkEmail
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Email</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={email}
                    onChangeText={(text) => setemail(text)}
                    style={globalStyle.formControls
                    }
                    placeholder="Email "
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              {checkEmail ? (
                <Text style={globalStyle.error}>Enter Valid Email</Text>
              ) : null}
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>School Name</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={SchoolName}
                    onChangeText={(text) => setschoolName(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    placeholder="School Name "
                    placeholderTextColor="#000"
                    editable={false}
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>Student Number</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={StudentNumber}
                    // onChangeText={(text) => setemail(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    placeholder="Student Number "
                    placeholderTextColor="#ddd"
                    editable={false}
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>Rank</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0, borderWidth: 0, elevation: 0 }]} floatingLabel>
                  <Input
                    value={Rank}
                    //   onChangeText={(text) => setemail(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    editable={false}
                    placeholder="Rank"
                    placeholderTextColor="#000"
                  />
                </Item>
              </View>
              <View style={globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Medical Info</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={MedicalInfo}
                    //onChangeText={(text) => setemail(text)}
                    style={
                      [globalStyle.formControls]
                    }
                    placeholder="Medical Info"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>Academic School</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0, borderWidth: 0, elevation: 0 }]} floatingLabel>
                  <Input
                    value={AcademicSchool}
                    // onChangeText={(text) => setemail(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    editable={false}
                    placeholder="Academic School"
                    placeholderTextColor="#000"
                  />
                </Item>
              </View>
              <View style={{
                marginTop: 30,
              }}>
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
                      maxDate={moment().format('YYYY-MM-DD')}
                      confirmBtnText="Chọn"
                      cancelBtnText="Hủy"
                      style={{ fontSize: 20 }}
                      customStyles={{
                        dateInput: {

                          borderWidth: 0,
                          borderColor: 'black',
                          width: "100%"
                        },
                      }}
                      onDateChange={(date) => { setDOB(date) }}
                    />
                  </View>
                </View>
              </View>
              <View style={{
                marginTop: 30,
              }}>
                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>Uniform Size</Text>
                  <View style={globalStyle.formControls}>
                    <Picker
                      selectedValue={UniformSize}
                      style={{ height: 50, width: '100%' }}
                      onValueChange={(itemValue, itemIndex) => setUniformSize(itemValue)}
                    >
                      {UniformSizeList.map((data) => <Picker.Item key={data.label + data.value} label={data.Name} value={data.UniformSizeId} />)}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={{
                marginTop: 30,
              }}>
                <View style={[globalStyle.formField]}>
                  <Text style={globalStyle.formLabel}>Belt Size</Text>
                  <View style={globalStyle.formControls}>
                    <Picker
                      selectedValue={BeltSize}
                      style={{ height: 50, width: '100%' }}
                      onValueChange={(itemValue, itemIndex) => setBeltSize(itemValue)}
                    >
                      {BeltSizeList.map((data) => <Picker.Item key={data.label + data.value} label={data.Name} value={data.UniformSizeId} />)}
                    </Picker>
                  </View>
                </View>
              </View>
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>Employer</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={Employer}
                    onChangeText={(text) => setEmployer(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    placeholder="Employer"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField]}>
                <Text style={globalStyle.formLabel}>Occupation</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={Occupation}
                    onChangeText={(text) => setOccupation(text)}
                    style={
                      globalStyle.formControls
                    }
                    placeholder="Occupation"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
            </View>
          </Collapsible>
          <TouchableOpacity onPress={toggleExpanded2}>
            <View style={loginStyle.textAccordians} >
              <Image
                style={loginStyle.iconLefts}
                source={require("../../../assets/contacts.png")}
                resizeMode={'contain'}
              />
              <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Contact Information</Text>
              {collapsed2 ?
                <Image
                  style={loginStyle.arrows}
                  source={require("../../../assets/down-arrow.png")}
                  resizeMode={'contain'}
                />
                : <Image
                  style={loginStyle.arrows}
                  source={require("../../../assets/up-arrow.png")}
                  resizeMode={'contain'}
                />}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={collapsed2} align="center">
            <View style={{ paddingBottom: 50, paddingTop: 30 }}>
              <View style={checkAddress1
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Permanent Address</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={address1}
                    onChangeText={(text) => setaddress1(text)}
                    style={globalStyle.formControls}
                    placeholder="Permanent Address"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              <View style={globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Current Address</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={address2}
                    onChangeText={(text) => setaddress2(text)}
                    style={globalStyle.formControls}
                    placeholder="Current Address"
                    placeholderTextColor="#ddd"
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>City</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={city}
                    onChangeText={(text) => setcity(text)}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    placeholder="City "
                    editable={false}
                  />
                </Item>
              </View>
              {checkCity ? (
                <Text style={globalStyle.error}>Enter City</Text>
              ) : null}
              {state != '' ? (
                <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                  <Text style={globalStyle.formLabel}>State</Text>
                  <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                    <Input
                      value={state}
                      //onChangeText={(text) => setzipCode(text)}
                      editable={false}
                      style={
                        [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                      }
                      placeholder="State"
                    />
                  </Item>
                </View>
              )
                : null}
              <View style={[globalStyle.formField, { backgroundColor: '#eee' }]}>
                <Text style={globalStyle.formLabel}>Postal Code</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={zipCode}
                    onChangeText={(text) => setzipCode(text)}
                    editable={false}
                    style={
                      [globalStyle.formControls, { color: "#999", backgroundColor: '#eee' }]
                    }
                    placeholder="Postal Code"
                  />
                </Item>
              </View>
              {checkZipCode ? (
                <Text style={globalStyle.error}>Enter ZipCode</Text>
              ) : null}

              <View style={checkPhone1
                ? globalStyle.formFieldError : globalStyle.formField}>
                <Text style={globalStyle.formLabel}>Phone1</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={phone1}
                    onChangeText={(text) => setphone1(text)}
                    style={globalStyle.formControls
                    }
                    placeholder="Phone1"
                  />
                </Item>
              </View>
              {checkPhone1 ? (
                <Text style={globalStyle.error}>Enter Phone Number </Text>
              ) : null}

              <View style={[globalStyle.formField]}>
                <Text style={globalStyle.formLabel}>Phone2</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={phone2}
                    onChangeText={(text) => setphone2(text)}
                    style={globalStyle.formControls}
                    placeholder="Phone2"
                  />
                </Item>
              </View>
              <View style={[globalStyle.formField]}>
                <Text style={globalStyle.formLabel}>Emergency Contact</Text>
                <Item style={[globalStyle.formGroup, { marginBottom: 10, marginTop: 0 }]} floatingLabel>
                  <Input
                    value={EmergencyContact}
                    onChangeText={(text) => setEmergencyContact(text)}
                    style={globalStyle.formControls}
                    placeholder="Emergency Contact"
                  />
                </Item>
              </View>
            </View>
          </Collapsible>
          {errorMessage != "" ? (
            <Text style={globalStyle.errorText}>{errorMessage}</Text>
          ) : null}
          {SuccessMessage != "" ? (
            <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
          ) : null}
          <Content style={loginStyle.formContainer}>
            <ImageBackground
              style={[globalStyle.Btn, {
                width: '100%'
              }]}
              source={require('./../../../assets/Oval.png')}
              resizeMode={'stretch'}

            >
              <Button onPress={submitForm} style={loginStyle.buttons} full>
                <Text style={loginStyle.buttonText} >Update</Text>
              </Button>
            </ImageBackground>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default UserProfileMultiple;
