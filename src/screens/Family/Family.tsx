import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import I18n from "i18n-js";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import AppContainer from "@src/components/Container/AppContainer";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import AppButton from "@src/components/Button/AppButton";
import AppText from "@src/components/Text/AppText";
import { getAllFamily } from "@src/redux/reducers/UserSlice";
import Feather from "react-native-vector-icons/Feather";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import _ from "lodash";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import AntDesign from "react-native-vector-icons/AntDesign";

const isIOS = Platform.OS === "ios";

interface FamilyCardProps {
  name?: string;
  relationship?: string;
  imagePath?: string;
  onPressEdit?: (data: any) => void;
  onPressDelete?: (id: string | number) => void;
}

const FamilyCard = (props: FamilyCardProps) => {
  const { name, relationship, imagePath, onPressEdit, onPressDelete } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        backgroundColor: theme.modalBackgroundColor,
        marginBottom: 15,
        borderRadius: 10,
        maxWidth: "100%",
        ...theme.light_shadow,
      }}>
      <View
        style={{ flexDirection: "row", alignItems: "center", width: "70%" }}>
        <FastImage
          style={{
            height: 50,
            width: 50,
            borderRadius: 200,
            backgroundColor: theme.light,
          }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.user}
        />
        <View style={{ marginLeft: 10 }}>
          <AppText
            style={{ marginBottom: 5 }}
            fontStyle="600.bold"
            size={14}
            numberOfLines={1}>
            {name}
          </AppText>
          <AppText
            fontStyle="400.normal"
            size={14}
            color={theme.gray}
            numberOfLines={1}>
            {relationship}
          </AppText>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={onPressEdit}
          activeOpacity={0.8}
          style={{ marginRight: 15 }}>
          <AntDesign name="edit" size={22} color={theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 5 }}
          // onPress={() => removeImage(images[0]?.fileCopyUri)}
        >
          <AntDesign name="delete" size={22} color={theme.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function FamilyMembers() {
  const { theme } = useAppSelector(state => state.theme);
  const { user, loadingFamily, family } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(getAllFamily(user?.stakeholderID));
  }, [user?.stakeholderID]);

  function onPressAddFamily() {
    navigation.navigate("AddFamily");
  }

  function onPressEdit(data: any) {}
  function onPressDelete(id: number | string) {}

  console.log(JSON.stringify(family, null, 2));

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle title="Family" />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme.secondary]}
            tintColor={theme.title}
            refreshing={loadingFamily}
            onRefresh={onRefresh}
          />
        }
        style={{ flex: 1, minHeight: isIOS ? "100%" : "auto", padding: 15 }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <AppText size={16} fontStyle="400.normal">
          {I18n.t("screen_messages.family_msg")}
        </AppText>
        <VerticalSpacing size={20} />
        {_.map(family, (item, index) => (
          <FamilyCard
            key={index}
            name={item?.name}
            relationship={item?.relationship}
            imagePath={item?.parent?.imagePath}
            onPressEdit={() => onPressEdit(item)}
            onPressDelete={() => onPressDelete(item?.familyMemberID)}
          />
        ))}
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.modalBackgroundColor,
          padding: moderateScale(20, 0.3),
          bottom: isIOS ? moderateScale(insets.top + 6, 0.3) : null,
          ...theme.mid_shadow,
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.Add_Family")}
          color={theme.title}
          // loading={loading}
          Outlined
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={onPressAddFamily}
          leftIcon={<Feather name="plus" size={30} color={theme.iconColor} />}
        />
      </Animatable.View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
