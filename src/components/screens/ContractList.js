import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { API_URL } from "./../Utility/AppConst";
import Collapsible from "react-native-collapsible";
import DatePicker from "react-native-datepicker";
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
import { useSelector } from "react-redux";
import { SideBarMenu } from "../sidebar";
import { set } from "react-native-reanimated";
import moment from "moment";
import Contract from "./Contract";
const apiUrl = API_URL.trim();
const ContractList = (props) => {
  const [loader, setloader] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(false);
  const [contractData, setContractData] = React.useState([]);
  const userId = useSelector((state) => state);
  const [contractDataPending, setContractDataPending] = React.useState([]);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed2(true);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
    setCollapsed(true);
  };
  React.useEffect(() => {
    navigation.addListener("focus", () => {
      if (typeof contractData !== "undefined" && contractData.length == 0) {
        getPersonContract();
        getPersonContractPending();
      }
    });
  });
  function getPersonContract() {
    fetch(`${apiUrl}/odata/Contract?$filter=ContractStatus eq 'Signed'`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.value) {
          setContractData(data.value);
          setloader(false);
        } else {
          setloader(false);
        }
        //  console.log('here')
        // console.log(data)
      });
  }
  function getPersonContractPending() {
    fetch(`${apiUrl}/odata/Contract?$filter=ContractStatus eq 'Pending'`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + userId.userDataReducer[0].access_Token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)
        if (data.value) {
          setloader(false);
          setContractDataPending(data.value);
        } else {
          setloader(false);
        }
      });
  }
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Contracts"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        {/* <ImageBackground
          style={{
            width: "100%",
            height: 150,
            position: "absolute"
          }}
          source={require('./../../../assets/bg3.png')}
          resizeMode={'stretch'}
        >
        </ImageBackground> */}

        <View style={{ marginTop: 10 }}>
          {loader ? (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#29ABE2" />
            </View>
          ) : (
            <Form style={globalStyle.forms}>
              <TouchableOpacity onPress={toggleExpanded}>
                <View style={loginStyle.textAccordiansContract}>
                  <Image
                    style={loginStyle.iconLeftss}
                    source={require("../../../assets/file1.png")}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 22,
                      marginBottom: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Signed Contracts
                  </Text>
                  {collapsed ? (
                    <Image
                      style={loginStyle.arrows}
                      source={require("../../../assets/down-arrow.png")}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Image
                      style={loginStyle.arrows}
                      source={require("../../../assets/up-arrow.png")}
                      resizeMode={"contain"}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={collapsed} align="center">
                <View>
                  <View style={globalStyle.tableBoxshadowContract}>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: "stretch",
                        flexDirection: "row",
                        padding: 15,
                        backgroundColor: "#4895FF",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1, alignSelf: "stretch" }}>
                        <Text style={{ color: "#fff", fontSize: 17 }}>
                          Name
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={{ color: "#fff", fontSize: 17 }}>
                          Action
                        </Text>
                      </View>
                    </View>

                    {typeof contractData !== "undefined" &&
                    contractData.length ? (
                      contractData.map(function (contact, index) {
                        return (
                          <View
                            key={index}
                            style={
                              index % 2 == 0
                                ? globalStyle.tableList
                                : globalStyle.tableListOdd
                            }
                          >
                            <View style={{ flex: 1, alignSelf: "stretch" }}>
                              {contact.StudentFullNames.length > 0
                                ? contact.StudentFullNames.map(function (
                                    student,
                                    index
                                  ) {
                                    return (
                                      <View key={index}>
                                        <Text
                                          style={{ paddingTop: 10, flex: 1 }}
                                        >
                                          {student}
                                        </Text>
                                      </View>
                                    );
                                  })
                                : null}
                            </View>
                            <View style={{ width: "20%" }}>
                              <Text
                                onPress={() =>
                                  props.navigation.navigate("SignedContract", {
                                    contractData: contact,
                                  })
                                }
                                style={{ fontSize: 17 }}
                              >
                                View
                              </Text>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View style={globalStyle.tableList}>
                        <Text>No Signed Contracts</Text>
                      </View>
                    )}
                  </View>
                </View>
              </Collapsible>
              <TouchableOpacity onPress={toggleExpanded2}>
                <View style={loginStyle.textAccordiansContract}>
                  <Image
                    style={loginStyle.iconLeftss}
                    source={require("../../../assets/file2.png")}
                    resizeMode={"contain"}
                  />
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 22,
                      marginBottom: 0,
                      fontWeight: "bold",
                    }}
                  >
                    Pending Contact
                  </Text>
                  {collapsed2 ? (
                    <Image
                      style={loginStyle.arrows}
                      source={require("../../../assets/down-arrow.png")}
                      resizeMode={"contain"}
                    />
                  ) : (
                    <Image
                      style={loginStyle.arrows}
                      source={require("../../../assets/up-arrow.png")}
                      resizeMode={"contain"}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <Collapsible collapsed={collapsed2} align="center">
                <View>
                  <View style={globalStyle.tableBoxshadowContract}>
                    <View
                      style={{
                        flex: 1,
                        alignSelf: "stretch",
                        flexDirection: "row",
                        padding: 15,
                        backgroundColor: "#4895FF",
                        alignItems: "center",
                      }}
                    >
                      <View style={{ flex: 1, alignSelf: "stretch" }}>
                        <Text style={{ color: "#fff", fontSize: 17 }}>
                          Name
                        </Text>
                      </View>
                      <View style={{ width: "20%" }}>
                        <Text style={{ color: "#fff", fontSize: 17 }}>
                          Action
                        </Text>
                      </View>
                    </View>
                    {typeof contractDataPending !== "undefined" &&
                    contractDataPending.length ? (
                      contractDataPending.map(function (contact, index) {
                        return (
                          <View
                            key={index}
                            style={
                              index % 2 == 0
                                ? globalStyle.tableList
                                : globalStyle.tableListOdd
                            }
                          >
                            <View style={{ flex: 1, alignSelf: "stretch" }}>
                              {contact.StudentFullNames.length > 0
                                ? contact.StudentFullNames.map(function (
                                    student,
                                    index
                                  ) {
                                    return (
                                      <View key={index}>
                                        <Text
                                          style={{ paddingBottom: 10, flex: 1 }}
                                        >
                                          {student}
                                        </Text>
                                      </View>
                                    );
                                  })
                                : null}
                            </View>
                            <View style={{ width: "20%" }}>
                              <Text
                                onPress={() =>
                                  props.navigation.navigate("Contract", {
                                    contractId: contact.ContractId,
                                  })
                                }
                                style={{ fontSize: 17 }}
                              >
                                View
                              </Text>
                            </View>
                          </View>
                        );
                      })
                    ) : (
                      <View style={globalStyle.tableList}>
                        <Text
                          style={{
                            height: 20,
                          }}
                        >
                          No Pending Contracts
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </Collapsible>
            </Form>
          )}
        </View>
      </Content>
    </Container>
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
export default ContractList;
