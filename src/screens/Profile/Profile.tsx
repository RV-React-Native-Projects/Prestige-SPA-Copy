import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import BackButtonWithTitle from "@components/Header/BackButtonWithTitle";
import svgs from "@common/AllSvgs";
import LightDarkSwitch from "@src/components/Switch/LightDarkSwitch";

export default function ProfileScreen() {
  const { theme } = useAppSelector(state => state.theme);
  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle
        title="Choose Slot"
        rightIcon={<LightDarkSwitch />}
      />
      <ScrollView></ScrollView>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
