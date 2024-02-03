import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { Searchbar } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { LettingData } from "@constants/LettingData";
import PropertyCard from "@cards/Property/PropertyCard";
import { useAppNavigation } from "@navigation/Navigation";
import CoachManager from "@src/services/features/Coach/CoachManager";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import UpcomingBookings from "./UpcomingBookings";
import CompletedBookings from "./CompletedBookings";
import moment from "moment";

const TopTab = createMaterialTopTabNavigator();

function CalenderScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const [bookings, setBookings] = useState<any | null>(null);
  const [upComing, setUpComing] = useState<any | null>(null);
  const [completed, setCompleted] = useState<any | null>(null);

  function getAllBookings() {
    CoachManager.getAllBookingForCustomer(
      { id: user?.stakeholderID },
      res => setBookings(res?.data?.data),
      err => console.log(err),
    );
  }

  useEffect(() => {
    if (!bookings) getAllBookings();
  }, [!bookings]);

  useEffect(() => {
    const today = moment().startOf("day");
    if (bookings && bookings.length > 0) {
      const filteredUpcoming = bookings.filter((booking: any) => {
        const bookingDate = moment(booking.bookingDate);
        return bookingDate.isSameOrAfter(today, "day");
      });
      filteredUpcoming.sort((a: any, b: any) =>
        moment(a.bookingDate).diff(moment(b.bookingDate)),
      );
      setUpComing(filteredUpcoming);
      const completedBookings = bookings.filter((booking: any) => {
        const bookingDate = moment(booking.bookingDate);
        return bookingDate.isBefore(today, "day");
      });
      completedBookings.sort((a: any, b: any) =>
        moment(a.bookingDate).diff(moment(b.bookingDate)),
      );
      setCompleted(completedBookings);
    }
  }, [bookings]);

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
            title: "Upcoming",
          }}
          name="UpcomingBookings"
          component={UpcomingBookings}
          initialParams={{ upComing: upComing }}
        />
        <TopTab.Screen
          options={{
            title: "Completed",
          }}
          name="CompletedBookings"
          component={CompletedBookings}
          initialParams={{ completed: completed }}
        />
      </TopTab.Navigator>
    </AppContainer>
  );
}

export default CalenderScreen;

const styles = StyleSheet.create({});
