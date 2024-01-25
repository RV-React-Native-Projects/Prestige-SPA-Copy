import I18n from "i18n-js";
import moment from "moment";

const today = moment();

export const RejectionOptions = {
  lable: I18n.t("screen_messages.Reason_for_not_accepting_Trip"),
  data: [
    { name: I18n.t("screen_messages.Already_in_Trip"), key: "on trip" },
    { name: I18n.t("screen_messages.On_a_leave"), key: "on leave" },
    { name: I18n.t("screen_messages.Other_reason"), key: "other" },
  ],
};

export const TripDetails = {
  viNumber: "KA 45 IN 7845",
  from: "Bangalore",
  to: "Lucknow",
  date: "29 Dec 2022",
  location: "LG stationa",
  status: "Started",
};

export const dateFilterData = [
  {
    id: 1,
    title: I18n.t("screen_messages.filter_option.last_7"),
    key: "last-7-days",
    value: "last 7 days",
  },
  {
    id: 2,
    title: I18n.t("screen_messages.filter_option.This_month"),
    key: "this-month",
    value: "this month",
    month: moment(today).format("MMMM / YYYY"),
  },
  {
    id: 3,
    title: I18n.t("screen_messages.filter_option.Last_month"),
    key: "last-month",
    value: "last month",
    month: moment(today).subtract({ months: 1 }).format("MMMM / YYYY"),
  },
  {
    id: 4,
    title: I18n.t("screen_messages.filter_option.Custom"),
    key: "custom",
    value: "Custom",
  },
];
