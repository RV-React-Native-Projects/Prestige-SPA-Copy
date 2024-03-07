import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { RadioButton } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import I18n from "i18n-js";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import RBSheet from "react-native-raw-bottom-sheet";
import filter from "lodash/filter";
import map from "lodash/map";
import toString from "lodash/toString";
import toNumber from "lodash/toNumber";
import SlotsDuration from "@cards/Slots/SlotsDuration";
import { loadSlots } from "@reducers/AppDataSlice";
import Utils from "@common/Utils";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Ionicons from "react-native-vector-icons/Ionicons";
import FamilyModal from "@src/screen-components/Modal/FamilyModal";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import Config from "react-native-config";

const host = Config?.HOST_URL;

const isIOS = Platform.OS === "ios";

interface Slot {
  slotID: number;
  createdAt: string;
  updatedAt: string;
  slotMinutes: number;
}

interface CoachSessionType {
  coachSessionTypeID: number;
  createdAt: string;
  updatedAt: string;
  sessionType: string;
  sessionCode: string;
  Type: string;
}

interface CreditType {
  creditTypeID: number;
  createdAt: string;
  updatedAt: string;
  bookingType: string;
  slotID: number;
  coachCategoryID: number;
  coachSessionTypeID: number;
  locationID: number | null;
  courtID: number | null;
  rate: number;
  multiSessionRate: number;
  slot: Slot;
  coachSessionType: CoachSessionType;
}

const BioCard = (props: any) => {
  const { theme } = useAppSelector(state => state.theme);
  const { icon, title, description } = props;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "45%",
      }}>
      {icon}
      <View style={{ marginLeft: 10 }}>
        <AppText fontStyle="400.normal" color={theme.gray} size={12}>
          {title}
        </AppText>
        <AppText
          fontStyle="600.normal"
          style={{ textTransform: "capitalize" }}
          numberOfLines={1}>
          {description}
        </AppText>
      </View>
    </View>
  );
};

