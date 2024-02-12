import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "@src/redux/store";
import { useAppNavigation } from "@src/navigation/Navigation";
import AppContainer from "@src/components/Container/AppContainer";

export default function AddNewFamily() {
  const { theme } = useAppSelector(state => state.theme);
  const { user } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View>
        <Text>AddNewFamily</Text>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
