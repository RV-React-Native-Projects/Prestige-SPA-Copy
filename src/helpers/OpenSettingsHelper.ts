import { Linking, Platform } from "react-native";
import { getBundleId } from "react-native-device-info";

var isIOS = Platform.OS === "ios";
var packageName = getBundleId();
console.log("Bundle ID===>", packageName);

function OpenSettingsHelper() {
  const openIosSettings = () => {
    Linking.openURL("app-settings:");
  };

  function openAppSettings() {
    if (isIOS) openIosSettings();
    else Linking.openSettings();
  }

  function openLocationSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("location-settings");
  }

  function openWifiSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("wifi-settings");
  }

  function openBluetoothSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("bluetooth-settings");
  }

  function openMobileDataSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("data-roaming-settings");
  }

  function openDisplaySettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("display-settings");
  }

  function openSoundSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("sound-settings");
  }

  function openAccessibilitySettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("accessibility-settings");
  }

  function openSecuritySettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("security-settings");
  }

  function openApplicationsSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("applications-settings");
  }

  function openVpnSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("vpn-settings");
  }

  function openNfcSettings() {
    if (isIOS) openIosSettings();
    else Linking.openURL("nfc-settings");
  }

  return {
    openAppSettings: openAppSettings,
    openLocationSettings: openLocationSettings,
    openWifiSettings: openWifiSettings,
    openBluetoothSettings: openBluetoothSettings,
    openMobileDataSettings: openMobileDataSettings,
    openDisplaySettings: openDisplaySettings,
    openSoundSettings: openSoundSettings,
    openAccessibilitySettings: openAccessibilitySettings,
    openSecuritySettings: openSecuritySettings,
    openApplicationsSettings: openApplicationsSettings,
    openVpnSettings: openVpnSettings,
    openNfcSettings: openNfcSettings,
  };
}

export default OpenSettingsHelper();

export function openAppSettings(settingType: string) {
  const deepLinks: {
    android: Record<string, string>;
    ios: Record<string, string>;
  } = {
    android: {
      wifi: "android.settings.WIFI_SETTINGS",
      bluetooth: "android.settings.BLUETOOTH_SETTINGS",
      location: "android.settings.LOCATION_SOURCE_SETTINGS",
      mobileData: "android.settings.DATA_ROAMING_SETTINGS",
      appNotification: "android.settings.APP_NOTIFICATION_SETTINGS",
      sound: "android.settings.SOUND_SETTINGS",
      display: "android.settings.DISPLAY_SETTINGS",
      security: "android.settings.SECURITY_SETTINGS",
      app: `android.settings.APPLICATION_DETAILS_SETTINGS?package=${packageName}`,
      Battery_saver: "android.settings.BATTERY_SAVER_SETTINGS",
      Data_usage: "android.settings.DATA_USAGE_SETTINGS",
      Date_time: "android.settings.DATE_SETTINGS",
      Language: "android.settings.LOCALE_SETTINGS",
      NFC: "android.settings.NFC_SETTINGS",
      Storage: "android.settings.INTERNAL_STORAGE_SETTINGS", //(opens the "Storage & USB" screen),
      VPN: "android.settings.VPN_SETTINGS",
      Wireless: "android.settings.WIRELESS_SETTINGS", //(opens the "Settings" screen with the "Network & internet" option selected)
    },
    ios: {
      app: `app-settings:${packageName}`,
      Cellular: "App-Prefs:root=MOBILE_DATA_SETTINGS_ID",
      Do_Not_Disturb: "App-Prefs:root=DO_NOT_DISTURB",
      General: "App-Prefs:root=General",
      Keyboard: "App-Prefs:root=General&path=Keyboard",
      Siri: "App-Prefs:root=SIRI",
    },
  };

  let uri: any;
  if (Platform.OS === "android") {
    uri = deepLinks.android[settingType];
    if (packageName && settingType === "app") {
      uri = uri.replace("${packageName}", packageName);
    }
  } else if (Platform.OS === "ios") {
    uri = deepLinks.ios[settingType];
    if (packageName && settingType === "app") {
      uri = uri.replace("${bundleId}", packageName);
    }
  }

  Linking.openURL(uri);
}

//  function openAppLocationSettings() {
//   // const packageNam = Platform.select({
//   //   ios: packageName,
//   //   android: packageName
//   // });

//   const deepLinks = {
//     android: `android.settings.APPLICATION_DETAILS_SETTINGS?package=${packageName}`,
//     ios: `App-Prefs:root=Privacy&path=LOCATION/${packageName}`,
//   };

//   const uri = Platform.select({
//     ios: deepLinks.ios,
//     android: deepLinks.android,
//   });

//   Linking.openURL(uri);
// }

export function openAppLocationSettings() {
  // const packageName = Platform.select({
  //   ios: 'your.app.bundle.id',
  //   android: 'your.app.package.name'
  // });

  const deepLinks = {
    android: `package:${packageName}`,
    ios: `App-Prefs:root=Privacy&path=LOCATION/${packageName}`,
  };

  // const uri = 'intent://settings/apps/com.transportsimple.driver_app.dev/app-details#Intent;scheme=android;action=android.intent.action.VIEW;category=android.intent.category.DEFAULT;category=android.intent.category.BROWSABLE;end;';

  const uri = Platform.select({
    ios: deepLinks.ios,
    android: `package://com.transportsimple.driver_app.dev/settings`,
  });

  Linking.openURL("package://com.transportsimple.driver_app/settings");
}

export function openAppSettings2() {
  // const packageName = Platform.select({
  //   ios: 'your.app.bundle.id',
  //   android: 'your.app.package.name'
  // });

  const deepLinks = {
    android: `package:${packageName}`,
    ios: `app-settings:${packageName}`,
  };

  const uri: any = Platform.select({
    ios: deepLinks.ios,
    android: `intent://#Intent;package=${packageName};action=android.intent.action.APPLICATION_DETAILS_SETTINGS;data=${deepLinks.android};end`,
  });

  Linking.openURL(uri);
}
