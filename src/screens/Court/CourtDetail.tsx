import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
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
import _, { toString } from "lodash";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import * as Animatable from "react-native-animatable";
import I18n from "i18n-js";
import MapView, { Marker } from "react-native-maps";
import RBSheet from "react-native-raw-bottom-sheet";
import { RadioButton } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;

function CourtDetail(props: any) {
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const { user, family, approvedMembership } = useAppSelector(
    state => state.user,
  );
  const navigation = useAppNavigation();
  const _map = useRef(null);
  const refRBSheet = useRef<RBSheet>(null);
  const [familyID, setFamilyID] = useState<string | null>(null);

  const isVerified =
    approvedMembership && approvedMembership?.length > 0
      ? approvedMembership.some(mem => mem.locationID === data.locationID)
      : false;

  const onPressNext = (data: any) => {
    navigation.navigate("CourtSlot", {
      data: data,
      familyID: familyID,
      isVerified: isVerified,
    });
  };

  function onPressAddFamily() {
    refRBSheet.current?.close();
    navigation.navigate("AddFamily", { data: null });
  }

  // console.log(JSON.stringify(isVerified, null, 2));

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
        contentContainerStyle={{ paddingBottom: moderateScale(100, 0.3) }}>
        <View style={{ height: moderateScale(300, 0.3) }}>
          <Swiper
            style={styles.wrapper}
            height={moderateScale(300, 0.3)}
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
          {isVerified ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: moderateScale(5, 0.3),
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
            <AppText fontStyle="600.semibold" size={16} color={theme.primary}>
              {I18n.t("screen_messages.price", { price: data?.minRate })} -{" "}
              {I18n.t("screen_messages.price", { price: data?.maxRate })}
            </AppText>
          )}
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
                {I18n.t("screen_messages.distance", { distance: 5.4 })}
              </AppText>
            </View>
            <AppText
              style={{
                height: moderateScale(40, 0.3),
                marginTop: moderateScale(5, 0.3),
                marginLeft: moderateScale(25, 0.3),
                maxWidth: "90%",
              }}
              numberOfLines={2}
              fontStyle="500.semibold"
              color={theme.gray}>
              {data?.locationAddress}
            </AppText>
          </View>
          <AppText fontStyle="600.semibold" size={16}>
            {I18n.t("screen_messages.Directions")}
          </AppText>
          <VerticalSpacing size={15} />
          <View style={{ height: moderateScale(300, 0.3) }}>
            <MapView
              ref={_map}
              mapType="standard"
              style={[
                styles.map,
                {
                  height: 300,
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
          </View>
          <VerticalSpacing size={15} />
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={moderateScale(windowHeight / 1.3, 0.3)}
          customStyles={{
            container: {
              backgroundColor: theme.appBackgroundColor,
              borderTopLeftRadius: moderateScale(15, 0.3),
              borderTopRightRadius: moderateScale(15, 0.3),
            },
            draggableIcon: {
              width: moderateScale(110, 0.3),
              marginTop: moderateScale(15, 0.3),
            },
          }}
          animationType="fade"
          closeOnPressBack={true}
          keyboardAvoidingViewEnabled={true}
          dragFromTopOnly={true}>
          <View style={{ flex: 1, marginTop: moderateScale(10, 0.3) }}>
            <AppText
              style={{ paddingHorizontal: moderateScale(15, 0.3) }}
              fontStyle="600.semibold"
              size={18}>
              {I18n.t("screen_messages.header.Booking_For")}
            </AppText>
            <VerticalSpacing />
            <ScrollView
              style={{
                height: "100%",
                paddingHorizontal: moderateScale(15, 0.3),
              }}
              contentContainerStyle={{
                paddingTop: moderateScale(20, 0.3),
                paddingBottom: moderateScale(50, 0.3),
              }}>
              <TouchableOpacity
                // key={index}
                activeOpacity={0.9}
                onPress={() => setFamilyID(null)}
                // disabled={!item?.courtID}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: moderateScale(10, 0.3),
                  paddingVertical: moderateScale(15, 0.3),
                  backgroundColor: theme.modalBackgroundColor,
                  marginBottom: moderateScale(10, 0.3),
                  borderRadius: moderateScale(10, 0.3),
                  ...theme.light_shadow,
                }}>
                <RadioButton.Android
                  onPress={() => setFamilyID(null)}
                  value={""}
                  status={!!familyID ? "unchecked" : "checked"}
                  color={theme.secondary}
                />
                {user?.imagePath ? (
                  <FastImage
                    style={{
                      height: moderateScale(50, 0.3),
                      width: moderateScale(50, 0.3),
                      borderRadius: moderateScale(200, 0.3),
                      backgroundColor: theme.light,
                    }}
                    source={{
                      uri: `https://nodejsclusters-160185-0.cloudclusters.net/${user?.imagePath}`,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    defaultSource={images.user}
                  />
                ) : (
                  <Image
                    source={images.user}
                    style={{
                      height: moderateScale(50, 0.3),
                      width: moderateScale(50, 0.3),
                      borderRadius: moderateScale(200, 0.3),
                      backgroundColor: theme.light,
                      objectFit: "cover",
                    }}
                  />
                )}
                <View style={{ marginLeft: 10, width: "100%" }}>
                  <AppText
                    style={{ maxWidth: "75%" }}
                    numberOfLines={1}
                    size={16}
                    fontStyle="500.bold">
                    {user?.stakeholderName}
                  </AppText>
                  <VerticalSpacing size={5} />
                  <AppText fontStyle="400.normal">
                    {I18n.t("screen_messages.Myself")}
                  </AppText>
                </View>
              </TouchableOpacity>
              <VerticalSpacing size={20} />
              <AppText fontStyle="400.normal">
                {I18n.t("screen_messages.book_on_behalf")}
              </AppText>
              <VerticalSpacing size={20} />
              <RadioButton.Group
                onValueChange={newValue => setFamilyID(toString(newValue))}
                value={toString(familyID)}>
                {_.map(family, (item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.9}
                      onPress={() => {
                        setFamilyID(toString(item?.familyMemberID));
                      }}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: moderateScale(10, 0.3),
                        paddingVertical: moderateScale(15, 0.3),
                        backgroundColor: theme.modalBackgroundColor,
                        marginBottom: moderateScale(10, 0.3),
                        borderRadius: moderateScale(10, 0.3),
                        ...theme.light_shadow,
                      }}>
                      <RadioButton.Android
                        // disabled={!item?.available}
                        value={toString(item.familyMemberID)}
                        color={theme.secondary}
                      />
                      {item?.imagePath ? (
                        <FastImage
                          style={{
                            height: moderateScale(50, 0.3),
                            width: moderateScale(50, 0.3),
                            borderRadius: moderateScale(200, 0.3),
                            backgroundColor: theme.light,
                          }}
                          source={{
                            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${item?.imagePath}`,
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                          defaultSource={images.user}
                        />
                      ) : (
                        <Image
                          source={images.user}
                          style={{
                            height: moderateScale(50, 0.3),
                            width: moderateScale(50, 0.3),
                            borderRadius: moderateScale(200, 0.3),
                            backgroundColor: theme.light,
                            objectFit: "cover",
                          }}
                        />
                      )}
                      <View
                        key={index}
                        style={{
                          marginLeft: moderateScale(10, 0.3),
                          width: "100%",
                        }}>
                        <AppText
                          style={{ maxWidth: "75%" }}
                          numberOfLines={1}
                          size={16}
                          fontStyle="500.bold">
                          {item?.name}
                        </AppText>
                        <VerticalSpacing size={5} />
                        <AppText fontStyle="400.normal">
                          {item?.relationship}
                        </AppText>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </RadioButton.Group>
              <AppButton
                Title={I18n.t("screen_messages.button.Add_Family")}
                color={theme.title}
                // loading={loading}
                Outlined
                fontStyle="600.semibold"
                fontSize={16}
                height={50}
                onPress={onPressAddFamily}
                leftIcon={
                  <Feather name="plus" size={30} color={theme.iconColor} />
                }
              />
            </ScrollView>
            <Animatable.View
              animation="fadeInUp"
              duration={500}
              style={{
                backgroundColor: theme.modalBackgroundColor,
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
          </View>
        </RBSheet>
      </ScrollView>
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={{
          backgroundColor: theme.modalBackgroundColor,
          padding: moderateScale(20, 0.3),
        }}>
        <AppButton
          Title={I18n.t("screen_messages.button.next")}
          color={theme.primary}
          fontStyle="600.normal"
          fontSize={16}
          height={50}
          onPress={() => {
            // refRBSheet.current?.open();
            onPressNext(data);
          }}
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
