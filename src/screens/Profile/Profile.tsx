import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
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
import { removeUserData, resetUser } from "@reducers/UserSlice";
import { resetAppData } from "@reducers/AppDataSlice";
import { useAppNavigation } from "@src/navigation/Navigation";

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
          padding: 15,
          backgroundColor: theme.appBackgroundColor,
        },
        !hideBorder && {
          borderBottomWidth: 0.3,
          borderBottomColor: theme.gray,
        },
      ]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ marginRight: 10 }}>{icon}</View>
        <AppText numberOfLines={1} size={16} fontStyle="400.medium">
          {title}
        </AppText>
      </View>
      <svgs.Right color1={theme.iconColor} />
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
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

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle title="Profile" rightIcon={<LightDarkSwitch />} />
      <ScrollView contentContainerStyle={{ padding: 15 }}>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.appBackgroundColor,
            borderRadius: 10,
            width: "100%",
            position: "relative",
            ...theme.mid_shadow,
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
            style={{ flexDirection: "column", marginLeft: 10, width: "70%" }}>
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
          <View style={{ position: "absolute", right: 15, top: 8 }}>
            <AppButton
              fontStyle="600.medium"
              fontSize={16}
              Title="Edit"
              LinkButton
              onPress={() => {}}
            />
          </View>
        </View>
        <VerticalSpacing size={20} />
        <View
          style={{
            backgroundColor: theme.appBackgroundColor,
            borderRadius: 10,
            ...theme.light_shadow,
          }}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <ProfileButton
              title="Memberships"
              icon={<svgs.MemberShip color1={theme.iconColor} />}
              onPress={gotoMemberships}
            />
            <ProfileButton
              title="Family Members"
              icon={<svgs.Group width={25} color1={theme.iconColor} />}
              onPress={gotoFamily}
            />
            <ProfileButton
              title="Addresses"
              icon={<svgs.Address width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            />
            <ProfileButton
              title="Notifications"
              icon={<svgs.Notification width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            />
            <ProfileButton
              title="About"
              icon={<svgs.Info width={25} color1={theme.iconColor} />}
              onPress={() => {}}
            />
            <ProfileButton
              hideBorder
              title="Logout"
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
