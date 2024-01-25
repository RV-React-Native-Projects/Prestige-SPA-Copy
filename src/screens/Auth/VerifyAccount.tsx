import { StyleSheet, View, ScrollView, Platform } from "react-native";
import React, { memo, useState } from "react";
import I18n from "i18n-js";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppNavigation } from "@navigation/Navigation";
import BackButton from "@components/Header/BackButton";
import { moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import Timer from "@components/Timer/Timer";
import OTPInput from "@components/OTPInput/OTPInput";
import AuthManager from "@services/features/Auth/AuthManager";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import { setAuthToken, setRefreshToken } from "@reducers/UserSlice";
import Utils from "@common/Utils";
import useAppToast from "@components/Alert/AppToast";

const isIOS = Platform.OS === "ios";

const VerifyAccount = (props: any) => {
  const { theme } = useAppSelector(state => state.theme);
  const { userToken, authToken, authHeader } = useAppSelector(
    state => state.user,
  );
  const navigation = useAppNavigation();
  const { email, isRegister = false, isLogin = false } = props.route.params;
  const storeDispatch = useAppDispatch();
  const appToast = useAppToast();
  const { setStorage } = useEncryptedStorage();

  const [loading, setLoading] = useState<boolean>(false);
  const [timerCompleted, setTimerCompleted] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const [otp, setOtp] = useState<string | null>(null);

  const onPressVerifyAccount = () => {
    if (!otp || (otp && otp?.length < 6)) {
      appToast.showToast({
        title: I18n.t("toast.verification_err"),
        description: I18n.t("toast.otp_incorrect"),
        status: "error",
        duration: 5000,
        placement: "top",
      });
      return;
    }
    setLoading(true);
    let params = {
      data: {
        email: email,
        code: otp,
        isRegister: isRegister,
        isLogin: isLogin,
      },
    };
    AuthManager.verifyOTP(
      params,
      async res => {
        console.log("Verify Res===>", res);
        const decryptedData = await Utils.decryptToken(res.data.response);
        console.log("decryptedData==>", decryptedData);
        setStorage("SPA_Auth_Token", decryptedData?.token?.accessToken);
        setStorage("SPA_Refresh_Token", decryptedData?.token?.refreshToken);
        storeDispatch(setAuthToken(decryptedData?.token?.accessToken));
        storeDispatch(setRefreshToken(decryptedData?.token?.refreshToken));
        appToast.showToast({
          title: I18n.t("toast.otp_verifyed"),
          description: I18n.t("toast.login_succes"),
          duration: 5000,
          placement: "top",
        });
        setLoading(false);
      },
      err => {
        console.log("Error ", err);
        appToast.showToast({
          title: I18n.t("toast.verification_err"),
          description: err?.response?.message ?? err?.message,
          status: "error",
          duration: 10000,
          placement: "top",
        });
        setLoading(false);
      },
    );
  };

  const onPressResendCode = () => {
    setTimerCompleted(false);
    setResetTimer(true);
    setLoading(true);
    let params = {
      data: { email: email },
    };
    AuthManager.resendOTP(
      params,
      res => {
        console.log("resend Res===>", res);
        appToast.showNormalToast({
          title: I18n.t("toast.resend_otp"),
          duration: 3000,
        });
        setLoading(false);
      },
      err => {
        console.log("Error ", err);
        appToast.showToast({
          title: I18n.t("toast.verification_err"),
          description: err?.message?.response?.message ?? err?.message,
          status: "error",
          duration: 10000,
        });
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
          {I18n.t("screen_messages.Verify_Account")}
        </AppText>
        <VerticalSpacing size={20} />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
          }}>
          <AppText>{I18n.t("screen_messages.code_sent_to")}</AppText>
          <AppText fontStyle="500.bold" style={{ paddingHorizontal: 10 }}>
            {email}
          </AppText>
          <AppText>{I18n.t("screen_messages.enter_to_verify")}</AppText>
        </View>
        <VerticalSpacing size={20} />
        <View style={{ alignItems: "center" }}>
          <OTPInput otpCode={otp} onCodeFilled={val => setOtp(val)} />
        </View>
        <VerticalSpacing size={80} />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}>
          <AppText fontStyle="400.normal" style={{ paddingRight: 5 }}>
            {I18n.t("screen_messages.Didnt_Receive_Code")}
          </AppText>
          <VerticalSpacing />
          <View>
            {timerCompleted ? (
              <AppButton
                LinkButton
                Title={I18n.t("screen_messages.button.Resend_Code")}
                color={theme.info}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={onPressResendCode}
              />
            ) : (
              <AppText fontStyle="400.normal" style={{ paddingHorizontal: 5 }}>
                {I18n.t("screen_messages.resend_in")}{" "}
                <Timer
                  getIsTimerCompleted={e => setTimerCompleted(e)}
                  counter={"00:45"}
                  TimerCount={60 * 0.75}
                  refreshTime={1000 * 20}
                  resetTimer={resetTimer}
                />
              </AppText>
            )}
          </View>
        </View>
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.white,
          padding: moderateScale(20, 0.3),
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.Verify_Account")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={onPressVerifyAccount}
          loading={loading}
        />
      </Animatable.View>
    </AppContainer>
  );
};

export default memo(VerifyAccount);

const styles = StyleSheet.create({});
