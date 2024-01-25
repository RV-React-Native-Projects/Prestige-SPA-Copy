import Checkbox, { CheckboxProps } from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";

interface AppCheckBoxType extends CheckboxProps {
  title?: string;
  CheckBoxColor?: string;
  fontColor?: string;
  fontSize?: number;
  fontStyle?: string;
  getChecked?: (val: boolean) => boolean;
  onPressChackBox?: (val: boolean) => boolean;
  checked?: boolean;
}

export default function AppCheckBox(props: AppCheckBoxType) {
  const [isChecked, setChecked] = useState<boolean>(props.checked || false);
  const { theme } = useAppSelector((state: any) => state.theme);

  const {
    title = "",
    CheckBoxColor = isChecked ? theme.primary : theme.grayText,
    fontColor = theme.subHeader,
    fontSize = 14,
    fontStyle = "400.medium",
    getChecked = false,
    onPressChackBox,
  } = props || {};

  useEffect(() => {
    if (getChecked) {
      if (isChecked) {
        getChecked(isChecked);
      }
    }
  }, [isChecked]);

  const toggleCheckBox = () => {
    setChecked(!isChecked);
  };

  return (
    <Pressable
      style={styles.section}
      onPress={() => {
        toggleCheckBox();
        onPressChackBox && onPressChackBox(!isChecked);
      }}
    >
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={toggleCheckBox}
        color={CheckBoxColor}
      />
      {title ? (
        <AppText fontStyle={fontStyle} size={fontSize} color={fontColor}>
          {title}
        </AppText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    marginRight: 10,
  },
});
