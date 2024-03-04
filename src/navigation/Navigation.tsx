import React, { lazy } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const isIOS = Platform.OS === "ios";

// import TabNavigation from "@navigation/TabNavigation";

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
const TabNavigation = lazy(() => import("@navigation/TabNavigation"));
const Home = lazy(() => import("@screens/Home/Home"));
const Court = lazy(() => import("@screens/Court/Court"));
const CourtDetail = lazy(() => import("@screens/Court/CourtDetail"));
const CourtSlot = lazy(() => import("@screens/Court/CourtSlot"));
const CourtBooking = lazy(() => import("@src/screens/Court/CourtBooking"));
const CourtBookingComplete = lazy(
  () => import("@src/screens/Court/CourtBookingComplete"),
);
const Coach = lazy(() => import("@screens/Coach/Coach"));
const CoachDetail = lazy(() => import("@screens/Coach/CoachDetail"));
const CoachBooking = lazy(() => import("@src/screens/Coach/CoachBooking"));
const CoachSlot = lazy(() => import("@screens/Coach/CoachSlot"));
const CoachBookingComplete = lazy(
  () => import("@src/screens/Coach/CoachBookingComplete"),
);
const Group = lazy(() => import("@screens/Group/Group"));
const Booking = lazy(() => import("@src/screens/Booking/Booking"));
const Profile = lazy(() => import("@screens/Profile/Profile"));
const EditProfile = lazy(() => import("@screens/Profile/EditProfile"));
const Memberships = lazy(() => import("@screens/Membership/Memberships"));
const EditMemberShip = lazy(() => import("@screens/Membership/EditMemberShip"));
const Family = lazy(() => import("@src/screens/Family/Family"));
const AddFamily = lazy(() => import("@src/screens/Family/AddFamily"));
const BookingDetails = lazy(
  () => import("@src/screens/Booking/BookingDetails"),
);

export const useAppNavigation: () => NavigationProp<ParamListBase> =
  useNavigation;

const Stack = isIOS ? createStackNavigator() : createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{ headerShown: false, orientation: "portrait" }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      {/* <Stack.Screen name="EnterOtp" component={EnterOtp} />
      <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="CreateNewPassword" component={CreateNewPassword} /> */}
      <Stack.Screen name="Tab" component={TabNavigation} />
      {/* <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Court" component={Court} /> */}
      <Stack.Screen
        // options={{ presentation: "modal" }}
        name="CourtDetail"
        component={CourtDetail}
      />
      <Stack.Screen name="CourtSlot" component={CourtSlot} />
      <Stack.Screen name="CourtBooking" component={CourtBooking} />
      <Stack.Screen
        name="CourtBookingComplete"
        component={CourtBookingComplete}
        options={{ gestureEnabled: false }}
      />
      {/* <Stack.Screen name="Coach" component={Coach} /> */}
      <Stack.Screen name="CoachDetail" component={CoachDetail} />
      <Stack.Screen name="CoachBooking" component={CoachBooking} />
      <Stack.Screen name="CoachSlot" component={CoachSlot} />
      <Stack.Screen
        name="CoachBookingComplete"
        component={CoachBookingComplete}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Group" component={Group} />
      {/* <Stack.Screen name="Booking" component={Booking} /> */}
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Memberships" component={Memberships} />
      <Stack.Screen name="EditMemberShip" component={EditMemberShip} />
      <Stack.Screen name="Family" component={Family} />
      <Stack.Screen name="AddFamily" component={AddFamily} />
      <Stack.Screen name="BookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
}

export default AppStack;
