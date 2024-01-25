import React from "react";
import { useAppSelector } from "@redux/store";
import { StyleSheet, Text, View } from "react-native";
import AppContainer from "@components/Container/AppContainer";

function RentScreen() {
  const { theme } = useAppSelector(state => state.theme);
  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View>
        <Text>Rent</Text>
      </View>
    </AppContainer>
  );
}

export default RentScreen;

const styles = StyleSheet.create({});