function CoachDetail(props: any) {
  const { data } = props?.route?.params;
  const { theme } = useAppSelector(state => state.theme);
  const {
    slots,
    isCoachBookingSingle,
    isCoachBookingMultiple,
    isFamilyMemberBooking,
  } = useAppSelector(state => state.appData);
  const { user, family } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const [bookingType, setBookingType] = useState<"SINGLE" | "MULTI" | string>(
    "SINGLE",
  );
  const [slotId, setSlotId] = useState<number>(0);
  const [creditTypeID, setCreditTypeID] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CreditType | null>(null);
  const [familyID, setFamilyID] = useState<string | null>(null);
  const [showPicker, setshowPicker] = useState<boolean>(false);

  const BookingTypeData = [];
  if (isCoachBookingSingle)
    BookingTypeData.push({
      mode: "SINGLE",
      title: "Single Session Booking",
      desc: "Book a one-time coaching session for immediate assistance.",
    });

  if (isCoachBookingMultiple)
    BookingTypeData.push({
      mode: "MULTI",
      title: "Multi Session Booking",
      desc: "Secure multiple coaching sessions scheduled weekly at a regular interval.",
    });

  const toggleModal = () => {
    setshowPicker(!showPicker);
  };

  const FilterSesstionTypes = useMemo(
    () =>
      filter(
        data?.rateList,
        item =>
          item?.slot?.slotID === slotId &&
          item?.coachSessionType?.Type === "INDIVIDUAL",
      ),
    [slotId],
  );

  // console.log("At CoachDetail===>", JSON.stringify(familyID, null, 2));

  const navigation = useAppNavigation();
  const refBookingType = useRef<RBSheet>(null);
  const refSeesionType = useRef<RBSheet>(null);

  useEffect(() => {
    if (!slots) storeDispatch(loadSlots());
  }, [!slots]);

  const goToCoachSlot = () => {
    refBookingType?.current?.close();
    refSeesionType?.current?.close();
    navigation.navigate("CoachSlot", {
      data: data,
      bookingType: bookingType,
      slotId: slotId,
      creditTypeID: creditTypeID,
      coachID: data?.stakeholderID,
      slot: selectedSlot,
      familyID: familyID,
    });
  };

  return (
    <AppContainer hideStatusbar={false} scrollable={false} fullHeight={false}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Coach_Details")}
      />
      <ScrollView
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}>
        <View style={{ padding: 15, flexDirection: "row" }}>
          <FastImage
            style={{
              height: moderateScale(100, 0.3),
              width: moderateScale(100, 0.3),
              borderRadius: moderateScale(100, 0.3),
            }}
            source={{
              uri: `${host}/${data?.stakeholder?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.user}
          />
          <View style={{ marginLeft: moderateScale(15, 0.3) }}>
            <View
              style={{
                backgroundColor:
                  data?.coachCategory?.coachCategory === "TIER 1"
                    ? theme.primary
                    : theme.tertiaryText,
                width: moderateScale(70, 0.3),
                height: moderateScale(25, 0.3),
                alignItems: "center",
                justifyContent: "center",
                borderRadius: moderateScale(100, 0.3),
                marginVertical: moderateScale(10, 0.3),
              }}>
              <AppText
                style={{ textTransform: "capitalize" }}
                fontStyle="500.medium"
                size={12}
                color={theme.white}
                numberOfLines={2}>
                {data?.coachCategory?.coachCategory}
              </AppText>
            </View>
            <AppText fontStyle="600.semibold" size={16} numberOfLines={1}>
              {data?.stakeholder?.stakeholderName}
            </AppText>
          </View>
        </View>
        <View style={{ padding: moderateScale(15, 0.3) }}>
          <AppText fontStyle="600.bold">Bio</AppText>
          <VerticalSpacing />
          <AppText fontStyle="400.normal" color={theme.subHeader}>
            {data?.about}
          </AppText>
          <VerticalSpacing />
        </View>
        <View
          style={{
            padding: moderateScale(15, 0.3),
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            flexWrap: "wrap",
            gap: moderateScale(20, 0.3),
          }}>
          <BioCard
            icon={<svgs.User />}
            title={I18n.t("screen_messages.input_lable.Gender")}
            description={data?.stakeholder?.gender}
          />
          <BioCard
            icon={
              <Ionicons
                name="location-outline"
                size={Math.ceil(moderateScale(20, 0.3))}
                color={theme.iconColor}
              />
            }
            title={I18n.t("screen_messages.input_lable.From")}
            description={data?.stakeholder?.address}
          />
          <BioCard
            icon={<svgs.Age />}
            title={I18n.t("screen_messages.input_lable.Age")}
            description={data?.stakeholder?.age}
          />
          <BioCard
            icon={<svgs.Coach width={25} height={25} />}
            title={I18n.t("screen_messages.input_lable.Experience")}
            description={I18n.t("screen_messages.year_of_exp", {
              year: data?.experienceYears,
            })}
          />
        </View>
      </ScrollView>
      <FamilyModal
        show={showPicker}
        toggleModal={toggleModal}
        onPressNext={val => {
          setFamilyID(val);
          toggleModal();
          Utils.wait(300).then(() => refBookingType.current?.open());
        }}
      />
      <RBSheet
        ref={refBookingType}
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
        <>
          <View style={{ flex: 1 }}>
            <AppText
              style={{ paddingHorizontal: moderateScale(15, 0.3) }}
              fontStyle="600.semibold"
              size={18}>
              {I18n.t("screen_messages.Booking_Type")}
            </AppText>
            <ScrollView
              style={{ height: "100%" }}
              contentContainerStyle={{
                paddingTop: moderateScale(20, 0.3),
                paddingBottom: moderateScale(100, 0.3),
                paddingHorizontal: moderateScale(15, 0.3),
              }}>
              <RadioButton.Group
                onValueChange={newValue => setBookingType(newValue)}
                value={bookingType}>
                {map(BookingTypeData, (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      onPress={() => setBookingType(item?.mode)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: moderateScale(10, 0.3),
                        backgroundColor: theme.modalBackgroundColor,
                        marginBottom: moderateScale(10, 0.3),
                        borderRadius: moderateScale(10, 0.3),
                        ...theme.light_shadow,
                      }}>
                      <BouncyCheckbox
                        size={25}
                        fillColor={theme.secondary}
                        unfillColor={theme.modalBackgroundColor}
                        textStyle={{
                          textDecorationLine: "none",
                        }}
                        innerIconStyle={{ borderWidth: 2 }}
                        isChecked={item?.mode === bookingType}
                        disableBuiltInState
                        onPress={() => setBookingType(item?.mode)}
                        textComponent={
                          <View style={{ marginLeft: moderateScale(10, 0.3) }}>
                            <AppText fontStyle="500.semibold" size={16}>
                              {item?.title}
                            </AppText>
                            <VerticalSpacing />
                            <AppText
                              size={12}
                              fontStyle="400.medium"
                              color={theme.unselected}
                              style={{ maxWidth: "75%" }}>
                              {item?.desc}
                            </AppText>
                          </View>
                        }
                      />
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            </ScrollView>
            <FloatingBottomButton
              duration={500}
              onPress={() => refSeesionType.current?.open()}
            />
          </View>
          <RBSheet
            ref={refSeesionType}
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
              wrapper: { backgroundColor: "#FFFFFF00" },
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
                {I18n.t("screen_messages.Session_Type")}
              </AppText>
              <View
                style={{
                  alignItems: "center",
                  alignContent: "center",
                  marginTop: moderateScale(20, 0.3),
                }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ alignSelf: "center", width: "100%" }}
                  contentContainerStyle={{
                    gap: moderateScale(10, 0.3),
                    paddingHorizontal: moderateScale(15, 0.3),
                  }}
                  data={slots}
                  renderItem={({ item, index }) => (
                    <SlotsDuration
                      key={index}
                      item={item}
                      value={slotId}
                      onPress={() => {
                        setSlotId(item?.slotID);
                        setCreditTypeID(null);
                      }}
                    />
                  )}
                />
              </View>
              <ScrollView
                style={{ height: "100%" }}
                contentContainerStyle={{
                  paddingTop: moderateScale(20, 0.3),
                  paddingBottom: moderateScale(100, 0.3),
                  paddingHorizontal: moderateScale(15, 0.3),
                }}>
                <RadioButton.Group
                  onValueChange={newValue =>
                    setCreditTypeID(toNumber(newValue))
                  }
                  value={toString(creditTypeID)}>
                  {map(FilterSesstionTypes, (item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.9}
                        onPress={() => {
                          setCreditTypeID(item?.creditTypeID);
                          setSelectedSlot(item);
                        }}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          padding: moderateScale(10, 0.3),
                          backgroundColor: theme.modalBackgroundColor,
                          marginBottom: moderateScale(10, 0.3),
                          borderRadius: moderateScale(10, 0.3),
                          ...theme.light_shadow,
                        }}>
                        <View style={{ marginRight: moderateScale(5, 0.3) }}>
                          {item?.creditTypeID === creditTypeID ? (
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
                        <View>
                          <AppText
                            fontStyle="500.medium"
                            size={16}
                            style={{ textTransform: "capitalize" }}>
                            {item?.coachSessionType?.sessionType}
                          </AppText>
                          <VerticalSpacing />
                          <AppText
                            fontStyle="600.semibold"
                            color={theme.primary}>
                            {I18n.t("screen_messages.price", {
                              price:
                                bookingType === "SINGLE"
                                  ? item?.rate
                                  : item?.multiSessionRate,
                            })}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </ScrollView>
              {creditTypeID && slotId && (
                <FloatingBottomButton duration={500} onPress={goToCoachSlot} />
              )}
            </View>
          </RBSheet>
        </>
      </RBSheet>
      <FloatingBottomButton
        title={I18n.t("screen_messages.button.Book_a_Session")}
        duration={500}
        onPress={() =>
          isFamilyMemberBooking ? toggleModal() : refBookingType.current?.open()
        }
      />
    </AppContainer>
  );
}

export default CoachDetail;

const styles = StyleSheet.create({});
