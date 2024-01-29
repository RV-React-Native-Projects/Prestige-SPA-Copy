import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import CoachResource from "./CoachResource";

interface CourtManager {
  getAllCoach: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const CourtManager = (
  CoachResource: any,
  Utils: any,
  ErrorConstant: any,
): CourtManager => {
  const getAllCoach = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CoachResource.getAllCoach(params).then(
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
    getAllCoach,
  };
};

export default CourtManager(CoachResource, Utils, ErrorConstant);
