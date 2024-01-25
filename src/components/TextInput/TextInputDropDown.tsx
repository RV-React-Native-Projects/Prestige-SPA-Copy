import { StyleSheet } from "react-native";
import React, { memo } from "react";
import { Pressable } from "react-native";
import TextInputRNP, { TextInputRNPTypes } from "./TextInputRNP";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import svgs from "@common/AllSvgs";
import theme from "@common/Theme";

interface TextInputDropDownTypes extends TextInputRNPTypes {
  value?: string;
  editable?: boolean;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  labelSize?: number;
  onPress?: () => void;
}

function TextInputDropDown(props: TextInputDropDownTypes) {
  const {
    value = "",
    editable = false,
    disabled = false,
    label = "Lable",
    placeholder = "Placeholder",
    labelSize = 14,
    onPress,
    ...rest
  } = props || {};

  return (
    <Pressable onPress={onPress}>
      <TextInputRNP
        {...rest}
        {...props}
        value={value}
        editable={editable}
        disabled={disabled}
        label={label}
        placeholder={placeholder}
        // labelSize={labelSize}
        right={
          <TextInput.Icon
            icon={() => (
              <TouchableOpacity
                style={{ marginTop: moderateScale(10, 0.3) }}
                activeOpacity={0.7}
                onPress={onPress}>
                <svgs.Down
                  width={moderateScale(20, 0.3)}
                  height={moderateScale(20, 0.3)}
                  color={theme.gray}
                />
              </TouchableOpacity>
            )}
            size={moderateScale(30, 0.3)}
          />
        }
        // forceTextInputFocus={true}

        // onFocus={() => showDateTimepicker()}
        // onBlur={() => setShow(false)}
      />
    </Pressable>
  );
}

export default memo(TextInputDropDown);

const styles = StyleSheet.create({});
