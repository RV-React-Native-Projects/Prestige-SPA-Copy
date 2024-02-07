import React from "react";
import AppText from "@src/components/Text/AppText";
import { useAppSelector } from "@src/redux/store";
import { TouchableOpacity, View } from "react-native";

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
        minWidth: 65,
        backgroundColor:
          value === item?.slotID ? theme.primary : theme.modalBackgroundColor,
        borderRadius: 10,
        ...theme.light_shadow,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <AppText
          color={value === item?.slotID ? theme.white : theme.title}
          size={24}
          fontStyle="600.semibold">
          {item.slotMinutes}
        </AppText>
        <AppText
          fontStyle="400.bold"
          color={value === item?.slotID ? theme.white : theme.title}>
          Mins
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default SlotsDuration;
