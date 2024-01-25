import React, { memo, useReducer } from "react";
import { Image, Keyboard, StyleSheet, View } from "react-native";
import I18n from "i18n-js";
import AppContainer from "@components/Container/AppContainer";
import svgs from "@common/AllSvgs";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppNavigation } from "@navigation/Navigation";
import AppTextInput from "@components/TextInput/AppTextInput";
import BackButton from "@components/Header/BackButton";
import { moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import AuthManager from "@services/features/Auth/AuthManager";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import { setUser, setUserToken } from "@reducers/UserSlice";
import Utils from "@common/Utils";
import * as Yup from "yup";
import { Formik } from "formik";
import useAppToast from "@components/Alert/AppToast";
import images from "@common/AllImages";

function reducer(state: any, { payload, type }: any) {
  switch (type) {
    case "SET_LOADING":
      return { ...state, loading: payload };
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: payload };
  }
}

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(I18n.t("error_messages.email_invalid"))
    .required(I18n.t("error_messages.email_required"))
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      I18n.t("error_messages.email_invalid"),
    ),
  password: Yup.string().required(I18n.t("error_messages.password_invalid")),
});

const Login = () => {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const appToast = useAppToast();
  const { setStorage } = useEncryptedStorage();

  const formInitialvalue = {
    email: "mohsinali694@gmail.com",
    password: "12345",
  };

  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    showPassword: false,
  });

  const { loading, showPassword } = state;

  const setLoading = (val: boolean) => {
    dispatch({ type: "SET_LOADING", payload: val });
  };

  const setShowPassword = (val: boolean) => {
    dispatch({ type: "SET_SHOW_PASSWORD", payload: val });
  };

  const onPressLogin = async (values: Record<string, string>) => {
    setLoading(true);
    let params = {
      data: {
        email: values?.email,
        password: values?.password,
      },
    };
    AuthManager.userLogin(
      params,
      res => {
        console.log("Login Res===>", JSON.stringify(res.data.data, null, 2));
        setLoading(false);
        setStorage("SPA_User_Token", res.data.data.token);
        storeDispatch(setUserToken(res.data.data.token));
        storeDispatch(setUser(res.data.data.stakeHolders));
        appToast.showNormalToast({ title: I18n.t("toast.login_succes") });
        navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
      },
      err => {
        console.log("Error ", err);
        appToast.showToast({
          title: I18n.t("toast.verification_err"),
          description: err.message?.message ?? err?.message,
          status: "error",
          duration: 10000,
          placement: "top",
        });
        setLoading(false);
      },
    );
  };

  const onPressSignUp = () => {
    navigation.navigate("SignUp");
  };

  const onPressForgotPassword = (email: string) => {
    navigation.navigate("ForgotPassword", { email: email });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <View style={{ flex: 1 }}>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingTop: moderateScale(100, 0.3),
            paddingBottom: moderateScale(50, 0.3),
          }}>
          <Image
            source={images.Logo}
            style={{ height: 100, objectFit: "cover" }}
          />
        </Animatable.View>
        <Formik
          validationSchema={loginSchema}
          initialValues={formInitialvalue}
          onSubmit={values => onPressLogin(values)}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            validateOnBlur = true,
          }) => (
            <>
              <View style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.email")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.email",
                  )}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  keyboardType="email-address"
                  autoComplete="email"
                  autoCapitalize="none"
                  error={touched.email && errors.email ? true : false}
                  errorMessage={errors.email}
                  autoCorrect
                  required
                />
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.password")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.password",
                  )}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  keyboardType="default"
                  secureTextEntry={!showPassword}
                  rightIcon={<svgs.EyeClose height={25} width={25} />}
                  onPressRightIcon={() => setShowPassword(!showPassword)}
                  error={touched.password && errors.password ? true : false}
                  errorMessage={errors.password}
                  autoComplete="password"
                  autoCapitalize="none"
                  required
                />
              </View>
              <View
                style={{
                  padding: moderateScale(15, 0.3),
                  paddingTop: moderateScale(20, 0.3),
                }}>
                {/* <AppButton
                  LinkButton
                  Title={I18n.t("screen_messages.button.Forgot_Password")}
                  color={theme.info}
                  fontStyle="500.normal"
                  fontSize={16}
                  style={{ alignSelf: "flex-end" }}
                  onPress={() => onPressForgotPassword(values.email)}
                /> */}
                <VerticalSpacing size={30} />
                <Animatable.View animation="fadeInUp" duration={1000}>
                  <AppButton
                    disabled={false}
                    Title={I18n.t("screen_messages.button.login")}
                    color={theme.primary}
                    height={50}
                    fontSize={16}
                    onPress={() => {
                      Keyboard.dismiss();
                      !loading && handleSubmit();
                    }}
                    loading={loading}
                  />
                </Animatable.View>
              </View>
            </>
          )}
        </Formik>
      </View>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          flexDirection: "row",
          padding: moderateScale(20, 0.3),
          alignItems: "center",
          justifyContent: "center",
        }}>
        <AppText
          size={16}
          fontStyle="400.normal"
          style={{ paddingVertical: 5 }}>
          {I18n.t("screen_messages.have_account")}{" "}
        </AppText>
        <AppButton
          LinkButton
          Title={I18n.t("screen_messages.button.signup")}
          color={theme.info}
          fontStyle="600.normal"
          fontSize={16}
          onPress={onPressSignUp}
        />
      </Animatable.View>
    </AppContainer>
  );
};

export default memo(Login);

const styles = StyleSheet.create({});
