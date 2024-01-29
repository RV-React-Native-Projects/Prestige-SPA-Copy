import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
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

  console.log(data);

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
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
          paddingHorizontal: 15,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <VerticalSpacing size={30} />
        <View style={{ alignItems: "center" }}>
          <AppText fontStyle="600.semibold" size={20}>
            Booking Details
          </AppText>
        </View>
        <VerticalSpacing size={20} />
        <View
          style={{
            padding: 15,
            backgroundColor: theme.modalBackgroundColor,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            ...theme.light_shadow,
            borderBottomWidth: 1,
            borderBottomColor: theme.gray,
          }}>
          <VerticalSpacing size={20} />
          <View style={{ alignItems: "center" }}>
            <svgs.Success />
            <VerticalSpacing />
            <AppText fontStyle="500.semibold" size={16}>
              Thank you!
            </AppText>
            <VerticalSpacing />
            <AppText fontStyle="400.normal">
              Your booking was successful
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
              <AppText fontStyle="400.normal">Booking ID</AppText>
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
              <AppText fontStyle="400.normal">Date</AppText>
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
              <AppText fontStyle="400.normal">Time</AppText>
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
              <AppText fontStyle="400.normal">Slot</AppText>
              <AppText fontStyle="500.normal">{slot} Mins</AppText>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 15,
            backgroundColor: theme.modalBackgroundColor,
            ...theme.light_shadow,
            borderBottomWidth: 1,
            borderBottomColor: theme.gray,
          }}>
          <AppText fontStyle="600.semibold" size={16}>
            Booking Summary
          </AppText>
          <VerticalSpacing />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <FastImage
              style={[
                {
                  height: moderateScale(80, 0.3),
                  width: 110,
                  borderRadius: 5,
                  marginRight: 10,
                },
              ]}
              defaultSource={images.Placeholder}
              source={{
                uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.courts[0]?.imagePath}`,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <AppText fontStyle="600.medium" size={16}>
              {data?.locationName}
            </AppText>
          </View>
        </View>
        <View
          style={{
            padding: 15,
            backgroundColor: theme.modalBackgroundColor,
            ...theme.light_shadow,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}>
          <AppText fontStyle="600.semibold" size={16}>
            Payment Summary
          </AppText>
          <VerticalSpacing />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}>
            <AppText fontStyle="500.semibold">Total</AppText>
            <AppText fontStyle="600.semibold">AED {amountPaid}</AppText>
          </View>
        </View>
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.white,
          padding: moderateScale(20, 0.3),
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.done")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() => onPressDone()}
        />
      </Animatable.View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
