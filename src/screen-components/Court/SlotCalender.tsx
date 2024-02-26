import {
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  RefObject,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import MonthYearPicker from "@src/components/Picker/MonthYearPicker";
import IconButton from "@components/Button/IconButton";
import svgs from "@common/AllSvgs";
import moment from "moment";
import { useAppSelector } from "@src/redux/store";
import AppText from "@src/components/Text/AppText";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";
import { moderateScale } from "react-native-size-matters";
import I18n from "i18n-js";

interface CalendarDate {
  date: Date;
  day: string;
  dateNumber: string;
  month: string;
}

const DateCard = memo((props: any) => {
  const { item, onPress, value } = props;
  const { theme } = useAppSelector(state => state.theme);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        width: moderateScale(65, 0.3),
        backgroundColor:
          value === item?.date ? theme.primary : theme.modalBackgroundColor,
        borderRadius: moderateScale(5, 0.3),
        ...theme.light_shadow,
        marginBottom: moderateScale(10, 0.3),
      }}
      onPress={onPress}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: moderateScale(10, 0.3),
        }}>
        <AppText
          size={12}
          color={value === item?.date ? theme.white : theme.title}>
          {item?.day}
        </AppText>
        <AppText
          color={value === item?.date ? theme.white : theme.title}
          size={24}
          fontStyle="600.semibold">
          {item.dateNumber}
        </AppText>
        <AppText
          fontStyle="500.normal"
          color={value === item?.date ? theme.white : theme.title}>
          {item.month}
        </AppText>
      </View>
    </TouchableOpacity>
  );
});

interface SlotCalenderProps {
  getSelectedDate: (date: Date) => void;
  minimumDate?: Date | null;
  maximumDate?: Date | null;
}

function SlotCalender(props: SlotCalenderProps) {
  const { getSelectedDate, minimumDate = null, maximumDate = null } = props;
  const { theme } = useAppSelector(state => state.theme);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [monthDate, setMonthDate] = useState<Date>(new Date());
  const [dates, setDates] = useState<CalendarDate[] | null>(null);
  const [pickedDate, setPickedDate] = useState<Date | null>(null);
  const flatListRef: RefObject<FlatList<any>> = useRef(null);
  const [scrollX] = useState(new Animated.Value(0));

  const handleScrollToOffset = (offset: number) => {
    Animated.timing(scrollX, {
      toValue: -offset,
      duration: 500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: -offset, animated: true });
    }, 100);
  };

  useEffect(() => {
    if (pickedDate && getSelectedDate) getSelectedDate(pickedDate);
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

  const modifyMonthFromDate = useCallback(
    (operation: "subtract" | "add") => {
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
    },
    [selectedDate],
  );

  useEffect(() => {
    if (selectedDate) getCalendarDates(selectedDate);
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
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <IconButton
            icon={<svgs.Left height={25} width={25} color1={theme.iconColor} />}
            onPressIcon={() => modifyMonthFromDate("subtract")}
          />
          <View style={{ width: 10 }} />
          <IconButton
            icon={<svgs.Right color1={theme.iconColor} />}
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
        {I18n.t("screen_messages.Select_Date")}
      </AppText>
      <VerticalSpacing />
      <View style={{ alignItems: "center", alignContent: "center" }}>
        <Animated.FlatList
          ref={flatListRef}
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <DateCard
              key={index}
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

export default memo(SlotCalender);

const styles = StyleSheet.create({});
