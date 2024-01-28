import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MonthPicker from "react-native-month-year-picker";
import { moderateScale } from "react-native-size-matters";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";
import moment from "moment";
import svgs from "@common/AllSvgs";
import {
  HorizontalSpacing,
  VerticalSpacing,
} from "@components/Spacing/Spacing";
import RBSheet from "react-native-raw-bottom-sheet";

interface MonthYearPickerProps {
  getDate: (e: Date) => void;
  value?: Date;
}

export default function MonthYearPicker(props: MonthYearPickerProps) {
  const { getDate, value } = props;
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
    if (value) setDate(value);
  }, [value]);

  useEffect(() => {
    if (getDate) getDate(date);
  }, [date]);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          showPicker(true);
          refRBSheetaCalender.current?.open();
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
          {moment(date).format("MMMM  YYYY")}
        </AppText>
        <View style={{ marginLeft: 10 }}>
          <svgs.Down height={15} width={15} />
        </View>
      </TouchableOpacity>
      <RBSheet
        ref={refRBSheetaCalender}
        closeOnDragDown={true}
        closeOnPressMask={true}
        // height={moderateScale(500, 0.3)}
        customStyles={{
          container: {
            backgroundColor: theme.appBackgroundColor,
            borderTopLeftRadius: moderateScale(15, 0.3),
            borderTopRightRadius: moderateScale(15, 0.3),
          },
          draggableIcon: {
            width: moderateScale(110, 0.3),
            // marginTop: moderateScale(15, 0.3),
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
                minimumDate={new Date()}
                okButton="Ok"
                cancelButton="Cancle"
                autoTheme={true}
              />
            </View>
          )}
        </>
      </RBSheet>
    </>
  );
}

const styles = StyleSheet.create({});
