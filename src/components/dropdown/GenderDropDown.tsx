import AppText from "@src/components/Text/AppText";
import { useAppSelector } from "@src/redux/store";
import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

interface DropdownComponentPorps {
  label?: string;
  placeholder?: string;
  value?: string;
  getValue?: (e: string) => void;
  required?: boolean;
  labelSize?: number;
  error?: boolean;
}

interface DataTypes {
  label: string;
  value: string;
}

const data: DataTypes[] = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const GenderDropDown = (props: DropdownComponentPorps) => {
  const { theme } = useAppSelector(state => state.theme);
  const styles = style(theme);

  const {
    label = "lable",
    placeholder = "Placeholder",
    value,
    getValue,
    required = false,
    labelSize = 14,
    error = false,
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
          fontStyle="600.semibold"
          color={error ? theme.warning : theme.subHeader}
          style={{ marginVertical: 5 }}>
          {label} {required && <AppText color={theme.error}> *</AppText>}
        </AppText>
      ) : null}
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: theme.primary }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{ color: theme.black }}
          iconStyle={styles.iconStyle}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          value={selectedValue}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item: any) => {
            setSelectedValue(item.value);
            setIsFocus(false);
            getValue && getValue(item.value);
          }}
        />
      </View>
    </>
  );
};

export default memo(GenderDropDown);

const style = (theme: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.white,
      borderRadius: 5,
    },
    dropdown: {
      height: 50,
      borderColor: theme.gray,
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      color: "gray",
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
  });
};
