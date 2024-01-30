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

function Home() {
  const { userToken, user } = useAppSelector(state => state.user);
  const [courts, setCourts] = useState<any>(null);
  const [coachs, setCoachs] = useState<any>(null);
  const { theme } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const appToast = useAppToast();

  function getAllCourts() {
    CourtManager.getAllCourts(
      {},
      res => setCourts(res?.data?.data),
      err => console.log(err),
    );
  }

  function getAllCoach() {
    CoachManager.getAllCoach(
      {},
      res => setCoachs(res?.data?.data),
      err => console.log(err),
    );
  }

  useEffect(() => {
    if (!courts) getAllCourts();
  }, [!courts]);

  useEffect(() => {
    if (!coachs) getAllCoach();
  }, [!coachs]);

  useEffect(() => {
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    }
  }, [userToken]);

  const onPressBookCourt = () => {
    navigation.navigate("CourtTab");
  };

  const onPressBookCoach = () => {
    navigation.navigate("CoachTab");
  };

  const onPressSeeAllLocation = () => {};
  const onPressSeeAllCoaches = () => {};

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
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            backgroundColor: theme.modalBackgroundColor,
            borderRadius: moderateScale(10, 0.3),
            marginHorizontal: moderateScale(10, 0.3),
          }}
        />
        <VerticalSpacing size={15} />
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
            onPress={onPressBookCourt}
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
            onPress={onPressBookCoach}
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
        <VerticalSpacing />
        {courts && (
          <View>
            <HeaderWithTitleandSeeAll
              title="Location"
              onPressLeft={onPressSeeAllLocation}
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
            <HeaderWithTitleandSeeAll
              title="Coaches"
              onPressLeft={onPressSeeAllCoaches}
            />
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
