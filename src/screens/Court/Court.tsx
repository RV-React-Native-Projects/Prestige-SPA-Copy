import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { Searchbar } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { LettingData } from "@constants/LettingData";
import PropertyCard from "@cards/Property/PropertyCard";
import { useAppNavigation } from "@navigation/Navigation";

function CourtScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useAppNavigation();

  const onPressCard = (data: any) => {
    // console.log(data);
    navigation.navigate("LentDetail", { data: data });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View></View>
    </AppContainer>
  );
}

export default CourtScreen;

const styles = StyleSheet.create({});
