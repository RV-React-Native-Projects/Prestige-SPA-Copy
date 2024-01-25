import { StyleSheet, ScrollView, Platform, Keyboard } from "react-native";
import React, { memo, useState } from "react";
import I18n from "i18n-js";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppNavigation } from "@navigation/Navigation";
import BackButton from "@components/Header/BackButton";
import { moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import AppTextInput from "@components/TextInput/AppTextInput";
import AuthManager from "@features/Auth/AuthManager";
import Utils from "@common/Utils";
import useAppToast from "@components/Alert/AppToast";

const isIOS = Platform.OS === "ios";

function ForgotPassword(props: any) {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const appToast = useAppToast();
  const { email } = props.route.params;

  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>(email || "");
  const [showError, setShowError] = useState<boolean>(false);

  const onPressNext = async () => {
    Keyboard.dismiss();
    setShowError(false);

    const isvalidEmail = await Utils.isValidEmail(userEmail);
    if (!isvalidEmail) {
      setShowError(true);
      return;
    }

    setLoading(true);
    let params = {
      data: { email: userEmail },
    };
    AuthManager.forgotPassword(
      params,
      res => {
        console.log("signUp Res===>", res);
        setLoading(false);
        appToast.showNormalToast({ title: I18n.t("toast.otp") });
        navigation.navigate("EnterOtp", {
          email: userEmail,
          isForgotPassword: true,
        });
      },
      err => {
        console.log("Error ", err);
        setLoading(false);
      },
    );
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: moderateScale(15, 0.3),
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
        showsVerticalScrollIndicator={false}>
        <VerticalSpacing size={70} />
        <AppText fontStyle="500.medium" size={20}>
          {I18n.t("screen_messages.Forgot_password")}
        </AppText>
        <VerticalSpacing size={20} />
        <AppText>{I18n.t("screen_messages.enter_mail_for_otp")}</AppText>
        <VerticalSpacing size={20} />
        <AppTextInput
          label={I18n.t("screen_messages.input_lable.email")}
          placeholder={I18n.t("screen_messages.input_placeholder.email")}
          value={userEmail}
          onChangeText={e => setUserEmail(e)}
          error={showError}
          errorMessage={I18n.t("error_messages.email_invalid")}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
          autoCorrect
          autoFocus
          required
        />
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.white,
          padding: moderateScale(20, 0.3),
        }}>
        <AppButton
          loading={loading}
          Title={I18n.t("screen_messages.button.next")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={onPressNext}
        />
      </Animatable.View>
    </AppContainer>
  );
}

export default memo(ForgotPassword);

const styles = StyleSheet.create({});
