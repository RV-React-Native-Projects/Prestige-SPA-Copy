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
import AppButton from "@components/Button/AppButton";
import svgs from "@common/AllSvgs";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ImagePicker from "react-native-image-crop-picker";
import Permissions from "@helpers/Permissions";
import { moderateScale } from "react-native-size-matters";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";

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
          height: 150,
          width: 150,
          alignSelf: "center",
        }}>
        {pickedImage ? (
          <FastImage
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 200,
              backgroundColor: theme.light,
              borderWidth: 3,
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
              borderRadius: 200,
              backgroundColor: theme.light,
              borderWidth: 3,
              borderColor: theme.secondary,
              objectFit: "cover",
            }}
            source={images.user}
          />
        )}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={toggleModal}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: theme.modalBackgroundColor,
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            right: 0,
            bottom: 0,
            ...theme.mid_shadow,
          }}>
          <AntDesign name="camera" size={35} color={theme.iconColor} />
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
        deviceHeight={windowHeight}
        deviceWidth={windowWidth}
        backdropOpacity={lightShadow ? 0.1 : 0.3}>
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              height: modalHeight,
              width: modalWidth,
              minHeight: modalHeight,
              alignSelf: "center",
              alignContent: "center",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            },
            toBottom
              ? { alignSelf: "center", position: "absolute", bottom: -25 }
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
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ alignItems: "center" }}>
                <AppText
                  fontStyle="500.normal"
                  size={18}
                  style={{ paddingVertical: 15 }}>
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
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      backgroundColor: theme.light,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}>
                    <AntDesign name="camera" size={50} />
                  </View>
                  <AppText fontStyle="500.normal" size={16}>
                    {I18n.t("screen_messages.button.camera")}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  activeOpacity={0.8}
                  onPress={openGallery}>
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      backgroundColor: theme.light,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}>
                    <FontAwesome name="photo" size={50} />
                  </View>
                  <AppText fontStyle="500.normal" size={16}>
                    {I18n.t("screen_messages.button.gallery")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 15,
  },
});
