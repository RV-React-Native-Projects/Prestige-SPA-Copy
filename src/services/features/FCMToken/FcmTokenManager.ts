import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import FcmTokenResource from "./FcmTokenResource";

interface FcmTokenManager {
  updateFcmToken: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  deleteFcmToken: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const FcmTokenManager = (
  FcmTokenResource: any,
  Utils: any,
  ErrorConstant: any,
): FcmTokenManager => {
  const updateFcmToken = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    FcmTokenResource.updateFcmToken(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const deleteFcmToken = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    FcmTokenResource.deleteFcmToken(params).then(
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
    updateFcmToken,
    deleteFcmToken,
  };
};

export default FcmTokenManager(FcmTokenResource, Utils, ErrorConstant);
