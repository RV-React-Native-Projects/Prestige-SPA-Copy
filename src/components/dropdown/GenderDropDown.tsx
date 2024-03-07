import AppText from "@src/components/Text/AppText";
import { useAppSelector } from "@src/redux/store";
import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { moderateScale } from "react-native-size-matters";

interface DropdownComponentPorps {
  label?: string;
  placeholder?: string;
  value?: string;
  getValue?: (e: string) => void;
  required?: boolean;
  labelSize?: number;
  error?: boolean;
  errorMessage?: string | any;
  data?: DataTypes[];
  // labelField?: string;
  // valueField?: string;
  dropdownPosition?: "auto" | "top" | "bottom";
  inverted?: boolean;
}

interface DataTypes {
  label: string;
  value: string;
}

const genderData: DataTypes[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const GenderDropDown = (props: DropdownComponentPorps) => {
  const { theme } = useAppSelector(state => state.theme);
  const styles = style(theme);

  const {
    data = genderData,
    label = "lable",
    placeholder = "Placeholder",
    value,
    getValue,
    required = false,
    labelSize = 14,
    // labelField = "label",
    // valueField = "value",
    error = false,
    errorMessage = "This Field is Required!",
    dropdownPosition = "auto",
    inverted = false,
  } = props || {};

  const [selectedValue, setSelectedValue] = useState<string | null>(
    value ?? null,
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <>
      {label ? (
        <AppText
          size={labelSize}
          fontStyle="500.medium"
          color={error ? theme.warning : theme.subHeader}
          style={{ marginVertical: 5 }}>
          {label} {required && <AppText color={theme.error}> *</AppText>}
        </AppText>
      ) : null}
      <View style={styles.container}>
        <Dropdown
          style={[
            styles.dropdown,
            error && { borderColor: theme.error },
            isFocus && { borderColor: theme.primary },
          ]}
          activeColor={theme.modalBackgroundColor}
          containerStyle={{ backgroundColor: theme.appBackgroundColor }}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{
            color: theme.title,
            fontSize: moderateScale(14, 0.3),
          }}
          iconStyle={styles.iconStyle}
          data={data}
          dropdownPosition={dropdownPosition}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          inverted={inverted}
          value={selectedValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: DataTypes) => {
            setSelectedValue(item.value);
            setIsFocus(false);
            getValue && getValue(item.value);
          }}
        />
      </View>
      {!isFocus && error && errorMessage ? (
        <AppText
          color={theme.warning}
          size={12}
          fontStyle="400.normal"
          style={{ paddingVertical: moderateScale(5, 0.3) }}>
          * {errorMessage}
        </AppText>
      ) : null}
    </>
  );
};

export default memo(GenderDropDown);

const style = (theme: any) => {
  return StyleSheet.create({
    container: {
      // backgroundColor: theme.error,
      borderRadius: moderateScale(5, 0.3),
    },
    dropdown: {
      height: moderateScale(50, 0.3),
      borderColor: theme.gray,
      borderWidth: 0.5,
      borderRadius: moderateScale(5, 0.3),
      paddingHorizontal: moderateScale(8, 0.3),
      color: theme.title,
      backgroundColor: theme.modalBackgroundColor,
    },
    icon: {
      marginRight: moderateScale(5, 0.3),
    },
    placeholderStyle: {
      fontSize: moderateScale(16, 0.3),
      color: theme.title,
    },
    selectedTextStyle: {
      fontSize: moderateScale(16, 0.3),
      fontWeight: "400",
      color: theme.title,
    },
    iconStyle: {
      width: moderateScale(20, 0.3),
      height: moderateScale(20, 0.3),
    },
  });
};
