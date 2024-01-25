import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "@redux/store";
import AppContainer from "@components/Container/AppContainer";

export default function Details(props: any) {
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View>
        <Text>Details</Text>
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({});
