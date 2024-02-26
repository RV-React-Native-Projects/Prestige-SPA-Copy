import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import {
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import AppText from "@components/Text/AppText";
import I18n from "i18n-js";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-crop-picker";
import Permissions from "@helpers/Permissions";
import { moderateScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import DeviceInfo from "react-native-device-info";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

interface Props {
  modalHeight?: number;
  modalWidth?: number;
  animationInTiming?: number;
  animationOutTiming?: number;
  avoidKeyboard?: boolean;
  toBottom?: boolean;
  backgroundColor?: string;
  showHeader?: boolean;
  content?: React.ReactNode;
  getImages?: (images: any) => void;
  allowMultiSelection?: boolean;
  lightShadow?: boolean;
}

const isIOS = Platform.OS === "ios";
const isTab = DeviceInfo.isTablet();

const ProfilePicker: React.FC<Props> = props => {
  const { theme } = useAppSelector(state => state.theme);

  const {
    modalHeight = 270,
    modalWidth = windowWidth,
    animationInTiming = 200,
    animationOutTiming = 300,
    avoidKeyboard = true,
    toBottom = true,
    backgroundColor = theme.appBackgroundColor,
    showHeader = false,
    content,
    getImages,
    allowMultiSelection = false,
    lightShadow = false,
  } = props || {};

  const [pickedImage, setPickedImage] = useState<any | null>(null);
  const [showPicker, setshowPicker] = useState<boolean>(false);

  const toggleModal = () => {
    setshowPicker(!showPicker);
  };

  useEffect(() => {
    if (getImages) getImages(pickedImage);
  }, [pickedImage]);

  const openCamera = async () => {
    const hasCameraPermission = await Permissions.getCameraPermissions();
    if (hasCameraPermission) {
      ImagePicker.openCamera({
        width: 720,
        height: 720,
        cropping: true,
        // cropperCircleOverlay: true,
        showCropFrame: true,
        mediaType: "photo",
        compressImageQuality: isIOS ? 0.1 : 0.5,
        useFrontCamera: true,
        multiple: allowMultiSelection,
        // includeBase64: true,
      }).then(image => {
        // console.log(image);
        toggleModal();
        image && setPickedImage(image);
      });
    }
  };

  const openGallery = async () => {
    const hasCameraPermission = await Permissions.getCameraPermissions();
    if (hasCameraPermission) {
      ImagePicker.openPicker({
        width: 720,
        height: 720,
        cropping: true,
        // cropperCircleOverlay: true,
        showCropFrame: true,
        mediaType: "photo",
        compressImageQuality: isIOS ? 0.1 : 0.5,
        multiple: allowMultiSelection,
        // includeBase64: true,
      }).then(image => {
        // console.log(image);
        toggleModal();
        image && setPickedImage(image);
      });
    }
  };

  return (
    <>
      <View
        style={{
          position: "relative",
          alignItems: "center",
          height: moderateScale(150, 0.3),
          width: moderateScale(150, 0.3),
          alignSelf: "center",
        }}>
        {pickedImage ? (
          <FastImage
            style={{
              height: "100%",
              width: "100%",
              borderRadius: moderateScale(200, 0.3),
              backgroundColor: theme.light,
              borderWidth: moderateScale(3, 0.3),
              borderColor: theme.secondary,
            }}
            source={{
              uri: pickedImage?.fileCopyUri ?? pickedImage?.path,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
            defaultSource={images.user}
          />
        ) : (
          <Image
            style={{
              height: "100%",
              width: "100%",
              borderRadius: moderateScale(200, 0.3),
              backgroundColor: theme.light,
              borderWidth: moderateScale(3, 0.3),
              borderColor: theme.secondary,
              objectFit: "contain",
            }}
            source={images.user}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleModal}
          style={{
            height: moderateScale(50, 0.3),
            width: moderateScale(50, 0.3),
            borderRadius: moderateScale(50, 0.3),
            backgroundColor: theme.modalBackgroundColor,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            bottom: 0,
            ...theme.mid_shadow,
          }}>
          <AntDesign
            name="camera"
            size={moderateScale(35, 0.3)}
            color={theme.iconColor}
          />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={showPicker}
        onBackdropPress={toggleModal}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        avoidKeyboard={avoidKeyboard}
        deviceHeight={moderateScale(windowHeight, 0.3)}
        deviceWidth={moderateScale(windowWidth, 0.3)}
        backdropOpacity={lightShadow ? 0.1 : 0.3}>
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              height: "auto",
              width: modalWidth,
              minHeight: modalHeight,
              alignSelf: "center",
              alignContent: "center",
              borderTopRightRadius: moderateScale(20, 0.3),
              borderTopLeftRadius: moderateScale(20, 0.3),
            },
            toBottom
              ? {
                  alignSelf: "center",
                  position: "absolute",
                  bottom: moderateScale(isTab ? -50 : -25, 0.3),
                }
              : null,
          ]}>
          {showHeader ? (
            <View style={styles.header}>
              <View style={styles.panelHeader}>
                <View style={styles.panelHandle} />
              </View>
            </View>
          ) : null}
          {content ?? (
            <View style={{ paddingHorizontal: moderateScale(20, 0.3) }}>
              <View style={{ alignItems: "center" }}>
                <AppText
                  fontStyle="500.bold"
                  size={18}
                  style={{ paddingVertical: moderateScale(15, 0.3) }}>
                  {I18n.t("screen_messages.upload")}
                </AppText>
              </View>
              <VerticalSpacing size={10} />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  activeOpacity={0.8}
                  onPress={openCamera}>
                  <View
                    style={{
                      height: moderateScale(100, 0.3),
                      width: moderateScale(100, 0.3),
                      borderRadius: moderateScale(100, 0.3),
                      backgroundColor: theme.modalBackgroundColor,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: moderateScale(10, 0.3),
                      ...theme.light_shadow,
                    }}>
                    <AntDesign
                      name="camera"
                      size={50}
                      color={theme.iconColor}
                    />
                  </View>
                  <AppText fontStyle="500.medium" size={16}>
                    {I18n.t("screen_messages.button.camera")}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  activeOpacity={0.8}
                  onPress={openGallery}>
                  <View
                    style={{
                      height: moderateScale(100, 0.3),
                      width: moderateScale(100, 0.3),
                      borderRadius: moderateScale(100, 0.3),
                      backgroundColor: theme.modalBackgroundColor,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: moderateScale(10, 0.3),
                      ...theme.light_shadow,
                    }}>
                    <FontAwesome
                      name="photo"
                      size={50}
                      color={theme.iconColor}
                    />
                  </View>
                  <AppText fontStyle="500.medium" size={16}>
                    {I18n.t("screen_messages.button.gallery")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <VerticalSpacing size={isTab ? 40 : 20} />
        </View>
      </Modal>
    </>
  );
};

export default memo(ProfilePicker);

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: moderateScale(20, 0.3),
    borderTopLeftRadius: moderateScale(20, 0.3),
    borderTopRightRadius: moderateScale(20, 0.3),
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: moderateScale(40, 0.3),
    height: moderateScale(8, 0.3),
    borderRadius: moderateScale(4, 0.3),
    backgroundColor: "#00000040",
    marginBottom: moderateScale(15, 0.3),
  },
});
