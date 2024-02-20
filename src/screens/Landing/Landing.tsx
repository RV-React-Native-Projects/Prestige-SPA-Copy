import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import LinearGradient from "react-native-linear-gradient";
import I18n from "i18n-js";
import AppContainer from "@src/components/Container/AppContainer";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import { useAppSelector } from "@src/redux/store";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import { useAppNavigation } from "@src/navigation/Navigation";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";

function Landing() {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();

  const onPressSignUp = () => {
    navigation.navigate("SignUp");
  };

  const onPressLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <AppContainer hideStatusbar={true} scrollable={false} fullHeight={false}>
      <ImageBackground
        source={images.BG_image}
        style={{ height: "100%", width: "100%", flex: 1 }}
        resizeMode="cover">
        <LinearGradient
          style={{ height: "100%", width: "100%", flex: 1 }}
          colors={["#ECFDF350", "#ECFDF300"]}>
          <Animatable.View
            animation="fadeInUp"
            duration={1500}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <svgs.MainLogo />
          </Animatable.View>
          <Animatable.View
            animation="fadeInDown"
            duration={1500}
            style={{
              paddingBottom: moderateScale(100, 0.3),
              paddingHorizontal: moderateScale(15, 0.3),
            }}>
            <AppButton
              Title={I18n.t("screen_messages.button.signup")}
              color={theme.modalBackgroundColor}
              textColor={theme.textColor}
              height={50}
              fontSize={16}
              onPress={() => onPressSignUp()}
            />
            <VerticalSpacing size={15} />
            <AppButton
              Title={I18n.t("screen_messages.button.login")}
              color={theme.primary}
              height={50}
              fontSize={16}
              onPress={() => onPressLogin()}
            />
          </Animatable.View>
        </LinearGradient>
      </ImageBackground>
    </AppContainer>
  );
}

export default memo(Landing);

const styles = StyleSheet.create({});
