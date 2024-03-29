import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import AppText from "@src/components/Text/AppText";

interface SlotTime {
  onPress: () => void;
  value: string | null;
  time: string;
  isAvailable: boolean;
}

export default function SlotTime(props: SlotTime) {
  const { onPress, value, time, isAvailable } = props;
  const { theme, isDarkMode } = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor:
          value === time ? theme.primary : theme.modalBackgroundColor,
        borderRadius: moderateScale(10, 0.3),
        marginBottom: moderateScale(10, 0.3),
        ...theme.light_shadow,
      }}
      onPress={onPress}
      disabled={!isAvailable}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: moderateScale(10, 0.3),
        }}>
        <AppText
          color={
            !isAvailable
              ? theme.gray
              : value === time
                ? theme.white
                : theme.title
          }
          style={{ textTransform: "uppercase" }}
          fontStyle="500.medium"
          size={14}>
          {time}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
