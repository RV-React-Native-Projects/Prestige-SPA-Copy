import React, { memo, useRef, useState } from "react";
import {
  Dimensions,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@navigation/Navigation";
import BackButton from "@components/Header/BackButton";
import Swiper from "react-native-swiper";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import FastImage from "react-native-fast-image";
import _ from "lodash";
import AppText from "@src/components/Text/AppText";
import I18n from "i18n-js";
import MapView, { Marker } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Utils from "@common/Utils";
import FloatingBottomButton from "@src/screen-components/Floating/FloatingBottomButton";
import FamilyModal from "@src/screen-components/Modal/FamilyModal";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function CourtDetail(props: any) {
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const { approvedMembership, location } = useAppSelector(state => state.user);
  const { isFamilyMemberBooking, isMembership } = useAppSelector(
    state => state.appData,
  );
  const navigation = useAppNavigation();
  const _map = useRef(null);

  const [showPicker, setshowPicker] = useState<boolean>(false);
  // const [isVerified, setIsVerified] = useState<boolean>(true);

  const toggleModal = () => {
    setshowPicker(!showPicker);
  };

  const isVerified =
    isMembership && approvedMembership && approvedMembership.length > 0
      ? _.some(approvedMembership, mem => mem.locationID === data.locationID)
      : false;

  const onPressNext = (familyID: string | null) => {
    navigation.navigate("CourtSlot", {
      data: data,
      familyID: familyID,
      isVerified: isVerified,
    });
  };

  const openMap = async () => {
    if (data?.lat && data?.long) {
      const URL = Utils.getMapLink(data?.lat, data?.long, data?.locationName);
      const canOpen = await Linking.canOpenURL(URL ?? "");
      if (URL && canOpen) Linking.openURL(URL);
    }
  };

  // console.log(JSON.stringify(data, null, 2));

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <FamilyModal
        show={showPicker}
        toggleModal={toggleModal}
        onPressNext={val => {
          // setFamilyID(val);
          onPressNext(val);
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: moderateScale(150, 0.3) }}>
        <View style={{ height: moderateScale(windowHeight / 3, 0.3) }}>
          <Swiper
            style={styles.wrapper}
            height={moderateScale(windowHeight / 3, 0.3)}
            dot={
              <View
                style={{
                  backgroundColor: theme.gray,
                  width: moderateScale(5, 0.3),
                  height: moderateScale(5, 0.3),
                  borderRadius: moderateScale(4, 0.3),
                  margin: moderateScale(2, 0.3),
                }}
              />
            }
            activeDot={
              <View
                style={{
                  backgroundColor: theme.secondary,
                  width: moderateScale(8, 0.3),
                  height: moderateScale(8, 0.3),
                  borderRadius: moderateScale(4, 0.3),
                  margin: moderateScale(2, 0.3),
                }}
              />
            }
            paginationStyle={{
              bottom: moderateScale(-20, 0.3),
              left: null,
              right: moderateScale(10, 0.3),
            }}
            loop>
            {_.map(data?.courts, (court, index) => (
              <FastImage
                key={index}
                style={[
                  styles.slide,
                  { height: moderateScale(300, 0.3), width: "auto" },
                ]}
                defaultSource={images.Placeholder}
                source={{
                  uri: `https://nodejsclusters-160185-0.cloudclusters.net/${court?.imagePath}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ))}
          </Swiper>
        </View>
        <VerticalSpacing size={20} />
        <View style={{ paddingHorizontal: moderateScale(15, 0.3) }}>
          <AppText fontStyle="700.bold" size={18}>
            {data?.locationName}
          </AppText>
          <VerticalSpacing />
          {isVerified ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}>
              <MaterialIcons
                name="verified"
                size={Math.ceil(moderateScale(20, 0.3))}
                color={theme.secondary}
              />
              <AppText
                style={{ marginLeft: moderateScale(5, 0.3) }}
                fontStyle="600.bold"
                color={theme.paragraph}>
                {I18n.t("screen_messages.Verified")}
              </AppText>
            </View>
          ) : (
            <AppText fontStyle="600.semibold" color={theme.primary}>
              {I18n.t("screen_messages.min_max_rate", {
                min: data?.minRate,
                max: data?.maxRate,
              })}
            </AppText>
          )}
          <VerticalSpacing size={5} />
          <View style={{}}>
            {location && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="location-pin"
                  size={Math.ceil(moderateScale(20, 0.3))}
                  color={theme.secondary}
                />

                <AppText
                  style={{ marginLeft: moderateScale(3, 0.3) }}
                  numberOfLines={1}
                  color={theme.paragraph}
                  fontStyle="500.normal">
                  {I18n.t("screen_messages.distance", {
                    distance:
                      location &&
                      Utils.getUserDistance(
                        location?.latitude,
                        location?.longitude,
                        data?.lat,
                        data?.long,
                      ).toLocaleString(),
                  })}
                </AppText>
              </View>
            )}
            <AppText
              style={{
                marginTop: moderateScale(5, 0.3),
                marginLeft: moderateScale(22, 0.3),
                maxWidth: "90%",
              }}
              numberOfLines={2}
              fontStyle="400.normal"
              color={theme.paragraph}>
              {data?.locationAddress}
            </AppText>
          </View>
          <VerticalSpacing size={20} />
          <AppText fontStyle="600.semibold" size={16}>
            {I18n.t("screen_messages.Directions")}
          </AppText>
          <VerticalSpacing size={15} />
          <Pressable
            onPress={openMap}
            style={{
              height: moderateScale(windowHeight / 4, 0.3),
              borderRadius: moderateScale(10, 0.3),
            }}>
            <MapView
              ref={_map}
              mapType="terrain"
              style={[
                styles.map,
                {
                  height: Math.ceil(moderateScale(windowHeight / 4, 0.3)),
                  borderRadius: moderateScale(10, 0.3),
                },
              ]}
              scrollEnabled={false}
              zoomEnabled={false}
              minZoomLevel={15}
              region={{
                latitude: data?.lat,
                longitude: data?.long,
                latitudeDelta: 0.1,
                longitudeDelta: 0.04,
              }}>
              <Marker
                draggable={false}
                coordinate={{
                  latitude: data?.lat,
                  longitude: data?.long,
                }}>
                <svgs.MapCustomIcon width={60} height={60} />
              </Marker>
            </MapView>
          </Pressable>
          <VerticalSpacing size={15} />
        </View>
      </ScrollView>
      <FloatingBottomButton
        onPress={() =>
          isFamilyMemberBooking ? toggleModal() : onPressNext(null)
        }
      />
    </AppContainer>
  );
}

export default memo(CourtDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
  },

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },

  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },

  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },

  image: {
    width: "auto",
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
