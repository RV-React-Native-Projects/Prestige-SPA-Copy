import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import AppContainer from "@src/components/Container/AppContainer";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";
import { Card, RadioButton } from "react-native-paper";
import AppText from "@src/components/Text/AppText";
import _ from "lodash";
import I18n from "i18n-js";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import DatePickerInput from "@src/components/Picker/DatePickerInput";
import svgs from "@common/AllSvgs";
import AppButton from "@src/components/Button/AppButton";

const contractDate = [
  { code: "Tenancy", title: "Tenancy Contract" },
  { code: "Purchase", title: "Purchase Contract" },
];

export default function EditMemberShip(props: any) {
  const currentDate = new Date();
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const { locations } = useAppSelector(state => state.appData);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();

  // console.log(JSON.stringify(data, null, 2));
  const [contractType, setContractType] = useState<
    "Tenancy" | "Purchase" | string
  >("Tenancy");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  console.log(contractType, expiryDate);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle title={data?.loaction?.locationName} />
      <ScrollView>
        <View style={{ paddingHorizontal: 15 }}>
          <VerticalSpacing size={20} />
          <AppText fontStyle="500.semibold" size={16}>
            {I18n.t("screen_messages.document_type")}
          </AppText>
          <VerticalSpacing size={15} />
          <RadioButton.Group
            onValueChange={newValue => {
              console.log("newValue", newValue);
              setContractType(newValue);
            }}
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
                      <AppText size={16} fontStyle="500.normal">
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
              />
            </View>
          </View>
        ) : null}
        <VerticalSpacing size={20} />
        <TouchableOpacity
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
          />
          <VerticalSpacing size={5} />
          <AppText fontStyle="400.medium">(Max. File size: 25 MB)</AppText>
        </TouchableOpacity>
      </ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
