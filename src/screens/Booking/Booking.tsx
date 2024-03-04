import React, { lazy, useCallback } from "react";
import { StyleSheet } from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { loadBooking } from "@reducers/AppDataSlice";
import { useFocusEffect } from "@react-navigation/native";
import I18n from "i18n-js";
import { moderateScale } from "react-native-size-matters";

const Upcoming = lazy(() => import("@screens/Booking/UpcomingBookings"));
const Completed = lazy(() => import("@screens/Booking/CompletedBookings"));

const TopTab = createMaterialTopTabNavigator();

function CalenderScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { bookings } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      if (!bookings && user) storeDispatch(loadBooking(user?.stakeholderID));
    }, [!bookings]),
  );

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <TopTab.Navigator
        initialRouteName="UpcomingBookings"
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: moderateScale(14, 0.3),
            fontWeight: "600",
          },
          tabBarIndicatorStyle: {
            height: moderateScale(4, 0.3),
            backgroundColor: theme.secondary,
            borderRadius: moderateScale(10, 0.3),
          },
        }}>
        <TopTab.Screen
          options={{
            title: I18n.t("screen_messages.button.Upcoming"),
          }}
          name="UpcomingBookings"
          component={Upcoming}
        />
        <TopTab.Screen
          options={{
            title: I18n.t("screen_messages.button.Completed"),
          }}
          name="CompletedBookings"
          component={Completed}
        />
      </TopTab.Navigator>
    </AppContainer>
  );
}

export default CalenderScreen;

const styles = StyleSheet.create({});
