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
// const EnterOtp = lazy(() => import("@src/screens/Auth/EnterOtp"));
// const VerifyAccount = lazy(() => import("@screens/Auth/VerifyAccount"));
// const ForgotPassword = lazy(() => import("@screens/Auth/ForgotPassword"));
// const CreateNewPassword = lazy(() => import("@screens/Auth/CreateNewPassword"));

// Main Screens
const Home = lazy(() => import("@screens/Home/Home"));
const Court = lazy(() => import("@screens/Court/Court"));
const CourtDetail = lazy(() => import("@screens/Court/CourtDetail"));
const Coach = lazy(() => import("@screens/Coach/Coach"));
const CoachDetail = lazy(() => import("@screens/Coach/CoachDetail"));
const Group = lazy(() => import("@screens/Group/Group"));
const Calender = lazy(() => import("@screens/Calender/Calender"));
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

export function CourtStake() {
  return (
    <Stack.Navigator
      initialRouteName="Court"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Court" component={Court} />
      <Stack.Screen name="CourtDetail" component={CourtDetail} />
    </Stack.Navigator>
  );
}

export function CoachStake() {
  return (
    <Stack.Navigator
      initialRouteName="Coach"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Coach" component={Coach} />
      <Stack.Screen name="CoachDetail" component={CoachDetail} />
    </Stack.Navigator>
  );
}

export function GroupStake() {
  return (
    <Stack.Navigator
      initialRouteName="Group"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Group" component={Group} />
    </Stack.Navigator>
  );
}

export function CalenderStake() {
  return (
    <Stack.Navigator
      initialRouteName="Calender"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calender" component={Calender} />
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
      {/* <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} /> */}
      <Stack.Screen name="Tab" component={TabNavigation} />
    </Stack.Navigator>
  );
}

export default MyStack;
