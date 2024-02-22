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
const Booking = lazy(() => import("@src/screens/Booking/Booking"));

export default function TabNavigation() {
  const { theme } = useAppSelector(state => state.theme);
  const { isCourtBooking } = useAppSelector(state => state.appData);

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
              fontStyle={focused ? "500.medium" : "400.normal"}
              color={color}
              size={focused ? 13 : 12}>
              {I18n.t("screen_messages.tab.home")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Home
              color1={color}
              height={35}
              width={35}
              // strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
      {isCourtBooking && (
        <Tab.Screen
          name="CourtTab"
          component={Court}
          options={{
            tabBarLabel: ({ color, focused }) => (
              <AppText
                fontStyle={focused ? "500.medium" : "400.normal"}
                color={color}
                size={focused ? 13 : 12}>
                {I18n.t("screen_messages.tab.court")}
              </AppText>
            ),
            tabBarIcon: ({ focused, color, size }) => (
              <svgs.Court
                color1={color}
                height={35}
                width={35}
                // strokeWidth={focused ? 2 : 1.5}
              />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="CoachTab"
        component={Coach}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "500.medium" : "400.normal"}
              color={color}
              size={focused ? 13 : 12}>
              {I18n.t("screen_messages.tab.coach")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Coach
              color1={color}
              height={40}
              width={40}
              // strokeWidth={focused ? 2 : 1.5}
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
              fontStyle={focused ? "500.medium" : "400.normal"}
              color={color}
              size={focused ? 13 : 12}>
              {I18n.t("screen_messages.tab.group")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Group
              color1={color}
              height={35}
              width={35}
              // strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="BookingTab"
        component={Booking}
        options={{
          tabBarLabel: ({ color, focused }) => (
            <AppText
              fontStyle={focused ? "500.medium" : "400.normal"}
              color={color}
              size={focused ? 13 : 12}>
              {I18n.t("screen_messages.tab.booking")}
            </AppText>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <svgs.Booking
              color1={color}
              height={20}
              width={20}
              // strokeWidth={focused ? 2 : 1.5}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
