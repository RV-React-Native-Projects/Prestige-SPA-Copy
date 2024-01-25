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

function LentScreen() {
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
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: moderateScale(10, 0.3),
          paddingBottom: moderateScale(100, 0.3),
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <VerticalSpacing />
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={{
                backgroundColor: theme.modalBackgroundColor,
                borderRadius: moderateScale(10, 0.3),
              }}
            />
            <VerticalSpacing size={15} />
          </>
        }
        data={LettingData.properties}
        renderItem={({ item, index }) => (
          <PropertyCard
            key={index}
            item={item}
            onPressCard={() => onPressCard(item)}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </AppContainer>
  );
}

export default LentScreen;

const styles = StyleSheet.create({});
