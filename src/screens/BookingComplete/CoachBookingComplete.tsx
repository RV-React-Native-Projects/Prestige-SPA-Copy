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
import SlotCard from "@src/cards/Slots/SlotCard";
import _ from "lodash";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;

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
  const insets = useSafeAreaInsets();

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
            <VerticalSpacing />
            {bookingType === "MULTI" && dateRange?.length > 0 ? (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                  <AppText fontStyle="400.normal">Start Date</AppText>
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
                  <AppText fontStyle="400.normal">End Date</AppText>
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
                <AppText fontStyle="400.normal">Date</AppText>
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
              <AppText fontStyle="400.normal">Time</AppText>
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
              <AppText fontStyle="400.normal">Slot</AppText>
              <AppText fontStyle="500.normal">
                {slot?.slot?.slotMinutes} Mins
              </AppText>
            </View>
          </View>
        </View>
        {dateRange && (
          <View
            style={{
              backgroundColor: theme.modalBackgroundColor,
              padding: 10,
            }}>
            <VerticalSpacing />
            {_.map(dateRange, (date, index) => (
              <SlotCard
                backgroundColor="#FFF"
                date={date}
                key={index}
                index={index + 1}
              />
            ))}
          </View>
        )}
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
          <View>
            <View
              style={{
                padding: moderateScale(10, 0.3),
                flexDirection: "row",
              }}>
              <FastImage
                style={[
                  {
                    height: moderateScale(70, 0.3),
                    width: moderateScale(70, 0.3),
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
                    fontStyle="400.medium"
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
                    height: moderateScale(75, 0.3),
                    width: moderateScale(75, 0.3),
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
              <View
                style={{
                  paddingHorizontal: moderateScale(10, 0.3),
                  padding: moderateScale(5, 0.3),
                }}>
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
                    {" "}
                    {slot?.slot?.slotMinutes} mins{" - "}
                    {slot?.coachSessionType?.sessionType} Session
                  </AppText>
                </View>
                <VerticalSpacing size={5} />
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
