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

interface CourtCardProps {
  data: any;
  onPressCard?: () => void;
}

const CourtCard = (props: CourtCardProps) => {
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
        backgroundColor: theme.modalBackgroundColor,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPressCard}>
        <FastImage
          style={{ height: 150, width: "auto", borderRadius: 5 }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data.courts[0]?.imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.Placeholder}
        />
        <VerticalSpacing />
        <AppText
          style={{ height: 50 }}
          fontStyle="600.bold"
          size={16}
          numberOfLines={2}>
          {data?.locationName}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <svgs.LocationV2 color1={theme.secondary} height={20} />
          <AppText
            style={{ height: 50 }}
            fontStyle="600.bold"
            numberOfLines={2}
            color={theme.gray}>
            5.4 KM
          </AppText>
        </View>
        <AppText
          style={{ height: 40, marginTop: 5 }}
          fontStyle="400.bold"
          numberOfLines={2}
          color={theme.gray}>
          {data?.locationAddress}
        </AppText>
        <AppText
          style={{ marginTop: 5 }}
          fontStyle="700.semibold"
          numberOfLines={2}
          color={theme.primary}>
          AED {data?.minRate} - AED {data?.maxRate}
        </AppText>
      </TouchableOpacity>
    </Card>
  );
};

export default CourtCard;

const styles = StyleSheet.create({});
