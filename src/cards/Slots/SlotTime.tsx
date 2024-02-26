import {
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import AppText from "@src/components/Text/AppText";
import DeviceInfo from "react-native-device-info";

interface SlotTime {
  onPress: () => void;
  value: string | null;
  time: string;
  isAvailable: boolean;
}

const isIOS = Platform.OS === "ios";
const isTab = DeviceInfo.isTablet();
const windowWidth = Dimensions.get("window").width;

export default function SlotTime(props: SlotTime) {
  const { onPress, value, time, isAvailable } = props;
  const { theme, isDarkMode } = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor:
          value === time ? theme.primary : theme.modalBackgroundColor,
        borderRadius: moderateScale(5, 0.3),
        marginBottom: moderateScale(10, 0.3),
        ...theme.light_shadow,
        marginHorizontal: "auto",
        marginRight: moderateScale(10, 0.3),
        padding: moderateScale(10, 0.3),
        paddingHorizontal: moderateScale(8, 0.3),
        flexDirection: "column",
        alignItems: "center",
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
