import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const isIOS = Platform.OS === "ios";

import TabNavigation from "./TabNavigation";
// Auth page
import LandingPage from "@screens/Landing/Landing";
import { Platform } from "react-native";
const Login = lazy(() => import("@screens/Auth/Login"));
const SignUp = lazy(() => import("@screens/Auth/SignUp"));
const EnterOtp = lazy(() => import("@src/screens/Auth/EnterOtp"));
const VerifyAccount = lazy(() => import("@screens/Auth/VerifyAccount"));
const ForgotPassword = lazy(() => import("@screens/Auth/ForgotPassword"));
const CreateNewPassword = lazy(() => import("@screens/Auth/CreateNewPassword"));

// Main Screens
const Home = lazy(() => import("@screens/Home/Home"));
const Lent = lazy(() => import("@screens/Lent/Lent"));
const Rent = lazy(() => import("@screens/Rent/Rent"));
const Sell = lazy(() => import("@screens/Sell/Sell"));
const Details = lazy(() => import("@screens/Details/Details"));

export const useAppNavigation: () => NavigationProp<ParamListBase> =
  useNavigation;

const Stack = isIOS ? createStackNavigator() : createNativeStackNavigator();

export function HomeStake() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export function LentStake() {
  return (
    <Stack.Navigator
      initialRouteName="Lent"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Lent" component={Lent} />
      <Stack.Screen name="LentDetail" component={Details} />
    </Stack.Navigator>
  );
}

export function SellStake() {
  return (
    <Stack.Navigator
      initialRouteName="Sell"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sell" component={Sell} />
    </Stack.Navigator>
  );
}

export function RentStake() {
  return (
    <Stack.Navigator
      initialRouteName="Rent"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Rent" component={Rent} />
    </Stack.Navigator>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} />
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
}

export default MyStack;
