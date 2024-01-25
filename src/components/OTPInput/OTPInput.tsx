import React, { useState, useEffect, memo, useRef } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@redux/store";

interface OTPInputProps {
  width?: string;
  height?: number;
  onCodeFilled: (code: string) => void;
  pinCount?: number;
  otpCode?: string | null;
  codeInputFieldStyle?: ViewStyle;
  inputFieldHeight?: number;
  inputFieldWidth?: number;
  borderRadius?: number;
  borderWidth?: number;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  highlightBorderColor?: string;
  highlightBorderWidth?: number;
}

const OTPInput = (props: OTPInputProps) => {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const otpInputRef = useRef(null);

  const {
    width = "100%",
    height = 70,
    onCodeFilled,
    pinCount = 6,
    otpCode = null,
    codeInputFieldStyle,
    inputFieldHeight = 50,
    inputFieldWidth = 45,
    borderRadius = 10,
    borderWidth = 1.5,
    fontSize = 25,
    fontWeight = "600",
    fontColor = isDarkMode ? theme.title : theme.primary,
    highlightBorderColor = theme.primary,
    highlightBorderWidth = 2,
  } = props || {};

  const [code, setCode] = useState<string>("");

  useEffect(() => {
    if (otpCode) setCode(otpCode);
  }, [otpCode]);

  useEffect(() => {
    if (code) onCodeFilled(code);
  }, [code]);

  return (
    <OTPInputView
      style={{ width: "90%", height: moderateScale(height, 0.3) }}
      pinCount={pinCount}
      code={code}
      onCodeChanged={val => {
        setCode(val);
        onCodeFilled(val);
      }}
      ref={otpInputRef}
      autoFocusOnLoad={true}
      keyboardType="number-pad"
      codeInputFieldStyle={{
        width: moderateScale(inputFieldWidth, 0.3),
        height: moderateScale(inputFieldHeight, 0.3),
        borderWidth: moderateScale(borderWidth, 0.3),
        borderRadius: moderateScale(borderRadius, 0.3),
        fontSize: moderateScale(fontSize, 0.3),
        color: fontColor,
        borderColor: theme.gray,
        ...codeInputFieldStyle,
      }}
      codeInputHighlightStyle={{
        borderColor: highlightBorderColor,
        borderWidth: moderateScale(highlightBorderWidth, 0.3),
      }}
      onCodeFilled={code => {
        console.log(`Code is ${code}, you are good to go!`);
        onCodeFilled(code);
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default memo(OTPInput);
