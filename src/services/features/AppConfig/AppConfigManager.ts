import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import AppConfigResource from "./AppConfigResource";

interface AppConfigManager {
  getAppConfig: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const AppConfigManager = (
  AppConfigResource: any,
  Utils: any,
  ErrorConstant: any,
): AppConfigManager => {
  const getAppConfig = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    AppConfigResource.getAppConfig(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  return {
    getAppConfig,
  };
};

export default AppConfigManager(AppConfigResource, Utils, ErrorConstant);
