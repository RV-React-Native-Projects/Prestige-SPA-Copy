import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS, {
  Importance as iOSImportance,
} from "@react-native-community/push-notification-ios";
import DeepLinkManager from "./DeepLinkManager";
import NotificationHandler from "./NotificationHandler";
import messaging from "@react-native-firebase/messaging";
import Config from "react-native-config";
import { Platform } from "react-native";
var isIOS = Platform.OS === "ios";

var Notifi = isIOS ? PushNotificationIOS : PushNotification;
var Importantce = isIOS ? iOSImportance : Importance;
export default class NotificationService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;
    this.lastPoppedNotifiationId = 0;

    console.log("On Register :-", onRegister, NotificationHandler);
    NotificationHandler.attachRegister(onRegister);
    if (onNotification) {
      NotificationHandler.attachNotification(onNotification);
    }

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(async (remoteMessage) => {
      console.log("Notification on forGround.....", remoteMessage);
    });

    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log("Message handled in the background!", remoteMessage);
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage,
        );
        if (remoteMessage) {
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    // Clear badge number at start
    Notifi.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        Notifi.setApplicationIconBadgeNumber(0);
      }
    });
  }

  createOrUpdateChannel() {
    this.lastChannelCounter++;
    Notifi.createChannel(
      {
        channelId: `${Config.NOTIFICATION_ID}`, // (required)
        channelName: `${Config.NOTIFICATION_ID}`, // (required)
        channelDescription: `Last Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: "default", // car_horn.wav (optional) See `soundName` parameter of `localNotification` function
        importance: Importantce.HIGH, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        userInteraction: true,
        visibility: "public",
        priority: "max",
        largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
        smallIcon: "ic_launcher_round",
      },
      (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    Notifi.popInitialNotification((notification) =>
      console.log("InitialNotication:", notification),
    );
  }

  checkPermission(cbk) {
    return Notifi.checkPermissions(cbk);
  }

  requestPermissions() {
    return Notifi.requestPermissions();
  }

  cancelNotif() {
    Notifi.cancelLocalNotifications({ id: "" + this.lastId });
  }

  cancelAll() {
    Notifi.cancelAllLocalNotifications();
  }

  abandonPermissions() {
    Notifi.abandonPermissions();
  }

  getScheduledLocalNotifications(callback) {
    Notifi.getScheduledLocalNotifications(callback);
  }

  handleInitialNotification() {
    Notifi.popInitialNotification((notification) => {
      console.log("notification-", notification);
      if (notification) {
        console.log("InitialNotication:", notification);
        if (notification.id !== this.lastPoppedNotifiationId) {
          if (notification.userInteraction) {
            setTimeout(() => {
              DeepLinkManager.navigateToNotification(notification);
            }, 2000);
            this.lastPoppedNotifiationId = notification.id;
          }
        }
      }
    });
  }
}
