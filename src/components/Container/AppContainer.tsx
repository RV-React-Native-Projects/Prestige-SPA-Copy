import React, { memo } from "react";
import {
  StatusBar,
  View,
  ScrollView,
  Dimensions,
  Platform,
  StatusBarProps,
} from "react-native";
import { KeyboardAvoidingView } from "native-base";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useAppSelector } from "@redux/store";

const { height: windowHeight } = Dimensions.get("screen");

interface AppContainerTypes extends StatusBarProps {
  children?: React.ReactNode;
  statusBarColor?: string;
  barStyle?: "light-content" | "dark-content" | "default";
  hidden?: boolean;
  translucent?: boolean;
  hideStatusbar?: boolean;
  style?: object;
  ContainerStyle?: object;
  scrollable?: boolean;
  KeyboardAvoidingViewBehavior?: "height" | "padding" | "position" | undefined;
  showHideTransition?: "slide" | "fade" | "none";
  fullHeight?: boolean;
}

function AppContainer(props: AppContainerTypes) {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);

  const {
    children,
    statusBarColor = isDarkMode
      ? theme.modalBackgroundColor
      : theme.modalBackgroundColor,
    barStyle = isDarkMode ? "light-content" : "dark-content",
    hidden = false,
    translucent = true,
    hideStatusbar = false,
    style,
    ContainerStyle,
    scrollable = true,
    KeyboardAvoidingViewBehavior = undefined,
    showHideTransition = "slide",
    fullHeight = true,
  } = props || {};
  const insets = useSafeAreaInsets();

  var isIOS: boolean = Platform.OS === "ios";

  return (
    <KeyboardAvoidingView
      behavior={KeyboardAvoidingViewBehavior}
      style={{ flex: 1, height: "100%", width: "100%", minHeight: "100%" }}>
      {hideStatusbar ? null : (
        <View
          style={{
            backgroundColor: statusBarColor,
            height: isIOS ? insets.top : null,
            zIndex: 125,
          }}>
          <StatusBar
            barStyle={barStyle}
            networkActivityIndicatorVisible={true}
            backgroundColor={statusBarColor}
            animated={true}
            showHideTransition={showHideTransition}
            hidden={hidden}
            translucent={translucent}
          />
        </View>
      )}
      {scrollable ? (
        <ScrollView
          keyboardShouldPersistTaps="never"
          style={{ flex: 1, minHeight: windowHeight, ...style }}
          contentContainerStyle={{ paddingBottom: 150, ...ContainerStyle }}>
          {hideStatusbar ? (
            <View>{children}</View>
          ) : (
            <SafeAreaView style={{ flex: 1, ...style }}>
              {children}
            </SafeAreaView>
          )}
        </ScrollView>
      ) : hideStatusbar ? (
        <>
          <StatusBar
            barStyle="default"
            backgroundColor="transparent"
            animated={true}
            showHideTransition={showHideTransition}
            hidden={false}
            translucent={true}
          />
          <View style={{ flex: 1, ...style }}>{children}</View>
        </>
      ) : (
        <SafeAreaView
          style={{
            flex: 1,
            height: "100%",
            minHeight: fullHeight ? "100%" : "auto",
            ...style,
          }}>
          <View style={{ marginTop: isIOS ? -insets.top : null }} />
          {children}
        </SafeAreaView>
      )}
    </KeyboardAvoidingView>
  );
}

export default memo(AppContainer);
