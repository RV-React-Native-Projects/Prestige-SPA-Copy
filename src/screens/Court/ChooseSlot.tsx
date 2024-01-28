import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
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
import _ from "lodash";
import RBSheet from "react-native-raw-bottom-sheet";

const isIOS = Platform.OS === "ios";

const DurationData = [{ time: 45 }, { time: 60 }, { time: 90 }];
const SlotData = [
  { time: "06:00" },
  { time: "07:00" },
  { time: "08:00" },
  { time: "09:00" },
];
const courtData = [
  { name: "Court A", price: 500, available: true },
  { name: "Court B", price: 300, available: true },
  { name: "Court C", price: 100, available: false },
  { name: "Court D", price: 800, available: true },
];

const DurationCard = (props: any) => {
  const { item, onPress, value } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: 65,
        backgroundColor:
          value === item?.time ? theme.primary : theme.modalBackgroundColor,
        borderRadius: 10,
        ...theme.light_shadow,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <AppText
          color={value === item?.time ? theme.white : theme.textColor}
          size={24}
          fontStyle="600.semibold">
          {item.time}
        </AppText>
        <AppText color={value === item?.time ? theme.white : theme.textColor}>
          Mins
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

const SlotCard = (props: any) => {
  const { item, onPress, value } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor:
          value === item?.time ? theme.primary : theme.modalBackgroundColor,
        borderRadius: 10,
        marginBottom: 10,
        ...theme.light_shadow,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <AppText
          color={value === item?.time ? theme.white : theme.textColor}
          fontStyle="600.semibold"
          size={16}>
          {item.time}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default function ChooseSlot(props: any) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const { data } = props.route.params;
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const [pickedDuration, setPickedDuration] = useState<number | null>(null);
  const [pickedSlot, setPickedSlot] = useState<number | string | null>(null);
  const [pickedCourt, setPickedCourt] = React.useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const refRBSheet = useRef<RBSheet>(null);

  const onPressNext = (data: any) => {
    refRBSheet?.current?.open();
  };

  const afterSelectCourt = (data: any) => {
    refRBSheet?.current?.close();
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
              data={DurationData}
              renderItem={({ item, index }) => (
                <DurationCard
                  item={item}
                  value={pickedDuration}
                  onPress={() => setPickedDuration(item?.time)}
                />
              )}
            />
          </View>
          {/*  ============== Select Slot ====== */}
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
              // justifyContent: "space-between",
              paddingHorizontal: moderateScale(15, 0.3),
              columnGap: 15,
            }}>
            {_.map(SlotData, (item, index) => (
              <SlotCard
                key={index}
                item={item}
                value={pickedSlot}
                onPress={() => setPickedSlot(item?.time)}
              />
            ))}
          </View>
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
            contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}>
            <RadioButton.Group
              onValueChange={newValue => setPickedCourt(newValue)}
              value={pickedCourt}>
              {_.map(courtData, (item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => setPickedCourt(item?.name)}
                  disabled={!item?.available}
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
                    disabled={!item?.available}
                    value={item.name}
                    color={theme.secondary}
                  />
                  <View key={index} style={{}}>
                    <AppText
                      color={item?.available ? theme.textColor : theme.gray}
                      fontStyle="400.bold">
                      {item?.name}
                    </AppText>
                    <VerticalSpacing />
                    <AppText
                      size={16}
                      fontStyle="500.semibold"
                      color={item?.available ? theme.primary : theme.gray}>
                      AED {item?.price}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </ScrollView>
          {!!pickedCourt && (
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
                onPress={() => afterSelectCourt(data)}
              />
            </Animatable.View>
          )}
        </View>
      </RBSheet>
      {pickedDate && pickedDuration && pickedSlot && (
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
            onPress={() => onPressNext(data)}
          />
        </Animatable.View>
      )}
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
