import DeviceInfo from "react-native-device-info";

export const getBundleId = () => {
  return DeviceInfo.getBundleId();
};
export const getVersion = () => {
  return DeviceInfo.getVersion();
};
export default {
  getBundleId,
  getVersion,
};
