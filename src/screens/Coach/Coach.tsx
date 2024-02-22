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
import I18n from "i18n-js";

const CoachCard = (props: any) => {
  const { theme } = useAppSelector(state => state.theme);
  const { data, onPress, experience } = props;

  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: "100%",
        marginRight: moderateScale(15, 0.3),
        borderRadius: moderateScale(10, 0.3),
        position: "relative",
        backgroundColor: theme.modalBackgroundColor,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ flexDirection: "row" }}>
        <FastImage
          style={{
            height: moderateScale(100, 0.3),
            width: moderateScale(100, 0.3),
            borderRadius: moderateScale(200, 0.3),
          }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data?.stakeholder?.imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.user}
        />
        <View style={{ marginLeft: moderateScale(10, 0.3) }}>
          <View
            style={{
              backgroundColor:
                data?.coachCategoryID === 1
                  ? theme.primary
                  : theme.tertiaryText,
              width: moderateScale(70, 0.3),
              height: moderateScale(25, 0.3),
              alignItems: "center",
              justifyContent: "center",
              borderRadius: moderateScale(100, 0.3),
              marginBottom: moderateScale(10, 0.3),
            }}>
            <AppText
              style={{ textTransform: "capitalize" }}
              fontStyle="600.bold"
              color={theme.modalBackgroundColor}
              numberOfLines={2}>
              {data?.coachCategory?.coachCategory}
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
              {experience &&
                I18n.t("screen_messages.year_of_exp", {
                  year: experience,
                })}
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
          <CoachCard
            key={index}
            data={item}
            onPress={() => gotoCoach(item)}
            experience={item?.experienceYears}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: moderateScale(100, 0.3),
          paddingTop: moderateScale(15, 0.3),
          rowGap: moderateScale(10, 0.3),
          paddingHorizontal: moderateScale(15, 0.3),
        }}
      />
    </AppContainer>
  );
}

export default CoachScreen;

const styles = StyleSheet.create({});
