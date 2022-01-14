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
  AddPaymentMethodScreen,
  PaymentMethodListingsScreen,
  AddAccountMethodScreen,
  EventListing,
  EventDetails,
  PurchaseEvent,
  PurchaseHistory,
  ProductListing,
  ProductDetails,
  PurchaseProduct,
  Cart,
  CartEvents,
  TaskClass,
  ClassList,
  ClassReservations,
  StudentClasses,
} from "../screens";
import { SideBar } from ".";
import { FlatList } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const HomeDrawer = createDrawerNavigator();
const Drawer = (props) => {
  return (
    <HomeDrawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerPosition="right" 
      drawerContent={(props) => <SideBar {...props} />}
    >
      <HomeDrawer.Screen name="Home" component={HomeScreen} />
      <HomeDrawer.Screen name="Attendance" component={AttendanceScreen} />
      <HomeDrawer.Screen name="Link Student" component={LinkStudentScreen} />
      <HomeDrawer.Screen name="Verification" component={VerificationScreen} />
      <HomeDrawer.Screen name="StudentLinkSuccess" component={LinkStudentSuccessScreen} />
      <HomeDrawer.Screen name="Inquiry" component={InquiryScreen} />
      <HomeDrawer.Screen name="Profile" component={UserProfileScreen} />
      <HomeDrawer.Screen name="StudentProfile" component={UserProfileMultipleScreen} />
      <HomeDrawer.Screen name="Contract" component={ContractScreen} />
      <HomeDrawer.Screen name="Memberships" component={ContractListScreen} />
      <HomeDrawer.Screen name="SignedContract" component={SignedContractScreen} />
      <HomeDrawer.Screen name="Payment Methods" component={PaymentMethodListingsScreen} />
      <HomeDrawer.Screen name="Payment Method Card" component={AddPaymentMethodScreen} />
      <HomeDrawer.Screen name="Add Payment Account" component={AddAccountMethodScreen} />
      <HomeDrawer.Screen name="Events" component={EventListing} />
      <HomeDrawer.Screen name="Event Detail" component={EventDetails} />
      <HomeDrawer.Screen name="Purchase Event" component={PurchaseEvent} />
      <HomeDrawer.Screen name="Purchase History" component={PurchaseHistory} />
      <HomeDrawer.Screen name="Retail" component={ProductListing} />
      <HomeDrawer.Screen name="Product Details" component={ProductDetails} />
      <HomeDrawer.Screen name="Purchase Product" component={PurchaseProduct} />
      <HomeDrawer.Screen name="Cart" component={Cart} />
      <HomeDrawer.Screen name="Events Cart" component={CartEvents} />
      <HomeDrawer.Screen name="Class Reservation" component={ClassList} />
      <HomeDrawer.Screen name="Class Tasks" component={TaskClass} />
      <HomeDrawer.Screen name="Class Reservations" component={ClassReservations} />
      <HomeDrawer.Screen name="Reserved Classes" component={StudentClasses} />
    </HomeDrawer.Navigator>
  );
};
export default Drawer;
