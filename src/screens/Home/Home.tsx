import React, { memo, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@src/services/features/Auth/AuthManager";
import { useAppNavigation } from "@src/navigation/Navigation";
import { appLogout, removeUserData } from "@reducers/UserSlice";
import AppContainer from "@components/Container/AppContainer";
import useAppToast from "@components/Alert/AppToast";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import { Searchbar } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import svgs from "@common/AllSvgs";
import HomeHeader from "@src/screen-components/Home/HomeHeader";
import HeaderWithTitleandSeeAll from "@src/screen-components/Header/HeaderWithTitleandSeeAll";
import CourtManager from "@features/Court/CourtManager";
import CoachManager from "@features/Coach/CoachManager";
import CourtCard from "@cards/Home/CourtCard";
import CoachCard from "@cards/Home/CoachCard";
import {
  setCoachs,
  setCourts,
  setLoadingCoachs,
  setLoadingCourts,
} from "@src/redux/reducers/AppDataSlice";

function Home() {
  const { userToken, user } = useAppSelector(state => state.user);
  const { coachs, courts } = useAppSelector(state => state.appData);
  const { theme } = useAppSelector(state => state.theme);
  const storeDispatch = useAppDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useAppNavigation();
  const appToast = useAppToast();

  useEffect(() => {
    if (!courts) {
      storeDispatch(setLoadingCourts(true));
      CourtManager.getAllCourts(
        {},
        res => {
          storeDispatch(setCourts(res?.data?.data));
          storeDispatch(setLoadingCourts(false));
        },
        err => {
          console.log(err);
          storeDispatch(setLoadingCourts(false));
        },
      );
    }
  }, [!courts]);

  useEffect(() => {
    if (!coachs) {
      storeDispatch(setLoadingCoachs(true));
      CoachManager.getAllCoach(
        {},
        res => {
          storeDispatch(setCoachs(res?.data?.data));
          storeDispatch(setLoadingCoachs(false));
        },
        err => {
          console.log(err);
          storeDispatch(setLoadingCoachs(false));
        },
      );
    }
  }, [!coachs]);

  useEffect(() => {
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    }
  }, [userToken]);

  const gotoCourt = () => {
    navigation.navigate("CourtTab");
  };

  const gotoCoach = () => {
    navigation.navigate("CoachTab");
  };

  const onPressCourtCard = (data: any) => {
    navigation.navigate("CourtDetail", { data });
  };

  const onPressCouchCard = (data: any) => {
    navigation.navigate("CoachDetail", { data });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <VerticalSpacing />
        {/* <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: theme.modalBackgroundColor,
            borderRadius: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
          }}
        />
        <VerticalSpacing size={15} /> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
          }}>
          <AppButton
            Title="Book a Court"
            width="48%"
            height={60}
            fontSize={14}
            onPress={gotoCourt}
            color={theme.modalBackgroundColor}
            textColor={theme.textColor}
            borderRadius={10}
            leftIcon={
              <svgs.Court
                color1={theme.primary}
                strokeWidth={2}
                width={40}
                height={40}
              />
            }
          />
          <AppButton
            Title="Book a Coach"
            width="48%"
            height={60}
            fontSize={14}
            onPress={gotoCoach}
            color={theme.modalBackgroundColor}
            textColor={theme.textColor}
            borderRadius={10}
            leftIcon={
              <svgs.Coach
                color1={theme.primary}
                strokeWidth={2}
                width={40}
                height={40}
              />
            }
          />
        </View>
        <VerticalSpacing size={5} />
        {courts && (
          <View>
            <HeaderWithTitleandSeeAll
              title="Location"
              onPressLeft={gotoCourt}
            />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={courts}
              renderItem={({ item, index }) => (
                <CourtCard
                  key={index}
                  data={item}
                  onPressCard={() => onPressCourtCard(item)}
                />
              )}
            />
          </View>
        )}
        {coachs && (
          <View>
            <HeaderWithTitleandSeeAll title="Coaches" onPressLeft={gotoCoach} />
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}
              showsHorizontalScrollIndicator={false}
              horizontal
              data={coachs}
              renderItem={({ item, index }) => (
                <CoachCard
                  key={index}
                  data={item}
                  onPressCard={() => onPressCouchCard(item)}
                />
              )}
            />
          </View>
        )}
      </ScrollView>
    </AppContainer>
  );
}

export default memo(Home);

const styles = StyleSheet.create({});
