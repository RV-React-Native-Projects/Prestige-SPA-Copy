import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import BookingCard from "@cards/Booking/BookingCard";
import { loadBooking } from "@reducers/AppDataSlice";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";

const windowHeight = Dimensions.get("window").height;

export default function CompletedBookings(props: any) {
  const { user } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.theme);
  const storeDispatch = useAppDispatch();
  const { completedBookings, loadingBookings } = useAppSelector(
    state => state.appData,
  );

  const scrollUpBookings = useRef<FlatList>(null);

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(loadBooking(user?.stakeholderID));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {completedBookings && CompletedBookings.length > 0 ? (
        <FlatList
          ref={scrollUpBookings}
          refreshControl={
            <RefreshControl
              colors={[theme.secondary]}
              tintColor={theme.title}
              refreshing={loadingBookings}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={{
            paddingTop: moderateScale(15, 0.3),
            paddingBottom: moderateScale(100, 0.3),
            rowGap: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
          }}
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
              tier={item?.coach?.coachProfile?.coachCategory?.coachCategory}
            />
          )}
        />
      ) : (
        !loadingBookings && (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <svgs.NoBooking
              height={moderateScale(windowHeight / 2.5, 0.3)}
              width="80%"
            />
            <VerticalSpacing />
            <AppText fontStyle="500.bold" size={16}>
              Booking History
            </AppText>
            <VerticalSpacing />
            <AppText>Track your ongoing and completed bookings here</AppText>
          </View>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
