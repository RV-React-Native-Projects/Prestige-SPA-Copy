import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@redux/store";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import svgs from "@common/AllSvgs";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";

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
        width: moderateScale(175, 0.3),
        marginRight: moderateScale(10, 0.3),
        borderRadius: moderateScale(10, 0.3),
        position: "relative",
        backgroundColor: theme.modalBackgroundColor,
        ...theme.light_shadow,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressCard}>
        <FastImage
          style={{
            height: moderateScale(150, 0.3),
            width: "auto",
            borderRadius: moderateScale(100, 0.3),
          }}
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
            width: moderateScale(70, 0.3),
            height: moderateScale(25, 0.3),
            alignItems: "center",
            justifyContent: "center",
            borderRadius: moderateScale(100, 0.3),
            marginVertical: moderateScale(10, 0.3),
          }}>
          <AppText
            style={{ textTransform: "capitalize" }}
            fontStyle="500.normal"
            color={theme.white}
            numberOfLines={2}>
            {tire}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: moderateScale(20, 0.3),
          }}>
          <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
            {stakeholderName}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: moderateScale(5, 0.3),
          }}>
          <svgs.CoachV2 color1={theme.secondary} height={20} />
          <AppText
            fontStyle="400.normal"
            numberOfLines={2}
            color={theme.gray}
            style={{
              paddingHorizontal: moderateScale(15, 0.3),
              height: moderateScale(35, 0.3),
            }}>
            {about}
          </AppText>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
