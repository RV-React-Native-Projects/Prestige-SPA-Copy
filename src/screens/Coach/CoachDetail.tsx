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
import BackButton from "@components/Header/BackButton";
import BackButtonWithTitle from "@src/components/Header/BackButtonWithTitle";

function CoachDetail(props: any) {
  const { data } = props?.route?.params;
  const { theme } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useAppNavigation();

  console.log(JSON.stringify(data, null, 2));

  const onPressCard = (data: any) => {
    // console.log(data);
    navigation.navigate("LentDetail", { data: data });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <BackButtonWithTitle title="Coach Details" />
      <ScrollView></ScrollView>
    </AppContainer>
  );
}

export default CoachDetail;

const styles = StyleSheet.create({});
