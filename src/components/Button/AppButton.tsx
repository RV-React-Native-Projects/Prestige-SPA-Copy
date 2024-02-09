import React from "react";
import {
  View,
  TouchableOpacity,
  ButtonProps,
  TouchableOpacityProps,
} from "react-native";
import ActivityIndicator from "@components/ActivityIndicator/ActivityIndicator";
import AppText from "@components/Text/AppText";
import _ from "lodash";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "@redux/store";

interface AppButtonType extends TouchableOpacityProps {
  onPress?: () => void;
  disabled?: boolean;
  disabledBackgroundColor?: string;
  Title?: string;
  fontStyle?: string;
  Outlined?: boolean;
  color?: string;
  LinkButton?: boolean;
  textColor?: string;
  fontWeight?: string;
  height?: number;
  width?: string | number | null;
  fontSize?: number;
  rounded?: boolean;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  textStyle?: object;
  leftIcon?: React.ReactNode;
  IcontoEnd?: boolean;
  rightIcon?: React.ReactNode;
  Dotted?: boolean;
  Dashed?: boolean;
  borderStyle?: "dotted" | "dashed" | "solid";
  loading?: boolean;
  indicatorBackgroundColor?: string;
  indicatorColor?: string;
  style?: object;
  extraStyle?: object | object[];
  size?: number;
  activeOpacity?: number;
}

export function Icon({
  icon,
  styles,
}: {
  icon: React.ReactNode;
  styles: object;
}) {
  return <>{icon ? <View style={{ ...styles }}>{icon}</View> : null}</>;
}

const getButtonObj = (theme: object, type: number) => {
  return _.get(theme, type);
};
const getStyleObject = (theme: object, button: string) => {
  return _.get(theme, button);
};

export default function AppButton(props: AppButtonType) {
  const { theme } = useAppSelector(state => state.theme);

  const isOutlined: boolean = props?.Outlined as boolean;
  const isLinkButton: boolean = props?.LinkButton as boolean;
  const isRounded: boolean = props?.rounded as boolean;
  const isDotted: boolean = props?.Dotted as boolean;
  const isDashed: boolean = props?.Dashed as boolean;

  const {
    onPress,
    disabled = false,
    disabledBackgroundColor,
    Title = "Button",
    Outlined = false,
    color = theme.primary,
    LinkButton = false,
    textColor = theme.primaryButtonText,
    fontStyle = "600.semibold",
    fontWeight = "600",
    height = 40,
    width = isLinkButton ? "auto" : "100%",
    fontSize = 18,
    rounded = false,
    borderRadius = isRounded ? 50 : 3,
    borderWidth = 1,
    borderColor = color as string,
    textStyle,
    leftIcon,
    IcontoEnd,
    rightIcon,
    Dotted,
    Dashed,
    borderStyle = isOutlined && isDotted
      ? "dotted"
      : isOutlined && isDashed
        ? "dashed"
        : "solid",
    loading = false,
    indicatorBackgroundColor = theme.primary,
    indicatorColor = theme.modalBackgroundColor,
    style,
    extraStyle,
    size = height as number,
    activeOpacity = 0.8,
  } = props || {};

  const buttonObj = getButtonObj(theme, size);
  const es = Array.isArray(extraStyle) ? extraStyle : [extraStyle];
  const buttonStyles = getStyleObject(theme, "solid-button-styles");

  return (
    <>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: disabled
              ? disabledBackgroundColor || theme.subHeader
              : Outlined
                ? "transparent"
                : LinkButton
                  ? "transparent"
                  : color,
            height: moderateScale(height, 0.3),
            borderRadius: moderateScale(borderRadius, 0.3),
            ...style,
          }}>
          <ActivityIndicator
            backgroundColor={color || indicatorBackgroundColor}
            indicatorColor={indicatorColor}
          />
        </View>
      ) : (
        <>
          {LinkButton ? (
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onPress}
              disabled={disabled}
              style={{ alignSelf: "center", ...style }}>
              <AppText
                color={
                  disabled ? disabledBackgroundColor || theme.subHeader : color
                }
                size={fontSize}
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  ...textStyle,
                }}
                fontStyle={fontStyle}>
                {Title}
              </AppText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={activeOpacity}
              onPress={onPress}
              disabled={disabled}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: moderateScale(height, 0.3),
                width: width as any,
                backgroundColor: disabled
                  ? disabledBackgroundColor || theme.subHeader
                  : Outlined
                    ? theme.modalBackgroundColor
                    : LinkButton
                      ? "transparent"
                      : color,
                borderRadius: moderateScale(borderRadius, 0.3),
                borderWidth: Outlined ? moderateScale(borderWidth, 0.3) : 0,
                borderColor: Outlined ? borderColor : "transparent",
                borderStyle: borderStyle,
                ...theme.light_shadow,
                ...style,
              }}>
              {leftIcon ? (
                <View
                  style={[
                    { marginRight: moderateScale(10, 0.3) },
                    IcontoEnd && {
                      position: "absolute",
                      left: moderateScale(15, 0.3),
                    },
                  ]}>
                  {leftIcon}
                </View>
              ) : null}
              <AppText
                color={Outlined ? color : textColor}
                size={fontSize}
                style={{
                  textAlign: "center",
                  textTransform: "capitalize",
                  maxWidth: "80%",
                  ...textStyle,
                }}
                numberOfLines={1}
                fontStyle={fontStyle}>
                {Title}
              </AppText>
              {rightIcon ? (
                <View
                  style={[
                    { marginLeft: moderateScale(10, 0.3) },
                    IcontoEnd && {
                      position: "absolute",
                      right: moderateScale(15, 0.3),
                    },
                  ]}>
                  {rightIcon}
                </View>
              ) : null}
            </TouchableOpacity>
          )}
        </>
      )}
    </>
  );
}
