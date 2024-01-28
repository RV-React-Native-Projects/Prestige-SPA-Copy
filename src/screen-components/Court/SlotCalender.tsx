import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { RefObject, useEffect, useRef, useState } from "react";
import MonthYearPicker from "@components/DateTimePicker/MonthYearPicker";
import IconButton from "@components/Button/IconButton";
import svgs from "@common/AllSvgs";
import moment from "moment";
import { useAppSelector } from "@src/redux/store";
import AppText from "@src/components/Text/AppText";
import {
  HorizontalSpacing,
  VerticalSpacing,
} from "@src/components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";

interface CalendarDate {
  date: Date;
  day: string;
  dateNumber: string;
  month: string;
}

const DateCard = (props: any) => {
  const { item, onPress, value } = props;
  const { theme } = useAppSelector(state => state.theme);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: 65,
        backgroundColor:
          value === item?.date ? theme.primary : theme.modalBackgroundColor,
        borderRadius: 10,
        ...theme.light_shadow,
        marginBottom: 10,
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <AppText color={value === item?.date ? theme.white : theme.textColor}>
          {item?.day}
        </AppText>
        <AppText
          color={value === item?.date ? theme.white : theme.textColor}
          size={24}
          fontStyle="600.semibold">
          {item.dateNumber}
        </AppText>
        <AppText color={value === item?.date ? theme.white : theme.textColor}>
          {item.month}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};

export default function SlotCalender(props: any) {
  const { getSelectedDate } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<CalendarDate[] | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const { theme } = useAppSelector(state => state.theme);
  const flatListRef: RefObject<FlatList<any>> = useRef(null);
  const [scrollX] = useState(new Animated.Value(0));

  const handleScrollToOffset = (offset: number) => {
    Animated.timing(scrollX, {
      toValue: -offset,
      duration: 500,
      useNativeDriver: true,
    }).start();

    //  This is If u want to Show Scroll Animation
    // setTimeout(() => {
    //   flatListRef.current?.scrollToOffset({ offset, animated: true });
    // }, 1000);

    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: -offset, animated: true });
    }, 100);
  };

  useEffect(() => {
    if (getSelectedDate) getSelectedDate(pickedDate);
  }, [pickedDate]);

  function getCalendarDates(date: Date) {
    const momentDate = moment(date);
    const year = momentDate.year();
    const month = momentDate.month();
    const currentMonth = moment().month();
    const currentYear = moment().year();
    const currentDay = moment().date();

    const dates: CalendarDate[] = [];

    const numDaysInMonth = momentDate.daysInMonth();

    const startDay =
      currentMonth === month && currentYear === year ? currentDay : 1;

    for (let day = startDay; day <= numDaysInMonth; day++) {
      const currentDate = moment.utc([year, month, day]).toDate();
      const dayName = moment(currentDate).format("ddd");
      const dateNumber = moment(currentDate).format("DD");
      const monthName = moment(currentDate).format("MMM");
      dates.push({
        date: currentDate,
        day: dayName,
        dateNumber: dateNumber,
        month: monthName,
      });
    }

    setDates(dates);
  }

  function subtractOneMonthFromDate() {
    const currentDate = moment();

    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const selectedMonth = moment(selectedDate).month();
    const selectedYear = moment(selectedDate).year();
    let selection;

    if (!(selectedMonth === currentMonth && selectedYear === currentYear)) {
      selection = moment(selectedDate).subtract(1, "months");
      setSelectedDate(moment(selectedDate).subtract(1, "months").toDate());
    }
  }

  function modifyMonthFromDate(operation: "subtract" | "add") {
    const currentDate = moment();
    const currentMonth = currentDate.month();
    const currentYear = currentDate.year();

    const selectedMonth = moment(selectedDate).month();
    const selectedYear = moment(selectedDate).year();

    if (operation === "subtract") {
      if (!(selectedMonth === currentMonth && selectedYear === currentYear)) {
        setSelectedDate(moment(selectedDate).subtract(1, "months").toDate());
      }
    } else if (operation === "add") {
      setSelectedDate(moment(selectedDate).add(1, "months").toDate());
    }
  }

  useEffect(() => {
    getCalendarDates(selectedDate);
    handleScrollToOffset(moderateScale(150, 0.3));
  }, [selectedDate]);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: moderateScale(15, 0.3),
        }}>
        <MonthYearPicker
          getDate={e => setSelectedDate(e)}
          value={selectedDate}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // marginLeft: moderateScale(35, 0.3),
          }}>
          <IconButton
            icon={<svgs.Left height={25} width={25} />}
            onPressIcon={() => modifyMonthFromDate("subtract")}
          />
          <View style={{ width: 10 }} />
          <IconButton
            icon={<svgs.Right />}
            onPressIcon={() => modifyMonthFromDate("add")}
          />
        </View>
      </View>
      {/*  ============== Select date ====== */}
      <VerticalSpacing size={20} />
      <AppText
        fontStyle="600.semibold"
        size={16}
        style={{ paddingHorizontal: 15 }}>
        Select Date
      </AppText>
      <VerticalSpacing />
      <View style={{ alignItems: "center", alignContent: "center" }}>
        <Animated.FlatList
          ref={flatListRef}
          data={dates}
          renderItem={({ item, index }) => (
            <DateCard
              item={item}
              onPress={() => setPickedDate(item?.date)}
              value={pickedDate}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ alignSelf: "center", width: "100%" }}
          contentContainerStyle={{
            gap: moderateScale(10, 0.3),
            paddingHorizontal: moderateScale(15, 0.3),
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
