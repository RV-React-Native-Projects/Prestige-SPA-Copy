import React, { memo, useCallback, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppText from "@components/Text/AppText";
import AppButton from "@components/Button/AppButton";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { useAppNavigation } from "@navigation/Navigation";
import AppContainer from "@components/Container/AppContainer";
import useAppToast from "@components/Alert/AppToast";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { Searchbar } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import svgs from "@common/AllSvgs";
import HomeHeader from "@src/screen-components/Home/HomeHeader";
import HeaderWithTitleandSeeAll from "@src/screen-components/Header/HeaderWithTitleandSeeAll";
import CourtCard from "@cards/Home/CourtCard";
import CoachCard from "@cards/Home/CoachCard";
import { loadAllCoach, loadAllLocations } from "@reducers/AppDataSlice";
import { refreshUser, setLocation } from "@reducers/UserSlice";
import HomeDateSK from "@src/assets/skelton/HomeDateSK";
import _ from "lodash";
import Permissions from "@src/helpers/Permissions";
import Geolocation from "react-native-geolocation-service";
import Utils from "@common/Utils";

function Home() {
  const { user, userEmail, approvedMembership, location } = useAppSelector(
    state => state.user,
  );
  const { coachs, locations, loadingCoachs, loadingLocations } = useAppSelector(
    state => state.appData,
  );
  const { theme } = useAppSelector(state => state.theme);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const appToast = useAppToast();

  async function getUserCurrentLocation() {
    const permission = await Permissions.getLocationPermissions();

    if (permission) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("getCurrentPosition==>", position);
          storeDispatch(setLocation({ latitude, longitude }));
          setLocation({ latitude, longitude });
        },
        error => {
          console.log("Error getting location===>", error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 10,
          accuracy: { android: "high", ios: "nearestTenMeters" },
          forceRequestLocation: true,
          showLocationDialog: true,
          timeout: 10000,
          maximumAge: 1000,
        },
      );
    }
  }

  useEffect(() => {
    getUserCurrentLocation();
  }, [user]);

  useEffect(() => {
    if (!locations) storeDispatch(loadAllLocations());
    if (!coachs) storeDispatch(loadAllCoach());
  }, [locations, coachs]);

  useEffect(() => {
    if (!userEmail) {
      navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    }
  }, [userEmail]);

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

  const onRefresh = useCallback(() => {
    getUserCurrentLocation();
    if (userEmail) storeDispatch(refreshUser(userEmail));
    storeDispatch(loadAllLocations());
    storeDispatch(loadAllCoach());
  }, [coachs, locations]);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[theme.secondary]}
            tintColor={theme.title}
            refreshing={loadingCoachs}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}
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
            paddingHorizontal: moderateScale(15, 0.3),
          }}>
          <AppButton
            Title="Book a Court"
            width="48%"
            height={60}
            fontSize={14}
            onPress={gotoCourt}
            color={theme.modalBackgroundColor}
            textColor={theme.paragraph}
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
            textColor={theme.paragraph}
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
        {loadingLocations ? (
          <HomeDateSK />
        ) : (
          locations && (
            <View>
              <HeaderWithTitleandSeeAll
                title="Location"
                onPressLeft={gotoCourt}
              />
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: moderateScale(15, 0.3),
                  paddingVertical: moderateScale(10, 0.3),
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={locations}
                renderItem={({ item, index }) => {
                  return (
                    <CourtCard
                      key={index}
                      imagePath={item.courts[0]?.imagePath}
                      locationName={item?.locationName}
                      locationAddress={item?.locationAddress}
                      minRate={item?.minRate}
                      maxRate={item?.maxRate}
                      onPressCard={() => onPressCourtCard(item)}
                      isVerified={
                        approvedMembership && approvedMembership?.length > 0
                          ? approvedMembership.some(
                              mem => mem.locationID === item?.locationID,
                            )
                          : false
                      }
                      distance={
                        location &&
                        Utils.getUserDistance(
                          location?.latitude,
                          location?.longitude,
                          item?.lat,
                          item?.long,
                        )
                      }
                    />
                  );
                }}
              />
            </View>
          )
        )}
        {loadingCoachs ? (
          <HomeDateSK />
        ) : (
          coachs && (
            <View>
              <HeaderWithTitleandSeeAll
                title="Coaches"
                onPressLeft={gotoCoach}
              />
              <FlatList
                contentContainerStyle={{
                  paddingHorizontal: moderateScale(15, 0.3),
                  paddingVertical: moderateScale(10, 0.3),
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
                data={coachs}
                renderItem={({ item, index }) => (
                  <CoachCard
                    key={index}
                    imagePath={item?.stakeholder?.imagePath}
                    tire={item?.coachCategory?.coachCategory}
                    stakeholderName={item?.stakeholder?.stakeholderName}
                    about={item?.about}
                    onPressCard={() => onPressCouchCard(item)}
                    experience={item?.experienceYears}
                  />
                )}
              />
            </View>
          )
        )}
      </ScrollView>
    </AppContainer>
  );
}

export default memo(Home);

const styles = StyleSheet.create({});
