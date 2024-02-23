import {
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import * as Animatable from "react-native-animatable";
import AppButton from "@components/Button/AppButton";
import I18n from "i18n-js";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Card, RadioButton } from "react-native-paper";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import SlotCalender from "@src/screen-components/Court/SlotCalender";
import _, { toNumber, toString } from "lodash";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppNavigation } from "@navigation/Navigation";
import CourtManager from "@features/Court/CourtManager";
import moment from "moment";
import SlotsDuration from "@cards/Slots/SlotsDuration";
import { loadSlots } from "@redux/reducers/AppDataSlice";
import RectangleSK from "@assets/skelton/RectangleSK";
import SlotTime from "@cards/Slots/SlotTime";
import Ionicons from "react-native-vector-icons/Ionicons";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import { HStack, VStack } from "native-base";

const isIOS = Platform.OS === "ios";
const windowWidth = Dimensions.get("window").width;

interface SlotInteface {
  slotID: number;
  slotMinutes: number;
}

interface Court {
  courtID: number;
  createdAt: string;
  updatedAt: string;
  courtName: string;
  locationID: number;
  sportsID: number;
  courtDescription: string;
  area: number;
  imagePath: string;
  "creditTypes.creditTypeID": number;
  "creditTypes.createdAt": string;
  "creditTypes.updatedAt": string;
  "creditTypes.bookingType": string;
  "creditTypes.slotID": number;
  "creditTypes.coachCategoryID": number | null;
  "creditTypes.coachSessionTypeID": number | null;
  "creditTypes.locationID": number;
  "creditTypes.courtID": number;
  "creditTypes.rate": number;
  "creditTypes.multiSessionRate": number;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  availableCourts: Court[];
}

