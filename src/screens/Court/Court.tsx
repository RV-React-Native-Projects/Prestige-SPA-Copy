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
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import AppText from "@components/Text/AppText";
import FastImage from "react-native-fast-image";
import images from "@common/AllImages";
import svgs from "@common/AllSvgs";
import { loadAllLocations } from "@reducers/AppDataSlice";
import I18n from "i18n-js";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Utils from "@common/Utils";

interface CourtCardProps {
  onPress: () => void;
  isVerified: boolean;
  distance: number | null;
  imagePath: string;
  minRate: number;
  maxRate: number;
  locationName: string;
  locationAddress: string;
}

const CourtCard = (props: CourtCardProps) => {
  const { theme } = useAppSelector(state => state.theme);

  const {
    onPress,
    isVerified = false,
    distance,
    imagePath,
    minRate,
    maxRate,
    locationName,
    locationAddress,
  } = props;

  return (
    <View
      style={{
        padding: moderateScale(10, 0.3),
        width: "100%",
        marginRight: moderateScale(15, 0.3),
        borderRadius: moderateScale(10, 0.3),
        position: "relative",
        backgroundColor: theme.modalBackgroundColor,
        ...theme.mid_shadow,
      }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{ flexDirection: "row", width: "100%", overflow: "hidden" }}>
        <FastImage
          style={{
            height: moderateScale(110, 0.3),
            width: moderateScale(120, 0.3),
            borderRadius: moderateScale(5, 0.3),
          }}
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${imagePath}`,
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.cover}
          defaultSource={images.Placeholder}
        />
        <View
          style={{
            marginLeft: moderateScale(10, 0.3),
            width: "100%",
            justifyContent: "space-between",
          }}>
          <AppText
            style={{ maxWidth: "63%" }}
            fontStyle="600.bold"
            size={16}
            numberOfLines={1}>
            {locationName}
          </AppText>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <svgs.LocationV2 color1={theme.secondary} height={20} />
              <AppText fontStyle="400.bold" color={theme.paragraph}>
                {I18n.t("screen_messages.distance", {
                  distance: distance?.toLocaleString(),
                })}
              </AppText>
            </View>
            <AppText
              style={{
                marginTop: moderateScale(5, 0.3),
                maxWidth: "62%",
              }}
              fontStyle="400.bold"
              numberOfLines={2}
              color={theme.paragraph}>
              {locationAddress}
            </AppText>
          </View>
          {isVerified ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <MaterialIcons
                name="verified"
                size={20}
                color={theme.secondary}
              />
              <AppText
                style={{ marginLeft: moderateScale(5, 0.3) }}
                fontStyle="600.bold">
                {I18n.t("screen_messages.Verified")}
              </AppText>
            </View>
          ) : (
            <AppText
              fontStyle="700.semibold"
              numberOfLines={1}
              color={theme.primary}>
              {I18n.t("screen_messages.price", { price: minRate })} -{" "}
              {I18n.t("screen_messages.price", { price: maxRate })}
            </AppText>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

function CourtScreen() {
  const { theme } = useAppSelector(state => state.theme);
  const { approvedMembership, location } = useAppSelector(state => state.user);
  const { locations, loadingLocations } = useAppSelector(
    state => state.appData,
  );
  const navigation = useAppNavigation();
  const storeDispatch = useAppDispatch();
  const scrollCourtRef = useRef<FlatList>(null);

  const gotoCourt = (data: any) => {
    navigation.navigate("CourtDetail", { data });
  };

  const onRefresh = useCallback(() => {
    storeDispatch(loadAllLocations());
  }, []);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <FlatList
        ref={scrollCourtRef}
        refreshControl={
          <RefreshControl
            colors={[theme.secondary]}
            tintColor={theme.title}
            refreshing={loadingLocations}
            onRefresh={onRefresh}
          />
        }
        data={locations}
        renderItem={({ item, index }) => (
          <CourtCard
            key={index}
            onPress={() => gotoCourt(item)}
            distance={
              location &&
              Utils.getUserDistance(
                location?.latitude,
                location?.longitude,
                item?.lat,
                item?.long,
              )
            }
            isVerified={
              approvedMembership && approvedMembership?.length > 0
                ? approvedMembership.some(
                    mem => mem.locationID === item?.locationID,
                  )
                : false
            }
            imagePath={item.courts[0]?.imagePath}
            locationName={item?.locationName}
            locationAddress={item?.locationAddress}
            minRate={item?.minRate}
            maxRate={item?.maxRate}
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

export default CourtScreen;

const styles = StyleSheet.create({});
