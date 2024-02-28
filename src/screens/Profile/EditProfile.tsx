import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import svgs from "@common/AllSvgs";
import LightDarkSwitch from "@components/Switch/LightDarkSwitch";
import FastImage from "react-native-fast-image";
import { moderateScale } from "react-native-size-matters";
import images from "@common/AllImages";
import AppText from "@components/Text/AppText";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppButton from "@components/Button/AppButton";
import { refreshUser, removeUserData, resetUser } from "@reducers/UserSlice";
import { resetAppData } from "@reducers/AppDataSlice";
import { useAppNavigation } from "@navigation/Navigation";

type Props = {};

function EditProfile(props: Props) {
  const { theme } = useAppSelector(state => state.theme);
  const { user, refreshingUser, userEmail } = useAppSelector(
    state => state.user,
  );

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle title="Profile" rightIcon={<LightDarkSwitch />} />
      <ScrollView
        contentContainerStyle={{
          padding: moderateScale(15, 0.3),
        }}></ScrollView>
    </AppContainer>
  );
}

export default EditProfile;

const styles = StyleSheet.create({});
