import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import _ from "lodash";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@redux/store";

interface AppTextType extends TextProps {
  size?: number; // size of the Text
  fontWeight?: string; // fontWeight of the Text
  color?: string; // color for the Text
  children?: React.ReactNode; // to have the childrens
  fontFamily?: string; // font Family for the Text
  onPress?: () => void; // function void()
  style?: TextStyle;
  fontStyle?: string; // fontStyle for the Text
  numberOfLines?: number; // number of lines
}

export default function AppText(props: AppTextType) {
  const { theme } = useAppSelector((state: any) => state.theme);

  const fs = Array.isArray(props?.style) ? props?.style : [props?.style];

  const getFontObj = () => {
    return _.get(theme, props?.fontStyle || "100.normal");
  };

  const fontObj = getFontObj();

  const {
    size = 14 || fontObj?.fontSize, // size of the Text
    fontWeight = fontObj.fontWeight, // fontWeight of the Text
    color = theme.title, // color for the Text
    // fontStyle = "normal",
    children, // to have the childrens
    fontFamily = fontObj.fontFamily, // font Family for the Text
    onPress, // function void()
    ...rest
  } = props;

  return (
    <Text
      {...props}
      {...rest}
      style={[
        {
          fontSize: moderateScale(size, 0.3),
          fontWeight: fontWeight,
          // fontStyle: fontStyle,
          color: color,
          fontFamily: fontFamily,
          includeFontPadding: false,
        },
        ...fs,
      ]}
      onPress={onPress}>
      {children}
    </Text>
  );
}
