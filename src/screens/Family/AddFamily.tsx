import {
  Keyboard,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import AppContainer from "@src/components/Container/AppContainer";
import * as Yup from "yup";
import { Formik } from "formik";
import * as Animatable from "react-native-animatable";
import I18n from "i18n-js";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import AppTextInput from "@src/components/TextInput/AppTextInput";
import GenderDropDown from "@src/components/dropdown/GenderDropDown";
import DatePickerInput from "@src/components/Picker/DatePickerInput";
import CountryCodePicker from "@src/components/dropdown/CountryCodePicker";
import AppButton from "@src/components/Button/AppButton";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAllPlayerCategory } from "@src/redux/reducers/UserSlice";
import _, { toString } from "lodash";

const isIOS = Platform.OS === "ios";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required(I18n.t("error_messages.first_name_req")),
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
  gender: Yup.string().required(I18n.t("error_messages.required")),
  plrCategory: Yup.string().required(I18n.t("error_messages.required")),
  relation: Yup.string().required(I18n.t("error_messages.required")),
  DOB: Yup.date().required(I18n.t("error_messages.required")),
});

interface DataTypes {
  label: string;
  value: string;
}

const RelationData: DataTypes[] = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Brother", value: "Brother" },
  { label: "Sister", value: "Sister" },
  { label: "Husband", value: "Husband" },
  { label: "Wife", value: "Wife" },
  { label: "Son", value: "Son" },
  { label: "Daughter", value: "Daughter" },
];

export default function AddNewFamily() {
  const { theme } = useAppSelector(state => state.theme);
  const { user, loadingPlayerCategory, playerCategory } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState<boolean>(false);
  const [DOB, setDOB] = useState<Date>();
  const [errorDOB, setErrorDOB] = useState<boolean>(false);
  const [playerCatData, setPlayerCatData] = useState<DataTypes[] | null>(null);

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

  // console.log(JSON.stringify(playerCategory, null, 2));

  const formInitialvalue = {
    name: "",
    callCode: "",
    email: "",
    mobile: "",
    gender: "",
    plrCategory: "",
    relation: "",
    DOB: new Date(),
  };

  const createNewfamily = (value: any) => {
    // setErrorDOB(false);
    // if (!DOB) setErrorDOB(true);
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Add_Family_Member")}
      />
      <Formik
        validationSchema={signUpSchema}
        initialValues={formInitialvalue}
        onSubmit={values => createNewfamily(values)}>
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
              contentContainerStyle={{ paddingBottom: moderateScale(200, 0.3) }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing />
              <View>
                <VerticalSpacing size={20} />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Name")}
                  placeholder={I18n.t("screen_messages.input_placeholder.Name")}
                  value={values?.name}
                  onChangeText={handleChange("name")}
                  error={touched.name && errors.name ? true : false}
                  errorMessage={errors.name}
                  keyboardType="name-phone-pad"
                  required
                  autoCapitalize="words"
                  autoComplete="name"
                  autoCorrect
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
                <GenderDropDown
                  label="Gender"
                  placeholder="Select a Gender"
                  value={values?.gender}
                  required
                  getValue={handleChange("gender")}
                  error={touched.gender && errors.gender ? true : false}
                  errorMessage={errors.gender}
                />
                <VerticalSpacing />
                <DatePickerInput
                  label="DOB"
                  placeholder="Select DOB"
                  value={DOB}
                  required
                  getDate={e => setDOB(e)}
                  error={errorDOB}
                  // error={touched.DOB && errors.DOB ? true : false}
                  // errorMsg={errors.DOB}
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
                <GenderDropDown
                  data={RelationData}
                  label="Relation"
                  placeholder="Select Relation"
                  value={values?.relation}
                  required
                  getValue={handleChange("relation")}
                  error={touched.relation && errors.relation ? true : false}
                  errorMessage={errors.relation}
                />
              </View>
              <VerticalSpacing size={40} />
            </ScrollView>
            <Animatable.View
              animation="fadeInUp"
              duration={1000}
              style={{
                backgroundColor: theme.modalBackgroundColor,
                padding: moderateScale(20, 0.3),
                bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
              }}>
              <AppButton
                loading={loading}
                Title={I18n.t("screen_messages.button.Add_Member")}
                color={theme.primary}
                fontStyle="600.normal"
                fontSize={16}
                height={50}
                onPress={() => {
                  Keyboard.dismiss();
                  setErrorDOB(false);
                  if (!DOB) setErrorDOB(true);
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

const styles = StyleSheet.create({});
