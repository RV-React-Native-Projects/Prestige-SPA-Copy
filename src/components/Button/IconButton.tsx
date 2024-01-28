import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";

interface IconButtonProps {
  icon?: React.ReactNode;
  onPressIcon?: () => void;
}

export default function IconButton(props: IconButtonProps) {
  const { icon, onPressIcon } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      style={{
        padding: moderateScale(10, 0.3),
        height: moderateScale(50, 0.3),
        width: moderateScale(50, 0.3),
        borderRadius: moderateScale(5, 0.3),
        backgroundColor: theme.modalBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
        ...theme.light_shadow,
      }}
      activeOpacity={0.8}
      onPress={onPressIcon}>
      <View style={{}}>{icon}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
