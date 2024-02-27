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
import { useAppNavigation } from "@src/navigation/Navigation";
import I18n from "i18n-js";
import LottieView from "lottie-react-native";

const windowHeight = Dimensions.get("window").height;

export default function CompletedBookings(props: any) {
  const { user } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const { completedBookings, loadingBookings } = useAppSelector(
    state => state.appData,
  );

  const scrollUpBookings = useRef<FlatList>(null);

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(loadBooking(user?.stakeholderID));
  }, []);

  const gotoBookingDetails = (data: any) => {
    navigation.navigate("BookingDetails", { data });
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
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
              onPress={() => gotoBookingDetails(item)}
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
      ) : loadingBookings ? (
        <LottieView
          key={"SearchingLottie2"}
          source={require("@assets/lottieFiles/SearchingLottie.json")}
          style={{
            height: moderateScale(windowHeight - 200, 0.3),
            width: "100%",
          }}
          autoPlay
          loop
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <svgs.NoBooking
            height={moderateScale(windowHeight / 2.5, 0.3)}
            width="80%"
          />
          <VerticalSpacing />
          <AppText fontStyle="500.bold" size={16}>
            {I18n.t("screen_messages.booking_history")}
          </AppText>
          <VerticalSpacing />
          <AppText>{I18n.t("screen_messages.track_booking")}</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
