import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
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
import { RadioButton } from "react-native-paper";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import SlotCalender from "@src/screen-components/Court/SlotCalender";
import _, { toNumber, toString } from "lodash";
import RBSheet from "react-native-raw-bottom-sheet";
import { useAppNavigation } from "@src/navigation/Navigation";
import moment from "moment";
import CoachManager from "@src/services/features/Coach/CoachManager";
import SlotTime from "@src/cards/Slots/SlotTime";
import { loadTerms } from "@src/redux/reducers/AppData";

const isIOS = Platform.OS === "ios";

interface Location {
  locationID: number;
  createdAt: string;
  updatedAt: string;
  locationName: string;
  locationAddress: string;
  lat: number;
  long: number;
  imagePath: string;
  locationDescription: string;
  area: number;
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
  location: Location;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  availableCourts: Court[];
}

interface SelectedSlot {
  startTime: string;
  endTime: string;
}
interface CoachSessionTerm {
  CoachSessionTermID: number;
  createdAt: string;
  updatedAt: string;
  termName: string;
  startDate: string;
  endDate: string;
  termDuration: number;
  noOfSessions: number;
}

export default function CoachSlot(props: any) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { terms } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const {
    data = null,
    bookingType = null,
    slotId = null,
    creditTypeID = null,
    coachID = null,
    slot = null,
  } = props.route.params;

  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string | null>(null);
  const [availableCourts, setAvailableCourts] = useState<Court[] | null>(null);
  const [courtId, setCourtId] = useState<number | null>(null);
  const [court, setCourt] = useState<Court | null>(null);
  const [selectedSlot, setelectedSlot] = useState<SelectedSlot | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<CoachSessionTerm | null>(
    null,
  );
  const [coachSessionID, setCoachSessionID] = useState<number | null>(null);

  //  ===== API Responses Data=====
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);

  const insets = useSafeAreaInsets();
  const navigation = useAppNavigation();
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    if (!terms && bookingType === "MULTI") {
      storeDispatch(loadTerms());
    }
  }, [!terms]);

  // console.log(JSON.stringify(terms, null, 2));

  useEffect(() => {
    if (terms) {
      const filteredData = _.filter(terms, item => {
        const startDate = moment(item.startDate);
        const endDate = moment(item.endDate);
        return (
          moment().isBetween(startDate, endDate, null, "[]") ||
          moment().isSame(startDate, "day") ||
          moment().isSame(endDate, "day")
        );
      });
      setSelectedTerm(filteredData[0]);
      setCoachSessionID(filteredData[0]?.CoachSessionTermID);
    }
  }, [terms]);

  useEffect(() => {
    if (slotId && pickedDate) {
      let parsms = {
        data: {
          coachID: coachID,
          bookingDate: moment(pickedDate).format("YYYY-MM-DD"),
          slotID: slotId,
          customerID: user?.stakeholderID,
        },
      };
      CoachManager.generateBookingSlots(
        parsms,
        res => {
          // console.log("generateBookingSlots===>", JSON.stringify(res, null, 2));
          setSlots(res?.data?.data);
        },
        err => {
          console.log(err);
        },
      );
    }
  }, [slotId, pickedDate]);

  const onPressNext = () => {
    refRBSheet?.current?.open();
  };

  const goToConfirmCouchBooking = () => {
    refRBSheet?.current?.close();
    navigation.navigate("CoachBooking", {
      data: data,
      bookingType: bookingType,
      slotId: slotId,
      creditTypeID: creditTypeID,
      coachID: coachID,
      slot: slot,
      pickedDate: pickedDate,
      courtId: courtId,
      court: court,
      selectedSlot: selectedSlot,
    });
  };

  useEffect(() => {
    if (coachSessionID) {
      const filterTerm = _.filter(
        terms,
        term => term.CoachSessionTermID === coachSessionID,
      );
      setSelectedTerm(filterTerm[0]);
    }
  }, [coachSessionID]);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle title="Choose Slot" />
      <ScrollView
        style={{ minHeight: isIOS ? "100%" : "auto" }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            margin: moderateScale(15, 0.3),
            ...theme.light_shadow,
            borderRadius: 10,
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
                  width: 80,
                  height: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  marginVertical: 10,
                }}>
                <AppText
                  style={{}}
                  fontStyle="600.bold"
                  size={14}
                  color={theme.white}
                  numberOfLines={2}>
                  Tire {data?.coachCategoryID}
                </AppText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  height: 20,
                }}>
                <AppText fontStyle="600.bold" size={18} numberOfLines={1}>
                  {data?.stakeholder?.stakeholderName}
                </AppText>
              </View>
            </View>
          </View>
        </View>
        {bookingType === "MULTI" && (
          <>
            <View style={{ paddingHorizontal: 15 }}>
              <VerticalSpacing />
              <AppText fontStyle="600.semibold" size={16}>
                Select Term
              </AppText>
              <VerticalSpacing />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={terms}
              contentContainerStyle={{
                paddingHorizontal: moderateScale(15, 0.3),
                columnGap: moderateScale(10, 0.3),
              }}
              renderItem={({ item, index }) => (
                <RadioButton.Group
                  onValueChange={newValue =>
                    setCoachSessionID(toNumber(newValue))
                  }
                  key={index}
                  value={toString(coachSessionID)}>
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setCoachSessionID(item?.CoachSessionTermID)}
                    key={index}
                    style={{
                      alignItems: "center",
                      padding: moderateScale(10, 0.3),
                      backgroundColor: theme.modalBackgroundColor,
                      marginBottom: moderateScale(10, 0.3),
                      borderRadius: moderateScale(10, 0.3),
                      ...theme.light_shadow,
                      width: 170,
                    }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        width: "100%",
                      }}>
                      <RadioButton.Android
                        value={toString(item?.CoachSessionTermID)}
                        color={theme.secondary}
                      />
                      <AppText size={16} fontStyle="500.bold">
                        {item?.termName}
                      </AppText>
                    </View>
                    <AppText fontStyle="500.semibold" color={theme.paragraph}>
                      {moment(item?.startDate).format("MMM YYYY")} -{" "}
                      {moment(item?.endDate).format("MMM YYYY")}
                    </AppText>
                  </TouchableOpacity>
                </RadioButton.Group>
              )}
            />
          </>
        )}
        <VerticalSpacing />
        <View>
          {/*  ============== Slot Calendr Only ====== */}
          {bookingType === "MULTI" ? (
            <SlotCalender
              getSelectedDate={(date: Date) => {
                setPickedDate(date);
                setStartTime(null);
                setAvailableCourts(null);
              }}
              minimumDate={moment(selectedTerm?.startDate).toDate()}
              maximumDate={moment(selectedTerm?.endDate).toDate()}
            />
          ) : (
            <SlotCalender
              getSelectedDate={(date: Date) => {
                setPickedDate(date);
                setStartTime(null);
                setAvailableCourts(null);
              }}
            />
          )}
          {/*  ============== Select Slot ====== */}
          {slots && (
            <>
              <VerticalSpacing size={20} />
              <AppText
                fontStyle="600.semibold"
                size={16}
                style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                Select Slot
              </AppText>
              <VerticalSpacing />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                  paddingHorizontal: moderateScale(15, 0.3),
                }}>
                {_.map(slots, (item, index) => (
                  <SlotTime
                    key={index}
                    value={startTime}
                    time={item?.startTime}
                    isAvailable={item?.isAvailable}
                    onPress={() => {
                      setStartTime(item?.startTime);
                      setAvailableCourts(item?.availableCourts);
                      setelectedSlot({
                        endTime: item?.endTime,
                        startTime: item?.startTime,
                      });
                    }}
                  />
                ))}
              </View>
            </>
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
            style={{ paddingHorizontal: moderateScale(15, 0.3) }}
            fontStyle="600.semibold"
            size={18}>
            Select Court
          </AppText>
          <ScrollView
            style={{
              height: "100%",
              paddingHorizontal: moderateScale(15, 0.3),
            }}
            contentContainerStyle={{
              paddingTop: moderateScale(20, 0.3),
              paddingBottom: moderateScale(50, 0.3),
            }}>
            <RadioButton.Group
              onValueChange={newValue => setCourtId(toNumber(newValue))}
              value={toString(courtId)}>
              {_.map(availableCourts, (item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => {
                      setCourtId(item?.courtID);
                      setCourt(item);
                    }}
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
                      value={toString(item.courtID)}
                      color={theme.secondary}
                    />
                    <View key={index} style={{}}>
                      <AppText size={16} fontStyle="500.bold">
                        {item?.courtName}
                      </AppText>
                      {/* <VerticalSpacing />
                      <AppText fontStyle="400.semibold" color={theme.paragraph}>
                        {item?.location?.locationName}
                      </AppText> */}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </RadioButton.Group>
          </ScrollView>
          {!!courtId && (
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              style={{
                backgroundColor: theme.white,
                padding: moderateScale(20, 0.3),
                // bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
              }}>
              <AppButton
                Title={I18n.t("screen_messages.button.next")}
                color={theme.primary}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={() => goToConfirmCouchBooking()}
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
            backgroundColor: theme.white,
            padding: moderateScale(20, 0.3),
            bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
          }}>
          <AppButton
            Title={I18n.t("screen_messages.button.next")}
            color={theme.primary}
            fontStyle="600.normal"
            fontSize={16}
            height={50}
            onPress={onPressNext}
          />
        </Animatable.View>
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
