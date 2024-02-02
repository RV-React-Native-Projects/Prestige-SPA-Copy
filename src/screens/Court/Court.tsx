import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { Card, Searchbar } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { LettingData } from "@constants/LettingData";
import PropertyCard from "@cards/Property/PropertyCard";
import { useAppNavigation } from "@navigation/Navigation";
import AppText from "@src/components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";

const CourtCard = (props: any) => {
  const { theme } = useAppSelector(state => state.theme);
  const { data, onPress } = props;

  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: "100%",
        marginRight: 15,
        borderRadius: 10,
        position: "relative",
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ flexDirection: "row" }}>
        <FastImage
          style={{ height: 150, width: 150, borderRadius: 5 }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data.courts[0]?.imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.Placeholder}
        />
        <View style={{ marginLeft: 10 }}>
          <AppText
            style={{ height: 50 }}
            fontStyle="600.bold"
            size={16}
            numberOfLines={2}>
            {data?.locationName}
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <svgs.LocationV2 color1={theme.secondary} height={20} />
            <AppText fontStyle="500.normal" color={theme.paragraph}>
              5.4 KM
            </AppText>
          </View>
          <AppText
            style={{ height: 40, marginTop: 5 }}
            fontStyle="500.normal"
            numberOfLines={2}
            color={theme.paragraph}>
            {data?.locationAddress}
          </AppText>
          <AppText
            fontStyle="700.semibold"
            numberOfLines={2}
            color={theme.primary}>
            AED {data?.minRate} - AED {data?.maxRate}
          </AppText>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

function CourtScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { courts } = useAppSelector(state => state.appData);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useAppNavigation();

  const gotoCourt = (data: any) => {
    navigation.navigate("CourtDetail", { data });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <FlatList
        data={courts}
        renderItem={({ item, index }) => (
          <CourtCard key={index} data={item} onPress={() => gotoCourt(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 30,
          rowGap: 10,
          paddingHorizontal: 15,
        }}
      />
    </AppContainer>
  );
}

export default CourtScreen;

const styles = StyleSheet.create({});
