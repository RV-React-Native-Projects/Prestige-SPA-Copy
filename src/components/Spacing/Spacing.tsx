import { View, Text, ViewProps, Dimensions } from "react-native";
import React from "react";
import { moderateScale } from "react-native-size-matters";

const { height: windowHeight, width: windowWidth } = Dimensions.get("screen");

interface HorizontalSpacingTypes extends ViewProps {
  height?: number;
  size?: number;
}
interface VerticalSpacingTypes {
  width?: number;
  size?: number;
}

export function HorizontalSpacing(props: HorizontalSpacingTypes) {
  const { height = windowHeight, size = 10 } = props || {};
  // const finalSize: number = size as number;
  // const finalHeight: string = height as string;
  return (
    <View
      style={{
        height: moderateScale(height, 0.3), // Ensure height is a valid dimension value
        width: moderateScale(size, 0.3),
      }}
    />
  );
}

export function VerticalSpacing(props: VerticalSpacingTypes) {
  const { size = 10, width = windowWidth } = props || {};
  return (
    <View
      style={{
        height: moderateScale(size, 0.3),
        width: moderateScale(width, 0.3),
      }}
    />
  );
}
