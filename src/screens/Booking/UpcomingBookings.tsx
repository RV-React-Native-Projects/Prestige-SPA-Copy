import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import BookingCard from "@cards/Booking/BookingCard";
import { loadBooking } from "@reducers/AppDataSlice";
import svgs from "@common/AllSvgs";
import AppText from "@src/components/Text/AppText";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@src/navigation/Navigation";
import I18n from "i18n-js";
import LottieView from "lottie-react-native";

// import notifee, {
//   AndroidBadgeIconType,
//   AndroidCategory,
//   AndroidImportance,
//   AndroidVisibility,
//   TriggerType,
// } from "@notifee/react-native";
// import moment from "moment";

const windowHeight = Dimensions.get("window").height;

export default function UpcomingBookings(props: any) {
  const { user } = useAppSelector(state => state.user);
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const { upComingBookings, loadingBookings } = useAppSelector(
    state => state.appData,
  );

  const scrollUpBookings = useRef<FlatList>(null);

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(loadBooking(user?.stakeholderID));
  }, []);

  const gotoBookingDetails = (data: any) => {
    navigation.navigate("BookingDetails", { data });
  };

  // useEffect(() => {
  //   notifee.cancelAllNotifications();
  //   const scheduleNotification = async (date: string, id: string) => {
  //     try {
  //       const channelId = await notifee.createChannel({
  //         id: "Prestige-Bookings",
  //         name: "Prestige-Bookings-Notifee",
  //         description: "User Bookings Notifications",
  //         badge: true,
  //         lights: false,
  //         vibration: false,
  //         importance: AndroidImportance.HIGH,
  //       });
  //       // const bookingTime = moment.utc(date);
  //       // const bookingTime = new Date(date);
  //       // const notifyTime = new Date(bookingTime.valueOf());
  //       // const breakTime = moment(bookingTime).subtract(10, "minute");
  //       // const notifyTime = new Date(bookingTime.valueOf());
  //       // notifyTime.setHours(Number(moment(breakTime).format("HH")));
  //       // notifyTime.setMinutes(Number(moment(breakTime).format("MM")));
  //       // console.log("Date====>", notifyTime);
  //       // const date = new Date(Date.now());
  //       // date.setHours(19);
  //       // date.setMinutes(41);
  //       // const bookingTime = moment.utc(date);
  //       // const notifyTime = moment(bookingTime).subtract(10, "minutes").toDate();
  //       // const bookingTime = new Date(String(date));
  //       // const notifyTime = new Date(bookingTime.getTime() - 15 * 60 * 1000);
  //       // notifyTime.setHours(notifyTime.getHours());
  //       // notifyTime.setMinutes(notifyTime.getMinutes());
  //       const bookingTime = new Date(date);
  //       const hours = bookingTime.getUTCHours();
  //       const minutes = bookingTime.getUTCMinutes();
  //       const seconds = bookingTime.getUTCSeconds();
  //       const milliseconds = bookingTime.getUTCMilliseconds();

  //       // Set the time zone offset to UTC 0
  //       bookingTime.setUTCHours(hours - bookingTime.getTimezoneOffset() / 60);
  //       bookingTime.setUTCMinutes(minutes);
  //       bookingTime.setUTCSeconds(seconds);
  //       bookingTime.setUTCMilliseconds(milliseconds);

  //       // Get the UTC ISO string in UTC 0 format
  //       bookingTime.toISOString();
  //       const notifyTime = new Date(bookingTime.getTime() - 10 * 60 * 1000);

  //       console.log(
  //         moment().format("YYYY-MM-DD HH:mm:ss") <
  //           moment(notifyTime).utc(false).format("YYYY-MM-DD HH:mm:ss"),
  //         moment().format("YYYY-MM-DD HH:mm:ss"),
  //         moment.utc(notifyTime).format("YYYY-MM-DD HH:mm:ss"),
  //       );

  //       if (
  //         moment().format("YYYY-MM-DD HH:mm:ss") <
  //         moment.utc(notifyTime).format("YYYY-MM-DD HH:mm:ss")
  //       ) {
  //         await notifee.createTriggerNotification(
  //           {
  //             title: "Upcoming Booking!",
  //             body: `<p>Your booking starts in 10 minutes at<br/>Time: <b>${moment.utc(bookingTime).format("HH:mm A")}</b>, Booking ID : <b>${id}</b></p>`,
  //             android: {
  //               groupId: "Bookings",
  //               channelId,
  //               smallIcon: "ic_launcher_round",
  //               badgeIconType: AndroidBadgeIconType.SMALL,
  //               importance: AndroidImportance.HIGH,
  //               visibility: AndroidVisibility.PUBLIC,
  //               autoCancel: true,
  //               asForegroundService: false,
  //               ongoing: false,
  //               onlyAlertOnce: true,
  //               circularLargeIcon: true,
  //               category: AndroidCategory.NAVIGATION,
  //               showTimestamp: true,
  //               largeIcon: "ic_launcher",
  //               pressAction: {
  //                 id: "default",
  //               },
  //             },
  //             ios: {
  //               categoryId: "Bookings", // Replace with your iOS category ID
  //               sound: "default", // Replace with your desired sound
  //             },
  //           },
  //           {
  //             type: TriggerType.TIMESTAMP,
  //             timestamp: notifyTime.getTime(),
  //           },
  //         );
  //         console.log(
  //           `Notification scheduled for=====> ${id}`,
  //           bookingTime,
  //           notifyTime,
  //           moment().format("YYYY-MM-DD HH:mm:ss"),
  //           notifyTime.getTime(),
  //         );
  //       }
  //     } catch (error) {
  //       console.error(
  //         `Error scheduling notification for booking ${id}: ${error}`,
  //       );
  //     }
  //   };

  //   const scheduleNotifications = async () => {
  //     if (upComingBookings)
  //       for (const booking of upComingBookings) {
  //         await scheduleNotification(booking.startTime, booking.bookingNumber);
  //       }
  //   };

  //   scheduleNotifications();
  // }, [upComingBookings]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.appBackgroundColor }}>
      {upComingBookings && upComingBookings?.length > 0 ? (
        <FlatList
          ref={scrollUpBookings}
          contentContainerStyle={{
            paddingTop: moderateScale(15, 0.3),
            paddingBottom: moderateScale(100, 0.3),
            rowGap: moderateScale(10, 0.3),
            paddingHorizontal: moderateScale(15, 0.3),
          }}
          refreshControl={
            <RefreshControl
              colors={[theme.secondary]}
              tintColor={theme.title}
              refreshing={loadingBookings}
              onRefresh={onRefresh}
            />
          }
          showsVerticalScrollIndicator={true}
          data={upComingBookings}
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
          key={"SearchingLottie"}
          source={require("@assets/lottieFiles/SearchingLottie.json")}
          style={{
            height: moderateScale(windowHeight / 2, 0.3),
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
            {I18n.t("screen_messages.no_booking")}
          </AppText>
          <VerticalSpacing />
          <AppText>{I18n.t("screen_messages.booking_appear")}</AppText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