export default function CourtSlot(props: any) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { slots: slotDuration } = useAppSelector(state => state.appData);
  const { data, familyID = null, isVerified = false } = props.route.params;
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [selectedCourt, setSelectedCourt] = useState<Court | null>(null);
  const [availableCourts, setAvailableCourts] = useState<Court[] | null>(null);
  const [courtId, setCourtId] = React.useState<string>("");
  //  ===== API Responses Data=====
  // const [slotDuration, setSlotDuration] = useState<SlotInteface[] | null>(null);
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [loadingSlot, setLoadingSlot] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    const filterCourt = _.find(
      availableCourts,
      (item, index) => item?.courtID === Number(courtId),
    );
    if (filterCourt) setSelectedCourt(filterCourt);
  }, [courtId]);

  useEffect(() => {
    if (!slotDuration) {
      storeDispatch(loadSlots());
    }
  }, [!slotDuration]);

  useEffect(() => {
    if (slotId && pickedDate) {
      setLoadingSlot(true);
      let parsms = {
        data: {
          locationID: data?.locationID,
          bookingDate: moment(pickedDate).format("YYYY-MM-DD"),
          slotID: slotId,
          customerID: user?.stakeholderID,
          familyMemberID: familyID,
        },
      };
      CourtManager.generateBookingSlots(
        parsms,
        res => {
          // console.log("generateBookingSlots===>", JSON.stringify(res, null, 2));
          setSlots(res?.data?.data);
          setLoadingSlot(false);
        },
        err => {
          console.log(err);
          setLoadingSlot(false);
        },
      );
    }
  }, [slotId]);

  useEffect(() => {
    setSlotId(null);
    setStartTime(null);
    setEndTime(null);
    setAvailableCourts(null);
    setSlots(null);
  }, [pickedDate]);

  const onPressNext = () => {
    refRBSheet?.current?.open();
  };

  const afterSelectCourt = () => {
    refRBSheet?.current?.close();
    navigation.navigate("CourtBooking", {
      data,
      pickedDate,
      endTime,
      startTime,
      slotId,
      courtId,
      selectedCourt,
      familyID,
      isVerified,
    });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Choose_Slot")}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}>
        <Card
          style={{
            backgroundColor: theme.modalBackgroundColor,
            margin: moderateScale(15, 0.3),
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
                  borderRadius: moderateScale(5, 0.3),
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
              <AppText
                numberOfLines={2}
                fontStyle="700.bold"
                style={{ maxWidth: "55%" }}>
                {data?.locationName}
              </AppText>
              <VerticalSpacing />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <svgs.LocationV2 color1={theme.secondary} />
                <AppText numberOfLines={2} style={{ maxWidth: "50%" }}>
                  {data?.locationAddress}
                </AppText>
              </View>
            </View>
          </View>
        </Card>
        <VerticalSpacing />
        <View>
          {/*  ============== Slot Calendr Only ====== */}
          <SlotCalender getSelectedDate={(date: Date) => setPickedDate(date)} />
          {/*  ============== Select Duration ====== */}
          {slotDuration && (
            <>
              <VerticalSpacing />
              <AppText
                fontStyle="600.semibold"
                size={16}
                style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                {I18n.t("screen_messages.Select_Duration")}
              </AppText>
              <VerticalSpacing />
              <View style={{ alignItems: "center", alignContent: "center" }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ alignSelf: "center", width: "100%" }}
                  contentContainerStyle={{
                    columnGap: moderateScale(10, 0.3),
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  data={slotDuration}
                  renderItem={({ item, index }) => (
                    <SlotsDuration
                      item={item}
                      value={slotId}
                      onPress={() => {
                        setSlotId(item?.slotID);
                        setStartTime(null);
                        setEndTime(null);
                        setAvailableCourts(null);
                        setSlots(null);
                      }}
                    />
                  )}
                />
              </View>
            </>
          )}
          {/*  ============== Select Slot ====== */}
          {loadingSlot ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: moderateScale(10, 0.3),
                marginHorizontal: moderateScale(15, 0.3),
                marginTop: moderateScale(15, 0.3),
              }}>
              {_.times(16, index => (
                <RectangleSK key={index} />
              ))}
            </View>
          ) : (
            slots && (
              <>
                <VerticalSpacing />
                <AppText
                  fontStyle="600.semibold"
                  size={16}
                  style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                  {I18n.t("screen_messages.Select_Slot")}
                </AppText>
                <VerticalSpacing />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    paddingHorizontal: moderateScale(15, 0.3),
                    alignContent: "center",
                    columnGap: moderateScale(windowWidth / 35, 0.3),
                  }}>
                  {_.map(slots, (item, index) => (
                    <SlotTime
                      key={index}
                      time={item?.startTime}
                      isAvailable={item?.isAvailable}
                      value={startTime}
                      onPress={() => {
                        setStartTime(item?.startTime);
                        setEndTime(item?.endTime);
                        setAvailableCourts(item?.availableCourts);
                      }}
                    />
                  ))}
                </View>
              </>
            )
          )}
        </View>
      </ScrollView>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={moderateScale(550, 0.3)}
        customStyles={{
          container: {
            backgroundColor: theme.appBackgroundColor,
            borderTopLeftRadius: moderateScale(15, 0.3),
            borderTopRightRadius: moderateScale(15, 0.3),
          },
          draggableIcon: {
            width: moderateScale(110, 0.3),
            marginTop: moderateScale(15, 0.3),
          },
        }}
        animationType="fade"
        closeOnPressBack={true}
        keyboardAvoidingViewEnabled={true}
        dragFromTopOnly={true}>
        <View style={{ flex: 1 }}>
          <AppText
            style={{ paddingHorizontal: moderateScale(15, 0.3) }}
            fontStyle="600.semibold"
            size={18}>
            {I18n.t("screen_messages.Select_Court")}
          </AppText>
          <ScrollView
            style={{ height: "100%" }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
              paddingTop: moderateScale(20, 0.3),
              paddingBottom: moderateScale(50, 0.3),
            }}>
            {availableCourts && availableCourts.length > 0 ? (
              <RadioButton.Group
                onValueChange={newValue => setCourtId(toString(newValue))}
                value={courtId}>
                {_.map(availableCourts, (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      onPress={() => setCourtId(toString(item?.courtID))}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: moderateScale(10, 0.3),
                        paddingVertical: moderateScale(15, 0.3),
                        backgroundColor: theme.modalBackgroundColor,
                        marginBottom: moderateScale(10, 0.3),
                        borderRadius: moderateScale(10, 0.3),
                        ...theme.light_shadow,
                      }}>
                      <View style={{ marginRight: moderateScale(5, 0.3) }}>
                        {toString(item.courtID) === courtId ? (
                          <Ionicons
                            name="radio-button-on"
                            color={theme.secondary}
                            size={25}
                          />
                        ) : (
                          <Ionicons
                            name="radio-button-off"
                            color={theme.gray}
                            size={25}
                          />
                        )}
                      </View>
                      <View key={index} style={{}}>
                        <AppText
                          // color={item?.available ? theme.textColor : theme.gray}
                          fontStyle="500.bold">
                          {item?.courtName}
                        </AppText>
                        {isVerified ? null : (
                          <AppText
                            style={{ marginTop: moderateScale(10, 0.3) }}
                            size={16}
                            fontStyle="500.semibold"
                            color={theme.primary}>
                            {I18n.t("screen_messages.price", {
                              price: item?.["creditTypes.rate"],
                            })}
                          </AppText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            ) : (
              <AppText
                style={{
                  textAlign: "center",
                  marginTop: moderateScale(15, 0.3),
                }}
                fontStyle="600.semibold"
                size={18}>
                {I18n.t("error_messages.no_available_court")}
              </AppText>
            )}
          </ScrollView>
          {!!courtId && (
            <FloatingBottomButton duration={500} onPress={afterSelectCourt} />
          )}
        </View>
      </RBSheet>
      {pickedDate && slotId && startTime && (
        <FloatingBottomButton duration={500} onPress={onPressNext} />
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Aligns items from the start of the container
    paddingHorizontal: 10,

    marginTop: 20,
  },
  column: {
    width: 100, // Adjust the width as per your requirement
    height: 100, // Set the height as per your requirement
    backgroundColor: "lightblue", // Just for visualization
    marginBottom: 10, // Spacing between rows
    marginHorizontal: "auto",
  },
});
