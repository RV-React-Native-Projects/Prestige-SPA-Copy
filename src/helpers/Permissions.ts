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

type DevicePermissions = {
  android?: {
    ACCEPT_HANDOVER: string;
    ACCESS_BACKGROUND_LOCATION: string;
    ACCESS_COARSE_LOCATION: string;
    ACCESS_FINE_LOCATION: string;
    ACCESS_MEDIA_LOCATION: string;
    ACTIVITY_RECOGNITION: string;
    ADD_VOICEMAIL: string;
    ANSWER_PHONE_CALLS: string;
    BLUETOOTH_ADVERTISE: string;
    BLUETOOTH_CONNECT: string;
    BLUETOOTH_SCAN: string;
    BODY_SENSORS: string;
    BODY_SENSORS_BACKGROUND: string;
    CALL_PHONE: string;
    CAMERA: string;
    GET_ACCOUNTS: string;
    NEARBY_WIFI_DEVICES: string;
    POST_NOTIFICATIONS: string;
    PROCESS_OUTGOING_CALLS: string;
    READ_CALENDAR: string;
    READ_CALL_LOG: string;
    READ_CONTACTS: string;
    READ_EXTERNAL_STORAGE: string;
    READ_MEDIA_AUDIO: string;
    READ_MEDIA_IMAGES: string;
    READ_MEDIA_VIDEO: string;
    READ_MEDIA_VISUAL_USER_SELECTED: string;
    READ_PHONE_NUMBERS: string;
    READ_PHONE_STATE: string;
    READ_SMS: string;
    RECEIVE_MMS: string;
    RECEIVE_SMS: string;
    RECEIVE_WAP_PUSH: string;
    RECORD_AUDIO: string;
    SEND_SMS: string;
    USE_SIP: string;
    UWB_RANGING: string;
    WRITE_CALENDAR: string;
    WRITE_CALL_LOG: string;
    WRITE_CONTACTS: string;
    WRITE_EXTERNAL_STORAGE: string;
  };
  ios?: {
    APP_TRACKING_TRANSPARENCY: string;
    BLUETOOTH: string;
    CALENDARS: string;
    CALENDARS_WRITE_ONLY: string;
    CAMERA: string;
    CONTACTS: string;
    FACE_ID: string;
    LOCATION_ALWAYS: string;
    LOCATION_WHEN_IN_USE: string;
    MEDIA_LIBRARY: string;
    MICROPHONE: string;
    MOTION: string;
    PHOTO_LIBRARY: string;
    PHOTO_LIBRARY_ADD_ONLY: string;
    REMINDERS: string;
    SIRI: string;
    SPEECH_RECOGNITION: string;
    STOREKIT: string;
  };
  windows?: {
    [key: string]: string;
  };
  default?: {};
  // [key: string]: Record<string, string> | undefined;
};

type PlatformPermissionMappings = {
  android: DevicePermissions["android"];
  ios: DevicePermissions["ios"];
  windows: DevicePermissions["windows"];
  default: Record<string, string>;
  [key: string]: Record<string, string> | undefined;
};

const platformPermissionMappings: PlatformPermissionMappings = {
  android: PERMISSIONS.ANDROID,
  ios: PERMISSIONS.IOS,
  windows: PERMISSIONS.WINDOWS,
  default: {},
};

const { ...PERMISSIONS_IOS } = PERMISSIONS.IOS; // remove siri (certificate required)

const PLATFORM_PERMISSIONS = Platform.select<
  | typeof PERMISSIONS.ANDROID
  | typeof PERMISSIONS_IOS
  | typeof PERMISSIONS.WINDOWS
  | {}
>({
  android: PERMISSIONS.ANDROID,
  ios: PERMISSIONS_IOS,
  windows: PERMISSIONS.WINDOWS,
  default: {},
});

const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

