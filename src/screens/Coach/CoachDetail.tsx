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
import * as Animatable from "react-native-animatable";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import AppButton from "@components/Button/AppButton";
import I18n from "i18n-js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import RBSheet from "react-native-raw-bottom-sheet";
import _, { toNumber, toString } from "lodash";
import SlotsDuration from "@src/cards/Slots/SlotsDuration";
import { loadSlots } from "@src/redux/reducers/AppDataSlice";

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

const BookingTypeData = [
  {
    mode: "SINGLE",
    title: "Single Session Booking",
    desc: "Book a one-time coaching session for immediate assistance.",
  },
  {
    mode: "MULTI",
    title: "Multi Session Booking",
    desc: "Secure multiple coaching sessions scheduled weekly at a regular interval.",
  },
];

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
  const { slots } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const [bookingType, setBookingType] = useState<"SINGLE" | "MULTI" | string>(
    "SINGLE",
  );
  const [slotId, setSlotId] = useState<number>(0);
  const [creditTypeID, setCreditTypeID] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<CreditType | null>(null);

  //  ===== API Data ====
  // const [slots, setSlots] = useState<Slot[] | null>(null);

  const FilterSesstionTypes = useMemo(
    () =>
      _.filter(
        data?.rateList,
        item =>
          item?.slot?.slotID === slotId &&
          item?.coachSessionType?.Type === "INDIVIDUAL",
      ),
    [slotId],
  );

  console.log(JSON.stringify(data, null, 2));

  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
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
    });
  };

  return (
    <AppContainer hideStatusbar={false} scrollable={false} fullHeight={false}>
      <BackButtonWithTitle title="Coach Details" />
      <ScrollView
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ padding: 15, flexDirection: "row" }}>
          <FastImage
            style={{ height: 100, width: 100, borderRadius: 200 }}
            source={{
              uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.stakeholder?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.user}
          />
          <View style={{ marginLeft: 15 }}>
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
                borderRadius: 100,
                marginVertical: 10,
              }}>
              <AppText
                style={{}}
                fontStyle="600.bold"
                size={14}
                color={theme.modalBackgroundColor}
                numberOfLines={2}>
                {data?.coachCategory?.coachCategory}
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
            title="Gender"
            description={data?.stakeholder?.gender}
          />
          <BioCard
            icon={<svgs.LocationV2 color1={theme.paragraph} color3="none" />}
            title="From"
            description={data?.stakeholder?.address}
          />
          <BioCard
            icon={<svgs.Age />}
            title="Age"
            description={data?.stakeholder?.age}
          />
          <BioCard
            icon={<svgs.Coach width={25} height={25} />}
            title="Experience"
            description={`4 Years of Experience`}
          />
        </View>
      </ScrollView>
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
              style={{ paddingHorizontal: 15 }}
              fontStyle="600.semibold"
              size={18}>
              Booking type
            </AppText>
            <ScrollView
              style={{ height: "100%", paddingHorizontal: 15 }}
              contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }}>
              <RadioButton.Group
                onValueChange={newValue => setBookingType(newValue)}
                value={bookingType}>
                {_.map(BookingTypeData, (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      onPress={() => setBookingType(item?.mode)}
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
                        value={item?.mode}
                        color={theme.secondary}
                      />
                      <View>
                        <AppText
                          // color={item?.available ? theme.textColor : theme.gray}
                          fontStyle="500.semibold"
                          size={16}>
                          {item?.title}
                        </AppText>
                        <VerticalSpacing />
                        <AppText
                          size={12}
                          fontStyle="400.semibold"
                          color={theme.unselected}
                          style={{ maxWidth: "75%" }}>
                          {item?.desc}
                        </AppText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
            </ScrollView>

            <Animatable.View
              animation="fadeInUp"
              duration={500}
              style={{
                backgroundColor: theme.modalBackgroundColor,
                padding: moderateScale(20, 0.3),
                // bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
              }}>
              <AppButton
                Title={I18n.t("screen_messages.button.next")}
                color={theme.primary}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={() => refSeesionType.current?.open()}
              />
            </Animatable.View>
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
            // onClose={() => {
            //   refBookingType.current?.close();
            //   refSeesionType.current?.close();
            // }}
            animationType="fade"
            closeOnPressBack={true}
            keyboardAvoidingViewEnabled={true}
            dragFromTopOnly={true}>
            <View style={{ flex: 1 }}>
              <AppText
                style={{ paddingHorizontal: 15 }}
                fontStyle="600.semibold"
                size={18}>
                Session Type
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
                style={{ height: "100%", paddingHorizontal: 15 }}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }}>
                <RadioButton.Group
                  onValueChange={newValue =>
                    setCreditTypeID(toNumber(newValue))
                  }
                  value={toString(creditTypeID)}>
                  {_.map(FilterSesstionTypes, (item, index) => {
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
                          padding: 10,
                          backgroundColor: theme.modalBackgroundColor,
                          marginBottom: 10,
                          borderRadius: 10,
                          ...theme.light_shadow,
                        }}>
                        <RadioButton.Android
                          value={toString(item?.creditTypeID)}
                          color={theme.secondary}
                        />
                        <View>
                          <AppText
                            // color={item?.available ? theme.textColor : theme.gray}
                            fontStyle="500.semibold"
                            size={16}
                            style={{ textTransform: "capitalize" }}>
                            {item?.coachSessionType?.sessionType}
                          </AppText>
                          <VerticalSpacing />
                          <AppText
                            fontStyle="600.semibold"
                            color={theme.primary}>
                            AED{" "}
                            {bookingType === "SINGLE"
                              ? item?.rate
                              : item?.multiSessionRate}
                          </AppText>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </ScrollView>
              {creditTypeID && slotId && (
                <Animatable.View
                  animation="fadeInUp"
                  duration={500}
                  style={{
                    backgroundColor: theme.modalBackgroundColor,
                    padding: moderateScale(20, 0.3),
                    // bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
                  }}>
                  <AppButton
                    Title={I18n.t("screen_messages.button.next")}
                    color={theme.primary}
                    fontStyle="600.normal"
                    fontSize={16}
                    height={50}
                    onPress={() => goToCoachSlot()}
                  />
                </Animatable.View>
              )}
            </View>
          </RBSheet>
        </>
      </RBSheet>
      <Animatable.View
        animation="fadeInUp"
        duration={500}
        style={{
          backgroundColor: theme.modalBackgroundColor,
          padding: moderateScale(20, 0.3),
          bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
          ...theme.dark_shadow,
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.Book_a_Session")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() => refBookingType.current?.open()}
        />
      </Animatable.View>
    </AppContainer>
  );
}

export default CoachDetail;

const styles = StyleSheet.create({});
