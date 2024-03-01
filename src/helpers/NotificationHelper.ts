import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import notifee, {
  AndroidBadgeIconType,
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
  EventType,
} from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { PERMISSIONS, request } from "react-native-permissions";
import { useAppDispatch } from "@redux/store";
import { setFCMToken } from "@reducers/UserSlice";

export const checkApplicationNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    return enabled;
  }
  request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    .then(result => {
      console.log("POST_NOTIFICATIONS status:", result);
      return true;
    })
    .catch(error => {
      console.log("POST_NOTIFICATIONS error ", error);
      return false;
    });
};

//method was called to get FCM tiken for notification
export const getFcmToken = async () => {
  const { getStorage, setStorage } = useEncryptedStorage();
  const storeDispatch = useAppDispatch();
  let token: any = await getStorage("FCM_TOKEN");
  const havePermission = await checkApplicationNotificationPermission();
  console.log("At Initial Notification==>", token, havePermission);
  await registerAppWithFCM();
  try {
    if (havePermission) {
      if (token) {
        console.log("OLD Token:", token);
      } else {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log("new FCM Token==>", fcmToken);
          await setStorage("FCM_TOKEN", fcmToken);
          storeDispatch(setFCMToken(fcmToken));
          return fcmToken;
        }
      }
    }
  } catch (error) {
    console.log("getFcmToken Device Token error ", error);
  }
  return token;
};

//method was called on  user register with firebase FCM for notification
export async function registerAppWithFCM() {
  console.log(
    "registerAppWithFCM status",
    messaging().isDeviceRegisteredForRemoteMessages,
  );
  if (!messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .registerDeviceForRemoteMessages()
      .then(status => {
        console.log("registerDeviceForRemoteMessages status", status);
      })
      .catch(error => {
        console.log("registerDeviceForRemoteMessages error ", error);
      });
  }
}

//method was called on un register the user from firebase for stoping receiving notifications
export async function unRegisterAppWithFCM() {
  const { removeStorage } = useEncryptedStorage();
  console.log(
    "unRegisterAppWithFCM status",
    messaging().isDeviceRegisteredForRemoteMessages,
  );

  if (messaging().isDeviceRegisteredForRemoteMessages) {
    await messaging()
      .unregisterDeviceForRemoteMessages()
      .then(status => {
        console.log("unregisterDeviceForRemoteMessages status", status);
      })
      .catch(error => {
        console.log("unregisterDeviceForRemoteMessages error ", error);
      });
  }
  await messaging().deleteToken();
  await removeStorage("FCM_TOKEN");
  console.log(
    "unRegisterAppWithFCM status",
    messaging().isDeviceRegisteredForRemoteMessages,
  );
}

//method was called to listener events from firebase for notification triger
export function registerListenerWithFCM() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log("onMessage Received : ", JSON.stringify(remoteMessage));
    if (
      remoteMessage?.notification?.title &&
      remoteMessage?.notification?.body
    ) {
      onDisplayNotification(
        remoteMessage.notification?.title,
        remoteMessage.notification?.body,
        remoteMessage?.data,
      );
    }
  });
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        console.log("User dismissed notification", detail.notification);
        break;
      case EventType.PRESS:
        console.log("User pressed notification", detail.notification);
        // if (detail?.notification?.data?.clickAction) {
        //   onNotificationClickActionHandling(
        //     detail.notification.data.clickAction
        //   );
        // }
        break;
    }
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    console.log(
      "onNotificationOpenedApp Received",
      JSON.stringify(remoteMessage),
    );
    // if (remoteMessage?.data?.clickAction) {
    //   onNotificationClickActionHandling(remoteMessage.data.clickAction);
    // }
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification,
        );
      }
    });

  return unsubscribe;
}

//method was called to display notification
async function onDisplayNotification(title: string, body: any, data: any) {
  console.log("onDisplayNotification Adnan: ", JSON.stringify(data));
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: "Prestige",
    name: "Prestige-Common",
    description: "Prestige",
    badge: false,
    lights: false,
    vibration: false,
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    id: "Prestige",
    title: title,
    body: body,
    data: data,
    android: {
      channelId,
      smallIcon: "ic_launcher_round",
      badgeIconType: AndroidBadgeIconType.SMALL,
      importance: AndroidImportance.MIN,
      visibility: AndroidVisibility.SECRET,
      autoCancel: true,
      asForegroundService: false,
      ongoing: false,
      onlyAlertOnce: true,
      circularLargeIcon: true,
      category: AndroidCategory.NAVIGATION,
      showTimestamp: true,
      // color: "#0283E5",
      // colorized: true,
      largeIcon: "ic_launcher",
      pressAction: {
        id: "default",
      },
    },
  });
}
