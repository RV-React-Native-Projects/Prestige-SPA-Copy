import React from "react";
import { Alert, Image, TouchableOpacity, View } from "react-native";
import AppText from "@components/Text/AppText";
import svgs from "@common/AllSvgs";
import { useAppSelector } from "@redux/store";

interface ChipTypes {
  title?: string;
  picUrl?: any;
  active?: boolean;
  activeBackground?: string;
  ActiveTextColor?: string;
  outlined?: boolean;
  onPress?: () => void;
  fontFamily?: string;
  fontSize?: number;
  close?: boolean;
  backgroundColor?: string;
  dashed?: boolean;
  dotted?: boolean;
  disabled?: boolean;
}

export default function Chips(props: ChipTypes) {
  const { theme } = useAppSelector((state: any) => state.theme);
  const {
    title = "Title You Like to Have",
    picUrl,
    active = false,
    activeBackground = "#F00",
    ActiveTextColor = "#FFF",
    outlined,
    onPress,
    fontFamily = theme.Secondary_Font,
    fontSize = 16,
    close = false,
    backgroundColor = theme.cardBackground,
    dashed,
    dotted,
    disabled = false,
  } = props || {};

  let URL: any = picUrl;
  if (typeof URL === "string") {
    URL = { uri: picUrl };
  } else {
    URL = picUrl;
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
      }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        disabled={disabled}
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          maxWidth: "100%",
          justifyContent: "center",
          backgroundColor: active ? activeBackground : backgroundColor,
          padding: picUrl ? 5 : 8,
          borderRadius: 100,
          overflow: "hidden",
          borderWidth: outlined ? 1 : 0,
          borderColor: activeBackground ? activeBackground : backgroundColor,
          borderStyle: dashed ? "dashed" : dotted ? "dotted" : "solid",
          ...theme.dark_shadow,
        }}>
        {picUrl ? (
          <Image
            source={picUrl}
            style={{ height: 30, width: 30, borderRadius: 100 }}
            resizeMode="cover"
          />
        ) : null}
        <AppText
          color={active ? ActiveTextColor : theme.black}
          style={{ marginHorizontal: 10 }}
          fontFamily={fontFamily}
          size={fontSize}>
          {title}
        </AppText>
        {close ? (
          <View style={{ marginRight: 7 }}>
            <svgs.Cancle height={20} width={20} />
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
