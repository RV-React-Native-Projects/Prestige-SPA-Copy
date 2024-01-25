import React from "react";
import { View, StyleSheet, Platform, ViewProps } from "react-native";
import { BallIndicator } from "react-native-indicators";
import { useAppSelector } from "@redux/store";

interface LoadingContainerTypes extends ViewProps {
  bgColor?: string;
  paddingTop?: number;
  style?: object | undefined;
  loading?: boolean;
  children?: React.ReactNode;
  loadingContainerStyles?: object;
  color?: string | undefined;
}

export default function LoadingContainer(props: LoadingContainerTypes) {
  const { theme } = useAppSelector((state: any) => state.theme);

  const {
    bgColor = theme.appBackgroundColor,
    paddingTop = 0,
    style,
    loading = false,
    children,
    loadingContainerStyles,
    color = theme.white,
    ...rest
  } = props || {};

  return (
    <View
      {...rest}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          position: "relative",
          paddingTop: paddingTop,
          ...style,
        },
      ]}
    >
      {children}
      {loading ? (
        <View
          {...rest}
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(64,64,64, 0.5)",
              zIndex: 100,
              elevation: 10000,
              ...props?.loadingContainerStyles,
            },
          ]}
        >
          <BallIndicator color={color} animating={true} size={60} />
        </View>
      ) : undefined}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    minHeight: "100%",
    zIndex: 110,
    paddingTop: Platform.OS === "web" ? 15 : 0,
  },
});
