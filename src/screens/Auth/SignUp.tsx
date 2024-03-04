import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Keyboard,
  Linking,
} from "react-native";
import React, { memo, useEffect, useState } from "react";
import I18n from "i18n-js";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppNavigation } from "@navigation/Navigation";
import AppTextInput from "@components/TextInput/AppTextInput";
import BackButton from "@components/Header/BackButton";
import { moderateScale } from "react-native-size-matters";
import * as Animatable from "react-native-animatable";
import CountryCodePicker from "@components/dropdown/CountryCodePicker";
import CountryNamePicker from "@components/dropdown/CountryNamePicker";
import AuthManager from "@services/features/Auth/AuthManager";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import * as Yup from "yup";
import { Formik } from "formik";
import useAppToast from "@components/Alert/AppToast";
import GenderDropDown from "@src/components/dropdown/GenderDropDown";
import DatePickerInput from "@src/components/Picker/DatePickerInput";
import {
  getAllPlayerCategory,
  setAuthToken,
  setUserEmail,
} from "@src/redux/reducers/UserSlice";
import _, { toLower, toString } from "lodash";
import moment from "moment";
import Utils from "@src/common/Utils";
import ProfilePicker from "@src/components/Picker/ProfilePicker";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";

const isIOS = Platform.OS === "ios";

const signUpSchema = Yup.object().shape({
  stakeholderType: Yup.string().required(I18n.t("error_messages.required")),
  stakeholderName: Yup.string().required(I18n.t("error_messages.name_req")),
  callCode: Yup.string().required(I18n.t("error_messages.required")),
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
  emiratesID: Yup.string().required(I18n.t("error_messages.required")),
  countryName: Yup.string().required(I18n.t("error_messages.required")),
  address: Yup.string()
    .min(8, I18n.t("error_messages.address_len"))
    .required(I18n.t("error_messages.address_req")),
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
  gender: Yup.string().required(I18n.t("error_messages.required")),
  plrCategory: Yup.string().required(I18n.t("error_messages.required")),
});

interface DataTypes {
  label: string;
  value: string;
}

