import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useAppNavigation } from "@navigation/Navigation";
import AppContainer from "@components/Container/AppContainer";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import { Card, RadioButton } from "react-native-paper";
import AppText from "@components/Text/AppText";
import _ from "lodash";
import I18n from "i18n-js";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import DatePickerInput from "@components/Picker/DatePickerInput";
import svgs from "@common/AllSvgs";
import AppButton from "@components/Button/AppButton";
import DocPicker from "@components/Picker/DocPicker";
import * as Animatable from "react-native-animatable";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MemberShipManager from "@features/MemberShip/MemberShipManager";
import { getAllMembership } from "@reducers/UserSlice";
import { stringify } from "qs";
import Utils from "@src/common/Utils";
import moment from "moment";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";

const contractDate = [
  { code: "Tenancy", title: "Tenancy Contract" },
  { code: "Owner", title: "Owner Contract" },
];

const isIOS = Platform.OS === "ios";

export default function EditMemberShip(props: any) {
  const currentDate = new Date();
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const { user, authHeader } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const insets = useSafeAreaInsets();

  const [contractType, setContractType] = useState<
    "Tenancy" | "Owner" | string
  >("Tenancy");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [images, setImages] = useState<any>(null);
  const [expiryError, setExpiryError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function goBack() {
    navigation.goBack();
  }

  function onPressDone() {
    setExpiryError(false);
    if (contractType === "Tenancy" && !expiryDate) {
      setExpiryError(true);
      return;
    }
    const formData = new FormData();

    formData.append(
      "locationID",
      data?.loaction?.locationID ?? data?.locationID,
    );
    formData.append("customerID", user?.stakeholderID);
    formData.append("expiryDate", moment(expiryDate).format("YYYY-MM-DD"));
    formData.append(
      "file",
      images
        ? {
            uri: images[0]?.fileCopyUri,
            name: Utils.getFilename(images[0]?.fileCopyUri),
            type: images[0].mime,
          }
        : null,
    );
    formData.append(
      "membershipType",
      data?.membership?.membershipType ?? contractType,
    );

    let parsms = {
      data: formData,
      headers: {
        ...authHeader,
        Accept: "application/json, text/plain, /",
        "Content-Type": "multipart/form-data",
      },
    };

    setLoading(true);
    MemberShipManager.createMemberShip(
      parsms,
      res => {
        // console.log("createMemberShip", JSON.stringify(res, null, 2));
        if (user) storeDispatch(getAllMembership(user?.stakeholderID));
        setLoading(false);
      },
      err => {
        console.log(err);
        setLoading(false);
      },
    );
  }

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButtonWithTitle
        title={data?.loaction?.locationName ?? data?.locationName}
      />
      <ScrollView
        style={{ flex: 1, minHeight: isIOS ? "100%" : "auto" }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ paddingHorizontal: 15 }}>
          <VerticalSpacing size={20} />
          <AppText fontStyle="500.semibold" size={16}>
            {I18n.t("screen_messages.document_type")}
          </AppText>
          <VerticalSpacing size={15} />
          <RadioButton.Group
            onValueChange={newValue => setContractType(newValue)}
            value={contractType}>
            <Card
              style={{
                backgroundColor: theme.modalBackgroundColor,
                ...theme.light_shadow,
              }}>
              {_.map(contractDate, (item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.9}
                    onPress={() => setContractType(item?.code)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderTopWidth: index > 0 ? 0.3 : 0,
                      borderTopColor: theme.gray,
                    }}>
                    <RadioButton.Android
                      value={item?.code}
                      color={theme.secondary}
                    />
                    <View key={index} style={{}}>
                      <AppText size={14} fontStyle="500.normal">
                        {item?.title}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </Card>
          </RadioButton.Group>
        </View>
        {contractType === "Tenancy" ? (
          <View>
            <VerticalSpacing size={20} />
            <View style={{ paddingHorizontal: 15 }}>
              <DatePickerInput
                label="Contract Expiry Date"
                placeholder="DD/MM/YYYY"
                value={expiryDate}
                minimumDate={new Date()}
                maximumDate={
                  new Date(
                    currentDate.getFullYear() + 2,
                    currentDate.getMonth(),
                    currentDate.getDate(),
                  )
                }
                required
                getDate={e => setExpiryDate(e)}
                error={expiryError}
                errorMsg="Contract Expiry Date required!"
              />
            </View>
          </View>
        ) : null}
        <VerticalSpacing size={40} />
        {!images && (
          <TouchableOpacity
            onPress={() => setShowPicker(!showPicker)}
            activeOpacity={0.8}
            style={{
              marginHorizontal: 15,
              padding: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: theme.gray,
              alignItems: "center",
            }}>
            <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 50,
                backgroundColor: theme.light,
                alignItems: "center",
                justifyContent: "center",
              }}>
              <svgs.Upload />
            </View>
            <VerticalSpacing size={5} />
            <AppButton
              Title="Upload Contract"
              LinkButton
              color={theme.secondary}
              fontSize={12}
              onPress={() => setShowPicker(!showPicker)}
            />
            <VerticalSpacing size={5} />
            <AppText fontStyle="400.medium">(Max. File size: 25 MB)</AppText>
          </TouchableOpacity>
        )}
        <DocPicker
          visible={showPicker}
          toggleModal={() => setShowPicker(!showPicker)}
          getImages={val => setImages(val)}
        />
      </ScrollView>
      <FloatingBottomButton
        title={I18n.t("screen_messages.button.done")}
        onPress={onPressDone}
      />
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
