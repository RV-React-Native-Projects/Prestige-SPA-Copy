import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppContainer from "@components/Container/AppContainer";
import { useAppSelector } from "@redux/store";
import { Searchbar } from "react-native-paper";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import { LettingData } from "@constants/LettingData";
import PropertyCard from "@cards/Property/PropertyCard";
import { useAppNavigation } from "@navigation/Navigation";
import BackButton from "@components/Header/BackButton";
import Swiper from "react-native-swiper";
import images from "@src/common/AllImages";
import svgs from "@src/common/AllSvgs";
import FastImage from "react-native-fast-image";
import _ from "lodash";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import * as Animatable from "react-native-animatable";
import I18n from "i18n-js";
import MapView, { Marker } from "react-native-maps";

const isIOS = Platform.OS === "ios";

function CourtDetail(props: any) {
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useAppNavigation();
  const _map = useRef(null);

  const onPressNext = (data: any) => {
    navigation.navigate("CourtSlot", { data: data });
  };

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <ScrollView
        style={{
          flex: 1,
          minHeight: isIOS ? "100%" : "auto",
        }}
        contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={{ height: 300 }}>
          <Swiper
            style={styles.wrapper}
            height={320}
            dot={
              <View
                style={{
                  backgroundColor: theme.gray,
                  width: moderateScale(5, 0.3),
                  height: moderateScale(5, 0.3),
                  borderRadius: moderateScale(4, 0.3),
                  marginLeft: moderateScale(3, 0.3),
                  marginRight: moderateScale(3, 0.3),
                  marginTop: moderateScale(3, 0.3),
                  marginBottom: moderateScale(3, 0.3),
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
                  marginLeft: moderateScale(3, 0.3),
                  marginRight: moderateScale(3, 0.3),
                  marginTop: moderateScale(3, 0.3),
                  marginBottom: moderateScale(3, 0.3),
                }}
              />
            }
            paginationStyle={{
              bottom: moderateScale(-23, 0.3),
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
          <AppText fontStyle="700.bold" size={20}>
            {data?.locationName}
          </AppText>
          <VerticalSpacing />
          <AppText fontStyle="600.semibold" size={16} color={theme.primary}>
            AED {data?.minRate} - AED {data?.maxRate}
          </AppText>
          <VerticalSpacing />
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                height: moderateScale(20, 0.3),
                marginLeft: moderateScale(-8, 0.3),
              }}>
              <svgs.LocationV2
                color1={theme.secondary}
                height={20}
                width={30}
              />
              <AppText
                numberOfLines={2}
                color={theme.gray}
                fontStyle="500.semibold">
                5.4 KM
              </AppText>
            </View>
            <AppText
              style={{
                height: 40,
                marginTop: 5,
                marginLeft: 25,
                maxWidth: "90%",
              }}
              numberOfLines={2}
              fontStyle="500.semibold"
              color={theme.gray}>
              {data?.locationAddress}
            </AppText>
          </View>
          <AppText fontStyle="600.semibold" size={16}>
            Directions
          </AppText>
          <VerticalSpacing size={15} />
          <View style={{ height: 300 }}>
            <MapView
              ref={_map}
              mapType="standard"
              style={[styles.map, { height: 300, borderRadius: 10 }]}
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
          </View>
          <VerticalSpacing size={15} />
        </View>
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.white,
          padding: moderateScale(20, 0.3),
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.next")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() => onPressNext(data)}
        />
      </Animatable.View>
    </AppContainer>
  );
}

export default CourtDetail;

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
