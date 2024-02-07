import React, { useCallback, useRef } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { Card } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import AppText from "@components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import { loadAllCourts } from "@reducers/AppDataSlice";

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
        style={{ flexDirection: "row", width: "100%", overflow: "hidden" }}>
        <FastImage
          style={{ height: 120, width: 130, borderRadius: 5 }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data.courts[0]?.imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.Placeholder}
        />
        <View style={{ marginLeft: 10, width: "100%" }}>
          <AppText
            style={{ height: 50, maxWidth: "64%" }}
            fontStyle="600.bold"
            size={16}
            numberOfLines={2}>
            {data?.locationName}
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <svgs.LocationV2 color1={theme.secondary} height={20} />
            <AppText fontStyle="400.bold" color={theme.paragraph}>
              5.4 KM
            </AppText>
          </View>
          <AppText
            style={{ height: 25, marginTop: 5, maxWidth: "65%" }}
            fontStyle="400.bold"
            numberOfLines={1}
            color={theme.paragraph}>
            {data?.locationAddress}
          </AppText>
          <AppText
            fontStyle="700.semibold"
            numberOfLines={1}
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
  const { courts, loadingCourts } = useAppSelector(state => state.appData);
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const scrollCourtRef = useRef<FlatList>(null);

  const gotoCourt = (data: any) => {
    navigation.navigate("CourtDetail", { data });
  };

  const onRefresh = useCallback(() => {
    storeDispatch(loadAllCourts());
  }, []);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <FlatList
        ref={scrollCourtRef}
        refreshControl={
          <RefreshControl refreshing={loadingCourts} onRefresh={onRefresh} />
        }
        data={courts}
        renderItem={({ item, index }) => (
          <CourtCard key={index} data={item} onPress={() => gotoCourt(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: 15,
          rowGap: 10,
          paddingHorizontal: 15,
        }}
      />
    </AppContainer>
  );
}

export default CourtScreen;

const styles = StyleSheet.create({});
