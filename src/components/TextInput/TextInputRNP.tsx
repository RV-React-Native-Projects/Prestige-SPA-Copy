import React, { useState } from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import theme from "@common/Theme";
import AppText from "@components/Text/AppText";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";

export interface TextInputRNPTypes extends TextInputProps {
  label?: string | undefined;
  Outlined?: boolean;
  error?: boolean;
  left?: any; // Define the type for left according to your use case
  right?: any; // Define the type for right according to your use case
  disabled?: boolean;
  placeholder?: string;
  errormsg?: string;
  onChangeText?: (text: string) => void;
  selectionColor?: string | undefined;
  value?: string;
  activeOutlineColor?: string;
  multiline?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  editable?: boolean;
  height?: number;
  backgroundColor?: string;
  styles?: object;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  required?: boolean;
}

export default function TextInputRNP(
  props: TextInputRNPTypes,
): React.JSX.Element {
  const isDisabled: boolean = props?.disabled as boolean;
  const {
    label = "Enter the Label",
    Outlined = true,
    error = false,
    left,
    right,
    disabled = false,
    placeholder = "Placeholder goes Here",
    errormsg = "Field required",
    onChangeText,
    selectionColor = theme.primary,
    value,
    activeOutlineColor = theme.primary,
    multiline,
    onFocus,
    onBlur,
    editable = true,
    height = 50,
    backgroundColor = isDisabled ? theme.light : theme.modalBackgroundColor,
    styles,
    autoFocus = false,
    secureTextEntry = false,
    required = true,
    ...rest
  } = props || {};

  const [text, setText] = useState("");

  return (
    <>
      <TextInput
        {...rest}
        {...props}
        label={
          label && (
            <AppText fontStyle="600.semibold" size={14} color={theme.title}>
              {label}
            </AppText>
          )
        }
        value={value || text}
        mode={Outlined ? "outlined" : "flat"}
        onChangeText={onChangeText ? onChangeText : text => setText(text)}
        activeUnderlineColor={theme.primary}
        error={error}
        disabled={disabled}
        right={right}
        left={left}
        placeholder={placeholder}
        placeholderTextColor={theme.black}
        selectionColor={selectionColor}
        activeOutlineColor={activeOutlineColor}
        multiline={multiline}
        onFocus={onFocus}
        onBlur={onBlur}
        editable={editable}
        keyboardType="default"
        autoFocus={autoFocus}
        secureTextEntry={secureTextEntry}
        textColor={theme.black}
        style={{
          height: moderateScale(height, 0.3),
          width: "100%",
          backgroundColor: backgroundColor,
          fontSize: moderateScale(15, 0.3),
          color: theme.modalBackgroundColor,
          ...styles,
        }}
        outlineStyle={{
          borderColor: error ? theme.warning : theme.cardGray,
          backgroundColor: backgroundColor,
          backfaceVisibility: "hidden",
        }}
        {...props}
      />
      {error && errormsg ? (
        <AppText
          fontStyle="600.semibold"
          size={10}
          color={theme.warning}
          style={{ padding: 5 }}>
          {errormsg}
        </AppText>
      ) : null}
    </>
  );
}
