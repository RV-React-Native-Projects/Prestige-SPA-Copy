/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry, Linking } from "react-native";
import messaging from "@react-native-firebase/messaging";
import App from "./App";
import { name as appName } from "./app.json";
import notifee, { EventType } from "@notifee/react-native";
import Config from "react-native-config";

notifee.onBackgroundEvent(async ({ type, detail }) => {
  // const { notification, pressAction } = detail;
  const URL = detail.pressAction.id;
  const URLArr = URL.split("/");

  console.log("====================================");
  console.log(URL, URLArr);
  console.log("====================================");
  const isTripDetails = URLArr[1] == "trip_details";
  if (type === EventType.ACTION_PRESS && detail.pressAction.id === "stop") {
    await notifee.stopForegroundService();
  } else if (
    type === EventType.ACTION_PRESS &&
    detail.pressAction.id === "goToHome"
  ) {
    await Linking.openURL(`${Config?.SCHEME}://app/home`);
  } else if (
    type === EventType.ACTION_PRESS &&
    detail.pressAction.id === "goToAttendance"
  ) {
    await Linking.openURL(`${Config?.SCHEME}://app/attendance`);
  } else if (detail.pressAction.id === "goToHome") {
    await Linking.openURL(`${Config?.SCHEME}://app/home`);
  } else if (detail.pressAction.id === "goToAttendance") {
    await Linking.openURL(`${Config?.SCHEME}://app/attendance`);
  } else if (isTripDetails) {
    await Linking.openURL(`${Config?.SCHEME}://app`);
    setTimeout(() => {
      Linking.openURL(`${Config?.SCHEME}://${URL}`);
    }, 1000);
  }
});

notifee.registerForegroundService(notification => {
  return new Promise(() => {
    console.log("Noteffee====>>", notification);
    notifee.onForegroundEvent(async ({ type, detail }) => {
      console.log(detail.pressAction.id);
      const URL = detail.pressAction.id;
      const URLArr = URL.split("/");
      const isTripDetails = URLArr[1] == "trip_details";
      if (type === EventType.ACTION_PRESS && detail.pressAction.id === "stop") {
        await notifee.stopForegroundService();
      } else if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id === "goToHome"
      ) {
        await Linking.openURL(`${Config?.SCHEME}://app/home`);
      } else if (
        type === EventType.ACTION_PRESS &&
        detail.pressAction.id === "goToAttendance"
      ) {
        await Linking.openURL(`${Config?.SCHEME}://app/attendance`);
      } else if (detail.pressAction.id === "goToHome") {
        await Linking.openURL(`${Config?.SCHEME}://app/home`);
      } else if (detail.pressAction.id === "goToAttendance") {
        await Linking.openURL(`${Config?.SCHEME}://app/attendance`);
      } else if (isTripDetails) {
        // await Linking.openURL(`${Config?.SCHEME}://app/attendance`);
        await Linking.openURL(`${Config?.SCHEME}://${URL}`);
      }
    });
  });
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
