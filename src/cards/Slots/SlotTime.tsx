import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import AppText from "@components/Text/AppText";

interface SlotTime {
  onPress: () => void;
  value: string | null;
  time: string;
  isAvailable: boolean;
}

export default function SlotTime(props: SlotTime) {
  const { onPress, value, time, isAvailable } = props;
  const { theme } = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: moderateScale(80, 0.3),
        backgroundColor:
          value === time ? theme.primary : theme.modalBackgroundColor,
        borderRadius: moderateScale(5, 0.3),
        marginBottom: moderateScale(10, 0.3),
        marginHorizontal: "auto",
        marginRight: moderateScale(10, 0.3),
        padding: moderateScale(10, 0.3),
        paddingHorizontal: moderateScale(6, 0.3),
        flexDirection: "column",
        alignItems: "center",
        ...theme.light_shadow,
      }}
      onPress={onPress}
      disabled={!isAvailable}>
      <AppText
        color={
          !isAvailable ? theme.gray : value === time ? theme.white : theme.title
        }
        style={{ textTransform: "uppercase" }}
        fontStyle="500.medium"
        size={14}>
        {time}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
