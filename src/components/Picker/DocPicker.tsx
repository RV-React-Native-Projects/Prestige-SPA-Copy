import I18n from "i18n-js";
import React, { memo, useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import svgs from "@common/AllSvgs";
import AppButton from "@components/Button/AppButton";
import { VerticalSpacing } from "@components/Spacing/Spacing";
import AppText from "@components/Text/AppText";
import ImagePicker from "react-native-image-crop-picker";
import Permissions from "@helpers/Permissions";
import { moderateScale } from "react-native-size-matters";
import DocumentPicker, { types } from "react-native-document-picker";
import _ from "lodash";
// import DocDetails from "@components/DocDetails/DocDetails";
import { useAppSelector } from "@redux/store";

var windowHeight = Dimensions.get("window").height;
var windowWidth = Dimensions.get("window").width;
var isIOS = Platform.OS === "ios";

const DocPicker = (props: any) => {
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
    clearAfterSelection = false,
    hideDocs = false,
  } = props || {};

  const [image, setImage] = useState("");
  const [multi, setMulti] = useState([]);

  const setImages = (val: any) => {
    if (multiImages) {
      if (Array.isArray(val)) {
        setMulti([...val, ...multi]);
      } else setMulti([val, ...multi]);
    } else if (Array.isArray(val)) {
      setImage(val);
    } else setImage([val]);
    if (dismissAfterOneSelect) toggleModal();
  };

  const resetImages = () => {
    setMulti([]);
    setImage("");
  };

  useEffect(() => {
    if (getImages) {
      if (multiImages && multi?.length > 0) {
        // var allImgs = _.map(multi, (item, i) => {
        //   return { id: i, ...item };
        // });
        getImages(multi);
        if (
          clearAfterSelection &&
          (multi?.length > 0 || (image != "" && image != null))
        ) {
          resetImages();
        }
      } else if (image != "" || image != null) {
        getImages(image);
        if (
          clearAfterSelection &&
          (multi?.length > 0 || (image != "" && image != null))
        ) {
          resetImages();
        }
      }
    }
  }, [image, multi]);

  const takePhotoFromCamera = async () => {
    const hasCameraPermission = await Permissions.requestCameraPermission();
    if (hasCameraPermission) {
      ImagePicker.openCamera({
        width: 950,
        height: 1800,
        cropping: false,
        compressImageQuality: isIOS ? 0.1 : 0.5,
        multiple: false,
      }).then(image => {
        console.log(image);
        setImages(image);
      });
    }
  };

  const choosePhotoFromLibrary = async () => {
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
          console.log("choosePhotoFromLibrary==>", image);
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

  const deleteImages = id => {
    if (multiImages && multi.length > 0) {
      var filtered = _.filter(
        multi,
        img => (img?.path ?? img?.fileCopyUri) != id,
      );
      setMulti(filtered);
    } else setImage(null);
  };

  return (
    <>
      {!hideDocs && multiImages && multi.length > 0 ? (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            flexWrap: "wrap",
            // justifyContent: "center",
          }}>
          {_.map(multi, (item, index) => (
            <View
              key={item?.fileCopyUri ?? item?.path}
              style={{
                width: multi?.length === 1 ? "100%" : "47%",
                marginTop: moderateScale(8, 0.3),
                marginHorizontal: multi?.length === 1 ? 0 : 5,
              }}>
              <DocDetails
                file_name={item?.file_name ?? item?.fileCopyUri ?? item?.path}
                url={item?.fileCopyUri ?? item?.path}
                isDeleteAble
                isDownloadAble={false}
                onDelete={() => deleteImages(item?.fileCopyUri ?? item?.path)}
              />
            </View>
          ))}
        </View>
      ) : !multiImages && image?.length > 0 ? (
        <View
          style={{
            width: image?.length > 0 ? "100%" : "45%",
            flexDirection: "row",
            flexWrap: "wrap",
          }}>
          {_.map(image, item => (
            <View
              key={item?.fileCopyUri ?? item?.path}
              style={{ marginTop: moderateScale(8, 0.3), width: "100%" }}>
              <DocDetails
                file_name={item?.name ?? item?.fileCopyUri ?? item?.path}
                url={item?.fileCopyUri ?? item?.path}
                isDeleteAble
                isDownloadAble={false}
                onDelete={() => deleteImages(item?.fileCopyUri ?? item?.path)}
              />
            </View>
          ))}
        </View>
      ) : null}
      <Modal
        isVisible={visible}
        onBackdropPress={toggleModal}
        animationIn={"slideInUp"}
        animationOut={"slideOutDown"}
        animationInTiming={animationInTiming}
        animationOutTiming={animationOutTiming}
        avoidKeyboard={avoidKeyboard}
        deviceHeight={windowHeight + 20}
        deviceWidth={windowWidth}
        backdropOpacity={lightShadow ? 0.1 : 0.3}>
        <View
          style={[
            {
              backgroundColor: backgroundColor,
              height: modalHeight,
              width: modalWidth,
              minHeight: moderateScale(modalHeight, 0.3),
              alignSelf: "center",
              alignContent: "center",
              borderTopRightRadius: moderateScale(20, 0.3),
              borderTopLeftRadius: moderateScale(20, 0.3),
            },
            toBottom
              ? {
                  alignSelf: "center",
                  position: "absolute",
                  bottom: moderateScale(-25),
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
                  fontStyle="500.normal"
                  size={22}
                  style={{ paddingVertical: moderateScale(15, 0.3) }}>
                  {I18n.t("screen_messages.Upload_Photo")}
                </AppText>
              </View>
              <VerticalSpacing size={10} />
              <AppButton
                Title={I18n.t("screen_messages.button.Take_Photo")}
                color={theme.subHeader}
                borderRadius={10}
                height={45}
                onPress={() => takePhotoFromCamera()}
                fontSize={16}
                Outlined
                leftIcon={
                  <svgs.Camera
                    height={moderateScale(25, 0.3)}
                    width={moderateScale(25, 0.3)}
                    color={theme.textColor}
                  />
                }
                IcontoEnd
                textStyle={{
                  textAlign: "left",
                  width: "100%",
                  marginLeft: moderateScale(30, 0.3),
                }}
              />
              <VerticalSpacing size={10} />
              <AppButton
                Title={I18n.t("screen_messages.button.Choose_From_Gallery")}
                color={theme.subHeader}
                borderRadius={10}
                fontSize={16}
                height={45}
                onPress={() => choosePhotoFromLibrary()}
                Outlined
                leftIcon={
                  <svgs.Gallery
                    height={moderateScale(30, 0.3)}
                    width={moderateScale(30, 0.3)}
                  />
                }
                textStyle={{
                  textAlign: "left",
                  width: "100%",
                  // marginLeft: 30,
                }}
              />
              <VerticalSpacing size={25} />
              <AppButton
                Title={I18n.t("screen_messages.button.cancel")}
                color={image?.length > 0 ? theme.primary : theme.warning}
                height={50}
                onPress={toggleModal}
                rounded
              />
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
