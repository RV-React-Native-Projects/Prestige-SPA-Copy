import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppNavigation } from "@src/navigation/Navigation";
import svgs from "@common/AllSvgs";
import { useAppSelector } from "@redux/store";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
const isIOS = Platform.OS === "ios";

export default function BackButton() {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <Animatable.View
      animation="slideInLeft"
      duration={1000}
      style={{
        flexDirection: "row",
        height: moderateScale(40, 0.3),
        width: moderateScale(40, 0.3),
        position: "absolute",
        top: isIOS ? 0 : moderateScale(30, 0.3),
        zIndex: 10,
      }}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => goBack()}
        style={{
          backgroundColor: theme.white,
          height: moderateScale(40, 0.3),
          width: moderateScale(40, 0.3),
          alignItems: "center",
          justifyContent: "center",
          marginLeft: moderateScale(15, 0.3),
          marginTop: moderateScale(10, 0.3),
          borderRadius: moderateScale(10, 0.3),
          borderColor: theme.lightGray,
          borderWidth: moderateScale(1, 0.3),
        }}>
        <svgs.Left height={25} width={25} />
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({});
