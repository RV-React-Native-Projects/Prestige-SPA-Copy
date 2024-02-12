import React, { memo, useEffect, useState } from "react";
import { useAppSelector } from "@redux/store";
import {
  Dimensions,
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
import DocumentPicker, {
  DocumentPickerResponse,
  types,
} from "react-native-document-picker";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;

interface Props {
  visible: boolean;
  toggleModal: () => void;
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
  multiImages?: boolean;
  dismissAfterOneSelect?: boolean;
  onlyImages?: boolean;
  allowMultiSelection?: boolean;
  lightShadow?: boolean;
}

const isIOS = Platform.OS === "ios";

const DocPicker: React.FC<Props> = props => {
  const { theme } = useAppSelector(state => state.theme);
  const {
    visible = false,
    toggleModal,
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
    multiImages = true,
    dismissAfterOneSelect = false,
    onlyImages = false,
    allowMultiSelection = false,
    lightShadow = false,
  } = props || {};

  const [images, setImages] = useState<DocumentPickerResponse | any | null>(
    null,
  );

  useEffect(() => {
    if (getImages) getImages(images);
  }, [images]);

  const openCamera = async () => {
    const hasCameraPermission = await Permissions.getCameraPermissions();
    if (hasCameraPermission) {
      ImagePicker.openCamera({
        width: 950,
        height: 1800,
        cropping: false,
        compressImageQuality: isIOS ? 0.1 : 0.5,
        multiple: false,
      }).then(image => {
        // console.log(image);
        toggleModal();
        image && setImages(image);
      });
    }
  };

  const openGallery = async () => {
    const openPicker = () => {
      DocumentPicker.pick({
        type: onlyImages
          ? [types.images]
          : [
              types.csv,
              types.doc,
              types.docx,
              types.images,
              types.pdf,
              types.plainText,
              types.xls,
              types.xlsx,
            ],
        copyTo: "cachesDirectory",
        allowMultiSelection: allowMultiSelection,
        // IOS settings
        mode: "import",
        transitionStyle: "coverVertical", // 'coverVertical' | 'flipHorizontal' | 'crossDissolve' | 'partialCurl'
        presentationStyle: "fullScreen",
      })
        .then(image => {
          // console.log("choosePhotoFromLibrary==>", image);
          toggleModal();
          setImages(image);
        })
        .catch(err => console.log(err));
    };

    const hasStoragePermission =
      await Permissions.requestReadExternalStoragePermission();

    if (isIOS) {
      openPicker();
    } else if (hasStoragePermission) openPicker();
  };

  const removeImage = (id: string) => {
    const filterImages = images.filter(
      (image: any) => image.fileCopyUri !== id,
    );
    if (filterImages?.length > 0) setImages(filterImages);
    else setImages(null);
  };

  return (
    <>
      {images && (
        <View
          style={{
            marginHorizontal: 15,
            padding: 15,
            paddingVertical: 20,
            backgroundColor: theme.appBackgroundColor,
            borderRadius: 10,
            borderWidth: 0.4,
            borderColor: theme.gray,
          }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <svgs.Document />
            <AppText
              numberOfLines={1}
              style={{ width: "80%", maxWidth: "80%", marginLeft: 10 }}>
              {images[0]?.name}
            </AppText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              {/* <TouchableOpacity
                  activeOpacity={0.8}
                  style={{ marginRight: 5 }}>
                  <AntDesign name="edit" size={20} />
                </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ marginRight: 5 }}
                onPress={() => removeImage(images[0]?.fileCopyUri)}>
                <AntDesign name="delete" size={20} color={theme.error} />
              </TouchableOpacity>
            </View>
          </View>
          <AppText
            numberOfLines={1}
            color={theme.primary}
            style={{ marginVertical: 5 }}
            fontStyle="500.normal">
            {Math.floor(images[0]?.size / 1000)} KB
          </AppText>
        </View>
      )}
      <Modal
        isVisible={visible}
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

export default memo(DocPicker);

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
