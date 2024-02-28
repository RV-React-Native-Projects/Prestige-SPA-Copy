import React, { useState } from "react";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { useAppNavigation } from "@navigation/Navigation";
import I18n from "i18n-js";
import ProfilePicker from "@src/components/Picker/ProfilePicker";
import { Formik } from "formik";
import AppTextInput from "@src/components/TextInput/AppTextInput";
import GenderDropDown from "@src/components/dropdown/GenderDropDown";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import * as Yup from "yup";
import { capitalize, toLower } from "lodash";
import Utils from "@src/common/Utils";

type Props = {};

const editUserSchema = Yup.object().shape({
  name: Yup.string().required(I18n.t("error_messages.first_name_req")),
  phone: Yup.string().required(I18n.t("error_messages.phone_req")),
  email: Yup.string().required(I18n.t("error_messages.email_required")),
  gender: Yup.string().required(I18n.t("error_messages.required")),
});

function EditProfile(props: Props) {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const navigation = useAppNavigation();

  const [pickedImage, setPickedImage] = useState<any>(null);
  const formInitialvalue = {
    name: user?.stakeholderName ?? "",
    phone: user?.phoneNumber ?? "",
    email: user?.email ?? "",
    gender: capitalize(user?.gender) ?? "",
  };

  function goBack() {
    navigation.goBack();
  }

  const updateUser = (value: any) => {
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("phone", value.phone);
    formData.append("email", value.email);
    if (pickedImage)
      formData.append("file", {
        uri: pickedImage?.path ?? pickedImage?.fileCopyUri,
        type: pickedImage?.mime,
        name: toLower(
          Utils.getFilename(pickedImage?.path ?? pickedImage?.fileCopyUri),
        ),
      });
    formData.append("gender", value.gender);

    console.log("formData===>", JSON.stringify(formData, null, 2));
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Edit_Profile")}
      />
      <Formik
        validationSchema={editUserSchema}
        initialValues={formInitialvalue}
        onSubmit={values => updateUser(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: moderateScale(100, 0.3),
              }}
              showsVerticalScrollIndicator={false}>
              <VerticalSpacing size={20} />
              <ProfilePicker
                imagePath={
                  user?.imagePath &&
                  `https://nodejsclusters-160185-0.cloudclusters.net/${user?.imagePath}`
                }
                getImages={image => setPickedImage(image)}
              />
              <View style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
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
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Mobile")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.Mobile",
                  )}
                  value={values?.phone}
                  onChangeText={handleChange("phone")}
                  error={touched.phone && errors.phone ? true : false}
                  errorMessage={errors.phone}
                  keyboardType="phone-pad"
                  required
                  autoComplete="cc-number"
                  autoCorrect
                />
                <VerticalSpacing />
                <AppTextInput
                  label={I18n.t("screen_messages.input_lable.Email")}
                  placeholder={I18n.t(
                    "screen_messages.input_placeholder.email",
                  )}
                  value={values?.email}
                  onChangeText={handleChange("email")}
                  error={touched.email && errors.email ? true : false}
                  errorMessage={errors.email}
                  keyboardType="email-address"
                  required
                  autoComplete="email"
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
              </View>
              <VerticalSpacing size={40} />
            </ScrollView>
            <FloatingBottomButton
              title={I18n.t("screen_messages.button.save")}
              onPress={() => {
                Keyboard.dismiss();
                handleSubmit();
              }}
            />
          </>
        )}
      </Formik>
    </AppContainer>
  );
}

export default EditProfile;

const styles = StyleSheet.create({});
