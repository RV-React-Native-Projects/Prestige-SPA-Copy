import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import I18n from "i18n-js";
import images from "@src/common/AllImages";

export default function HomeHeader() {
  const { theme } = useAppSelector(state => state.theme);

  return (
    <View
      style={{
        backgroundColor: theme.modalBackgroundColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
      }}>
      <TouchableOpacity activeOpacity={0.8} style={{ maxWidth: "50%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <svgs.LocationV2 color1={theme.secondary} height={20} />
          <AppText fontStyle="600.bold" size={14} style={{ marginRight: 10 }}>
            Home
          </AppText>
          <svgs.Down height={15} width={15} />
        </View>
        <AppText
          fontStyle="400.normal"
          size={14}
          style={{
            paddingHorizontal: 10,
            padding: 5,
            width: "90%",
          }}
          numberOfLines={1}>
          Your Currnet Address
        </AppText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Wishlist />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Bell />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <Image
            // source={{require:images.user}}
            source={images.user}
            style={{
              height: 40,
              width: 40,
              borderRadius: 40,
              objectFit: "cover",
            }}
          />
          {/* <svgs.Bell /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
