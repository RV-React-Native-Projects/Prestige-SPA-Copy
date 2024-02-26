import { StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import I18n from "i18n-js";

interface CourtCardProps {
  onPressCard?: () => void;
  imagePath: string;
  locationName: string;
  locationAddress: string;
  minRate: number;
  maxRate: number;
  distance?: number | null;
  isVerified?: boolean;
}

const CourtCard = (props: CourtCardProps) => {
  const {
    onPressCard,
    imagePath,
    locationName,
    locationAddress,
    minRate,
    maxRate,
    distance = 5.4,
    isVerified = false,
  } = props;
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
            height: moderateScale(140, 0.3),
            width: "auto",
            borderRadius: moderateScale(5, 0.3),
          }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.Placeholder}
        />
        <VerticalSpacing />
        <AppText
          style={{ height: moderateScale(40, 0.3) }}
          fontStyle="600.bold"
          numberOfLines={2}>
          {locationName}
        </AppText>
        {distance && (
          <View
            style={{
              flexDirection: "row",
              height: moderateScale(20, 0.3),
              alignItems: "center",
            }}>
            <MaterialIcons
              name="location-pin"
              size={Math.ceil(moderateScale(20, 0.3))}
              color={theme.secondary}
            />
            <AppText
              fontStyle="400.normal"
              numberOfLines={1}
              color={theme.paragraph}>
              {I18n.t("screen_messages.distance", {
                distance: distance?.toLocaleString(),
              })}
            </AppText>
          </View>
        )}
        <AppText
          style={{ height: moderateScale(40, 0.3), marginTop: 5 }}
          fontStyle="400.normal"
          numberOfLines={2}
          color={theme.paragraph}>
          {locationAddress}
        </AppText>
        {isVerified ? (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}>
            <MaterialIcons
              name="verified"
              size={Math.ceil(moderateScale(20, 0.3))}
              color={theme.secondary}
            />
            <AppText
              style={{ marginLeft: moderateScale(5, 0.3) }}
              fontStyle="600.bold">
              {I18n.t("screen_messages.Verified")}
            </AppText>
          </View>
        ) : (
          <AppText
            fontStyle="600.semibold"
            numberOfLines={2}
            color={theme.primary}>
            {I18n.t("screen_messages.price", { price: minRate })} -{" "}
            {I18n.t("screen_messages.price", { price: maxRate })}
          </AppText>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CourtCard;

const styles = StyleSheet.create({});
