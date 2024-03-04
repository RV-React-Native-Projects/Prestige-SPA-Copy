import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "@src/redux/store";
// import svgs from "@common/AllSvgs";
import AppText from "@components/Text/AppText";
import I18n from "i18n-js";
import images from "@src/common/AllImages";
import FastImage from "react-native-fast-image";
import { moderateScale } from "react-native-size-matters";
import { useAppNavigation } from "@src/navigation/Navigation";
import Geocoder from "react-native-geocoding";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DeviceInfo from "react-native-device-info";

const isTab = DeviceInfo.isTablet();

export default function HomeHeader() {
  const { theme } = useAppSelector(state => state.theme);
  const { user, location } = useAppSelector(state => state.user);
  const navigation = useAppNavigation();
  const [currAddr, setCurrAddr] = useState<string | null>(null);

  useEffect(() => {
    if (location) {
      Geocoder.init("AIzaSyB8lC76Arjr09WP2d4h01xJ8-plROGm4vk", {
        language: "en",
      });
      Geocoder.from(location.latitude, location.longitude)
        .then(res => {
          // console.log("Address=====>", JSON.stringify(res, null, 2));
          setCurrAddr(res.results[0].formatted_address);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [location]);

  const gotoProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View
      style={{
        backgroundColor: theme.modalBackgroundColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        width: "100%",
      }}>
      <TouchableOpacity activeOpacity={0.8} style={{ maxWidth: "50%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}>
          <MaterialIcons
            name="location-pin"
            size={Math.ceil(moderateScale(20, 0.3))}
            color={theme.secondary}
          />
          <AppText
            fontStyle="600.semibold"
            size={14}
            style={{ marginHorizontal: 5 }}>
            Current
          </AppText>
          {/* <svgs.Down height={15} width={15} color1={theme.iconColor} /> */}
        </View>
        <AppText
          fontStyle="400.normal"
          size={14}
          style={{
            paddingHorizontal: 10,
            padding: 5,
            width: "90%",
          }}
          numberOfLines={1}>
          {currAddr}
          {/* Your Current Address */}
        </AppText>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        {/* @RV === Not required for Now=== */}
        {/* <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Wishlist />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={{ padding: 5 }}>
          <svgs.Bell />
        </TouchableOpacity> */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ padding: 5 }}
          onPress={gotoProfile}>
          <FastImage
            style={{
              height: moderateScale(45, 0.3),
              width: moderateScale(45, 0.3),
              borderRadius: moderateScale(45, 0.3),
              borderWidth: moderateScale(1, 0.3),
              borderColor: theme.secondary,
            }}
            defaultSource={images.user}
            source={{
              uri: `https://nodejsclusters-160185-0.cloudclusters.net/${user?.imagePath}`,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
