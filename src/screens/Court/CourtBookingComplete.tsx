import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  BackHandler,
} from "react-native";
import React, { useEffect } from "react";
import { useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppContainer from "@src/components/Container/AppContainer";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import AppButton from "@src/components/Button/AppButton";
import I18n from "i18n-js";
import * as Animatable from "react-native-animatable";
import AppText from "@src/components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import moment from "moment";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;

export default function CourtBookingComplete(props: any) {
  const {
    data = null,
    date = null,
    amountPaid = null,
    startTime = null,
    endTime = null,
    bookingId = null,
    slot = null,
  } = props.route.params || {};
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  // console.log(JSON.stringify(data, null, 2));

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
            borderBottomWidth: 0.3,
            borderBottomColor: theme.paragraph,
            ...theme.light_shadow,
          }}>
          <VerticalSpacing size={20} />
          <View style={{ alignItems: "center" }}>
            <svgs.Success />
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
            {/* ======= seession Id is Not required for Now ======= */}
            {/* <VerticalSpacing />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <AppText fontStyle="400.normal">Session ID</AppText>
              <AppText fontStyle="500.normal">DGSG928378278</AppText>
            </View> */}
            <VerticalSpacing />
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
                {startTime} - {endTime}
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
                {I18n.t("screen_messages.slot_mins", { min: slot })}
              </AppText>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: moderateScale(15, 0.3),
            backgroundColor: theme.modalBackgroundColor,
            borderBottomWidth: 0.3,
            borderBottomColor: theme.paragraph,
            ...theme.light_shadow,
          }}>
          <AppText fontStyle="600.semibold" size={16}>
            {I18n.t("screen_messages.Booking_Summary")}
          </AppText>
          <VerticalSpacing />
          <View style={{ flexDirection: "row" }}>
            <FastImage
              style={[
                {
                  height: moderateScale(80, 0.3),
                  width: moderateScale(100, 0.3),
                  borderRadius: moderateScale(5, 0.3),
                  marginRight: moderateScale(10, 0.3),
                },
              ]}
              defaultSource={images.Placeholder}
              source={{
                uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.courts[0]?.imagePath}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <AppText fontStyle="500.medium" size={16}>
              {data?.locationName}
            </AppText>
          </View>
        </View>
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
              {I18n.t("screen_messages.price", {
                price: amountPaid,
              })}
            </AppText>
          </View>
        </View>
      </ScrollView>
      <FloatingBottomButton onPress={onPressDone} />
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
