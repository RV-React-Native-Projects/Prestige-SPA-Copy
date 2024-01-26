import React, { memo, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@src/services/features/Auth/AuthManager";
import { useAppNavigation } from "@src/navigation/Navigation";
import { appLogout, removeUserData } from "@reducers/UserSlice";
import AppContainer from "@components/Container/AppContainer";
import useAppToast from "@components/Alert/AppToast";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import HomeHeader from "@src/screen-components/Home/HomeHeader";
import { Card, Searchbar } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import svgs from "@common/AllSvgs";
import HeaderWithTitleandSeeAll from "@src/screen-components/Header/HeaderWithTitleandSeeAll";
import CourtManager from "@features/Court/CourtManager";

const CourtCard = (props: any) => {
  const { data } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: 180,
        marginRight: 15,
        borderRadius: 10,
      }}>
      <View>
        <Image
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data.courts[0]?.imagePath}`,
          }}
          style={{
            height: 150,
            width: "auto",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        <VerticalSpacing />
        <AppText
          style={{ height: 50 }}
          fontStyle="600.bold"
          size={16}
          numberOfLines={2}>
          {data?.locationName}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <svgs.Location color1={theme.secondary} height={20} />
          <AppText
            style={{ height: 50 }}
            fontStyle="600.bold"
            numberOfLines={2}
            color={theme.gray}>
            5.4 KM
          </AppText>
        </View>
        <AppText
          style={{ height: 40, marginTop: 5 }}
          fontStyle="400.bold"
          numberOfLines={2}
          color={theme.gray}>
          {data?.locationAddress}
        </AppText>
        <AppText
          style={{ marginTop: 5 }}
          fontStyle="700.semibold"
          numberOfLines={2}
          color={theme.primary}>
          AED {data?.minRate} - AED {data?.maxRate}
        </AppText>
      </View>
    </Card>
  );
};

const CoachCard = (props: any) => {
  const { data } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: 180,
        marginRight: 15,
        borderRadius: 10,
      }}>
      <View>
        <Image
          source={{
            uri: data?.stakeholder?.picturePathS3,
          }}
          style={{
            height: 150,
            width: "auto",
            objectFit: "cover",
            borderRadius: 200,
          }}
        />
        <VerticalSpacing />
        <View
          style={{
            backgroundColor:
              data?.coachCategoryID === 1 ? theme.primary : theme.tertiaryText,
            width: 80,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            marginVertical: 10,
          }}>
          <AppText
            style={{}}
            fontStyle="600.bold"
            size={14}
            color={theme.white}
            numberOfLines={2}>
            Tire {data?.coachCategoryID}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <AppText fontStyle="600.bold" size={16} numberOfLines={1}>
            {data?.stakeholder?.stakeholderName}
          </AppText>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <svgs.CoachV2 color1={theme.secondary} height={20} />
          <AppText
            fontStyle="400.bold"
            numberOfLines={2}
            color={theme.gray}
            style={{ paddingHorizontal: 15, height: 40 }}>
            Experienc of 4 Years
          </AppText>
        </View>
      </View>
    </Card>
  );
};

function Home() {
  const { authHeader, authToken, userToken } = useAppSelector(
    state => state.user,
  );
  const [courts, setCourts] = useState<any | null>(null);
  const [coachs, setCoachs] = useState<any | null>(null);
  const { theme } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const appToast = useAppToast();

  useEffect(() => {
    CourtManager.getAllCourts(
      {},
      res => {
        console.log("Court===>", JSON.stringify(res, null, 2));
        setCourts(res?.data?.data);
      },
      err => {
        console.log(err);
      },
    );
  }, [!courts]);

  useEffect(() => {
    CourtManager.getAllCoach(
      {},
      res => {
        console.log("Coach===>", JSON.stringify(res, null, 2));
        setCoachs(res?.data?.data);
      },
      err => {
        console.log(err);
      },
    );
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
            renderItem={({ item, index }) => <CourtCard data={item} />}
          />
        </View>
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
            renderItem={({ item, index }) => <CoachCard data={item} />}
          />
        </View>
      </ScrollView>
    </AppContainer>
  );
}

export default memo(Home);

const styles = StyleSheet.create({});
