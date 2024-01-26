import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import CourtResource from "./CourtResource";

interface CourtManager {
  getAllCourts: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  getAllCoach: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const CourtManager = (
  CourtResource: any,
  Utils: any,
  ErrorConstant: any,
): CourtManager => {
  // Login User
  const getAllCourts = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.getAllCourts(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const getAllCoach = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.getAllCoach(params).then(
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
    getAllCourts,
    getAllCoach,
  };
};

export default CourtManager(CourtResource, Utils, ErrorConstant);
