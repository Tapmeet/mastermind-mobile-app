import React from "react";
import {
  HomeScreen,
  AttendanceScreen,
  LinkStudentScreen,
  VerificationScreen,
  LinkStudentSuccessScreen,
  InquiryScreen,
  UserProfileScreen,
  UserProfileMultipleScreen,
  ContractScreen,
  ContractListScreen,
  SignedContractScreen,
  AddPaymentMethodScreen
} from "../screens";
import { SideBar } from ".";
import { FlatList } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeDrawer = createDrawerNavigator();
const Drawer = (props) => {
  return (
    <HomeDrawer.Navigator drawerContent={(props) => <SideBar {...props} />}>
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="Attendance" component={AttendanceScreen} />
      <HomeDrawer.Screen name="Link Student" component={LinkStudentScreen} />
      <HomeDrawer.Screen name="Verification" component={VerificationScreen} />
      <HomeDrawer.Screen name="StudentLinkSuccess" component={LinkStudentSuccessScreen} />
      <HomeDrawer.Screen name="Inquiry" component={InquiryScreen} />
      <HomeDrawer.Screen name="Profile" component={UserProfileScreen} />
      <HomeDrawer.Screen name="StudentProfile" component={UserProfileMultipleScreen} />
      <HomeDrawer.Screen name="Contract" component={ContractScreen} />
      <HomeDrawer.Screen name="Contracts" component={ContractListScreen} />
      <HomeDrawer.Screen name="SignedContract" component={SignedContractScreen} />
      <HomeDrawer.Screen name="Payment Method" component={AddPaymentMethodScreen} />
    </HomeDrawer.Navigator>
  );
};
export default Drawer;
