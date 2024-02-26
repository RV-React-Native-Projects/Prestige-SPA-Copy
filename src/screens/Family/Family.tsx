import {
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
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
import FamilyManager from "@src/services/features/Family/FamilyManager";
import RBSheet from "react-native-raw-bottom-sheet";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";

const isIOS = Platform.OS === "ios";

interface FamilyCardProps {
  name?: string;
  relationship?: string;
  imagePath?: string | null;
  onPressEdit?: (data: any) => void;
  onPressDelete?: (id: any) => void;
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
      {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={onPressEdit}
          activeOpacity={0.8}
          style={{ marginRight: 15 }}>
          <AntDesign name="edit" size={22} color={theme.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ marginRight: 5 }}
          onPress={onPressDelete}>
          <AntDesign name="delete" size={22} color={theme.error} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default function FamilyMembers() {
  const { theme } = useAppSelector(state => state.theme);
  const { user, loadingFamily, family, authHeader } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();
  const deleteSheetRef = useRef<RBSheet>(null);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    if (user?.stakeholderID) storeDispatch(getAllFamily(user?.stakeholderID));
  }, [user?.stakeholderID]);

  function onPressAddFamily() {
    navigation.navigate("AddFamily", { data: null });
  }

  function onPressEdit(data: any) {
    navigation.navigate("AddFamily", { data: data });
  }

  function deleteMember() {
    setLoadingDelete(true);
    FamilyManager.deleteFamily(
      { id: deleteId, headers: authHeader },
      res => {
        // console.log("Res===>", JSON.stringify(res, null, 2));
        if (user?.stakeholderID)
          storeDispatch(getAllFamily(user?.stakeholderID));
        deleteSheetRef.current?.close();
        setLoadingDelete(false);
      },
      err => {
        setLoadingDelete(false);
        console.log("Error deleteFamily===>", err);
      },
    );
  }

  // console.log(JSON.stringify(family, null, 2));

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
        style={{ flex: 1, minHeight: isIOS ? "100%" : "auto" }}
        contentContainerStyle={{ paddingBottom: 100, padding: 15 }}>
        <AppText size={16} fontStyle="400.normal">
          {I18n.t("screen_messages.family_msg")}
        </AppText>
        <VerticalSpacing size={20} />
        {_.map(family, (item, index) => (
          <FamilyCard
            key={index}
            name={item?.name}
            relationship={item?.relationship}
            imagePath={item?.imagePath}
            onPressEdit={() => onPressEdit(item)}
            onPressDelete={() => {
              deleteSheetRef.current?.open();
              setDeleteId(item?.familyMemberID);
            }}
          />
        ))}
      </ScrollView>
      <RBSheet
        height={moderateScale(180, 0.3)}
        ref={deleteSheetRef}
        customStyles={{
          container: {
            elevation: 100,
            backgroundColor: theme.appBackgroundColor,
            borderTopLeftRadius: moderateScale(15, 0.3),
            borderTopRightRadius: moderateScale(15, 0.3),
            padding: moderateScale(15, 0.3),
          },
        }}>
        <>
          <VerticalSpacing />
          <AppText fontStyle="500.medium" size={20} color={theme.error}>
            Attention!
          </AppText>
          <VerticalSpacing />
          <AppText fontStyle="500.normal" size={16}>
            Are You sure you want to delete?
          </AppText>
          <VerticalSpacing size={40} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <AppButton
              loading={loadingDelete}
              height={45}
              color={theme.green}
              Title="Keep"
              width="49%"
              onPress={() => deleteSheetRef.current?.close()}
            />
            <AppButton
              loading={loadingDelete}
              height={45}
              color={theme.error}
              Title="Delete"
              width="49%"
              onPress={deleteMember}
            />
          </View>
        </>
      </RBSheet>
      <FloatingBottomButton
        title={I18n.t("screen_messages.button.Add_Family")}
        Outlined
        color={theme.title}
        leftIcon={<Feather name="plus" size={30} color={theme.iconColor} />}
        onPress={onPressAddFamily}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
