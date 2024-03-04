import React from "react";
import AppText from "@src/components/Text/AppText";
import { useAppSelector } from "@src/redux/store";
import { TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";

interface DurationCardProps {
  item: any;
  value: number | null;
  onPress: () => void;
}

const SlotsDuration = (props: DurationCardProps) => {
  const { item, onPress, value } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        minWidth: moderateScale(65, 0.3),
        backgroundColor:
          value === item?.slotID ? theme.primary : theme.modalBackgroundColor,
        borderRadius: moderateScale(5, 0.3),
        ...theme.light_shadow,
        marginBottom: moderateScale(10, 0.3),
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: moderateScale(10, 0.3),
        }}>
        <AppText
          color={value === item?.slotID ? theme.white : theme.title}
          size={24}
          fontStyle="600.semibold">
          {item.slotMinutes}
        </AppText>
        <AppText
          fontStyle="400.medium"
          color={value === item?.slotID ? theme.white : theme.title}>
          {I18n.t("screen_messages.mins")}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default SlotsDuration;
