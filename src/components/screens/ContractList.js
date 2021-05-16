import React from "react";
import { View, Image, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator } from "react-native";
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
import Contract from "./Contract";
const apiUrl = API_URL.trim();
const ContractList = (props) => {
  const [loader, setloader] = React.useState(true);
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(true);
  const [contractData, setContractData] = React.useState([])
  const userId = useSelector(state => state);
  const [contractDataPending, setContractDataPending] = React.useState([])
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
    setCollapsed2(true);
  };
  const toggleExpanded2 = () => {
    setCollapsed2(!collapsed2);
    setCollapsed(true);
  };
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      if (contractData.length == 0) {
        getPersonContract()
        getPersonContractPending()
      }
    })
  })
  function getPersonContract() {
    fetch(`${apiUrl}/odata/Contract?$filter=ContractStatus eq 'Signed'`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        setContractData(data.value)
        setloader(false)
        console.log('here')
        console.log(data.value)
      });
  }
  function getPersonContractPending() {
    fetch(`${apiUrl}/odata/Contract?$filter=ContractStatus eq 'Pending'`, {
      method: "get",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        'Authorization': 'Bearer ' + userId[0].access_Token
      },
    })
      .then(response => response.json())
      .then(data => {
        setloader(false)
        setContractDataPending(data.value)
      });
  }
  const { navigation } = props;
  return (
    <Container style={loginStyle.container}>
      <SideBarMenu title={"Contracts"} navigation={props.navigation} />
      <Content style={loginStyle.spacing}>
        <ImageBackground
          style={{
            width: "100%",
            height: 150,
            position: "absolute"
          }}
          source={require('./../../../assets/bg3.png')}
          resizeMode={'stretch'}
        >
        </ImageBackground>

        <View style={[loginStyle.contentContainer, { height: 100 }]}>
          <Body style={loginStyle.bodyContainer}>
            <H2 style={globalStyle.h3}>Contracts!</H2>
          </Body>
        </View>
        {loader ?
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#29ABE2" />
          </View>
          :
          <Form style={globalStyle.form}>
            <TouchableOpacity onPress={toggleExpanded}>
              <View style={loginStyle.textAccordian} >
                <Image
                  style={loginStyle.iconLeft}
                  source={require("../../../assets/businessman-information.png")}
                  resizeMode={'contain'}
                />
                <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Signed Contracts</Text>
                {collapsed ?
                  <Image
                    style={loginStyle.arrow}
                    source={require("../../../assets/down-arrow.png")}
                    resizeMode={'contain'}
                  />
                  : <Image
                    style={loginStyle.arrow}
                    source={require("../../../assets/up-arrow.png")}
                    resizeMode={'contain'}
                  />}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed} align="center">
              <View style={{ paddingBottom: 30 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 15, backgroundColor: "#29ABE2", marginTop: 15, alignItems: "center" }}>
                  <View style={{ width: "20%" }} ><Text style={{ color: '#fff', fontSize: 17 }}>Id</Text></View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{ color: '#fff', fontSize: 17 }}>Name</Text></View>
                  <View style={{ width: "20%" }} ><Text style={{ color: '#fff', fontSize: 17 }}>Action</Text></View>
                </View>
                {contractData.length > 0 ?
                  contractData.map(function (contact, index) {
                    return (

                      <View key={index} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', backgroundColor: "#f7f7f7", padding: 15, marginTop: 5, alignItems: "center" }}>
                        <View style={{ width: "20%" }} ><Text style={{ fontSize: 17 }}>{contact.ContractId}</Text></View>
                        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{ fontSize: 17 }}>
                          {contact.StudentFullNames.length > 0 ?
                            contact.StudentFullNames.map(function (student, index) {
                              return (<View key={index}><Text style={{ paddingBottom: 10, flex: 1, }} >{student}</Text></View>
                              );
                            })
                            : null}
                        </Text></View>
                        <View style={{ width: "20%" }} ><Text onPress={() => props.navigation.navigate("SignedContract", {
                          contractData: contact,
                        })} style={{ fontSize: 17 }}>View</Text></View>
                      </View>

                    );
                  })
                  : null}
              </View>
            </Collapsible>
            <TouchableOpacity onPress={toggleExpanded2}>
              <View style={loginStyle.textAccordian} >
                <Image
                  style={loginStyle.iconLeft}
                  source={require("../../../assets/contacts.png")}
                  resizeMode={'contain'}
                />
                <Text style={{ color: "#000", fontSize: 18, marginBottom: 0 }}>Pending Contact</Text>
                {collapsed2 ?
                  <Image
                    style={loginStyle.arrow}
                    source={require("../../../assets/down-arrow.png")}
                    resizeMode={'contain'}
                  />
                  : <Image
                    style={loginStyle.arrow}
                    source={require("../../../assets/up-arrow.png")}
                    resizeMode={'contain'}
                  />}
              </View>
            </TouchableOpacity>
            <Collapsible collapsed={collapsed2} align="center">
              <View style={{ paddingBottom: 30 }}>
                <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 15, backgroundColor: "#29ABE2", marginTop: 15, alignItems: "center" }}>
                  <View style={{ width: "20%" }} ><Text style={{ color: '#fff', fontSize: 17 }}>Id</Text></View>
                  <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{ color: '#fff', fontSize: 17 }}>Name</Text></View>
                  <View style={{ width: "20%" }} ><Text style={{ color: '#fff', fontSize: 17 }}>Action</Text></View>
                </View>
                {contractDataPending.length > 0 ?
                  contractDataPending.map(function (contact, index) {
                    return (
                      <View key={index} style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 15, marginTop: 5, backgroundColor: "#f7f7f7", alignItems: "center" }}>
                        <View style={{ width: "20%" }} ><Text style={{ fontSize: 17 }}>{contact.ContractId}</Text></View>
                        <View style={{ flex: 1, alignSelf: 'stretch' }} ><Text style={{ fontSize: 17 }}>
                          {contact.StudentFullNames.length > 0 ?
                            contact.StudentFullNames.map(function (student, index) {
                              return (<View key={index}><Text style={{ paddingBottom: 10, flex: 1, }}>{student}</Text></View>
                              );
                            })
                            : null}
                        </Text></View>
                        <View style={{ width: "20%" }} ><Text onPress={() => props.navigation.navigate("Contract", {
                          contractId: contact.ContractId,
                        })} style={{ fontSize: 17 }}>View</Text></View>
                      </View>

                    );
                  })
                  : null}
              </View>
            </Collapsible>
          </Form>
        }

      </Content>
    </Container>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default ContractList;
