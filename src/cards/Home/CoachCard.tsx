import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { Card } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";

interface CoachCardProps {
  data: any;
  onPressCard?: () => void;
}

export default function CoachCard(props: CoachCardProps) {
  const { data, onPressCard } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: 180,
        marginRight: 15,
        borderRadius: 10,
        position: "relative",
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressCard}>
        <FastImage
          style={{ height: 150, width: "auto", borderRadius: 200 }}
          source={{
            uri: data?.stakeholder?.picturePathS3,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.user}
        />
        <VerticalSpacing />
        <View
          style={{
            backgroundColor:
              data?.coachCategoryID === 1 ? theme.primary : theme.tertiaryText,
            width: 80,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <AppText
            style={{}}
            fontStyle="600.bold"
            size={14}
            color={theme.white}
            numberOfLines={2}>
            Tire {data?.coachCategoryID}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
            {data?.stakeholder?.stakeholderName}
          </AppText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <svgs.CoachV2 color1={theme.secondary} height={20} />
          <AppText
            fontStyle="400.bold"
            numberOfLines={2}
            color={theme.gray}
            style={{ paddingHorizontal: 15, height: 40 }}>
            Experienc of 4 Years
          </AppText>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({});
