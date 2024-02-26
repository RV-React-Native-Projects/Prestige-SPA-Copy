import { StyleSheet, View } from "react-native";
import React from "react";
import { useAppSelector } from "@src/redux/store";
import AppText from "@src/components/Text/AppText";
import svgs from "@common/AllSvgs";
import moment from "moment";

export default function SlotCard(props: any) {
  const { theme } = useAppSelector(state => state.theme);
  const { date, index, backgroundColor = theme.modalBackgroundColor } = props;
  const { user } = useAppSelector(state => state.user);
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: backgroundColor,
        ...theme.light_shadow,
        borderRadius: 10,
        marginBottom: 10,
      }}>
      <AppText fontStyle="600.semibold">Session {index}</AppText>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}>
          <svgs.CalenderV2 color1={theme.secondary} width={25} height={25} />
          <AppText
            style={{ marginLeft: 5 }}
            fontStyle="500.semibold"
            color={theme.paragraph}>
            {moment(date?.startDate).format("ddd, MMM DD")}
          </AppText>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 5,
          }}>
          <svgs.Time color1={theme.secondary} width={25} height={20} />
          <AppText
            style={{ marginLeft: 5 }}
            fontStyle="500.semibold"
            color={theme.paragraph}>
            {date?.startAt} - {date?.endAt}
          </AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
