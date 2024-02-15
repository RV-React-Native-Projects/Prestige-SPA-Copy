import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";

interface CoachCardProps {
  imagePath: string;
  tire: string;
  stakeholderName: string;
  about: string;
  onPressCard?: () => void;
}

export default function CoachCard(props: CoachCardProps) {
  const { imagePath, tire, stakeholderName, about, onPressCard } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <View
      style={{
        padding: moderateScale(10, 0.3),
        width: 180,
        marginRight: 15,
        borderRadius: 10,
        position: "relative",
        backgroundColor: theme.modalBackgroundColor,
        ...theme.light_shadow,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressCard}>
        <FastImage
          style={{ height: 150, width: "auto", borderRadius: 200 }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.user}
        />
        <VerticalSpacing />
        <View
          style={{
            backgroundColor:
              tire === "TIER 1" ? theme.primary : theme.tertiaryText,
            width: 80,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            marginVertical: 10,
          }}>
          <AppText
            style={{}}
            fontStyle="600.bold"
            size={14}
            color={theme.modalBackgroundColor}
            numberOfLines={2}>
            {tire}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
            {stakeholderName}
          </AppText>
        </View>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <svgs.CoachV2 color1={theme.secondary} height={20} />
          <AppText
            fontStyle="400.normal"
            numberOfLines={2}
            color={theme.gray}
            style={{ paddingHorizontal: 15, height: 40 }}>
            {about}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
