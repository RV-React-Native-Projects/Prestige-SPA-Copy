import React, { memo } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import AppButton from "@src/components/Button/AppButton";
import * as Animatable from "react-native-animatable";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";

interface FloatingBottomButtonProps {
  style?: ViewStyle;
  onPress?: () => void;
  title?: string;
  color?: string;
  backgroundColor?: string;
  padding?: number;
  fontStyle?: string;
  fontSize?: number;
  height?: number;
  duration?: number;
  Outlined?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
}

function FloatingBottomButton(props: FloatingBottomButtonProps) {
  const { theme } = useAppSelector(state => state.theme);

  const {
    style,
    onPress,
    title = I18n.t("screen_messages.button.next"),
    color = theme.primary,
    backgroundColor = theme.modalBackgroundColor,
    padding = 15,
    fontStyle = "600.normal",
    fontSize = 16,
    height = 50,
    duration = 1000,
    Outlined = false,
    loading = false,
    leftIcon = null,
  } = props;

  return (
    <Animatable.View
      animation="fadeInUp"
      duration={duration}
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        backgroundColor: backgroundColor,
        paddingVertical: moderateScale(padding, 0.3),
        paddingHorizontal: moderateScale(padding + 5, 0.3),
        ...theme.dark_shadow,
        ...style,
      }}>
      <AppButton
        loading={loading}
        Outlined={Outlined}
        Title={title}
        color={color}
        fontStyle={fontStyle}
        fontSize={fontSize}
        height={height}
        onPress={onPress}
        leftIcon={leftIcon}
      />
    </Animatable.View>
  );
}

export default memo(FloatingBottomButton);

const styles = StyleSheet.create({});
