import React from "react";
import { View } from "react-native";

interface AppIconType {
  icon?: React.ReactNode;
  style?: object;
  width?: number;
  height?: number;
}

export default function AppIcon(props: AppIconType) {
  const { icon, width, height } = props;

  if (React.isValidElement(icon)) {
    const Icon = props.icon;
    return <View style={{ ...props.style }}>{Icon}</View>;
  } else {
    return (
      <View
        style={{
          width: width,
          height: height,
        }}
      ></View>
    );
  }
}
