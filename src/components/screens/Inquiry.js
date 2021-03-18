import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { API_URL } from "@env"
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
import { useSelector } from 'react-redux'
import { SideBarMenu } from "../sidebar";
const Inquiry = (props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const [schoolId, setSchoolId] = React.useState("");
  const [telephone, setTelephone] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [source, setSource] = React.useState("");
  const [nextURL, setNextURL] = React.useState("");

  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);

  const [checkSchoolId, setCheckSchoolId] = React.useState(false);
  const [checkTelephone, setCheckTelephone] = React.useState(false);
  const [checkComments, setCheckComments] = React.useState(false);
  const [checkSource, setCheckSource] = React.useState(false);
  const [checkNextURL, setCheckNextURL] = React.useState(false);

  const [SuccessMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const userId = useSelector(state => state);

  // console.log(userId)
  // Setting data to variables and validations
  const setschoolId = (event) => {
    setSchoolId(event);
    if (event == "") {
      setCheckSchoolId(true);
    } else {
      setCheckSchoolId(false);
    }
  };
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

  const settelephone = (event) => {
    setTelephone(event);
    if (event == "") {
      setCheckTelephone(true);
    } else {
      setCheckTelephone(false);
    }
  };
  const setcomments = (event) => {
    setComments(event);
    if (event == "") {
      setCheckComments(true);
    } else {
      setCheckComments(false);
    }
  };
  const setsource = (event) => {
    setSource(event);
    if (event == "") {
      setCheckSource(true);
    } else {
      setCheckSource(false);
    }
  };
  const setnextURL = (event) => {
    setNextURL(event);
    if (event == "") {
      setCheckNextURL(true);
    } else {
      setCheckNextURL(false);
    }
  };
  //Form Submission
  const submitForm = () => {
    setErrorMessage('')
    setSuccessMessage('')
    if (schoolId == "") {
      setCheckSchoolId(true);
      return false;
    }

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
    if (telephone == "") {
      setCheckTelephone(true);
      return false;
    }
    if (comments == "") {
      setCheckComments(true);
      return false;
    }
    if (source == "") {
      setCheckSource(true);
      return false;
    }
    if (nextURL == "") {
      setCheckNextURL(true);
      return false;
    }
    console.log(API_URL);
    console.log('here');
    fetch(`${API_URL}/Connect/RecordInquiry`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "SchoolGuid": "29D2568F-5950-46A6-A54E-DDA0BD0ADFD4",
        "FirstName": firstName,
        "LastName": lastName,
        "FullName": firstName + ' ' + lastName,
        "Email": email,
        "Telephone": telephone,
        "Comments": comments,
        "Source": source,
        "NextURL": nextURL,
        "IsFromMobile": "true"
      }),
    })
    .then((response) => {
      let jsonData = JSON.stringify(response);
      console.log(jsonData)
      let jsonDataPrase = JSON.parse(jsonData);
      console.log(jsonDataPrase.status)
      if (jsonDataPrase.status != 200) {
        setErrorMessage("An error has occurred.");
      } else {
        setSuccessMessage('Successfully Submitted.')
       // props.navigation.navigate("ResetSuccess");
      }
    })
    .catch((response) => {
      setErrorMessage("An error has occurred.");
    });
  };
  const { navigation } = props;
  return ( 
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Inquiry "} navigation={props.navigation} />
      <Content style={loginStyle.spacing} padder>
        <View style={loginStyle.backWrapper}>
          {/* <Image
            style={loginStyle.backButton}
            source={require("../../../assets/BackButton.png")}
          /> */}
        </View>
        <Body style={loginStyle.bodyContainer}>
          <H2 style={globalStyle.h2}>Inquiry!</H2>
          <Text style={globalStyle.small}>Fill out the form below </Text>
        </Body>
        <Form>
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={schoolId}
              onChangeText={(text) => setschoolId(text)}
              style={
                checkSchoolId
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="School Guid"
            />
          </Item>
          {checkSchoolId ? (
            <Text style={globalStyle.error}>Enter First Name</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={firstName}
              onChangeText={(text) => setfirstName(text)}
              style={
                checkFirstname
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="First Name"
            />
          </Item>
          {checkFirstname ? (
            <Text style={globalStyle.error}>Enter First Name</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={lastName}
              onChangeText={(text) => setlasttName(text)}
              style={globalStyle.formControl}
              placeholder="Last Name"
            />
          </Item>
          {checklastName ? (
            <Text style={globalStyle.error}>Enter Last Name </Text>
          ) : null}
          {checkFirstname ? (
            <Text style={globalStyle.error}>Enter First Name</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={email}
              onChangeText={(text) => setemail(text)}
              style={
                checkEmail
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Email "
            />
          </Item>
          {checkEmail ? (
            <Text style={globalStyle.error}>Enter Valid Email</Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={telephone}
              onChangeText={(text) => settelephone(text)}
              style={
                checkTelephone
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Telephone"
            />
          </Item>
          {checkTelephone ? (
            <Text style={globalStyle.error}>Enter Telephone Number </Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={comments}
              onChangeText={(text) => setcomments(text)}
              style={
                checkComments
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              }
              placeholder="Comments"
            />
          </Item>
          {checkComments ? (
            <Text style={globalStyle.error}>Enter Comments </Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={source}
              onChangeText={(text) => setsource(text)}
              style={
                checkSource
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              } style={globalStyle.formControl}
              placeholder="Source"
            />
          </Item>
          {checkSource ? (
            <Text style={globalStyle.error}>Enter Source </Text>
          ) : null}
          <Item style={globalStyle.formGroup} floatingLabel>
            <Input
              value={nextURL}
              onChangeText={(text) => setnextURL(text)}
              style={
                checkNextURL
                  ? globalStyle.formControlError
                  : globalStyle.formControl
              } style={globalStyle.formControl} style={globalStyle.formControl}
              placeholder="NextURL"
            />
          </Item>
          {checkNextURL ? (
            <Text style={globalStyle.error}>Enter Next URL </Text>
          ) : null}
            {errorMessage != "" ? (
            <Text style={globalStyle.errorText}>{errorMessage}</Text>
          ) : null}
            {SuccessMessage != "" ? (
            <Text style={globalStyle.sucessText}>{SuccessMessage}</Text>
          ) : null}
          <Content style={loginStyle.formContainer}>
            <Button onPress={submitForm} style={loginStyle.button} full>
              <Text>Send</Text>
            </Button>
          </Content>
        </Form>
      </Content>
    </Container>
  );
};
export default Inquiry;
