import { Keyboard, Platform, ScrollView, StyleSheet, View } from "react-native";
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
import AppButton from "@src/components/Button/AppButton";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getAllPlayerCategory } from "@src/redux/reducers/UserSlice";
import _, { capitalize, toLower, toNumber, toString } from "lodash";
import ProfilePicker from "@src/components/Picker/ProfilePicker";
import moment from "moment";
import FamilyManager from "@src/services/features/Family/FamilyManager";
import Utils from "@src/common/Utils";

const isIOS = Platform.OS === "ios";

const signUpSchema = Yup.object().shape({
  name: Yup.string().required(I18n.t("error_messages.first_name_req")),
  gender: Yup.string().required(I18n.t("error_messages.required")),
  plrCategory: Yup.string().required(I18n.t("error_messages.required")),
  relation: Yup.string().required(I18n.t("error_messages.required")),
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
  { label: "Other", value: "Other" },
];

export default function AddNewFamily(props: any) {
  const { data = null } = props?.route?.params;
  const { theme } = useAppSelector(state => state.theme);
  const { user, loadingPlayerCategory, playerCategory } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [loading, setLoading] = useState<boolean>(false);
  const [DOB, setDOB] = useState<Date | null>(
    !!data ? new Date(data?.dateOfBirth) : null,
  );
  const [errorDOB, setErrorDOB] = useState<boolean>(false);
  const [playerCatData, setPlayerCatData] = useState<DataTypes[] | null>(null);
  const [pickedImage, setPickedImage] = useState<any>(false);

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

  console.log(JSON.stringify(DOB, null, 2));

  const formInitialvalue = {
    name: !!data ? data?.name : "",
    gender: !!data ? data?.gender : "",
    plrCategory: !!data ? toString(data?.playerCategoryID) : "",
    relation: !!data ? capitalize(data?.relationship) : "",
  };

  const createNewfamily = (value: any) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("dateOfBirth", moment(DOB).format("YYYY-MM-DD"));
    formData.append("file", {
      uri: pickedImage?.path ?? pickedImage?.fileCopyUri,
      type: pickedImage?.mime,
      name: toLower(
        Utils.getFilename(pickedImage?.path ?? pickedImage?.fileCopyUri),
      ),
    });
    formData.append("gender", value.gender);
    formData.append("parentID", user?.stakeholderID);
    formData.append("playerCategoryID", toNumber(value.plrCategory));
    formData.append("relationship", value.relation);

    console.log(JSON.stringify(formData, null, 2));

    let params = {
      data: formData,
      headers: {
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
      },
    };
    setLoading(true);
    FamilyManager.createFamily(
      params,
      res => {
        console.log("Res===>", JSON.stringify(res, null, 2));
        setLoading(false);
      },
      err => {
        setLoading(false);
        console.log("Error createCredit===>", err);
      },
    );
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
              contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing />
              <ProfilePicker getImages={image => setPickedImage(image)} />
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
                  dropdownPosition="top"
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
                  handleSubmit();
                  // setErrorDOB(false);
                  // if (!DOB) setErrorDOB(true);
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
