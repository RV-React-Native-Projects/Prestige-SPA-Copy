import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import { Card } from "react-native-paper";
import { moderateScale } from "react-native-size-matters";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";

const CourtCard = (props: any) => {
  const { data } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <Card
      style={{
        padding: moderateScale(10, 0.3),
        width: 180,
        marginRight: 15,
        borderRadius: 10,
      }}>
      <View>
        <Image
          source={{
            uri: `https://nodejsclusters-160185-0.cloudclusters.net/${data.courts[0]?.imagePath}`,
          }}
          style={{
            height: 150,
            width: "auto",
            objectFit: "cover",
            borderRadius: 5,
          }}
        />
        <VerticalSpacing />
        <AppText
          style={{ height: 50 }}
          fontStyle="600.bold"
          size={16}
          numberOfLines={2}>
          {data?.locationName}
        </AppText>
        <View
          style={{
            flexDirection: "row",
            height: 20,
          }}>
          <svgs.Location color1={theme.secondary} height={20} />
          <AppText
            style={{ height: 50 }}
            fontStyle="600.bold"
            numberOfLines={2}
            color={theme.gray}>
            5.4 KM
          </AppText>
        </View>
        <AppText
          style={{ height: 40, marginTop: 5 }}
          fontStyle="400.bold"
          numberOfLines={2}
          color={theme.gray}>
          {data?.locationAddress}
        </AppText>
        <AppText
          style={{ marginTop: 5 }}
          fontStyle="700.semibold"
          numberOfLines={2}
          color={theme.primary}>
          AED {data?.minRate} - AED {data?.maxRate}
        </AppText>
      </View>
    </Card>
  );
};

export default CourtCard;

const styles = StyleSheet.create({});
