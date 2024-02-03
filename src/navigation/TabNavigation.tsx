import { Platform } from "react-native";
import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import I18n from "i18n-js";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@src/redux/store";

const isIOS = Platform.OS == "ios";

const Tab = createBottomTabNavigator();

const Home = lazy(() => import("@screens/Home/Home"));
const Court = lazy(() => import("@screens/Court/Court"));
const Coach = lazy(() => import("@screens/Coach/Coach"));
const Group = lazy(() => import("@screens/Group/Group"));
const Calender = lazy(() => import("@screens/Calender/Calender"));

export default function TabNavigation() {
  const { theme } = useAppSelector(state => state.theme);

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        orientation: "portrait",
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarStyle: (route => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "";
          if (
            routeName === "HomeTab" ||
            routeName === "CourtTab" ||
            routeName === "CoachTab" ||
            routeName === "GroupTab" ||
            routeName === "CalenderTab" ||
            routeName === "UpcomingBookings" ||
            routeName === "CompletedBookings" ||
            routeName === "" ||
            routeName === undefined
          ) {
            return {
              display: "flex",
              height: !isIOS ? moderateScale(60, 0.3) : moderateScale(75, 0.3),
              paddingBottom: !isIOS
                ? moderateScale(10, 0.3)
                : moderateScale(20, 0.3),
            };
          }
          return { display: "none" };
        })(route),
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="HomeTab"
        component={Home}
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
              height={35}
              width={35}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CourtTab"
        component={Court}
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
        component={Coach}
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
              height={40}
              width={40}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="GroupTab"
        component={Group}
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
              height={35}
              width={35}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="CalenderTab"
        component={Calender}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "600.bold" : "400.normal"}
              color={color}
              size={focused ? 14 : 12}>
              {I18n.t("screen_messages.tab.booking")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.CalenderV2
              color1={color}
              height={35}
              width={35}
              strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
