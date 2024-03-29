import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import MonthPicker from "react-native-month-year-picker";
import { moderateScale } from "react-native-size-matters";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";
import moment from "moment";
import svgs from "@common/AllSvgs";
import RBSheet from "react-native-raw-bottom-sheet";

const isIOS = Platform.OS === "ios";

interface MonthYearPickerProps {
  getDate: (e: Date) => void;
  value?: Date;
  minimumDate?: Date | null;
  maximumDate?: Date | null;
}

function MonthYearPicker(props: MonthYearPickerProps) {
  let currentDate = new Date();
  const { getDate, value, minimumDate = null, maximumDate = null } = props;

  var minDate = minimumDate ?? new Date();
  var maxDate =
    maximumDate ??
    new Date(
      currentDate.getFullYear() + 5,
      currentDate.getMonth(),
      currentDate.getDate(),
    );

  const { theme } = useAppSelector(state => state.theme);
  const [date, setDate] = useState(value || new Date());
  const [show, setShow] = useState(false);
  const refRBSheetaCalender = useRef<RBSheet>(null);

  const showPicker = useCallback((value: boolean) => setShow(value), []);

  const onValueChange = useCallback(
    (event: any, newDate: any) => {
      const selectedDate = newDate || date;

      refRBSheetaCalender.current?.close();
      showPicker(false);
      setDate(selectedDate);
    },
    [date, showPicker],
  );

  useEffect(() => {
    if (getDate) getDate(date);
  }, [date]);

  useEffect(() => {
    if (value) setDate(value);
  }, [value]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          showPicker(true);
          isIOS && refRBSheetaCalender.current?.open();
        }}
        style={{
          paddingVertical: moderateScale(15, 0.3),
          padding: moderateScale(10, 0.3),
          borderRadius: 5,
          borderWidth: 1,
          borderColor: theme.gray,
          backgroundColor: theme.modalBackgroundColor,
          minHeight: 30,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minWidth: "60%",
          ...theme.light_shadow,
        }}>
        <AppText fontStyle="600.semibold">
          {moment(date).format("MMMM - YYYY")}
        </AppText>
        <View style={{ marginLeft: 10 }}>
          <svgs.Down height={15} width={15} />
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheetaCalender}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            backgroundColor: theme.appBackgroundColor,
            borderTopLeftRadius: moderateScale(15, 0.3),
            borderTopRightRadius: moderateScale(15, 0.3),
          },
          draggableIcon: {
            width: moderateScale(50, 0.3),
          },
        }}
        animationType="fade"
        closeOnPressBack={true}
        keyboardAvoidingViewEnabled={true}
        dragFromTopOnly={true}>
        <>
          {show && (
            <View style={{ height: "100%" }}>
              <MonthPicker
                onChange={onValueChange}
                value={date}
                minimumDate={minDate}
                maximumDate={maxDate}
                okButton="Done"
                cancelButton="Cancle"
                autoTheme={true}
              />
            </View>
          )}
        </>
      </RBSheet>
      {show && !isIOS && (
        <View style={{ height: "100%" }}>
          <MonthPicker
            onChange={onValueChange}
            value={date}
            minimumDate={minDate}
            maximumDate={maxDate}
            okButton="Done"
            cancelButton="Cancle"
            autoTheme={true}
          />
        </View>
      )}
    </>
  );
}

export default memo(MonthYearPicker);

const styles = StyleSheet.create({});
