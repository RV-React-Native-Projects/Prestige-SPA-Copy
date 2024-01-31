import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Alert,
  Linking,
} from "react-native";
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
import { useAppNavigation } from "@src/navigation/Navigation";
import AvailableCreditManager from "@features/AvailableCredit/AvailableCreditManager";
import { useStripe } from "@stripe/stripe-react-native";
import { toString } from "lodash";
import CoachManager from "@src/services/features/Coach/CoachManager";

const isIOS = Platform.OS === "ios";

export default function CoachBooking(props: any) {
  const {
    data = null, // coach Data
    bookingType = null,
    slotId = null,
    creditTypeID = null,
    coachID = null,
    slot = null,
    pickedDate = null,
    courtId = null,
    court = null,
    selectedSlot = null,
  } = props.route.params || {};

  console.log("CoachBooking==>", JSON.stringify(slot, null, 2));

  const { initPaymentSheet, presentPaymentSheet, handleURLCallback } =
    useStripe();

  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  //  @RV take care after Config Creation
  const STRIPE_SECRET_KEY =
    "sk_test_51OYm22CjUZPEHdfTtHeIuiBIZt7m2hgtt7Gr23z24qbboU9vhh0gvLcTkLQs2YFiTDGeVhe3LPWrO3ueQYBVUYAB00OUM8egPv";
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51OYm22CjUZPEHdfTgxLTR9ECnnY2hltvM4Q5BGvNhOkTtxOB2JhEGzUOmlD2vRUvmMS3XxIpap3sqEImyfC7Ps6800J3wELOoL";

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
    const { error } = await initPaymentSheet({
      merchantDisplayName: "prestige_spa",
      customerId: toString(user?.stakeholderID),
      customerEphemeralKeySecret: STRIPE_SECRET_KEY,
      paymentIntentClientSecret: STRIPE_PUBLISHABLE_KEY,
      returnURL: "spoacd://stripe-redirect",
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: user?.username,
      },
    });
    if (!error) {
      // setLoading(true);
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  const onPressProceedToPay = () => {
    createUserCredit();
    // openPaymentSheet();
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  function createUserCredit() {
    setLoading(true);
    let params = {
      data: {
        creditTypeID: creditTypeID,
        stakeholderID: user?.stakeholderID,
        quantity: 1,
        amountPaid:
          bookingType === "SINGLE" ? slot?.rate : slot?.multiSessionRate,
      },
    };
    AvailableCreditManager.createCredit(
      params,
      res => {
        console.log("Res===>", JSON.stringify(res, null, 2));
        // setSlotDuration(res?.data?.data);
        createOneBooking();
      },
      err => {
        setLoading(false);
        console.log("Error createCredit===>", err);
      },
    );
  }

  function createOneBooking() {
    setLoading(true);
    const parsedDate = moment(pickedDate).utc(false);
    const startedAtTime = moment(selectedSlot?.startTime, "hh:mm a");
    const completedAtTime = moment(selectedSlot?.endTime, "hh:mm a");

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

    console.log(startDate, endDate);

    let params = {
      data: {
        coachID: coachID,
        coachName: data?.stakeholder?.stakeholderName,
        courtID: courtId,
        courtName: court?.courtName,
        locationID: court?.locationID,
        locationName: court?.location?.locationName,
        startTime: startDate,
        endTime: endDate,
        isPaymentDone: true,
        customerID: user?.stakeholderID,
        amount: bookingType === "SINGLE" ? slot?.rate : slot?.multiSessionRate,
        creditTypeID: creditTypeID,
        email: user?.email,
      },
    };
    CoachManager.CoachBookingCreateOne(
      params,
      res => {
        setLoading(false);
        console.log("Res===>", JSON.stringify(res, null, 2));
        navigation?.navigate("CoachBookingComplete", {
          bookingId: res?.data?.data?.bookingNumber,
          bookingType: bookingType,
          data: data,
          date: pickedDate,
          selectedSlot: selectedSlot,
          slot: slot,
          amountPaid:
            bookingType === "SINGLE" ? slot?.rate : slot?.multiSessionRate,
          court: court,
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
                {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </AppText>
            </View>
          </View>
        </View>
        <VerticalSpacing size={5} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            margin: moderateScale(15, 0.3),
            borderRadius: 10,
            ...theme.light_shadow,
          }}>
          <View>
            <View
              style={{
                padding: moderateScale(10, 0.3),
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: theme.gray,
              }}>
              <FastImage
                style={[
                  {
                    height: moderateScale(80, 0.3),
                    width: moderateScale(80, 0.3),
                    borderRadius: 200,
                  },
                ]}
                defaultSource={images.user}
                source={{
                  uri: data?.stakeholder?.picturePathS3,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ marginLeft: 10 }}>
                <View
                  style={{
                    backgroundColor:
                      data?.coachCategoryID === 1
                        ? theme.primary
                        : theme.tertiaryText,
                    width: 70,
                    height: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    marginVertical: 10,
                  }}>
                  <AppText
                    style={{}}
                    fontStyle="500.medium"
                    color={theme.white}>
                    Tire {data?.coachCategoryID}
                  </AppText>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    height: 20,
                  }}>
                  <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
                    {data?.stakeholder?.stakeholderName}
                  </AppText>
                </View>
              </View>
            </View>

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
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${court.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={{ padding: moderateScale(10, 0.3) }}>
                <AppText
                  fontStyle="700.bold"
                  numberOfLines={2}
                  style={{ height: 40, maxWidth: "55%" }}>
                  {court?.courtName}
                </AppText>
                <View style={{ flexDirection: "row" }}>
                  <svgs.Time height={20} width={18} color1={theme.secondary} />
                  <AppText
                    numberOfLines={1}
                    style={{ textTransform: "capitalize", maxWidth: "50%" }}>
                    {" "}
                    {slot?.slot?.slotMinutes} mins{" - "}
                    {slot?.coachSessionType?.sessionType} Session
                  </AppText>
                </View>
                <VerticalSpacing />
                <View style={{ flexDirection: "row" }}>
                  <svgs.LocationV2
                    color1={theme.secondary}
                    height={20}
                    width={20}
                  />
                  <AppText numberOfLines={1}>
                    {court?.location?.locationAddress}
                  </AppText>
                </View>
              </View>
            </View>
          </View>
        </View>
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
                Total
              </AppText>
              <AppText fontStyle="400.normal" color={theme.gray}>
                AED{" "}
                {bookingType === "SINGLE" ? slot?.rate : slot?.multiSessionRate}
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
              <AppText fontStyle="500.semibold">Total</AppText>
              <AppText fontStyle="600.semibold">
                AED{" "}
                {bookingType === "SINGLE" ? slot?.rate : slot?.multiSessionRate}
              </AppText>
            </View>
          </View>
        </View>
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.white,
          padding: moderateScale(20, 0.3),
          bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
        }}>
        <AppButton
          loading={loading}
          Title={I18n.t("screen_messages.button.Proceed_to_Payment")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() => onPressProceedToPay()}
        />
      </Animatable.View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
