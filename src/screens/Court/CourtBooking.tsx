import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, ScrollView, Platform, Linking } from "react-native";
import AppContainer from "@src/components/Container/AppContainer";
import { useAppSelector } from "@src/redux/store";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import AppButton from "@src/components/Button/AppButton";
import I18n from "i18n-js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AppText from "@src/components/Text/AppText";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import moment from "moment";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import { useAppNavigation } from "@navigation/Navigation";
// import AvailableCreditManager from "@features/AvailableCredit/AvailableCreditManager";
import CourtManager from "@features/Court/CourtManager";
import { useStripe } from "@stripe/stripe-react-native";
import StripeManager from "@features/Stripe/StripeManager";
import useAppToast from "@components/Alert/AppToast";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import DeviceInfo from "react-native-device-info";

const isIOS = Platform.OS === "ios";
const isTab = DeviceInfo.isTablet();

export default function CourtBooking(props: any) {
  const {
    data = null,
    pickedDate = null,
    startTime = null,
    endTime = null,
    slotId = null,
    courtId = null,
    selectedCourt = null,
    familyID = null,
    isVerified = false,
  } = props.route.params || {};
  const { initPaymentSheet, presentPaymentSheet, handleURLCallback } =
    useStripe();

  const { theme } = useAppSelector(state => state.theme);
  const { user, authHeader } = useAppSelector(state => state.user);
  const { isUseAvailableCredits } = useAppSelector(state => state.appData);
  const [loading, setLoading] = useState<boolean>(false);
  const [useCredit, setUseCredit] = useState<boolean>(false);
  const appToast = useAppToast();

  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        if (stripeHandled) {
        } else {
        }
      }
    },
    [handleURLCallback],
  );

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      handleDeepLink(initialUrl);
    };

    getUrlAsync();

    const deepLinkListener = Linking.addEventListener(
      "url",
      (event: { url: string }) => {
        handleDeepLink(event.url);
      },
    );

    return () => deepLinkListener.remove();
  }, [handleDeepLink]);

  const initializePaymentSheet = async () => {
    StripeManager.generatePaymentSheet(
      {
        data: { amount: selectedCourt?.["creditTypes.rate"] },
        headers: authHeader,
      },
      async res => {
        // console.log("Res===>", JSON.stringify(res, null, 2));
        const { error } = await initPaymentSheet({
          merchantDisplayName: "prestige_spa",
          customerId: res?.data?.customer,
          customerEphemeralKeySecret: res?.data?.ephemeralKey,
          paymentIntentClientSecret: res?.data?.paymentIntent,
          returnURL: "spoacd://stripe-redirect",
          allowsDelayedPaymentMethods: true,
          defaultBillingDetails: {
            name: user?.username,
            email: user?.email,
            phone: user?.phoneNumber,
          },
        });
        if (!error) {
          // setLoading(true);
        } else {
          console.log("Error At Initioalizing", error);
        }
      },
      err => {
        setLoading(false);
        console.log("Error At Initializing===>", err);
      },
    );
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  console.log("====================================");
  console.log(selectedCourt);
  console.log("====================================");

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      appToast.showToast({
        title: error?.code,
        description: error?.message,
        status: "warning",
        duration: 3000,
        placement: "top",
        variant: "top-accent",
      });
      console.log("ERR====>", error);
    } else createOneBooking();
  };

  function createOneBooking() {
    setLoading(true);
    const parsedDate = moment(pickedDate).utc(false);
    const startedAtTime = moment(startTime, "hh:mm a");
    const completedAtTime = moment(endTime, "hh:mm a");

    const startDate = parsedDate.clone().set({
      hour: startedAtTime.get("hour"),
      minute: startedAtTime.get("minute"),
      second: 0,
    });

    const endDate = parsedDate.clone().set({
      hour: completedAtTime.get("hour"),
      minute: completedAtTime.get("minute"),
      second: 0,
    });

    let params = {
      data: {
        courtID: courtId,
        locationID: 13,
        startTime: startDate,
        endTime: endDate,
        isPaymentDone: true,
        familyMemberID: familyID,
        customerID: user?.stakeholderID,
        amount: useCredit ? 0 : selectedCourt?.["creditTypes.rate"],
        email: user?.email,
        courtName: selectedCourt?.courtName,
        locationName: data?.locationName,
        creditTypeID: selectedCourt?.["creditTypes.creditTypeID"],
        isMember: isVerified,
        useAvailableCredits: useCredit,
      },
      headers: authHeader,
    };
    CourtManager.createOneBooking(
      params,
      res => {
        setLoading(false);
        navigation?.navigate("CourtBookingComplete", {
          data: data,
          date: pickedDate,
          startTime: startTime,
          endTime: endTime,
          bookingId: res?.data?.data?.bookingNumber,
          slot: endDate.diff(startDate, "minutes"),
          amountPaid:
            isVerified || useCredit ? 0 : selectedCourt?.["creditTypes.rate"],
        });
      },
      err => {
        setLoading(false);
        console.log("Error createOneBooking===>", err);
      },
    );
  }

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle title="Booking Confirmation" />
      <ScrollView
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}>
        <VerticalSpacing size={15} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(10, 0.3),
            paddingHorizontal: moderateScale(15, 0.3),
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
            <View>
              <AppText
                fontStyle="400.normal"
                color={theme.gray}
                style={{ marginBottom: moderateScale(10, 0.3) }}>
                Date
              </AppText>
              <AppText fontStyle="600.semibold">
                {moment(pickedDate).format("DD MMM, ddd")}
              </AppText>
            </View>
            <View>
              <AppText
                fontStyle="400.normal"
                color={theme.gray}
                style={{ marginBottom: 10, textAlign: "right" }}>
                Time
              </AppText>
              <AppText fontStyle="600.semibold" style={{ textAlign: "right" }}>
                {startTime} - {endTime}
              </AppText>
            </View>
          </View>
        </View>
        {/* ===== Court Details Card ===== */}
        <VerticalSpacing size={5} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            margin: moderateScale(15, 0.3),
            borderRadius: 10,
            ...theme.light_shadow,
          }}>
          <View
            style={{
              padding: moderateScale(10, 0.3),
              flexDirection: "row",
            }}>
            <FastImage
              style={[
                {
                  height: moderateScale(100, 0.3),
                  width: moderateScale(110, 0.3),
                  borderRadius: 5,
                },
              ]}
              defaultSource={images.Placeholder}
              source={{
                uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.courts[0]?.imagePath}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={{ paddingHorizontal: moderateScale(10, 0.3) }}>
              <AppText fontStyle="700.bold">{data?.locationName}</AppText>
              <VerticalSpacing />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="location-pin"
                  size={Math.ceil(moderateScale(20, 0.3))}
                  color={theme.secondary}
                />
                <AppText
                  fontStyle="400.normal"
                  style={{ maxWidth: "50%" }}
                  numberOfLines={2}>
                  {data?.locationAddress}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: moderateScale(5, 0.3),
                  alignItems: "center",
                }}>
                <svgs.Court
                  color1={theme.secondary}
                  height={moderateScale(20, 0.3)}
                  width={moderateScale(20, 0.3)}
                />
                <AppText fontStyle="400.normal">
                  {selectedCourt?.courtName}
                </AppText>
              </View>
            </View>
          </View>
        </View>
        {/* ========= Bill INFO ========== */}
        <VerticalSpacing />
        {isVerified ? (
          <View
            style={{
              marginHorizontal: moderateScale(15, 0.3),
              padding: moderateScale(15, 0.3),
              borderRadius: moderateScale(10, 0.3),
              backgroundColor: theme.modalBackgroundColor,
            }}>
            <AppText fontStyle="500.bold" size={18} color={theme.secondary}>
              {I18n.t("screen_messages.Membership_Benefits")}
            </AppText>
            <VerticalSpacing />
            <AppText fontStyle="400.normal" color={theme.paragraph}>
              {I18n.t("screen_messages.club_membership")}
            </AppText>
            <VerticalSpacing />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 5,
              }}>
              <MaterialIcons
                name="verified"
                size={Math.ceil(moderateScale(20, 0.3))}
                color={theme.secondary}
              />
              <AppText
                style={{ marginLeft: moderateScale(5, 0.3) }}
                fontStyle="600.bold">
                {I18n.t("screen_messages.verified_member")}
              </AppText>
            </View>
          </View>
        ) : null}
        {!isVerified &&
        isUseAvailableCredits &&
        selectedCourt?.["creditTypes.availableCredits.quantity"] > 0 ? (
          <View
            style={{
              marginHorizontal: moderateScale(15, 0.3),
              padding: moderateScale(15, 0.3),
              borderRadius: moderateScale(10, 0.3),
              backgroundColor: theme.modalBackgroundColor,
            }}>
            <AppText fontStyle="500.bold" size={16} color={theme.primary}>
              {I18n.t("screen_messages.apply_credits_payment")} ({" "}
              {selectedCourt?.["creditTypes.availableCredits.quantity"]} )
            </AppText>
            <VerticalSpacing />
            <BouncyCheckbox
              size={25}
              fillColor={theme.primary}
              unfillColor={theme.modalBackgroundColor}
              textStyle={{
                textDecorationLine: "none",
              }}
              textComponent={
                <AppText
                  style={{ paddingLeft: 10, maxWidth: "95%" }}
                  fontStyle="400.normal"
                  color={useCredit ? theme.title : theme.gray}>
                  {I18n.t("screen_messages.use_available_credits")}
                </AppText>
              }
              innerIconStyle={{ borderWidth: 2 }}
              onPress={(isChecked: boolean) => setUseCredit(isChecked)}
            />
          </View>
        ) : null}
        <VerticalSpacing />
        <View style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
          <AppText fontStyle="500.normal" size={16}>
            Bill Details
          </AppText>
          <VerticalSpacing size={20} />
          <View
            style={{
              padding: moderateScale(15, 0.3),
              paddingVertical: moderateScale(20, 0.3),
              backgroundColor: theme.modalBackgroundColor,
              borderRadius: moderateScale(15, 0.3),
              ...theme.light_shadow,
            }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}>
              <AppText fontStyle="400.normal" color={theme.gray}>
                {I18n.t("screen_messages.total")}
              </AppText>
              <AppText fontStyle="400.normal" color={theme.gray}>
                {I18n.t("screen_messages.price", {
                  price: selectedCourt?.["creditTypes.rate"],
                })}
              </AppText>
            </View>
            <svgs.Horizontal_Line height={2} width="100%" />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: moderateScale(10, 0.3),
              }}>
              <AppText fontStyle="500.semibold">
                {I18n.t("screen_messages.To_Pay")}
              </AppText>
              <AppText fontStyle="600.semibold">
                {I18n.t("screen_messages.price", {
                  price:
                    isVerified || useCredit
                      ? 0
                      : selectedCourt?.["creditTypes.rate"],
                })}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
      <FloatingBottomButton
        loading={loading}
        onPress={() =>
          isVerified || useCredit ? createOneBooking() : openPaymentSheet()
        }
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
