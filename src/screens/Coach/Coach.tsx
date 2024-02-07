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
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import { loadAllCoach } from "@reducers/AppDataSlice";

const CoachCard = (props: any) => {
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
          style={{ height: 100, width: 100, borderRadius: 200 }}
          source={{
            uri: data?.stakeholder?.picturePathS3,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.user}
        />
        <View style={{ marginLeft: 10 }}>
          <View
            style={{
              backgroundColor:
                data?.coachCategoryID === 1
                  ? theme.primary
                  : theme.tertiaryText,
              width: 80,
              height: 25,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              marginVertical: 10,
            }}>
            <AppText
              fontStyle="600.bold"
              color={theme.modalBackgroundColor}
              numberOfLines={2}>
              Tire {data?.coachCategoryID}
            </AppText>
          </View>
          <AppText fontStyle="600.bold" size={16} numberOfLines={2}>
            {data?.stakeholder?.stakeholderName}
          </AppText>
          <VerticalSpacing />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <svgs.CoachV2 color1={theme.secondary} height={20} />
            <AppText
              fontStyle="400.bold"
              numberOfLines={2}
              color={theme.paragraph}
              style={{ paddingHorizontal: 5 }}>
              Experienc of 4 Years
            </AppText>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

function CoachScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { coachs, loadingCoachs } = useAppSelector(state => state.appData);
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();

  const scrollCoachRef = useRef<FlatList>(null);

  const gotoCoach = (data: any) => {
    navigation.navigate("CoachDetail", { data: data });
  };

  const onRefresh = useCallback(() => {
    storeDispatch(loadAllCoach());
  }, []);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <FlatList
        ref={scrollCoachRef}
        refreshControl={
          <RefreshControl
            colors={[theme.secondary]}
            tintColor={theme.title}
            refreshing={loadingCoachs}
            onRefresh={onRefresh}
          />
        }
        data={coachs}
        renderItem={({ item, index }) => (
          <CoachCard key={index} data={item} onPress={() => gotoCoach(item)} />
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

export default CoachScreen;

const styles = StyleSheet.create({});
