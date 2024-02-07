import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import svgs from "@common/AllSvgs";
import { toggleTheme } from "@reducers/ThemeSlice";
import { useAppDispatch, useAppSelector } from "@redux/store";

const LightDarkSwitch = (props: any) => {
  const storeDispatch = useAppDispatch();
  const { theme, isDarkMode } = useAppSelector(state => state.theme);
  const { sunColor = theme.modalBackgroundColor, moonColor = theme.black } =
    props || {};

  const handlePress = () => {
    storeDispatch(toggleTheme());
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        {isDarkMode ? (
          <svgs.Sun stroke={sunColor} />
        ) : (
          <svgs.Moon stroke={moonColor} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default memo(LightDarkSwitch);
