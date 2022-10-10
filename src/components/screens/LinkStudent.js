import React from "react";
import { View, Image, StyleSheet, ImageBackground, ActivityIndicator, ScrollView,TextInput } from "react-native";
import { API_URL } from "./../Utility/AppConst";
import { Container, Content, Form, Item, Input, Label, Button, Text, Body, H2, Icon } from "native-base";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import FooterTabs from "../footer/Footer";
import { useFocusEffect } from '@react-navigation/native';
const LinkStudent = (props) => {
  const [loader, setloader] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [checkFirstname, setCheckFirstname] = React.useState(false);
  const [checklastName, setChecklastName] = React.useState(false);
  const [checkEmail, setCheckEmail] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  useFocusEffect(
    //navigation.addListener("focus", () => {
    React.useCallback(() => {
      clearData();
    }, [])
  );
  const clearData = () => {
    setFirstName("");
    setCheckFirstname(false);
    setLastName("");
    setEmail("");
    setErrorMessage("");
  };
  const ValidateEmail = (mail) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail);
  };
  const userId = useSelector((state) => state);
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
    setloader(true)

    const apiUrl = API_URL.trim();
    fetch(`${apiUrl}/odata/StudentLink`, {
      method: "post",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
      body: JSON.stringify({
        Email: email,
        FirstName: firstName,
        LastName: lastName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setloader(false)
        if (response["odata.error"]) {
          setErrorMessage(response["odata.error"].message.value);
        } else {
          props.navigation.navigate("Verification", {
            studentAccountGuid: response["studentAccountGuid"],
            studentId: response["studentId"],
            Email: email,
            FirstName: firstName,
            LastName: lastName,
          });
        }
      })
      .catch((response) => {
        setloader(false)
        setErrorMessage("An error has occurred. Please check all the fields");
      });
  };
  const { navigation } = props;
  return (
     <View style={loginStyle.container}>
      <SideBarMenu title={"Link Student "} navigation={props.navigation} />
       <ScrollView style={[loginStyle.spacing,{ backgroundColor:"#fff"}]}>
        <View style={loginStyle.contentContainer}>
           <View style={loginStyle.bodyContainer}>
            <Text style={[globalStyle.small,{paddingTop:10}]}>Fill out the form below </Text>
          </View>
           <View>
            <View style={checkFirstname ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>First Name</Text>
              <TextInput
                value={firstName}
                onChangeText={(text) => setfirstName(text)}
                style={globalStyle.formControls}
                placeholder="Enter Student first name"
              />
            </View>
            {checkFirstname ? <Text style={globalStyle.error}>Enter First Name</Text> : null}
            <View style={checklastName ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>Last Name</Text>
              <TextInput
                value={lastName}
                onChangeText={(text) => setlasttName(text)}
                style={globalStyle.formControls}
                placeholder="Enter Student last name"
              />
            </View>
            {checklastName ? <Text style={globalStyle.error}>Enter Last Name </Text> : null}
            <View style={checkEmail ? globalStyle.formFieldError : globalStyle.formField}>
              <Text style={globalStyle.formLabel}>Email</Text>
              <TextInput
                value={email}
                onChangeText={(text) => setemail(text)}
                autoCapitalize="none"
                style={globalStyle.formControls}
                placeholder="Enter Student e-mail address "
              />
            </View>
            {checkEmail ? <Text style={globalStyle.error}>Enter Valid Email</Text> : null}
            {errorMessage != "" ? <Text style={[globalStyle.errorText, { marginTop: 15 }]}>{errorMessage}</Text> : null}
             <View style={loginStyle.formContainer}>
              {loader ? (
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#29ABE2" />
                </View>
              ) :
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
                  <Button onPress={submitForm} style={loginStyle.buttons} full>
                    <Text style={loginStyle.buttonText}>Link Student</Text>
                  </Button>
                </ImageBackground>
              }
             </View  >
        </View>
        </View>
       </ScrollView  >
      <FooterTabs navigation={props.navigation} />
     </View>
  );
};
export default LinkStudent;
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

