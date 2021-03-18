import React from "react";
import { HomeScreen, AttendanceScreen, LinkStudentScreen, VerificationScreen, AccountSuccessScreen, InquiryScreen } from "../screens";
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
      <HomeDrawer.Screen name="StudentLinkSuccess" component={AccountSuccessScreen} />
      <HomeDrawer.Screen name="Inquiry" component={InquiryScreen} />
    </HomeDrawer.Navigator>
  );
};
export default Drawer;
