import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import FamilyResource from "./FamilyResource";

interface FamilyManager {
  findAllPlayerCategory: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  findAllFamily: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  createFamily: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  updateFamily: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
  deleteFamily: (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => void;
}

const FamilyManager = (
  TermResource: any,
  Utils: any,
  ErrorConstant: any,
): FamilyManager => {
  const findAllPlayerCategory = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.findAllPlayerCategory(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        errorCallback(error);
      },
    );
  };

  const findAllFamily = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.findAllFamily(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        errorCallback(error);
      },
    );
  };

  const createFamily = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.createFamily(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        errorCallback(error);
      },
    );
  };

  const updateFamily = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.updateFamily(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        errorCallback(error);
      },
    );
  };

  const deleteFamily = (
    params: any,
    successCallback: (userResponse: any) => void,
    errorCallback: (error: any) => void,
  ) => {
    TermResource.deleteFamily(params).then(
      (userResponse: any) => {
        successCallback(userResponse);
      },
      (error: any) => {
        errorCallback(error);
      },
    );
  };

  return {
    findAllPlayerCategory,
    findAllFamily,
    createFamily,
    updateFamily,
    deleteFamily,
  };
};

export default FamilyManager(FamilyResource, Utils, ErrorConstant);
