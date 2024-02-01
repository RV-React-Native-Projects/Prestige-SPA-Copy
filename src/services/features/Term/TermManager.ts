import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import TermResource from "./TermResource";

interface TermManager {
  getAllTerms: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const TermManager = (
  TermResource: any,
  Utils: any,
  ErrorConstant: any,
): TermManager => {
  const getAllTerms = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.getAllTerms(params).then(
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
    getAllTerms,
  };
};

export default TermManager(TermResource, Utils, ErrorConstant);
