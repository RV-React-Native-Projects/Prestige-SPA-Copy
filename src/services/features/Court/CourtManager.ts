import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import CourtResource from "./CourtResource";

interface CourtManager {
  getAllCourts: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  getSlots: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  generateBookingSlots: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  createOneBooking: (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const CourtManager = (
  CourtResource: any,
  Utils: any,
  ErrorConstant: any,
): CourtManager => {
  const getAllCourts = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.getAllCourts(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const getSlots = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.getSlots(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const generateBookingSlots = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.generateBookingSlots(params).then(
      (res: any) => {
        successCallback(res);
      },
      (error: any) => {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  };

  const createOneBooking = (
    params: any,
    successCallback: (res: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    CourtResource.createOneBooking(params).then(
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
    getAllCourts,
    getSlots,
    generateBookingSlots,
    createOneBooking,
  };
};

export default CourtManager(CourtResource, Utils, ErrorConstant);
