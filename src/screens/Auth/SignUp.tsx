import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  Keyboard,
  Linking,
} from "react-native";
import React, { memo, useState } from "react";
import I18n from "i18n-js";
import AppContainer from "@components/Container/AppContainer";
import svgs from "@common/AllSvgs";
import { useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppNavigation } from "@navigation/Navigation";
import AppTextInput from "@components/TextInput/AppTextInput";
import BackButton from "@components/Header/BackButton";
import { moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import { RadioButton } from "react-native-paper";
import CountryCodePicker from "@components/dropdown/CountryCodePicker";
import CountryNamePicker from "@components/dropdown/CountryNamePicker";
import AuthManager from "@services/features/Auth/AuthManager";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import * as Yup from "yup";
import { Formik } from "formik";
import useAppToast from "@components/Alert/AppToast";
import GenderDropDown from "@src/components/dropdown/GenderDropDown";
import DatePickerInput from "@src/components/Picker/DatePickerInput";

const isIOS = Platform.OS === "ios";

const signUpSchema = Yup.object().shape({
  userType: Yup.string().required(I18n.t("error_messages.first_name_req")),
  firstName: Yup.string().required(I18n.t("error_messages.first_name_req")),
  lastName: Yup.string().required(I18n.t("error_messages.last_name_req")),
  mobile: Yup.string()
    .min(7, I18n.t("error_messages.phone_len"))
    .required(I18n.t("error_messages.phone_req")),
  email: Yup.string()
    .email(I18n.t("error_messages.email_invalid"))
    .required(I18n.t("error_messages.email_required"))
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      I18n.t("error_messages.email_invalid"),
    ),
  // countryName: Yup.string().required(I18n.t("error_messages.required")),
  callCode: Yup.string().required(I18n.t("error_messages.required")),
  // address: Yup.string()
  //   .min(8, I18n.t("error_messages.address_len"))
  //   .required(I18n.t("error_messages.address_req")),
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

const SignUp = () => {
  const { theme } = useAppSelector(state => state.theme);
  const navigation = useAppNavigation();
  const { setStorage } = useEncryptedStorage();
  const appToast = useAppToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [gender, setGender] = useState("");
  const [DOB, setDOB] = useState<Date | any>();

  const formInitialvalue = {
    userType: "Customer",
    firstName: "",
    lastName: "",
    // countryName: "",
    callCode: "",
    email: "",
    mobile: "",
    // address: "",
    password: "",
    confirmPassword: "",
  };

  const onPressCreateAccount = (values: typeof formInitialvalue) => {
    // setLoading(true);
    const params = {
      data: {
        userType: values?.userType,
        firstName: values?.firstName,
        lastName: values?.lastName,
        email: values?.email,
        phone: `+${values?.callCode}${values?.mobile}`,
        password: values?.password,
        // country: values?.countryName,
        // address: values?.address,
        leadType: "Letting",
      },
    };
    console.log(JSON.stringify(params, null, 2));
    // AuthManager.signUpUser(
    //   params,
    //   res => {
    //     console.log("signUp Res===>", res);
    //     // setStorage("SPA_user_Token", res.data.response);
    //     // storeDispatch(setUserToken(res.data.response));
    //     appToast.showNormalToast({ title: I18n.t("toast.otp") });
    //     navigation.navigate("VerifyAccount", {
    //       email: values?.email,
    //       isRegister: true,
    //     });
    //     setLoading(false);
    //   },
    //   err => {
    //     console.log("Error ", err);
    //     appToast.showToast({
    //       title: I18n.t("toast.verification_err"),
    //       description: err.message?.message ?? err?.message,
    //       status: "error",
    //       duration: 10000,
    //       placement: "top",
    //     });
    //     setLoading(false);
    //   },
    // );
  };

  const onPressTermOfService = () => {
    Linking.openURL("https://www.druce.com/uk/cms/terms-and-conditions");
  };

  const onPressPrivacyPolicy = () => {
    Linking.openURL("https://www.druce.com/uk/cms/privacy-policy");
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <Formik
        validationSchema={signUpSchema}
        initialValues={formInitialvalue}
        onSubmit={values => onPressCreateAccount(values)}>
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
                flex: 1,
                paddingHorizontal: moderateScale(15, 0.3),
                minHeight: isIOS ? "100%" : "auto",
              }}
              contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing size={80} />
              <AppText fontStyle="500.medium" size={20}>
                {I18n.t("screen_messages.signup_msg")}
              </AppText>
              {/* <VerticalSpacing size={20} />
        <View style={{ flexDirection: "row" }}>
          <AppText>{I18n.t("screen_messages.register.as")}</AppText>
          <AppText color={theme.error}> * </AppText>
          <svgs.Help />
        </View>
        <View
          style={{ flexDirection: "row", marginTop: moderateScale(10, 0.3) }}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => setUserType("Customer")}>
            <RadioButton.Android
              value="Customer"
              status={userType === "Customer" ? "checked" : "unchecked"}
              onPress={() => setUserType("Customer")}
            />
            <AppText fontStyle="500.normal">
              {I18n.t("screen_messages.register.Customer")}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            activeOpacity={0.7}
            onPress={() => setUserType("Developer")}>
            <RadioButton.Android
              status={userType === "Developer" ? "checked" : "unchecked"}
              value="Developer"
              onPress={() => setUserType("Developer")}
            />
            <AppText fontStyle="500.normal">
              {I18n.t("screen_messages.register.Developer")}
            </AppText>
          </TouchableOpacity>
        </View> */}
              <View>
                <VerticalSpacing size={20} />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.First_Name")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.First_Name",
                  )}
                  value={values?.firstName}
                  onChangeText={handleChange("firstName")}
                  error={touched.firstName && errors.firstName ? true : false}
                  errorMessage={errors.firstName}
                  keyboardType="name-phone-pad"
                  required
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect
                />
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Last_Name")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.Last_Name",
                  )}
                  value={values?.lastName}
                  onChangeText={handleChange("lastName")}
                  error={touched.lastName && errors.lastName ? true : false}
                  errorMessage={errors.lastName}
                  keyboardType="name-phone-pad"
                  required
                  autoComplete="name-family"
                />
                <VerticalSpacing />
                <GenderDropDown
                  label="Gender"
                  placeholder="Select a Gender"
                  value={gender}
                  required
                  getValue={e => setGender(e)}
                />
                <VerticalSpacing />
                <DatePickerInput
                  label="DOB"
                  placeholder="Select DOB"
                  value={DOB || new Date()}
                  required
                  getDate={e => setDOB(e)}
                />
                <VerticalSpacing />
                <View>
                  <AppText
                    fontStyle="600.semibold"
                    style={{ paddingBottom: 5 }}>
                    {I18n.t("screen_messages.input_lable.Mobile")}{" "}
                    <AppText color={theme.error}> *</AppText>
                  </AppText>
                  <View style={{ flexDirection: "row" }}>
                    <CountryCodePicker
                      getCountryCode={handleChange("callCode")}
                    />
                    <AppTextInput
                      // label={I18n.t("screen_messages.input_lable.Mobile")}
                      placeholder={I18n.t(
                        "screen_messages.input_placeholder.Mobile",
                      )}
                      value={values?.mobile}
                      onChangeText={handleChange("mobile")}
                      error={touched.mobile && errors.mobile ? true : false}
                      errorMessage={errors.mobile}
                      keyboardType="phone-pad"
                      required
                      autoComplete="cc-number"
                      maxLength={13}
                    />
                  </View>
                </View>
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Email")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.Email",
                  )}
                  value={values?.email}
                  onChangeText={handleChange("email")}
                  error={touched.email && errors.email ? true : false}
                  errorMessage={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  required
                  autoComplete="email"
                />
                <VerticalSpacing />
                {/* <CountryNamePicker
                  label={I18n.t(
                    "screen_messages.input_lable.Country_of_residence",
                  )}
                  getCountryName={handleChange("countryName")}
                  required
                /> */}
                {/* <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.address")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.address",
                  )}
                  value={values?.address}
                  onChangeText={handleChange("address")}
                  error={touched.address && errors.address ? true : false}
                  errorMessage={errors.address}
                  keyboardType="visible-password"
                  autoComplete="address-line1"
                  required
                /> */}
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.password")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.password",
                  )}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  error={touched.password && errors.password ? true : false}
                  errorMessage={errors.password}
                  keyboardType="visible-password"
                  required
                  // secureTextEntry
                  autoComplete="password-new"
                />
                <AppText color={theme.gray} style={{ paddingTop: 5 }}>
                  {I18n.t("screen_messages.input_placeholder.pass_len")}
                </AppText>
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t(
                    "screen_messages.input_lable.Re_enter_Password",
                  )}
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
                  required
                  // secureTextEntry
                  autoComplete="password"
                />
              </View>
              <VerticalSpacing size={40} />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}>
                <AppText fontStyle="400.normal" style={{ paddingRight: 5 }}>
                  {I18n.t("screen_messages.term_service")}
                </AppText>
                <AppButton
                  LinkButton
                  Title={I18n.t("screen_messages.button.term")}
                  color={theme.info}
                  fontStyle="600.normal"
                  fontSize={16}
                  height={50}
                  onPress={onPressTermOfService}
                />
                <AppText
                  fontStyle="400.normal"
                  style={{ paddingHorizontal: 5 }}>
                  {I18n.t("screen_messages.and")}
                </AppText>
                <AppButton
                  LinkButton
                  Title={I18n.t("screen_messages.button.privacy")}
                  color={theme.info}
                  fontStyle="600.normal"
                  fontSize={16}
                  height={50}
                  onPress={onPressPrivacyPolicy}
                />
              </View>
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
                Title={I18n.t("screen_messages.button.Create_Account")}
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
};

export default memo(SignUp);

const styles = StyleSheet.create({});
