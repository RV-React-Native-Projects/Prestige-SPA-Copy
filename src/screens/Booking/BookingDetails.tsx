import React, { memo } from "react";
import { Linking, Platform, ScrollView, StyleSheet, View } from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import I18n from "i18n-js";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import AppText from "@components/Text/AppText";
import Utils from "@common/Utils";
import moment from "moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import Config from "react-native-config";

const host = Config?.HOST_URL;

const isIOS = Platform.OS === "ios";

function BookingDetails(props: any) {
  const { data } = props?.route?.params;
  const { theme } = useAppSelector(state => state.theme);

  // console.log("DEtails: " + JSON.stringify(data, null, 2));

  const openMap = async () => {
    if (data?.location?.lat && data?.location?.long) {
      const URL = Utils.getMapLink(
        data?.location?.lat,
        data?.location?.long,
        data?.location?.locationName,
      );
      const canOpen = await Linking.canOpenURL(URL ?? "");
      if (URL && canOpen) Linking.openURL(URL);
    }
  };

  return (
    <AppContainer hideStatusbar={false} scrollable={false} fullHeight={false}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Booking_Details")}
      />
      <ScrollView
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
        }}>
        <VerticalSpacing />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(15, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
            borderRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
          }}>
          <View>
            <AppText style={{ paddingBottom: 5 }} size={12}>
              {I18n.t("screen_messages.booking_ID")}
            </AppText>
            <AppText selectable fontStyle="500.medium" size={12}>
              # {data?.bookingNumber}
            </AppText>
          </View>
          <View
            style={{
              flexDirection: "row",
              padding: moderateScale(10, 0.3),
              alignItems: "center",
              backgroundColor:
                data?.bookingStatusType === "CANCELLED"
                  ? theme.cancelLight
                  : data?.bookingStatusType === "PENDING"
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
                  data?.bookingStatusType === "CANCELLED"
                    ? theme.cancel
                    : data?.bookingStatusType === "PENDING"
                      ? theme.ongoing
                      : theme.completed,
                marginRight: 5,
              }}
            />
            <AppText
              style={{ textTransform: "capitalize" }}
              fontStyle="400.medium"
              color={
                data?.bookingStatusType === "CANCELLED"
                  ? theme.cancel
                  : data?.bookingStatusType === "PENDING"
                    ? theme.ongoing
                    : theme.completed
              }
              size={12}>
              {data?.bookingStatusType}
            </AppText>
          </View>
        </View>
        <VerticalSpacing size={15} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(15, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
            borderRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
          }}>
          {data?.bookingType === "COACH" && (
            <View style={{ flexDirection: "row", width: "100%" }}>
              <FastImage
                style={{
                  height: moderateScale(80, 0.3),
                  width: moderateScale(80, 0.3),
                  borderRadius: moderateScale(100, 0.3),
                }}
                source={{
                  uri: `${host}/${data?.coach?.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                defaultSource={images.user}
              />
              <View style={{ marginLeft: moderateScale(10, 0.3) }}>
                <View
                  style={{
                    backgroundColor:
                      data?.coach?.coachProfile?.coachCategory
                        ?.coachCategory === "TIER 1"
                        ? theme.primary
                        : theme.tertiaryText,
                    width: moderateScale(60, 0.3),
                    height: moderateScale(25, 0.3),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: moderateScale(100, 0.3),
                    marginBottom: moderateScale(5, 0.3),
                  }}>
                  <AppText
                    style={{ textTransform: "capitalize" }}
                    fontStyle="400.medium"
                    size={12}
                    color={theme.white}>
                    {data?.coach?.coachProfile?.coachCategory?.coachCategory}
                  </AppText>
                </View>
                <AppText
                  style={{ maxWidth: "60%" }}
                  fontStyle="500.medium"
                  size={16}
                  numberOfLines={1}>
                  {data?.coach?.stakeholderName}
                </AppText>
                <VerticalSpacing size={5} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="location-pin"
                    size={Math.ceil(moderateScale(20, 0.3))}
                    color={theme.secondary}
                  />
                  <AppText
                    style={{ maxWidth: "56%" }}
                    fontStyle="400.normal"
                    numberOfLines={2}>
                    {data?.location?.locationAddress}
                  </AppText>
                </View>
              </View>
            </View>
          )}
          {data?.bookingType === "COURT" && (
            <View style={{ flexDirection: "row", width: "100%" }}>
              <FastImage
                style={{
                  height: moderateScale(100, 0.3),
                  width: moderateScale(110, 0.3),
                  borderRadius: moderateScale(5, 0.3),
                }}
                source={{
                  uri: `${host}/${data?.court?.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                defaultSource={images.Placeholder}
              />
              <View
                style={{ marginLeft: moderateScale(10, 0.3), width: "100%" }}>
                <AppText
                  style={{ maxWidth: "60%" }}
                  fontStyle="500.medium"
                  size={16}
                  numberOfLines={2}>
                  {data?.court?.courtName}
                </AppText>
                <VerticalSpacing />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: moderateScale(-5, 0.3),
                  }}>
                  <MaterialIcons
                    name="location-pin"
                    size={Math.ceil(moderateScale(20, 0.3))}
                    color={theme.secondary}
                  />
                  <AppText
                    style={{ maxWidth: "60%" }}
                    fontStyle="400.normal"
                    numberOfLines={2}>
                    {data?.location?.locationAddress}
                  </AppText>
                </View>
              </View>
            </View>
          )}
        </View>
        <VerticalSpacing size={15} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(15, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
            borderRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
          }}>
          <View>
            <AppText style={{ paddingBottom: moderateScale(5, 0.3) }} size={12}>
              {I18n.t("screen_messages.date")}
            </AppText>
            <AppText fontStyle="500.semibold" size={12}>
              {moment(data?.startTime).utc(false).format("DD MMM, ddd")}
            </AppText>
          </View>

          <View style={{ paddingVertical: moderateScale(15, 0.3) }}>
            <AppText style={{ paddingBottom: moderateScale(5, 0.3) }} size={12}>
              {I18n.t("screen_messages.time")}
            </AppText>
            <AppText fontStyle="500.semibold" size={12}>
              {moment(data?.startTime).utc(false).format("hh:mm A")} -{" "}
              {moment(data?.endTime).utc(false).format("hh:mm A")}
            </AppText>
          </View>
          <View>
            <AppText style={{ paddingBottom: moderateScale(5, 0.3) }} size={12}>
              {I18n.t("screen_messages.slot_duration")}
            </AppText>
            <AppText fontStyle="500.semibold" size={12}>
              {I18n.t("screen_messages.slot_mins", { min: data?.slotMinutes })}
            </AppText>
          </View>
        </View>
        <VerticalSpacing />
        <AppText
          fontStyle="600.semibold"
          size={16}
          style={{ padding: moderateScale(15, 0.3) }}>
          {I18n.t("screen_messages.Payment_Detail")}
        </AppText>
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(15, 0.3),
            marginHorizontal: moderateScale(15, 0.3),
            borderRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <AppText fontStyle="500.semibold">
              {I18n.t("screen_messages.total")}
            </AppText>
            <AppText fontStyle="600.semibold">
              {I18n.t("screen_messages.price", { price: data?.amount })}
            </AppText>
          </View>
        </View>
        <VerticalSpacing size={40} />
      </ScrollView>
      <FloatingBottomButton
        duration={500}
        title={I18n.t("screen_messages.button.View_Directions")}
        onPress={openMap}
      />
    </AppContainer>
  );
}

export default memo(BookingDetails);

const styles = StyleSheet.create({});
