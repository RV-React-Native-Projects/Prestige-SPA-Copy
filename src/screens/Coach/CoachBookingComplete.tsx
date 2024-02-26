import {
  Platform,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import AppContainer from "@src/components/Container/AppContainer";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";
import AppText from "@src/components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import moment from "moment";
import SlotCard from "@src/cards/Slots/SlotCard";
import _ from "lodash";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import LottieView from "lottie-react-native";

const isIOS = Platform.OS === "ios";

export default function CoachBookingComplete(props: any) {
  const {
    bookingId = null,
    bookingType = null,
    data = null,
    date = null,
    selectedSlot = null,
    slot = null,
    amountPaid = null,
    court = null,
    dateRange = null,
  } = props.route.params || {};

  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const onPressDone = () => {
    navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: moderateScale(100, 0.3),
          paddingHorizontal: moderateScale(15, 0.3),
        }}>
        <VerticalSpacing size={30} />
        <View style={{ alignItems: "center" }}>
          <AppText fontStyle="600.semibold" size={20}>
            {I18n.t("screen_messages.header.Booking_Details")}
          </AppText>
        </View>
        <VerticalSpacing size={20} />
        <View
          style={{
            padding: moderateScale(15, 0.3),
            backgroundColor: theme.modalBackgroundColor,
            borderTopRightRadius: moderateScale(10, 0.3),
            borderTopLeftRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
            borderBottomWidth: moderateScale(1, 0.3),
            borderBottomColor: theme.gray,
          }}>
          <View style={{ alignItems: "center" }}>
            <LottieView
              key={"CompleteLottie"}
              source={require("@assets/lottieFiles/CompleteLottie.json")}
              style={{ height: moderateScale(200, 0.3), width: "100%" }}
              autoPlay
              speed={0.8}
              loop
            />
            <VerticalSpacing />
            <AppText fontStyle="500.semibold" size={16}>
              {I18n.t("screen_messages.common.thank_you")}
            </AppText>
            <VerticalSpacing />
            <AppText fontStyle="400.normal">
              {I18n.t("screen_messages.booking_success")}
            </AppText>
          </View>
          <View>
            <VerticalSpacing size={20} />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <AppText fontStyle="400.normal">
                {I18n.t("screen_messages.booking_ID")}
              </AppText>
              <AppText fontStyle="500.normal"># {bookingId}</AppText>
            </View>
            <VerticalSpacing />
            {bookingType === "MULTI" && dateRange?.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <AppText fontStyle="400.normal">
                    {I18n.t("screen_messages.Start_Date")}
                  </AppText>
                  <AppText fontStyle="500.normal">
                    {moment(dateRange[0]?.startDate).format("DD MMM YY")}
                  </AppText>
                </View>
                <VerticalSpacing />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <AppText fontStyle="400.normal">
                    {I18n.t("screen_messages.End_Date")}
                  </AppText>
                  <AppText fontStyle="500.normal">
                    {moment(dateRange[dateRange?.length - 1]?.endDate).format(
                      "DD MMM YY",
                    )}
                  </AppText>
                </View>
              </>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                <AppText fontStyle="400.normal">
                  {I18n.t("screen_messages.date")}
                </AppText>
                <AppText fontStyle="500.normal">
                  {moment(date).format("DD MMM YY")}
                </AppText>
              </View>
            )}
            <VerticalSpacing />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <AppText fontStyle="400.normal">
                {I18n.t("screen_messages.time")}
              </AppText>
              <AppText fontStyle="500.normal">
                {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </AppText>
            </View>
            <VerticalSpacing />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <AppText fontStyle="400.normal">
                {I18n.t("screen_messages.slot")}
              </AppText>
              <AppText fontStyle="500.normal">
                {I18n.t("screen_messages.slot_mins", {
                  min: slot?.slot?.slotMinutes,
                })}
              </AppText>
            </View>
          </View>
        </View>

        <View
          style={{
            padding: moderateScale(15, 0.3),
            backgroundColor: theme.modalBackgroundColor,
            ...theme.light_shadow,
            borderBottomWidth: moderateScale(1, 0.3),
            borderBottomColor: theme.gray,
          }}>
          <AppText fontStyle="600.semibold" size={16}>
            {I18n.t("screen_messages.Booking_Summary")}
          </AppText>
          <VerticalSpacing />
          <View>
            <View style={{ flexDirection: "row" }}>
              <FastImage
                style={[
                  {
                    height: moderateScale(70, 0.3),
                    width: moderateScale(70, 0.3),
                    borderRadius: moderateScale(100, 0.3),
                  },
                ]}
                defaultSource={images.user}
                source={{
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.stakeholder?.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ marginLeft: moderateScale(10, 0.3) }}>
                <View
                  style={{
                    backgroundColor:
                      data?.coachCategory?.coachCategory === "TIER 1"
                        ? theme.primary
                        : theme.tertiaryText,
                    width: moderateScale(60, 0.3),
                    height: moderateScale(25, 0.3),
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: moderateScale(20, 0.3),
                    marginBottom: moderateScale(10, 0.3),
                  }}>
                  <AppText
                    style={{ textTransform: "capitalize" }}
                    size={12}
                    fontStyle="400.medium"
                    color={theme.modalBackgroundColor}>
                    {data?.coachCategory?.coachCategory}
                  </AppText>
                </View>
                <View>
                  <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
                    {data?.stakeholder?.stakeholderName}
                  </AppText>
                </View>
              </View>
            </View>
            <VerticalSpacing size={15} />
            <View style={{ flexDirection: "row" }}>
              <FastImage
                style={{
                  height: moderateScale(75, 0.3),
                  width: moderateScale(75, 0.3),
                  borderRadius: moderateScale(5, 0.3),
                }}
                defaultSource={images.Placeholder}
                source={{
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${court.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ paddingHorizontal: moderateScale(10, 0.3) }}>
                <AppText
                  fontStyle="700.bold"
                  numberOfLines={1}
                  style={{ maxWidth: "55%" }}>
                  {court?.courtName}
                </AppText>
                <VerticalSpacing size={5} />
                <View style={{ flexDirection: "row" }}>
                  <svgs.Time height={20} width={18} color1={theme.secondary} />
                  <AppText
                    numberOfLines={1}
                    style={{ textTransform: "capitalize", maxWidth: "50%" }}>
                    {I18n.t("screen_messages.time_session", {
                      time: slot?.slot?.slotMinutes,
                      session: slot?.coachSessionType?.sessionType,
                    })}
                  </AppText>
                </View>
                <VerticalSpacing size={5} />
                <View style={{ flexDirection: "row" }}>
                  <svgs.LocationV2
                    color1={theme.secondary}
                    height={20}
                    width={20}
                  />
                  <AppText style={{ maxWidth: "55%" }} numberOfLines={2}>
                    {court?.location?.locationAddress}
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
        {dateRange && (
          <View
            style={{
              backgroundColor: theme.modalBackgroundColor,
              padding: moderateScale(10, 0.3),
            }}>
            <VerticalSpacing />
            {_.map(dateRange, (date, index) => (
              <SlotCard
                backgroundColor={theme.modalBackgroundColor}
                date={date}
                key={index}
                index={index + 1}
              />
            ))}
          </View>
        )}
        <View
          style={{
            padding: moderateScale(15, 0.3),
            backgroundColor: theme.modalBackgroundColor,
            ...theme.light_shadow,
            borderBottomLeftRadius: moderateScale(10, 0.3),
            borderBottomRightRadius: moderateScale(10, 0.3),
          }}>
          <AppText fontStyle="600.semibold" size={16}>
            {I18n.t("screen_messages.Payment_Summary")}
          </AppText>
          <VerticalSpacing />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: moderateScale(10, 0.3),
            }}>
            <AppText fontStyle="500.semibold">
              {I18n.t("screen_messages.total")}
            </AppText>
            <AppText fontStyle="600.semibold">
              {I18n.t("screen_messages.price", { price: amountPaid })}
            </AppText>
          </View>
        </View>
      </ScrollView>
      <FloatingBottomButton
        title={I18n.t("screen_messages.button.done")}
        onPress={onPressDone}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
