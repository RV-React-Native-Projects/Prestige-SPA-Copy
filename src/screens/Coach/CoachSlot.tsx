import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import * as Animatable from "react-native-animatable";
import I18n from "i18n-js";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
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
import { loadTerms } from "@src/redux/reducers/AppDataSlice";
import RectangleSK from "@src/assets/skelton/RectangleSK";
import Ionicons from "react-native-vector-icons/Ionicons";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import DeviceInfo from "react-native-device-info";

const isTab = DeviceInfo.isTablet();
const windowWidth = Dimensions.get("window").width;

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
  availableCredits: number;
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
  const { user, authHeader } = useAppSelector(state => state.user);
  const { terms } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const {
    data = null,
    bookingType = null,
    slotId = null,
    creditTypeID = null,
    coachID = null,
    slot = null,
    familyID = null,
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
  const [foundTerm, setFoundTerm] = useState<CoachSessionTerm[] | null>(null);

  const [coachSessionID, setCoachSessionID] = useState<number | null>(null);
  const [loadingSlots, setLoadingSlots] = useState<boolean>(false);
  const [minDate, setMinDate] = useState<moment.Moment | Date | null>(null);
  const [maxDate, setMaxDate] = useState<moment.Moment | Date | null>(null);

  //  ===== API Responses Data=====
  const [slots, setSlots] = useState<TimeSlot[] | null>(null);
  const [credit, setCredit] = useState<number>(0);

  // console.log("At CoachSlot===>", JSON.stringify(credit, null, 2));
  const navigation = useAppNavigation();
  const refRBSheet = useRef<RBSheet>(null);

  useEffect(() => {
    if (!terms && bookingType === "MULTI") {
      storeDispatch(loadTerms());
    }
  }, [!terms]);

  useEffect(() => {
    const filteredTerms =
      terms &&
      pickedDate &&
      terms.filter(term => {
        const startDate = new Date(term.startDate).getTime();
        const endDate = new Date(term.endDate).getTime();
        const date = new Date(pickedDate).getTime();
        return date >= startDate && date <= endDate;
      });
    filteredTerms && filteredTerms?.length > 0
      ? setFoundTerm(filteredTerms)
      : setFoundTerm(null);
  }, [pickedDate, terms]);

  useEffect(() => {
    if (terms) {
      const startDates = terms.map(term => term.startDate);
      const endDates = terms.map(term => term.endDate);

      const momentDates = startDates.map(date => moment(date, "YYYY-MM-DD"));
      const momentEndDates = endDates.map(date => moment(date, "YYYY-MM-DD"));
      const minDate = moment.min(...momentDates.filter(date => date));
      const maxDate = moment.max(...momentEndDates.filter(date => date));
      setMinDate(minDate);
      setMaxDate(maxDate);
    }
  }, [terms]);

  useEffect(() => {
    if (foundTerm) {
      setSelectedTerm(foundTerm[0]);
      setCoachSessionID(foundTerm[0]?.CoachSessionTermID);
    }
  }, [foundTerm, pickedDate]);

  useEffect(() => {
    const controller = new AbortController();
    if (
      (bookingType === "SINGLE" || (bookingType === "MULTI" && foundTerm)) &&
      slotId &&
      pickedDate
    ) {
      setLoadingSlots(true);
      let parsms = {
        data: {
          coachID: coachID,
          bookingDate: moment(pickedDate).format("YYYY-MM-DD"),
          slotID: slotId,
          customerID: user?.stakeholderID,
          familyMemberID: familyID,
          coachCategoryID: data?.coachCategoryID,
          coachSessionTypeID: slot?.coachSessionTypeID,
        },
        headers: authHeader,
      };
      CoachManager.generateBookingSlots(
        parsms,
        res => {
          // console.log("generateBookingSlots===>", JSON.stringify(res, null, 2));
          setSlots(res?.data?.data);
          setLoadingSlots(false);
        },
        err => {
          console.log(err);
          setLoadingSlots(false);
        },
      );
    }
    return () => {
      controller.abort();
      setLoadingSlots(false);
    };
  }, [slotId, pickedDate, foundTerm, bookingType]);

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
      selectedTerm: selectedTerm,
      familyID: familyID,
      credit: credit,
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
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            margin: moderateScale(15, 0.3),
            borderRadius: moderateScale(10, 0.3),
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
                  height: moderateScale(90, 0.3),
                  width: moderateScale(90, 0.3),
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
                  width: moderateScale(65, 0.3),
                  height: moderateScale(25, 0.3),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: moderateScale(100, 0.3),
                  marginBottom: moderateScale(10, 0.3),
                }}>
                <AppText
                  style={{ textTransform: "capitalize" }}
                  fontStyle="500.medium"
                  size={12}
                  color={theme.modalBackgroundColor}
                  numberOfLines={2}>
                  {data?.coachCategory?.coachCategory}
                </AppText>
              </View>
              <AppText fontStyle="600.medium" size={16} numberOfLines={1}>
                {data?.stakeholder?.stakeholderName}
              </AppText>
            </View>
          </View>
        </View>
        {bookingType === "MULTI" && (
          <AppText style={{ padding: 15, textAlign: "center" }} size={12}>
            Please Select Date Between{" - "}
            <AppText color={theme.secondary} fontStyle="500.semibold">
              {moment().format("DD MMM YYYY")}
            </AppText>{" "}
            To{" "}
            <AppText color={theme.secondary} fontStyle="500.semibold">
              {moment(maxDate).format("DD MMM YYYY")}
            </AppText>
          </AppText>
        )}
        <VerticalSpacing size={5} />
        {bookingType === "MULTI" ? (
          <SlotCalender
            getSelectedDate={(date: Date) => {
              setPickedDate(date);
              setSlots(null);
              setFoundTerm(null);
              setStartTime(null);
              setAvailableCourts(null);
            }}
            minimumDate={moment(minDate).toDate()}
            maximumDate={moment(maxDate).toDate()}
          />
        ) : (
          <SlotCalender
            getSelectedDate={(date: Date) => {
              setPickedDate(date);
              setSlots(null);
              setFoundTerm(null);
              setStartTime(null);
              setAvailableCourts(null);
            }}
          />
        )}
        <VerticalSpacing />
        {pickedDate && bookingType === "MULTI" && !foundTerm ? (
          <>
            <VerticalSpacing />
            <AppText style={{ textAlign: "center" }}>
              {I18n.t("screen_messages.select_diff_month")}
              <AppText fontStyle="500.semibold" color={theme.secondary}>
                {moment(pickedDate).format("DD MMM, YYYY")}
              </AppText>
            </AppText>
            <VerticalSpacing />
            <AppText
              fontStyle="500.semibold"
              size={16}
              color={theme.error}
              style={{ textAlign: "center" }}>
              {I18n.t("screen_messages.select_diff_month")}
            </AppText>
          </>
        ) : (
          bookingType === "MULTI" &&
          pickedDate &&
          foundTerm && (
            <>
              <View style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                <VerticalSpacing />
                <AppText fontStyle="600.semibold" size={16}>
                  {I18n.t("screen_messages.Select_Term")}
                </AppText>
                <VerticalSpacing />
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={foundTerm}
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
                      onPress={() =>
                        setCoachSessionID(item?.CoachSessionTermID)
                      }
                      key={index}
                      style={{
                        alignItems: "center",
                        padding: moderateScale(10, 0.3),
                        backgroundColor: theme.modalBackgroundColor,
                        marginBottom: moderateScale(10, 0.3),
                        borderRadius: moderateScale(10, 0.3),
                        ...theme.light_shadow,
                        width: moderateScale(170, 0.3),
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
          )
        )}
        <View>
          {/*  ============== Select Slot ====== */}
          {loadingSlots ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: moderateScale(10, 0.3),
                marginHorizontal: moderateScale(15, 0.3),
                marginTop: moderateScale(50, 0.3),
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
                  style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                  {I18n.t("screen_messages.Select_Slot")}
                </AppText>
                <VerticalSpacing />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingHorizontal: moderateScale(15, 0.3),
                    justifyContent: "flex-start",
                    alignContent: "center",
                  }}>
                  {_.map(slots, (item, index) => (
                    <SlotTime
                      key={index}
                      value={startTime}
                      time={item?.startTime}
                      isAvailable={item?.isAvailable}
                      onPress={() => {
                        setStartTime(item?.startTime);
                        setCredit(item?.availableCredits);
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
            style={{ paddingHorizontal: moderateScale(15, 0.3) }}
            fontStyle="600.semibold"
            size={18}>
            {I18n.t("screen_messages.Select_Court")}
          </AppText>
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
              paddingTop: moderateScale(20, 0.3),
              paddingBottom: moderateScale(150, 0.3),
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
                      padding: moderateScale(10, 0.3),
                      backgroundColor: theme.modalBackgroundColor,
                      marginBottom: moderateScale(10, 0.3),
                      borderRadius: moderateScale(10, 0.3),
                      ...theme.light_shadow,
                      paddingVertical: moderateScale(15, 0.3),
                    }}>
                    <View style={{ marginRight: moderateScale(5, 0.3) }}>
                      {item.courtID === courtId ? (
                        <Animatable.View
                          useNativeDriver
                          animation="bounceIn"
                          duration={500}>
                          <Ionicons
                            name="radio-button-on"
                            color={theme.secondary}
                            size={25}
                          />
                        </Animatable.View>
                      ) : (
                        <Animatable.View
                          useNativeDriver
                          animation="fadeIn"
                          duration={500}>
                          <Ionicons
                            name="radio-button-off"
                            color={theme.gray}
                            size={25}
                          />
                        </Animatable.View>
                      )}
                    </View>
                    <View key={index} style={{}}>
                      <AppText size={16} fontStyle="500.medium">
                        {item?.courtName}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </RadioButton.Group>
          </ScrollView>
          {!!courtId && (
            <FloatingBottomButton
              duration={500}
              onPress={() => goToConfirmCouchBooking()}
            />
          )}
        </View>
      </RBSheet>
      {pickedDate && slotId && startTime && (
        <FloatingBottomButton duration={500} onPress={onPressNext} />
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
