import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import { useAppSelector } from "@src/redux/store";
import { moderateScale } from "react-native-size-matters";

interface HeaderWithTitleandSeeAllProps {
  title: string;
  leftTitle?: string;
  onPressLeft?: () => void;
}

export default function HeaderWithTitleandSeeAll(
  props: HeaderWithTitleandSeeAllProps,
) {
  const { title = "Title", leftTitle = "See All", onPressLeft } = props;
  const { theme } = useAppSelector(state => state.theme);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: moderateScale(15, 0.3),
      }}>
      <AppText fontStyle="400.semibold" size={18}>
        {title}
      </AppText>
      {onPressLeft && (
        <AppButton
          Title={leftTitle}
          LinkButton
          color={theme.secondary}
          fontSize={14}
          fontStyle="400.medium"
          onPress={onPressLeft}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
