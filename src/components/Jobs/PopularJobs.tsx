import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "@components/Text/AppText";
import I18n from "i18n-js";
import AppButton from "@components/Button/AppButton";
import { useAppSelector } from "@redux/store";

interface PopularJobsTypes {
  onPress?: () => void;
}

export default function PopularJobs(props: PopularJobsTypes) {
  const { onPress } = props;
  const { theme } = useAppSelector((state: any) => state.theme);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 15,
        }}
      >
        <AppText size={20} fontStyle="500.medium">
          {I18n.t("screen_messages.pop_job")}
        </AppText>
        <AppButton
          LinkButton
          Title="show all"
          fontSize={16}
          fontStyle="400.normal"
          onPress={onPress}
          color={theme.primary}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
