import I18n from "i18n-js";
import { Platform } from "react-native";
import RNPermissions, {
  request,
  check,
  NotificationOption,
  Permission,
  PERMISSIONS,
  RESULTS,
  requestLocationAccuracy,
  openSettings,
  requestMultiple,
} from "react-native-permissions";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";

const isIOS = Platform.OS === "ios";

type PermissionStatus =
  | "unavailable"
  | "denied"
  | "limited"
  | "granted"
  | "blocked";

type PlatformPermissions = {
  android: Record<string, string>;
  ios: Record<string, string>;
};

interface PermissionsInterFace {
  checkPermission: (per: string) => void;
  getCameraPermissions: () => Promise<boolean>;
  getLocationPermissions: () => Promise<boolean>;
  askUserToOnLocation: () => void;
  requestMediaLibraryPermission: () => Promise<boolean>;
  requestReadMediaImagesPermission: () => Promise<boolean>;
  requestPhotoLibraryPermission: () => Promise<boolean>;
  requestPostNotificationPermission: () => Promise<boolean>;
  requestReadExternalStoragePermission: () => Promise<boolean>;
}

const Permissions = (): PermissionsInterFace => {
  const checkPermission = async (permission: any) => {
    return check(permission)
      .then(result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              "This feature is not available (on this device / in this context)",
            );
            break;
          case RESULTS.DENIED:
            console.log(
              "The permission has not been requested / is denied but requestable",
            );
            break;
          case RESULTS.LIMITED:
            console.log("The permission is limited: some actions are possible");
            break;
          case RESULTS.GRANTED:
            console.log("The permission is granted");
            break;
          case RESULTS.BLOCKED:
            console.log("The permission is denied and not requestable anymore");
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getCameraPermissions = async () => {
    if (isIOS) {
      await checkPermission(PERMISSIONS.IOS.CAMERA);
      const granted = await request(PERMISSIONS.IOS.CAMERA);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    } else {
      await checkPermission(PERMISSIONS.ANDROID.CAMERA);
      const granted = await request(PERMISSIONS.ANDROID.CAMERA);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  const getLocationPermissions = async () => {
    if (isIOS) {
      await checkPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    } else {
      await checkPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      const permission = granted === RESULTS.GRANTED;
      // if (permission) await askUserToOnLocation();
      return permission;
    }
  };

  async function askUserToOnLocation() {
    return await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
    })
      .then(data => {
        console.log("LocationEnabler==>", data);
        return data;
      })
      .catch(err => {
        console.log("LocationEnabler Error==>", err);
        return err;
      });
  }

  async function requestMediaLibraryPermission() {
    if (isIOS) {
      await checkPermission(PERMISSIONS.IOS.MEDIA_LIBRARY);
      const granted = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    } else {
      await checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  }

  async function requestReadMediaImagesPermission() {
    await checkPermission(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    const granted = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    const permission = granted === RESULTS.GRANTED;
    return permission;
  }

  async function requestPhotoLibraryPermission() {
    if (isIOS) {
      await checkPermission(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const granted = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    } else return false;
  }

  async function requestPostNotificationPermission() {
    await checkPermission(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    const granted = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    const permission = granted === RESULTS.GRANTED;
    return permission;
  }

  async function requestReadExternalStoragePermission() {
    await checkPermission(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    const granted = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    var isNotGranted = granted != RESULTS.GRANTED;
    if (isNotGranted) {
      return requestReadMediaImagesPermission();
    } else {
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  }

  return {
    checkPermission,
    getCameraPermissions,
    getLocationPermissions,
    askUserToOnLocation,
    requestMediaLibraryPermission,
    requestReadMediaImagesPermission,
    requestPhotoLibraryPermission,
    requestPostNotificationPermission,
    requestReadExternalStoragePermission,
  };
};

export default Permissions();
