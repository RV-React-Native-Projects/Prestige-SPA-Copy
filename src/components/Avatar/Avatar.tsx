import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "@components/Text/AppText";
import { useAppSelector } from "@redux/store";

interface AvatarTypes {
  picUrl?: string;
  size?: number;
  label?: string;
  backgroundColor?: string;
  initials?: string;
  textSize?: number;
  outlined?: boolean;
  labelColor?: string;
  dashed?: boolean;
  dotted?: boolean;
  borderColor?: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}

export default function Avatar(props: AvatarTypes) {
  const { theme } = useAppSelector(state => state.theme);

  const isOutlined: boolean = props?.outlined as boolean;
  const isDashed: boolean = props?.dashed as boolean;
  const isDotted: boolean = props?.dotted as boolean;
  const finalbackgroundColor: string = isOutlined
    ? "transparent"
    : props?.backgroundColor || "#C4421A";
  const finalborderStyle: string | null =
    isOutlined && isDashed
      ? "dashed"
      : isOutlined && isDotted
        ? "dotted"
        : isOutlined
          ? "solid"
          : null;

  const {
    picUrl,
    size = 40,
    label,
    backgroundColor,
    initials,
    textSize = 20,
    outlined = false,
    labelColor = isOutlined ? theme.primary : theme.modalBackgroundColor,
    dashed,
    dotted,
    borderColor = theme.primary,
    onPress,
    icon,
  } = props || {};

  let URL: any = picUrl;
  if (typeof URL === "string") {
    URL = { uri: picUrl };
  } else {
    URL = picUrl;
  }

  let letter = label || initials || "AB";

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      {picUrl ? (
        <Image
          source={URL}
          resizeMode="cover"
          style={{
            height: size,
            width: size,
            borderRadius: size,
          }}
        />
      ) : icon ? (
        <View
          style={{
            height: size,
            width: size,
            borderRadius: size,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isOutlined
              ? "transparent"
              : backgroundColor || "#C4421A",
            borderWidth: isOutlined ? 1 : 0,
            borderStyle:
              isOutlined && isDashed
                ? "dashed"
                : isOutlined && isDotted
                  ? "dotted"
                  : isOutlined
                    ? "solid"
                    : "solid",
            borderColor: borderColor || "#000",
          }}>
          {icon}
        </View>
      ) : (
        <View
          style={[
            {
              height: size,
              width: size,
              borderRadius: size,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: isOutlined ? 1 : 0,
              borderStyle:
                outlined && dashed
                  ? "dashed"
                  : outlined && dotted
                    ? "dotted"
                    : outlined
                      ? "solid"
                      : "solid",
              borderColor: borderColor || "#000",
              backgroundColor: outlined
                ? "transparent"
                : backgroundColor || "#C4421A",
            },
            !outlined ? { ...styles.shadow } : null,
          ]}>
          <AppText
            color={labelColor}
            size={textSize}
            style={{ textTransform: "uppercase" }}>
            {letter}
          </AppText>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 15,
    elevation: 5,
  },
});
