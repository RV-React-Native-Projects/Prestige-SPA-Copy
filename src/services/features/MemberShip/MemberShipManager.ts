import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import MemberShipResource from "./MemberShipResource";

interface MemberShipManager {
  findAllForCustomer: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  createMemberShip: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const MemberShipManager = (
  TermResource: any,
  Utils: any,
  ErrorConstant: any,
): MemberShipManager => {
  const findAllForCustomer = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.findAllForCustomer(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const createMemberShip = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.createMemberShip(params).then(
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
    findAllForCustomer,
    createMemberShip,
  };
};

export default MemberShipManager(MemberShipResource, Utils, ErrorConstant);
