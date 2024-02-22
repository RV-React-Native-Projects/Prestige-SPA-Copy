import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import Modal from "react-native-modal";
import Utils from "@common/Utils";
import Ionicons from "react-native-vector-icons/Ionicons";

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function CourtDetail(props: any) {
  const { data } = props.route.params;
  const { theme } = useAppSelector(state => state.theme);
  const { user, family, approvedMembership, location } = useAppSelector(
    state => state.user,
  );
  const navigation = useAppNavigation();
  const _map = useRef(null);
  const refRBSheet = useRef<RBSheet>(null);
  const [familyID, setFamilyID] = useState<string | null>(null);
  const [showPicker, setshowPicker] = useState<boolean>(false);

  const toggleModal = () => {
    setshowPicker(!showPicker);
  };

  const isVerified =
    approvedMembership && approvedMembership?.length > 0
      ? approvedMembership.some(mem => mem.locationID === data.locationID)
      : false;

  const onPressNext = (data: any) => {
    // refRBSheet.current?.close();
    toggleModal();
    navigation.navigate("CourtSlot", {
      data: data,
      familyID: familyID,
      isVerified: isVerified,
    });
  };

  function onPressAddFamily() {
    // refRBSheet.current?.close();
    toggleModal();
    navigation.navigate("AddFamily", { data: null });
  }

  // console.log(JSON.stringify(data, null, 2));

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}
      fullHeight={false}>
      <BackButton />
      <Modal
        isVisible={showPicker}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={500}
        animationOutTiming={200}
        avoidKeyboard={true}
        deviceHeight={moderateScale(windowHeight, 0.3)}
        deviceWidth={moderateScale(windowWidth, 0.3)}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        swipeDirection={["down"]}
        onSwipeComplete={toggleModal}
        hideModalContentWhileAnimating
        propagateSwipe
        useNativeDriverForBackdrop>
        <View
          style={[
            {
              backgroundColor: theme.modalBackgroundColor,
              height: moderateScale(windowHeight / 1.3, 0.3),
              width: windowWidth,
              minHeight: moderateScale(windowHeight / 1.3, 0.3),
              alignSelf: "center",
              alignContent: "center",
              borderTopRightRadius: moderateScale(15, 0.3),
              borderTopLeftRadius: moderateScale(15, 0.3),
              position: "absolute",
              bottom: moderateScale(-25, 0.3),
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={toggleModal}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={{
              zIndex: 10,
              position: "absolute",
              top: moderateScale(-25, 0.3),
              alignSelf: "center",
              backgroundColor: theme.white,
              borderRadius: moderateScale(100, 0.3),
              height: moderateScale(50, 0.3),
              width: moderateScale(50, 0.3),
              alignItems: "center",
              justifyContent: "center",
            }}>
            <svgs.Clear height={40} width={40} color1={theme.error} />
          </TouchableOpacity>
          <VerticalSpacing size={30} />
          <AppText
            style={{ paddingHorizontal: moderateScale(15, 0.3), zIndex: 1 }}
            fontStyle="600.semibold"
            size={18}>
            {I18n.t("screen_messages.header.Booking_For")}
          </AppText>
          <VerticalSpacing />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              height: "100%",
            }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(15, 0.3),
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
              <View style={{ marginRight: moderateScale(5, 0.3) }}>
                {!familyID ? (
                  <Ionicons
                    name="radio-button-on"
                    color={theme.secondary}
                    size={25}
                  />
                ) : (
                  <Ionicons
                    name="radio-button-off"
                    color={theme.gray}
                    size={25}
                  />
                )}
              </View>
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
                    <View style={{ marginRight: moderateScale(5, 0.3) }}>
                      {toString(item.familyMemberID) === familyID ? (
                        <Ionicons
                          name="radio-button-on"
                          color={theme.secondary}
                          size={25}
                        />
                      ) : (
                        <Ionicons
                          name="radio-button-off"
                          color={theme.gray}
                          size={25}
                        />
                      )}
                    </View>
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
                      <AppText
                        style={{ textTransform: "capitalize" }}
                        fontStyle="400.normal">
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
              ...theme.dark_shadow,
            }}>
            <AppButton
              Title={I18n.t("screen_messages.button.next")}
              color={theme.primary}
              fontStyle="600.normal"
              fontSize={16}
              height={50}
              onPress={() => {
                toggleModal();
                onPressNext(data);
              }}
            />
          </Animatable.View>
        </View>
      </Modal>
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
          onPress={() => toggleModal()}
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
