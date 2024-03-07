import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import { useAppSelector } from "@src/redux/store";
import AppText from "@src/components/Text/AppText";
import moment from "moment";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import I18n from "i18n-js";
import { moderateScale } from "react-native-size-matters";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DeviceInfo from "react-native-device-info";
import Config from "react-native-config";

const host = Config?.HOST_URL;

const isTab = DeviceInfo.isTablet();
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
  tier?: string;
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
    tier,
  } = props;

  const { theme } = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        width: "100%",
        backgroundColor: theme.modalBackgroundColor,
        borderRadius: moderateScale(10, 0.3),
        padding: moderateScale(15, 0.3),
        ...theme.light_shadow,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <View>
          <AppText style={{ paddingBottom: moderateScale(5, 0.3) }} size={12}>
            {I18n.t("screen_messages.date")}
          </AppText>
          <AppText fontStyle="500.medium" size={12}>
            {moment(startTime).utc(false).format("DD MMM, ddd")}
          </AppText>
        </View>
        <View>
          <AppText
            style={{ paddingBottom: moderateScale(5, 0.3), textAlign: "right" }}
            size={12}>
            {I18n.t("screen_messages.time")}
          </AppText>
          <AppText fontStyle="500.medium" size={12}>
            {moment(startTime).utc(false).format("hh:mm A")} -{" "}
            {moment(endTime).utc(false).format("hh:mm A")}
          </AppText>
        </View>
      </View>
      <VerticalSpacing size={15} />
      {bookingType === "COACH" && (
        <View style={{ flexDirection: "row", width: "100%" }}>
          <FastImage
            style={{
              height: moderateScale(90, 0.3),
              width: moderateScale(90, 0.3),
              borderRadius: moderateScale(100, 0.3),
            }}
            source={{
              uri: `${host}/${coach?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.user}
          />
          <View style={{ marginLeft: moderateScale(10, 0.3) }}>
            <View
              style={{
                backgroundColor:
                  tier === "TIER 1" ? theme.primary : theme.tertiaryText,
                width: moderateScale(60, 0.3),
                height: moderateScale(25, 0.3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: moderateScale(100, 0.3),
                marginBottom: moderateScale(5, 0.3),
              }}>
              <AppText
                style={{ textTransform: "capitalize" }}
                fontStyle="500.bold"
                size={12}
                color={theme.white}>
                {tier}
              </AppText>
            </View>
            <AppText
              style={{ maxWidth: "60%" }}
              fontStyle="500.normal"
              numberOfLines={1}>
              {coach?.stakeholderName}
            </AppText>
            <VerticalSpacing size={5} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="location-pin"
                size={Math.ceil(moderateScale(20, 0.3))}
                color={theme.secondary}
              />
              <AppText
                style={{ maxWidth: "55%" }}
                fontStyle="400.normal"
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
            style={{
              height: moderateScale(100, 0.3),
              width: moderateScale(110, 0.3),
              borderRadius: moderateScale(5, 0.3),
            }}
            source={{
              uri: `${host}/${court?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.Placeholder}
          />
          <View style={{ marginHorizontal: moderateScale(10, 0.3) }}>
            <AppText
              style={{ maxWidth: "60%" }}
              fontStyle="500.normal"
              numberOfLines={2}>
              {court?.courtName}
            </AppText>
            <VerticalSpacing size={8} />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="location-pin"
                size={Math.ceil(moderateScale(20, 0.3))}
                color={theme.secondary}
              />
              <AppText
                style={{ maxWidth: "53%" }}
                fontStyle="400.normal"
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
          <AppText style={{ paddingBottom: moderateScale(5, 0.3) }} size={12}>
            {I18n.t("screen_messages.booking_ID")}
          </AppText>
          <AppText selectable fontStyle="500.medium" size={12}>
            # {bookingNumber}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: moderateScale(10, 0.3),
            alignItems: "center",
            backgroundColor:
              bookingStatusType === "CANCELLED"
                ? theme.cancelLight
                : bookingStatusType === "PENDING"
                  ? theme.ongoingLight
                  : theme.completedLight,
            borderRadius: moderateScale(100, 0.3),
          }}>
          <View
            style={{
              width: moderateScale(7, 0.3),
              height: moderateScale(7, 0.3),
              borderRadius: moderateScale(20, 0.3),
              backgroundColor:
                bookingStatusType === "CANCELLED"
                  ? theme.cancel
                  : bookingStatusType === "PENDING"
                    ? theme.ongoing
                    : theme.completed,
              marginRight: moderateScale(5, 0.3),
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
