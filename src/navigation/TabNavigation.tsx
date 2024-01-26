import { Platform } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import I18n from "i18n-js";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import {
  HomeStake,
  CourtStake,
  CoachStake,
  GroupStake,
  CalenderStake,
} from "@navigation/Navigation";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@src/redux/store";

const isIOS = Platform.OS == "ios";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  const { theme } = useAppSelector(state => state.theme);
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: !isIOS && {
          height: 65,
          paddingBottom: 10,
        },
        // tabBarStyle: (route => {
        //   const routeName = getFocusedRouteNameFromRoute(route) ?? "";
        //   if (
        //     routeName === "Home_Page" ||
        //     routeName === "Attendance_Page" ||
        //     routeName === "" ||
        //     routeName === undefined
        //   ) {
        //     return { height: moderateScale(75, 0.3) };
        //   }
        //   return { display: "none" };
        // })(route),
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.home")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Home
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CourtTab"
        component={CourtStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.court")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Court
              color1={color}
              height={35}
              width={35}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CoachTab"
        component={CoachStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.coach")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Coach
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GroupTab"
        component={GroupStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.group")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Group
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CalenderTab"
        component={CalenderStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.calender")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.CalenderV2
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
