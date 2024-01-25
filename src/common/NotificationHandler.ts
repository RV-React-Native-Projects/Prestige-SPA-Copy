import { Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import DeepLinkManager from "./DeepLinkManager";

class NotificationHandler {
  onNotification(notification:any) {
    console.log("NotificationHandler :- ", notification);

    if (notification.userInteraction) {
      console.log("notification interactions-");
      setTimeout(() => {
        DeepLinkManager.navigateToNotification(notification);
      }, 1000);
    }

    if (
      typeof this._onNotification === "function" &&
      notification.userInteraction
    ) {
      this._onNotification(notification);
    }
  }

  onRegister(token) {
    console.log("NotificationHandler : ", token);

    if (typeof this._onRegister === "function") {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    console.log("Notification action received:");
    console.log(notification.action);
    console.log(notification);

    if (notification.action === "Yes") {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    console.log("NotificationHandler : notification registation error", err);
  }

  attachRegister(handler) {
    console.log("NotificationHandler : attachRegister", handler);
    this._onRegister = handler;
  }

  attachNotification(handler) {
    console.log("NotificationHandler : attachNotification", handler);
    this._onNotification = handler;
  }
}

const handler = new NotificationHandler();

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("NotificationHandler : configure : onRegister", token, handler);
    handler.onRegister.bind(handler)(token);
  },

  // (required) Called when a remote or local notification is opened or received
  onNotification: handler.onNotification.bind(handler),

  // (optional) Called when Action is pressed (Android)
  onAction: handler.onAction.bind(handler),

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (error) {
    console.log(
      "NotificationHandler : configure : onRegister error",
      error,
      handler,
    );
    handler.onRegistrationError.bind(handler)(error);
  },
  senderID: "414512906503",
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,

  // Should the initial notification be popped automatically
  // default: true
  // popInitialNotification: Platform.OS !== "android",

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   */
  requestPermissions: true,
});

export default handler;
