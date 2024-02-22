import React, { lazy, useCallback } from "react";
import { StyleSheet } from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { loadBooking } from "@reducers/AppDataSlice";
import { useFocusEffect } from "@react-navigation/native";
import I18n from "i18n-js";

const UpcomingBookings = lazy(
  () => import("@src/screens/Booking/UpcomingBookings"),
);
const CompletedBookings = lazy(
  () => import("@src/screens/Booking/CompletedBookings"),
);

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
            fontSize: 14,
            fontWeight: "600",
          },
          tabBarIndicatorStyle: {
            height: 3,
            backgroundColor: theme.secondary,
            borderRadius: 10,
          },
        }}>
        <TopTab.Screen
          options={{
            title: I18n.t("screen_messages.button.Upcoming"),
          }}
          name="UpcomingBookings"
          component={UpcomingBookings}
        />
        <TopTab.Screen
          options={{
            title: I18n.t("screen_messages.button.Completed"),
          }}
          name="CompletedBookings"
          component={CompletedBookings}
        />
      </TopTab.Navigator>
    </AppContainer>
  );
}

export default CalenderScreen;

const styles = StyleSheet.create({});
