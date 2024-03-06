import { useEffect } from "react";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import { useAppDispatch } from "@redux/store";
import { setFCMToken } from "@reducers/UserSlice";
import messaging from "@react-native-firebase/messaging";
import notifee, {
  AndroidBadgeIconType,
  AndroidCategory,
  AndroidImportance,
  AndroidVisibility,
} from "@notifee/react-native";
import Permissions from "./Permissions";

interface NotificationHelperFunctions {
  getFcmToken: () => Promise<string | null>;
  registerListenerWithFCM: () => void;
  unRegisterAppWithFCM: () => Promise<void>;
}

export default function NotificationHelper(): NotificationHelperFunctions {
  const { getStorage, setStorage } = useEncryptedStorage();
  const storeDispatch = useAppDispatch();

  async function checkApplicationNotificationPermission(): Promise<boolean> {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Authorization status:", authStatus);
      return enabled;
    } else {
      return Permissions.requestPostNotificationPermission();
    }
  }

  async function getFcmToken(): Promise<string | null> {
    let token: string = await getStorage("FCM_TOKEN");
    const havePermission = await checkApplicationNotificationPermission();
    console.log("OLD Token", token, havePermission);
    if (!!token) storeDispatch(setFCMToken(token));
    await registerAppWithFCM();
    try {
      if (havePermission) {
        if (!token) {
          const fcmToken = await messaging().getToken();
          if (fcmToken) {
            console.log("new FCM Token==>", fcmToken);
            await setStorage("FCM_TOKEN", fcmToken);
            storeDispatch(setFCMToken(fcmToken));
            token = fcmToken;
          }
        }
      }
    } catch (error) {
      console.log("getFcmToken Device Token error ", error);
    }
    return token;
  }

  async function registerAppWithFCM() {
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
    console.log(
      "registerAppWithFCM New status===>",
      messaging().isDeviceRegisteredForRemoteMessages,
    );
  }

  async function unRegisterAppWithFCM(): Promise<void> {
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
    console.log(
      "unRegisterAppWithFCM status",
      messaging().isDeviceRegisteredForRemoteMessages,
    );
  }

  function registerListenerWithFCM() {
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
    return unsubscribe;
  }

  async function onDisplayNotification(title: string, body: any, data: any) {
    console.log("onDisplayNotification Adnan: ", JSON.stringify(data));
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: "Prestige",
      name: "Prestige-Common",
      description: "Prestige",
      badge: true,
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
        groupId: "Prestige",
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
        largeIcon: "ic_launcher",
        pressAction: {
          id: "default",
        },
      },
      ios: {},
    });
  }

  return {
    getFcmToken,
    registerListenerWithFCM,
    unRegisterAppWithFCM,
  };
}
