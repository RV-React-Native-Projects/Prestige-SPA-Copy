import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@redux/store";
import AppContainer from "@components/Container/AppContainer";

function SellScreen() {
  const { theme } = useAppSelector(state => state.theme);
  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View>
        <Text>Sell</Text>
      </View>
    </AppContainer>
  );
}

export default SellScreen;

const styles = StyleSheet.create({});
