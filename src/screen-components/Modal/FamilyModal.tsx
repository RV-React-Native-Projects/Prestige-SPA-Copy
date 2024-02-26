import { useAppSelector } from "@src/redux/store";
import React, { memo, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { moderateScale } from "react-native-size-matters";
import svgs from "@common/AllSvgs";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import I18n from "i18n-js";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import FastImage from "react-native-fast-image";
import images from "@src/common/AllImages";
import { RadioButton } from "react-native-paper";
import _, { toString } from "lodash";
import AppButton from "@src/components/Button/AppButton";
import FloatingBottomButton from "../Floating/FloatingBottomButton";
import { useAppNavigation } from "@navigation/Navigation";
import * as Animatable from "react-native-animatable";

interface FamilyMemberProps {
  show: boolean;
  toggleModal: () => void;
  onPressNext?: (familyId: string | null) => void;
}

const isIOS = Platform.OS === "ios";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

function FamilyModal(props: FamilyMemberProps) {
  const { theme } = useAppSelector(state => state.theme);
  const { user, family } = useAppSelector(state => state.user);
  const navigation = useAppNavigation();
  const { show, toggleModal, onPressNext } = props;

  const [familyID, setFamilyID] = useState<string | null>(null);

  function onPressAddFamily() {
    toggleModal();
    navigation.navigate("AddFamily", { data: null });
  }

  return (
    <Modal
      isVisible={show}
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
            backgroundColor: theme.modalBackgroundColor,
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
              backgroundColor: theme.modalBackgroundColor,
              marginBottom: moderateScale(10, 0.3),
              borderRadius: moderateScale(10, 0.3),
              ...theme.light_shadow,
            }}>
            <View style={{ marginRight: moderateScale(5, 0.3) }}>
              {!familyID ? (
                <Animatable.View
                  useNativeDriver
                  animation="bounceIn"
                  duration={500}>
                  <Ionicons
                    name="radio-button-on"
                    color={theme.secondary}
                    size={25}
                  />
                </Animatable.View>
              ) : (
                <Animatable.View
                  useNativeDriver
                  animation="fadeIn"
                  duration={500}>
                  <Ionicons
                    name="radio-button-off"
                    color={theme.gray}
                    size={25}
                  />
                </Animatable.View>
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
            <View style={{ marginLeft: moderateScale(10, 0.3), width: "100%" }}>
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
                    backgroundColor: theme.modalBackgroundColor,
                    marginBottom: moderateScale(10, 0.3),
                    borderRadius: moderateScale(10, 0.3),
                    ...theme.light_shadow,
                  }}>
                  <View style={{ marginRight: moderateScale(5, 0.3) }}>
                    {toString(item.familyMemberID) === familyID ? (
                      <Animatable.View
                        useNativeDriver
                        animation="bounceIn"
                        duration={500}>
                        <Ionicons
                          name="radio-button-on"
                          color={theme.secondary}
                          size={25}
                        />
                      </Animatable.View>
                    ) : (
                      <Animatable.View
                        useNativeDriver
                        animation="fadeIn"
                        duration={500}>
                        <Ionicons
                          name="radio-button-off"
                          color={theme.gray}
                          size={25}
                        />
                      </Animatable.View>
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
          <VerticalSpacing />
          <AppButton
            Title={I18n.t("screen_messages.button.Add_Family")}
            color={theme.title}
            // loading={loading}
            Outlined
            fontStyle="600.semibold"
            fontSize={16}
            height={50}
            onPress={onPressAddFamily}
            leftIcon={<Feather name="plus" size={30} color={theme.iconColor} />}
          />
        </ScrollView>
        <FloatingBottomButton
          onPress={() => {
            toggleModal();
            onPressNext && onPressNext(familyID ?? null);
          }}
        />
      </View>
    </Modal>
  );
}

export default memo(FamilyModal);

const styles = StyleSheet.create({});
