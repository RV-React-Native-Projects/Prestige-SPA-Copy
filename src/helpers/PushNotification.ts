import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Permissions from "@helpers/Permissions";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  await Permissions.requestPostNotificationPermission();
  if (enabled) {
    console.log("Authorization status:", authStatus);
    getFCMToken();
  }
}

export async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem("fcmToken_driver");
  console.log("FCM Old Token==>", fcmToken);
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log("new FCM Token==>", fcmToken);
        await AsyncStorage.setItem("fcmToken_driver", fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.log("Error ==>", error);
      return error;
    }
  }
}

export async function notificationListner() {
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    console.log("Notification on forGround.....", remoteMessage);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      // setLoading(false);
    });
}
