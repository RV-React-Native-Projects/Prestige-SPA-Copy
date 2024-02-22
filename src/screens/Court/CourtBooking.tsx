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

const isIOS = Platform.OS === "ios";

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
  const { user } = useAppSelector(state => state.user);
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
      { data: { amount: selectedCourt?.["creditTypes.rate"] } },
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
          amountPaid: isVerified ? 0 : selectedCourt?.["creditTypes.rate"],
          useCredit: useCredit,
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
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <VerticalSpacing size={20} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: 10,
            paddingHorizontal: 15,
            marginHorizontal: 15,
            borderRadius: 10,
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
                style={{ marginBottom: 10 }}>
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
                  width: 110,
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
              <View
                style={{
                  flexDirection: "row",
                }}>
                <svgs.LocationV2 color1={theme.secondary} height={20} />
                <AppText style={{ maxWidth: "50%" }} numberOfLines={2}>
                  {data?.locationAddress}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 10,
                }}>
                <svgs.Court color1={theme.secondary} height={20} width={20} />
                <AppText>{selectedCourt?.courtName}</AppText>
              </View>
            </View>
          </View>
        </View>
        {/* ========= Bill INFO ========== */}
        <VerticalSpacing />
        {isVerified ? (
          <View
            style={{
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 10,
              backgroundColor: theme.modalBackgroundColor,
            }}>
            <AppText fontStyle="500.bold" size={18} color={theme.info}>
              {I18n.t("screen_messages.Membership_Benefits")}
            </AppText>
            <VerticalSpacing />
            <AppText fontStyle="400.normal" color={theme.gray}>
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
                size={30}
                color={theme.secondary}
              />
              <AppText style={{ marginLeft: 5 }} fontStyle="600.bold">
                {I18n.t("screen_messages.verified_member")}
              </AppText>
            </View>
          </View>
        ) : null}
        {!isVerified &&
        selectedCourt?.["creditTypes.availableCredits.quantity"] > 0 ? (
          <View
            style={{
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 10,
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
        <View style={{ paddingHorizontal: 15 }}>
          <AppText fontStyle="500.normal" size={16}>
            Bill Details
          </AppText>
          <VerticalSpacing size={20} />
          <View
            style={{
              padding: 15,
              paddingVertical: 20,
              backgroundColor: theme.modalBackgroundColor,
              borderRadius: 10,
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
                marginTop: 10,
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
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.modalBackgroundColor,
          padding: moderateScale(20, 0.3),
          bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
        }}>
        <AppButton
          loading={loading}
          Title={
            isVerified || useCredit
              ? I18n.t("screen_messages.button.book_now")
              : I18n.t("screen_messages.button.Proceed_to_Payment")
          }
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() =>
            isVerified || useCredit ? createOneBooking() : openPaymentSheet()
          }
        />
      </Animatable.View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
