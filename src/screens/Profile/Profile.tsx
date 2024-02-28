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
import I18n from "i18n-js";

interface ProfileButtonProps {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
  hideBorder?: boolean;
}
const ProfileButton = (props: ProfileButtonProps) => {
  const { title, onPress, icon, hideBorder = false } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: moderateScale(15, 0.3),
          backgroundColor: theme.modalBackgroundColor,
        },
        !hideBorder && {
          borderBottomWidth: moderateScale(0.3, 0.3),
          borderBottomColor: theme.gray,
        },
      ]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: 10 }}>{icon}</View>
        <AppText numberOfLines={1} size={16} fontStyle="400.normal">
          {title}
        </AppText>
      </View>
      <svgs.Right color1={theme.iconColor} />
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { user, refreshingUser, userEmail } = useAppSelector(
    state => state.user,
  );
  const { isMembership } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const logoutUser = () => {
    storeDispatch(removeUserData());
    storeDispatch(resetUser());
    storeDispatch(resetAppData());
  };

  const gotoMemberships = () => {
    navigation.navigate("Memberships");
  };

  const gotoFamily = () => {
    navigation.navigate("Family");
  };

  const gotoEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const onRefresh = useCallback(() => {
    storeDispatch(refreshUser());
  }, [userEmail]);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle
        title={I18n.t("screen_messages.header.Profile")}
        rightIcon={<LightDarkSwitch />}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme.secondary]}
            tintColor={theme.title}
            refreshing={refreshingUser}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{ padding: moderateScale(15, 0.3) }}>
        <View
          style={{
            padding: moderateScale(10, 0.3),
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.modalBackgroundColor,
            borderRadius: moderateScale(10, 0.3),
            width: "100%",
            position: "relative",
            ...theme.light_shadow,
          }}>
          <FastImage
            style={{
              height: moderateScale(80, 0.3),
              width: moderateScale(80, 0.3),
              borderRadius: moderateScale(100, 0.3),
              borderWidth: moderateScale(1, 0.3),
              borderColor: theme.secondary,
            }}
            defaultSource={images.user}
            source={{
              uri: `https://nodejsclusters-160185-0.cloudclusters.net/${user?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View
            style={{
              flexDirection: "column",
              marginLeft: moderateScale(10, 0.3),
              width: "70%",
            }}>
            <AppText numberOfLines={1} fontStyle="600.bold" size={16}>
              {user?.stakeholderName}
            </AppText>
            <VerticalSpacing size={5} />
            <AppText selectable numberOfLines={1}>
              {user?.email}
            </AppText>
            <VerticalSpacing size={5} />
            <AppText selectable fontStyle="400.normal" numberOfLines={1}>
              {user?.phoneNumber}
            </AppText>
          </View>
          <View
            style={{
              position: "absolute",
              right: moderateScale(15, 0.3),
              top: moderateScale(8, 0.3),
            }}>
            <AppButton
              fontStyle="600.medium"
              fontSize={16}
              Title="Edit"
              LinkButton
              // onPress={gotoEditProfile}
            />
          </View>
        </View>
        <VerticalSpacing size={20} />
        <View
          style={{
            backgroundColor: theme.modalBackgroundColor,
            borderRadius: moderateScale(10, 0.3),
            ...theme.light_shadow,
          }}>
          <View
            style={{
              borderRadius: moderateScale(10, 0.3),
              overflow: "hidden",
            }}>
            {isMembership && (
              <ProfileButton
                title={I18n.t("screen_messages.button.Memberships")}
                icon={<svgs.MemberShip color1={theme.iconColor} />}
                onPress={gotoMemberships}
              />
            )}
            <ProfileButton
              title={I18n.t("screen_messages.button.Family_Members")}
              icon={<svgs.Group width={25} color1={theme.iconColor} />}
              onPress={gotoFamily}
            />
            {/* <ProfileButton
              title={I18n.t("screen_messages.button.Addresses")}
              icon={<svgs.Address width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            />
            <ProfileButton
              title={I18n.t("screen_messages.button.Notifications")}
              icon={<svgs.Notification width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            />
            <ProfileButton
              title={I18n.t("screen_messages.button.About")}
              icon={<svgs.Info width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            /> */}
            <ProfileButton
              hideBorder
              title={I18n.t("screen_messages.button.Logout")}
              icon={<svgs.Logout color1={theme.iconColor} />}
              onPress={logoutUser}
            />
          </View>
        </View>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
