import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAppNavigation } from "@src/navigation/Navigation";
import svgs from "@common/AllSvgs";
import { useAppSelector } from "@redux/store";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import AppText from "../Text/AppText";
const isIOS = Platform.OS === "ios";

interface BackButtonWithTitlePorps {
  title: string;
}

export default function BackButtonWithTitle(props: BackButtonWithTitlePorps) {
  const { title } = props;
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.modalBackgroundColor,
        paddingVertical: moderateScale(10, 0.3),
      }}>
      <Animatable.View animation="slideInLeft" duration={1000}>
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
            borderRadius: moderateScale(10, 0.3),
            borderColor: theme.lightGray,
            borderWidth: moderateScale(1, 0.3),
          }}>
          <svgs.Left height={25} width={25} />
        </TouchableOpacity>
      </Animatable.View>
      <AppText
        style={{ marginLeft: moderateScale(10, 0.3) }}
        fontStyle="600.semibold"
        size={16}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({});
