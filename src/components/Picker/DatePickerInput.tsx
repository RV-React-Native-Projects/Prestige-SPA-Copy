import React, { memo, useEffect, useState } from "react";
import { Button, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import AppTextInput from "../TextInput/AppTextInput";
import { useAppSelector } from "@src/redux/store";
import AppText from "../Text/AppText";
import I18n from "i18n-js";
import moment from "moment";
import svgs from "@common/AllSvgs";
import { FormikErrors } from "formik";

interface DatePickerProps {
  label?: string;
  labelSize?: number;
  error?: boolean;
  errorMsg?: string;
  required?: boolean;
  getDate?: (date: Date) => void;
  value?: string | Date | null;
  maximumDate?: Date;
  minimumDate?: Date;
  placeholder?: string;
  disabled?: boolean;
}

const DatePickerInput = (props: DatePickerProps) => {
  const { theme } = useAppSelector(state => state.theme);
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [confirmDate, setConfirmDate] = useState<string | null>(null);

  const {
    label = "lable", // lable for the Text Input
    labelSize = 14, // size of the lable
    error = false, // if we have error in the field
    errorMsg = I18n.t("error_messages.required"), // if we have error msg
    required = false, // diable : boolean
    value,
    getDate, // onChnange function()
    maximumDate = new Date(), // maximumDate : Date
    minimumDate, // minimumDate : Date
    placeholder = "Placeholder", // placeholder :"string"
    disabled = false,
  } = props || {};

  const setConfirm = (date: Date) => {
    setConfirmDate(moment(date).format("DD MMM YYYY"));
  };

  return (
    <>
      {label ? (
        <AppText
          size={labelSize}
          fontStyle="600.semibold"
          color={error ? theme.error : theme.subHeader}
          style={{ marginVertical: 5 }}>
          {label} {required && <AppText color={theme.error}> *</AppText>}
        </AppText>
      ) : null}
      <TouchableOpacity
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
        disabled={disabled}
        style={{
          borderWidth: 1,
          borderColor: error ? theme.error : theme.gray,
          height: 50,
          width: "100%",
          backgroundColor: theme.modalBackgroundColor,
          borderRadius: 5,
          justifyContent: "center",
          paddingLeft: 10,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: 10,
          }}>
          <AppText
            size={16}
            fontStyle="400.normal"
            color={!confirmDate ? theme.gray : theme.title}
            style={{ paddingVertical: 5 }}>
            {confirmDate ?? placeholder}
          </AppText>
          <svgs.Calender color1={theme.secondary} />
        </View>
      </TouchableOpacity>
      {error && errorMsg ? (
        <AppText style={{ paddingVertical: 5 }} size={12} color={theme.error}>
          {errorMsg as string}
        </AppText>
      ) : null}
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={(date: any) => {
          setOpen(false);
          setDate(date);
          setConfirm(date);
          getDate && getDate(date);
        }}
        maximumDate={maximumDate}
        onCancel={() => setOpen(false)}
        minimumDate={minimumDate}
      />
    </>
  );
};

export default memo(DatePickerInput);
