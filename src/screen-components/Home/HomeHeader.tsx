import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import I18n from "i18n-js";
import images from "@src/common/AllImages";
import FastImage from "react-native-fast-image";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@src/navigation/Navigation";

export default function HomeHeader() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const navigation = useAppNavigation();

  const gotoProfile = () => {
    navigation.navigate("Profile");
  };

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
        {/* @RV === Not required for Now=== */}
        {/* <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Wishlist />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Bell />
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ padding: 5 }}
          onPress={gotoProfile}>
          <FastImage
            style={{
              height: moderateScale(45, 0.3),
              width: moderateScale(45, 0.3),
              borderRadius: moderateScale(45, 0.3),
              borderWidth: moderateScale(1, 0.3),
              borderColor: theme.secondary,
            }}
            defaultSource={images.user}
            source={{
              uri: `https://nodejsclusters-160185-0.cloudclusters.net/${user?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
