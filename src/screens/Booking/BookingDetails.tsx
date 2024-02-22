import React, { memo } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { RadioButton } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import * as Animatable from "react-native-animatable";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import AppButton from "@components/Button/AppButton";
import I18n from "i18n-js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import RBSheet from "react-native-raw-bottom-sheet";
import filter from "lodash/filter";
import map from "lodash/map";
import toString from "lodash/toString";
import toNumber from "lodash/toNumber";
import SlotsDuration from "@cards/Slots/SlotsDuration";
import { loadSlots } from "@reducers/AppDataSlice";
import Feather from "react-native-vector-icons/Feather";
import Utils from "@common/Utils";
import moment from "moment";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function BookingDetails(props: any) {
  const { data } = props?.route?.params;
  const { theme } = useAppSelector(state => state.theme);
  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const { user } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();

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
              padding: 10,
              alignItems: "center",
              backgroundColor:
                data?.bookingStatusType === "CANCELLED"
                  ? theme.cancelLight
                  : data?.bookingStatusType === "PENDING"
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
                style={{ height: 80, width: 80, borderRadius: 200 }}
                source={{
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.coach?.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
                defaultSource={images.user}
              />
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    backgroundColor:
                      data?.coachSessionTypeID === 1
                        ? theme.primary
                        : theme.tertiaryText,
                    width: 70,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    marginBottom: 5,
                  }}>
                  <AppText fontStyle="400.medium" size={12} color={theme.white}>
                    {data?.coach?.coachProfile?.coachCategory?.coachCategory}
                  </AppText>
                </View>
                <AppText
                  style={{ maxWidth: "60%" }}
                  fontStyle="500.bold"
                  size={16}
                  numberOfLines={1}>
                  {data?.coach?.stakeholderName}
                </AppText>
                <VerticalSpacing size={5} />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <svgs.LocationV2 color1={theme.secondary} />
                  <AppText
                    style={{ maxWidth: "58%" }}
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
                style={{ height: 100, width: 110, borderRadius: 5 }}
                source={{
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.court?.imagePath}`,
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
                  {data?.court?.courtName}
                </AppText>
                <VerticalSpacing />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <svgs.LocationV2 color1={theme.secondary} />
                  <AppText
                    style={{ maxWidth: "53%" }}
                    fontStyle="400.bold"
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
            <AppText style={{ paddingBottom: 5 }} size={12}>
              {I18n.t("screen_messages.date")}
            </AppText>
            <AppText fontStyle="500.medium" size={12}>
              {moment(data?.startTime).utc(false).format("DD MMM, ddd")} -{" "}
              {moment(data?.endTime).utc(false).format("DD MMM, ddd")}
            </AppText>
          </View>

          <View style={{ paddingVertical: moderateScale(15, 0.3) }}>
            <AppText style={{ paddingBottom: 5 }} size={12}>
              {I18n.t("screen_messages.time")}
            </AppText>
            <AppText fontStyle="500.medium" size={12}>
              {moment(data?.startTime).utc(false).format("hh:mm A")} -{" "}
              {moment(data?.endTime).utc(false).format("hh:mm A")}
            </AppText>
          </View>
          <View>
            <AppText style={{ paddingBottom: 5 }} size={12}>
              {I18n.t("screen_messages.slot_duration")}
            </AppText>
            <AppText fontStyle="500.medium" size={12}>
              {I18n.t("screen_messages.slot_mins", { min: data?.slotMinutes })}
            </AppText>
          </View>
        </View>
        <VerticalSpacing />
        <AppText fontStyle="600.semibold" size={16} style={{ padding: 15 }}>
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
      <Animatable.View
        animation="fadeInUp"
        duration={500}
        style={{
          backgroundColor: theme.modalBackgroundColor,
          padding: moderateScale(20, 0.3),
          bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
          ...theme.dark_shadow,
        }}>
        <AppButton
          Title="View Directions"
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={openMap}
        />
      </Animatable.View>
    </AppContainer>
  );
}

export default memo(BookingDetails);

const styles = StyleSheet.create({});
