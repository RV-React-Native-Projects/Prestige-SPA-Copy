import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import AvailableCreditResource from "./AvailableCreditResource";

interface AvailableCreditManager {
  createCredit: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;

  findAllCredit: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const AvailableCreditManager = (
  AvailableCreditResource: any,
  Utils: any,
  ErrorConstant: any,
): AvailableCreditManager => {
  const createCredit = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    AvailableCreditResource.createCredit(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const findAllCredit = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    AvailableCreditResource.findAllCredit(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  return {
    createCredit,
    findAllCredit,
  };
};

export default AvailableCreditManager(
  AvailableCreditResource,
  Utils,
  ErrorConstant,
);
