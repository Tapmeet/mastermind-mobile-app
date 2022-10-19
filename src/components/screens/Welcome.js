import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Text,
  Button,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import loginStyle from "../../style/login/loginStyle";
import globalStyle from "../../style/globalStyle";
import { useFocusEffect } from '@react-navigation/native';
const Welcome = (props) => {
  const [step1, setStep1] = React.useState(true);
  const [step2, setStep2] = React.useState(false);
  const [step3, setStep3] = React.useState(false);
  const [loader, setloader] = React.useState(true);
  const step3Function = async () => {

    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    await AsyncStorage.setItem("accessCheck", '1');
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      setStep3(true);
      setStep2(false);
      return;
    }
    else {
      setStep3(true);
      setStep2(false);
      return false
    }

  }
  const setData = async () => {
    await AsyncStorage.setItem("accessCheck", '1');
    props.navigation.navigate("Login");
  }
  async function getData() {
    setloader(true)
    try {
      const value = await AsyncStorage.getItem("accessCheck");
      if (value == 1) {
        props.navigation.navigate("Login");
        setTimeout(function () { setloader(false) }, 2000);
      }
      else {
        setTimeout(function () { setloader(false) }, 1000);
      }

    } catch (e) { }

  }
  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [])
  );
  const win = Dimensions.get("window");
  const { navigation } = props;
  return (
    <View style={loginStyle.container} scrollEnabled={false}>
      <View style={loginStyle.spacing} scrollEnabled={false}>
        {loader ? (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
        ) :
          <ScrollView style={{ padding: 10, height: win.height, paddingTop: 0, backgroundColor:"#fff" }} >
            <View style={{ paddingBottom: 50 }}>
              <View style={loginStyle.bodyContainer} padder>
                {!step1 &&
                  (<View style={{ display: "flex", zIndex: 99, position: "absolute", top: 40, right: 60, flexDirection: "row", justifyContent: "flex-end" }}>
                    <Text style={{
                      fontFamily: 'Poppins',
                      textAlign: "center",
                      fontSize: 18,
                      color: "#777",
                    }}
                      onPress={() => setData()}
                    >Skip</Text>
                  </View>)
                }
                {step1 ?
                  <View
                    style={{
                      alignSelf: "center",
                      paddingTop: 20,
                    }}
                  >
                    <Image
                      style={loginStyle.welcomeLogo}
                      resizeMode={"contain"}
                      source={require("../../../assets/welcome/vector1.jpg")}
                    />
                    <Text style={{
                      fontFamily: 'Poppins',
                      textAlign: "center",
                      fontSize: 22,
                      color: "#29ABE2",
                      fontWeight: 'bold',
                    }}>Welcome to  Mastermind</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 17,
                        color: "#333",
                        padding: 10,
                        width: win.width,
                        margin: "auto",

                      }}>
                        This platform will allow you to share and receive information with
                        your martial arts school. Good luck with your training.
                      </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <View style={{ backgroundColor: '#0575f8', height: 12, width: 25, borderRadius: 10 }}></View>
                      <View style={{ backgroundColor: '#ccc', marginLeft: 8, marginRight: 8, height: 12, width: 12, borderRadius: 12 }}></View>
                      <View style={{ backgroundColor: '#ccc', height: 12, width: 12, borderRadius: 12 }}></View>
                    </View>
                    <View style={{ display: "flex", paddingRight: 50, flexDirection: "row", justifyContent: "flex-end" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 20,
                        color: "#777",
                        padding: 20,
                      }}
                        onPress={() => { setStep2(true); setStep1(false) }}
                      >
                        Next
                      </Text>
                    </View>
                  </View>
                  : null}
                {step2 ?
                  <View
                    style={{
                      alignSelf: "center",
                      paddingTop: 40,
                    }}
                  >
                    <Image
                      style={loginStyle.welcomeLogo}
                      resizeMode={"contain"}
                      source={require("../../../assets/welcome/vector2.jpg")}
                    />

                    <Text style={{
                      fontFamily: 'Poppins',
                      textAlign: "center",
                      fontSize: 22,
                      color: "#29ABE2",
                      fontWeight: 'bold',
                    }}>Permissions and settings</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 17,
                        color: "#333",
                        padding: 10,
                        width: win.width,
                        margin: "auto",

                      }}>
                        Please provide us access to your media, so you can upload any media files
                      </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <View style={{ backgroundColor: '#ccc', height: 12, width: 12, borderRadius: 10 }}></View>
                      <View style={{ backgroundColor: '#0575f8', marginLeft: 8, marginRight: 8, height: 12, width: 25, borderRadius: 12 }}></View>
                      <View style={{ backgroundColor: '#ccc', height: 12, width: 12, borderRadius: 12 }}></View>
                    </View>
                    <View style={{ display: "flex", paddingLeft: 50, paddingRight: 50, flexDirection: "row", justifyContent: "space-between" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 20,
                        color: "#777",
                        padding: 20,
                      }}
                        onPress={() => { setStep1(true); setStep2(false) }}
                      >
                        Prev
                      </Text>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 20,
                        color: "#777",
                        padding: 20,
                      }}
                        onPress={() => { step3Function() }}
                      >
                        Next
                      </Text>
                    </View>
                  </View>
                  : null}
                {step3 ?
                  <View
                    style={{
                      alignSelf: "center",
                      paddingTop: 40,
                    }}
                  >
                    <Image
                      style={loginStyle.welcomeLogoLast}
                      resizeMode={"contain"}
                      source={require("../../../assets/welcome/vector4.jpg")}
                    />

                    <Text style={{
                      fontFamily: 'Poppins',
                      textAlign: "center",
                      fontSize: 22,
                      color: "#29ABE2",
                      fontWeight: 'bold',
                    }}>Create Your Account </Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 17,
                        color: "#333",
                        padding: 20,
                        width: win.width,
                        margin: "auto",

                      }}>
                        By creating your account, you will be able to access and manage
                        you and your family’s student memberships and progress
                        information, check in to class, plus utilize event registration and
                        our pro shop, view curriculum resources, and much more.
                      </Text>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                      <View style={{ backgroundColor: '#ccc', height: 12, width: 12, borderRadius: 10 }}></View>
                      <View style={{ backgroundColor: '#ccc', marginLeft: 8, marginRight: 8, height: 12, width: 12, borderRadius: 12 }}></View>
                      <View style={{ backgroundColor: '#0575f8', height: 12, width: 25, borderRadius: 12 }}></View>
                    </View>
                    <View style={{ display: "flex", marginLeft: 50, flexDirection: "row", justifyContent: "flex-start" }}>
                      <Text style={{
                        fontFamily: 'Poppins',
                        textAlign: "center",
                        fontSize: 20,
                        color: "#777",
                        padding: 20,
                      }}
                        onPress={() => { setStep2(true); setStep3(false) }}
                      >
                        Prev
                      </Text>

                    </View>
                    <View style={{ display: "flex", paddingLeft: 50, paddingRight: 50, marginTop: -20, flexDirection: "row", justifyContent: "center" }}>
                      <ImageBackground
                        style={[
                          globalStyle.Btn,
                          {
                            width: win.width- 20
                          },
                        ]}
                        source={require("./../../../assets/Oval.png")}
                        resizeMode={"stretch"}
                      >
                        <TouchableOpacity onPress={() => setData()} style={loginStyle.buttons} >
                          <Text style={loginStyle.buttonText}>Get Started</Text>
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  </View>
                  : null}


              </View>
            </View>
          </ScrollView >
        }
      </View>
    </View >
  );
};

export default Welcome;
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