const SignUp = () => {
  const currentDate = new Date();
  const { theme } = useAppSelector(state => state.theme);
  const { playerCategory } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const { setStorage } = useEncryptedStorage();
  const appToast = useAppToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [DOB, setDOB] = useState<Date | any>();
  const [errorDOB, setErrorDOB] = useState<boolean>(false);
  const [emiratesIDExpiry, setEmiratesIDExpiry] = useState<Date | any>();
  const [errorExpiry, setErrorExpiry] = useState<boolean>(false);

  const formInitialvalue = {
    stakeholderType: "Customer",
    stakeholderName: "",
    countryName: "",
    callCode: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    confirmPassword: "",
    emiratesID: "",
    gender: "",
    plrCategory: "",
  };

  const [playerCatData, setPlayerCatData] = useState<DataTypes[] | null>(null);
  const [pickedImage, setPickedImage] = useState<any | null>(null);

  useEffect(() => {
    if (!playerCategory) storeDispatch(getAllPlayerCategory());
  }, [playerCategory]);

  useEffect(() => {
    if (playerCategory) {
      const filteredPlayerDate = _.map(playerCategory, (player, index) => {
        return {
          label: player.playerCategory,
          value: toString(player.playerCategoryID),
        };
      });
      filteredPlayerDate?.length > 0
        ? setPlayerCatData(filteredPlayerDate)
        : setPlayerCatData(null);
    }
  }, [playerCategory]);

  const onPressCreateAccount = (values: typeof formInitialvalue) => {
    const formData = new FormData();

    formData.append("stakeholderName", values?.stakeholderName);
    formData.append("email", values?.email);
    formData.append("password", values?.confirmPassword);
    formData.append("stakeholderType", values?.stakeholderType);
    formData.append("phoneNumber", values?.callCode + values?.mobile);
    formData.append("emiratesID", values?.emiratesID);
    formData.append(
      "emiratesIDExpiry",
      moment(emiratesIDExpiry).format("YYYY-MM-DD"),
    );
    formData.append("file", {
      uri: pickedImage?.path ?? pickedImage?.fileCopyUri,
      type: pickedImage?.mime,
      name: toLower(
        Utils.getFilename(pickedImage?.path ?? pickedImage?.fileCopyUri),
      ),
    });
    formData.append("address", values?.address);
    formData.append("gender", values?.gender);
    formData.append("dateOfBirth", moment(DOB).format("YYYY-MM-DD"));
    formData.append("playerCategoryID", values?.plrCategory);
    formData.append("hasFamily", false);

    const params = {
      data: formData,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
      },
    };

    AuthManager.signUpUser(
      params,
      res => {
        console.log("signUp Res===>", JSON.stringify(res, null, 2));
        storeDispatch(setAuthToken(res.data.data.jwt));
        storeDispatch(setUserEmail(res.data?.data?.stakeholder?.email));
        setStorage("SPA_Email", res.data?.data?.stakeholder?.email);
        setStorage("SPA_Auth_Token", res.data.data.jwt);
        appToast.showNormalToast({ title: "SignUp Successfully!" });
        setLoading(false);
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

  useEffect(() => {
    if (DOB) setErrorDOB(false);
    if (emiratesIDExpiry) setErrorExpiry(false);
  }, [DOB, emiratesIDExpiry]);

  const onSubmit = () => {
    setErrorDOB(false);
    setErrorExpiry(false);
    Keyboard.dismiss();
    if (!DOB) setErrorDOB(true);
    if (!emiratesIDExpiry) return setErrorExpiry(true);
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
              contentContainerStyle={{
                paddingBottom: moderateScale(150, 0.3),
                paddingHorizontal: moderateScale(15, 0.3),
              }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing size={50} />
              <AppText
                style={{ textAlign: "center" }}
                fontStyle="500.medium"
                size={20}>
                {I18n.t("screen_messages.signup_msg")}
              </AppText>
              <VerticalSpacing size={30} />
              <ProfilePicker getImages={image => setPickedImage(image)} />
              <View>
                <VerticalSpacing size={20} />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Name")}
                  placeholder={I18n.t("screen_messages.input_placeholder.Name")}
                  value={values?.stakeholderName}
                  onChangeText={handleChange("stakeholderName")}
                  error={
                    touched.stakeholderName && errors.stakeholderName
                      ? true
                      : false
                  }
                  errorMessage={errors.stakeholderName}
                  keyboardType="name-phone-pad"
                  required
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect
                />
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
                <AppTextInput
                  label={"emiratesID"}
                  placeholder={"emiratesID"}
                  value={values?.emiratesID}
                  onChangeText={handleChange("emiratesID")}
                  error={touched.emiratesID && errors.emiratesID ? true : false}
                  errorMessage={errors.emiratesID}
                  keyboardType="default"
                  required
                  autoComplete="name-family"
                />
                <VerticalSpacing />
                <DatePickerInput
                  label="emiratesID Expiry Date"
                  placeholder="DD/MM/YYYY"
                  value={emiratesIDExpiry}
                  minimumDate={new Date()}
                  maximumDate={
                    new Date(
                      currentDate.getFullYear() + 2,
                      currentDate.getMonth(),
                      currentDate.getDate(),
                    )
                  }
                  required
                  getDate={e => setEmiratesIDExpiry(e)}
                  error={errorExpiry}
                  errorMsg="Expiry Date required!"
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
                <GenderDropDown
                  label="Gender"
                  placeholder="Select a Gender"
                  value={values?.gender}
                  required
                  getValue={handleChange("gender")}
                  error={touched.gender && errors.gender ? true : false}
                  errorMessage={errors.gender}
                />
                {/* <GenderDropDown
                  label="Gender"
                  placeholder="Select a Gender"
                  value={gender}
                  required
                  getValue={e => setGender(e)}
                /> */}
                <VerticalSpacing />
                <DatePickerInput
                  label="DOB"
                  placeholder="DD/MM/YYYY"
                  value={DOB || new Date()}
                  required
                  getDate={e => setDOB(e)}
                  error={errorDOB}
                />
                <VerticalSpacing />
                <CountryNamePicker
                  label={I18n.t(
                    "screen_messages.input_lable.Country_of_residence",
                  )}
                  getCountryName={handleChange("countryName")}
                  required
                />
                <VerticalSpacing />
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
                />
                <VerticalSpacing />
                {playerCatData && (
                  <GenderDropDown
                    data={playerCatData}
                    label="Player Category"
                    placeholder="Select Player Category"
                    value={values?.plrCategory}
                    required
                    getValue={handleChange("plrCategory")}
                    error={
                      touched.plrCategory && errors.plrCategory ? true : false
                    }
                    errorMessage={errors.plrCategory}
                  />
                )}
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
              {/* <VerticalSpacing size={40} />
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
              </View> */}
            </ScrollView>
            <FloatingBottomButton
              title={I18n.t("screen_messages.button.Create_Account")}
              onPress={() => {
                onSubmit();
                handleSubmit();
              }}
            />
          </>
        )}
      </Formik>
    </AppContainer>
  );
};

export default memo(SignUp);

const styles = StyleSheet.create({});