const Permissions = () => {
  const isIOS = Platform.OS === "ios";

  const deviceType: DevicePermissions = Platform.select({
    android: PERMISSIONS.ANDROID,
    ios: PERMISSIONS.IOS,
    windows: PERMISSIONS.WINDOWS,
    default: platformPermissionMappings.default,
  });

  const checkPermission = async (type: DevicePermissions[]) => {
    try {
      const result = await check(PERMISSIONS_VALUES[type]);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(`This feature ${type} is not available`);
          break;
        case RESULTS.DENIED:
          console.log(
            `The permission ${type} has not been requested / is denied but requestable`,
          );
          break;
        case RESULTS.LIMITED:
          console.log(
            `The permission ${type} is limited: some actions are possible`,
          );
          break;
        case RESULTS.GRANTED:
          console.log(`The permission ${type} is granted`);
          break;
        case RESULTS.BLOCKED:
          console.log(
            `The permission ${type} is denied and not requestable anymore`,
          );
          break;
      }
    } catch (error) {
      console.log(`Error Asking the Permission ${type}`, error);
    }
  };

  const isPermissionGranted = async (type: any) => {
    try {
      const result = await check(deviceType[type]);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.log(`Error Asking the Permission ${type}`, error);
      return false;
    }
  };

  const openAppSettings = (params: any) => {
    openSettings().catch(() => console.warn("cannot open settings"));
  };

  const requestPostNotificationPermission = async () => {
    await checkPermission(deviceType.POST_NOTIFICATIONS);
    const granted = await request(deviceType.POST_NOTIFICATIONS);
    const permission = granted === RESULTS.GRANTED;
    return permission;
  };

  const requestCameraPermission = async () => {
    await checkPermission(deviceType.CAMERA);
    const granted = await request(deviceType.CAMERA);
    const permission = granted === RESULTS.GRANTED;
    return permission;
  };

  const askUserToOnLocation = async () => {
    const isAllowed =
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        // fastInterval: 5000,
      })
        .then(data => {
          console.log("RNAndroidLocationEnabler==>", data);
          return data;
        })
        .catch(err => {
          console.log("RNAndroidLocationEnabler==>", err);
          return err;
        });
    const granted = isAllowed === "already-enabled";
    return granted;
  };

  const requestMediaLibraryPermission = async () => {
    if (isIOS) {
      // await checkPermission(PERMISSIONS.IOS.MEDIA_LIBRARY);
      const granted = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    } else {
      await checkPermission(deviceType.MEDIA_LIBRARY);
      const granted = await request(deviceType.MEDIA_LIBRARY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  const requestReadMediaImagesPermission = async () => {
    await checkPermission(deviceType.READ_MEDIA_IMAGES);
    const granted = await request(deviceType.READ_MEDIA_IMAGES);
    const permission = granted === RESULTS.GRANTED;
    return permission;
  };

  const requestReadExternalStoragePermission = async () => {
    await checkPermission(deviceType.READ_EXTERNAL_STORAGE);
    const granted = await request(deviceType.READ_EXTERNAL_STORAGE);
    var isNotGranted = granted != RESULTS.GRANTED;
    if (isNotGranted) {
      return requestReadMediaImagesPermission();
    } else {
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  const requestWriteExternalStoragePermission = async () => {
    await checkPermission(deviceType.WRITE_EXTERNAL_STORAGE);
    const granted = await request(deviceType.WRITE_EXTERNAL_STORAGE);
    var isNotGranted = granted != RESULTS.GRANTED;
    if (isNotGranted) {
      return requestReadMediaImagesPermission();
    } else {
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  const requestPhotoLibraryPermission = async () => {
    if (isIOS) {
      await checkPermission(deviceType.PHOTO_LIBRARY);
      const granted = await request(deviceType.PHOTO_LIBRARY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  const requestPhotoLibraryAddOnlyPermission = async () => {
    if (isIOS) {
      await checkPermission(deviceType.PHOTO_LIBRARY_ADD_ONLY);
      const granted = await request(deviceType.PHOTO_LIBRARY_ADD_ONLY);
      const permission = granted === RESULTS.GRANTED;
      return permission;
    }
  };

  return {
    checkPermission,
    // isAlwaysLocationPermissionGranted,
    isPermissionGranted,
    openAppSettings,
    askUserToOnLocation,
    // requestAppTrackingPermission,
    // requestAllowAlwaysPermission,
    requestPostNotificationPermission,
    requestCameraPermission,
    // requestLocationAlwaysPermission,
    // requestFinelocation,
    // requestCoarselocation,
    // requestLocationOnlyWhenusePermission,
    // requestLocationAccuracyPermission,
    requestMediaLibraryPermission,
    requestPhotoLibraryPermission,
    requestPhotoLibraryAddOnlyPermission,
    requestReadMediaImagesPermission,
    requestReadExternalStoragePermission,
    requestWriteExternalStoragePermission,
  };
};

export default Permissions;
