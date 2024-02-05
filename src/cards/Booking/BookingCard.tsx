import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { useAppSelector } from "@src/redux/store";
import AppText from "@src/components/Text/AppText";
import moment from "moment";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";

interface BookingCardProps {
  onPress?: () => void;
  startTime?: string;
  endTime?: string;
  bookingStatusType?: string;
  bookingType?: string;
  bookingNumber?: string;
  coach?: any;
  court?: any;
  coachSessionTypeID?: number;
  location?: any;
}

function BookingCard(props: BookingCardProps) {
  const {
    onPress,
    startTime,
    endTime,
    bookingStatusType,
    bookingType,
    bookingNumber,
    coach,
    court,
    coachSessionTypeID,
    location,
  } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: theme.appBackgroundColor,
        borderRadius: 10,
        ...theme.light_shadow,
        padding: 15,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View>
          <AppText style={{ paddingBottom: 5 }} size={12}>
            Date
          </AppText>
          <AppText fontStyle="500.medium" size={12}>
            {moment(startTime).format("DD MMM, ddd")} -{" "}
            {moment(endTime).format("DD MMM, ddd")}
          </AppText>
        </View>
        <View>
          <AppText style={{ paddingBottom: 5, textAlign: "right" }} size={12}>
            Time
          </AppText>
          <AppText fontStyle="500.medium" size={12}>
            {moment(startTime).format("hh:mm A")} -{" "}
            {moment(endTime).format("hh:mm A")}
          </AppText>
        </View>
      </View>
      <VerticalSpacing size={15} />
      {bookingType === "COACH" && (
        <View style={{ flexDirection: "row", width: "100%" }}>
          <FastImage
            style={{ height: 80, width: 80, borderRadius: 200 }}
            source={{
              uri: coach?.picturePathS3,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.user}
          />
          <View style={{ marginLeft: 10 }}>
            <View
              style={{
                backgroundColor:
                  coachSessionTypeID === 1 ? theme.primary : theme.tertiaryText,
                width: 70,
                height: 25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 100,
                marginVertical: 5,
              }}>
              <AppText fontStyle="400.medium" size={12} color={theme.white}>
                Tire {coachSessionTypeID}
              </AppText>
            </View>
            <AppText
              style={{ maxWidth: "60%" }}
              fontStyle="500.bold"
              size={16}
              numberOfLines={1}>
              {coach?.stakeholderName}
            </AppText>
            <VerticalSpacing />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <svgs.LocationV2 color1={theme.secondary} />
              <AppText
                style={{ maxWidth: "58%" }}
                fontStyle="400.bold"
                numberOfLines={2}>
                {location?.locationAddress}
              </AppText>
            </View>
          </View>
        </View>
      )}
      {bookingType === "COURT" && (
        <View style={{ flexDirection: "row", width: "100%" }}>
          <FastImage
            style={{ height: 100, width: 110, borderRadius: 5 }}
            source={{
              uri: `https://nodejsclusters-160185-0.cloudclusters.net/${court?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.Placeholder}
          />
          <View style={{ margin: 10 }}>
            <AppText
              style={{ maxWidth: "60%" }}
              fontStyle="500.bold"
              size={16}
              numberOfLines={2}>
              {court?.courtName}
            </AppText>
            <VerticalSpacing />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <svgs.LocationV2 color1={theme.secondary} />
              <AppText
                style={{ maxWidth: "53%" }}
                fontStyle="400.bold"
                numberOfLines={2}>
                {location?.locationAddress}
              </AppText>
            </View>
          </View>
        </View>
      )}
      <VerticalSpacing size={15} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View>
          <AppText style={{ paddingBottom: 5 }} size={12}>
            Booking ID
          </AppText>
          <AppText fontStyle="500.medium" size={12}>
            # {bookingNumber}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            alignItems: "center",
            backgroundColor:
              bookingStatusType === "CANCELLED"
                ? theme.cancelLight
                : bookingStatusType === "PENDING"
                  ? theme.ongoingLight
                  : theme.completedLight,
            borderRadius: 100,
          }}>
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 20,
              backgroundColor:
                bookingStatusType === "CANCELLED"
                  ? theme.cancel
                  : bookingStatusType === "PENDING"
                    ? theme.ongoing
                    : theme.completed,
              marginRight: 5,
            }}
          />
          <AppText
            style={{ textTransform: "capitalize" }}
            fontStyle="400.medium"
            color={
              bookingStatusType === "CANCELLED"
                ? theme.cancel
                : bookingStatusType === "PENDING"
                  ? theme.ongoing
                  : theme.completed
            }
            size={12}>
            {bookingStatusType}
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default memo(BookingCard);

const styles = StyleSheet.create({});
