import { View, Text } from "react-native";
import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import I18n from "i18n-js";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import {
  HomeStake,
  LentStake,
  RentStake,
  SellStake,
} from "@navigation/Navigation";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#1A295B",
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
            <svgs.HomeV2
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LentTab"
        component={LentStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.let")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Let
              color1={color}
              height={35}
              width={35}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SellTab"
        component={SellStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.sell")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Sell
              color1={color}
              height={30}
              width={30}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="RentTab"
        component={RentStake}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.rent")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Rent
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
