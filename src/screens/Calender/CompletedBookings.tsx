import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import BookingCard from "@cards/Booking/BookingCard";
import Utils from "@common/Utils";
import { loadBooking } from "@reducers/AppDataSlice";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import { VerticalSpacing } from "@components/Spacing/Spacing";

const windowHeight = Dimensions.get("window").height;

export default function CompletedBookings(props: any) {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const { completedBookings } = useAppSelector(state => state.appData);
  const [refreshing, setRefreshing] = useState(false);

  const scrollUpBookings = useRef<FlatList>(null);

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(loadBooking(user?.stakeholderID));
    setRefreshing(true);
    Utils.wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {completedBookings && CompletedBookings.length > 0 ? (
        <FlatList
          ref={scrollUpBookings}
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: 100,
            rowGap: 10,
            marginHorizontal: 15,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          data={completedBookings}
          renderItem={({ item, index }) => (
            <BookingCard
              key={index}
              startTime={item?.startTime}
              endTime={item?.endTime}
              bookingStatusType={item?.bookingStatusType}
              bookingType={item?.bookingType}
              bookingNumber={item?.bookingNumber}
              coachSessionTypeID={item?.coachSessionTypeID}
              court={item?.court}
              coach={item?.coach}
              location={item?.location}
            />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <svgs.NoBooking height={windowHeight / 2.5} width="80%" />
          <VerticalSpacing />
          <AppText fontStyle="500.bold" size={16}>
            Booking History
          </AppText>
          <VerticalSpacing />
          <AppText>Track your ongoing and completed bookings here</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
