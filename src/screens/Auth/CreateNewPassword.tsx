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
import * as Yup from "yup";
import { Formik } from "formik";
import useAppToast from "@components/Alert/AppToast";

const isIOS = Platform.OS === "ios";

const newPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, I18n.t("error_messages.pass_length"))
    .required(I18n.t("error_messages.password_invalid"))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      I18n.t("error_messages.pass_validation"),
    ),
  confirmPassword: Yup.string()
    .min(8, I18n.t("error_messages.pass_length"))
    .oneOf([Yup.ref("password")], I18n.t("error_messages.pass_match_fail"))
    .required(I18n.t("error_messages.password_invalid")),
});

function CreateNewPassword(props: any) {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const appToast = useAppToast();
  const { email, otp } = props.route.params;

  const [loading, setLoading] = useState<boolean>(false);

  const formInitialvalue = {
    password: "",
    confirmPassword: "",
  };

  const onPressSavePassword = (values: Record<string, string>) => {
    setLoading(true);
    let params = {
      data: {
        email: email,
        code: otp,
        newPassword: values?.confirmPassword,
      },
    };
    AuthManager.createNewPassword(
      params,
      res => {
        console.log("Verify Res===>", res);
        appToast.showToast({
          title: I18n.t("toast.password_updated"),
          description: I18n.t("toast.re_login"),
          duration: 8000,
          placement: "top",
        });
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
        // setStorage("SPA_auth_token", res?.data?.response);
        // storeDispatch(setAuthToken(res.data.response));
        setLoading(false);
      },
      err => {
        console.log("Error ", err);
        appToast.showToast({
          title: I18n.t("toast.error"),
          description: err?.response?.message ?? err?.message,
          status: "error",
          duration: 5000,
          placement: "top",
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
      <Formik
        validationSchema={newPasswordSchema}
        initialValues={formInitialvalue}
        onSubmit={values => onPressSavePassword(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          validateOnBlur = true,
        }) => (
          <>
            <ScrollView
              style={{
                paddingHorizontal: moderateScale(15, 0.3),
                minHeight: "100%",
              }}
              contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing size={70} />
              <AppText fontStyle="500.medium" size={20}>
                {I18n.t("screen_messages.Create_New_Password")}
              </AppText>
              <VerticalSpacing size={20} />
              <AppText>{I18n.t("screen_messages.confirm_pass_msg")}</AppText>
              <VerticalSpacing size={20} />
              <AppTextInput
                label={I18n.t("screen_messages.input_lable.password")}
                placeholder={I18n.t(
                  "screen_messages.input_placeholder.password",
                )}
                value={values?.password}
                onChangeText={handleChange("password")}
                error={touched.password && errors.password ? true : false}
                errorMessage={errors.password}
                keyboardType="default"
                autoComplete="password-new"
                autoCapitalize="none"
              />
              <AppText size={12} style={{ paddingVertical: 5 }}>
                {I18n.t("screen_messages.input_placeholder.pass_len")}
              </AppText>
              <VerticalSpacing size={20} />
              <AppTextInput
                label={I18n.t("screen_messages.input_lable.Re_enter_Password")}
                placeholder={I18n.t(
                  "screen_messages.input_placeholder.Re_enter_Password",
                )}
                value={values?.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? true
                    : false
                }
                errorMessage={errors.confirmPassword}
                keyboardType="visible-password"
                autoComplete="password"
                autoCapitalize="none"
              />
            </ScrollView>
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              style={{
                backgroundColor: theme.modalBackgroundColor,
                padding: moderateScale(20, 0.3),
              }}>
              <AppButton
                loading={loading}
                Title={I18n.t("screen_messages.button.save")}
                color={theme.primary}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={() => {
                  Keyboard.dismiss();
                  handleSubmit();
                }}
              />
            </Animatable.View>
          </>
        )}
      </Formik>
    </AppContainer>
  );
}

export default memo(CreateNewPassword);

const styles = StyleSheet.create({});
