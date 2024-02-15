import {
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
import { useAppNavigation } from "@src/navigation/Navigation";
import CourtManager from "@src/services/features/Court/CourtManager";
import moment from "moment";
import SlotsDuration from "@src/cards/Slots/SlotsDuration";
import { loadSlots } from "@src/redux/reducers/AppDataSlice";
import RectangleSK from "@src/assets/skelton/RectangleSK";
import SlotTime from "@src/cards/Slots/SlotTime";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const isIOS = Platform.OS === "ios";

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
        },
      };
      CourtManager.generateBookingSlots(
        parsms,
        res => {
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

  const onPressNext = (data: any) => {
    refRBSheet?.current?.open();
  };

  const afterSelectCourt = (data: any) => {
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
      <BackButtonWithTitle title="Choose Slot" />
      <ScrollView
        style={{
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: 100 }}>
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
            <View style={{ padding: moderateScale(10, 0.3) }}>
              <AppText fontStyle="700.bold">{data?.locationName}</AppText>
              <VerticalSpacing />
              <View
                style={{
                  flexDirection: "row",
                }}>
                <svgs.LocationV2 color1={theme.secondary} height={20} />
                <AppText numberOfLines={2}>{data?.locationAddress}</AppText>
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
              <VerticalSpacing size={20} />
              <AppText
                fontStyle="600.semibold"
                size={16}
                style={{ paddingHorizontal: 15 }}>
                Select Duration
              </AppText>
              <VerticalSpacing />
              <View style={{ alignItems: "center", alignContent: "center" }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ alignSelf: "center", width: "100%" }}
                  contentContainerStyle={{
                    gap: moderateScale(10, 0.3),
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
                gap: 10,
                marginHorizontal: 15,
                marginTop: 50,
              }}>
              {_.times(16, index => (
                <RectangleSK key={index} />
              ))}
            </View>
          ) : (
            slots && (
              <>
                <VerticalSpacing size={20} />
                <AppText
                  fontStyle="600.semibold"
                  size={16}
                  style={{ paddingHorizontal: 15 }}>
                  Select Slot
                </AppText>
                <VerticalSpacing />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    paddingHorizontal: moderateScale(15, 0.3),
                    columnGap: moderateScale(8, 0.3),
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
        height={moderateScale(500, 0.3)}
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
            style={{ paddingHorizontal: 15 }}
            fontStyle="600.semibold"
            size={18}>
            Select Court
          </AppText>
          <ScrollView
            style={{ height: "100%", paddingHorizontal: 15 }}
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }}>
            {availableCourts && availableCourts.length > 0 ? (
              <RadioButton.Group
                onValueChange={newValue => setCourtId(toString(newValue))}
                value={courtId}>
                {_.map(availableCourts, (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      onPress={() => {
                        setCourtId(toString(item?.courtID));
                      }}
                      // disabled={!item?.courtID}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 10,
                        backgroundColor: theme.modalBackgroundColor,
                        marginBottom: 10,
                        borderRadius: 10,
                        ...theme.light_shadow,
                      }}>
                      <RadioButton.Android
                        // disabled={!item?.available}
                        value={toString(item.courtID)}
                        color={theme.secondary}
                      />
                      <View key={index} style={{}}>
                        <AppText
                          // color={item?.available ? theme.textColor : theme.gray}
                          fontStyle="500.bold">
                          {item?.courtName}
                        </AppText>
                        {isVerified ? null : (
                          <AppText
                            style={{ marginTop: 10 }}
                            size={16}
                            fontStyle="500.semibold"
                            color={theme.primary}>
                            AED {item?.["creditTypes.rate"]}
                          </AppText>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            ) : (
              <AppText
                style={{ textAlign: "center", marginTop: 15 }}
                fontStyle="600.semibold"
                size={18}>
                {I18n.t("error_messages.no_available_court")}
              </AppText>
            )}
          </ScrollView>
          {!!courtId && (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              style={{
                backgroundColor: theme.modalBackgroundColor,
                padding: moderateScale(20, 0.3),
              }}>
              <AppButton
                Title={I18n.t("screen_messages.button.next")}
                color={theme.primary}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={() => afterSelectCourt(data)}
              />
            </Animatable.View>
          )}
        </View>
      </RBSheet>
      {pickedDate && slotId && startTime && (
        <Animatable.View
          animation="fadeInUp"
          duration={500}
          style={{
            backgroundColor: theme.modalBackgroundColor,
            padding: moderateScale(20, 0.3),
            bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
          }}>
          <AppButton
            Title={I18n.t("screen_messages.button.next")}
            color={theme.primary}
            fontStyle="600.normal"
            fontSize={16}
            height={50}
            onPress={() => onPressNext(data)}
          />
        </Animatable.View>
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
