import Utils from "@common/Utils";
import ErrorConstant from "@common/ErrorConstant";
import usersResource from "./UserResource";

const UserManager = function (usersResource, Utils, ErrorConstant) {
  function getUserInfo(params, successCallback, errorCallback) {
    if (Utils.isValidPhoneNumber(params.coupon_code)) {
      var error = Utils.ErrorObject(
        ErrorConstant.ErrorCodes.INVALID_PHONE_NUMBER,
        false,
      );
      errorCallback(error);
    } else {
      usersResource.getUserInfo(params).then(
        function (userResponse) {
          successCallback(userResponse);
        },
        function (error) {
          error = Utils.updateErrorObject(error);
          errorCallback(error);
        },
      );
    }
  }

  function logoutUser(params, successCallback, errorCallback) {
    usersResource.logoutUser(params).then(
      function (logoutResponse) {
        successCallback(logoutResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  function userAliveness(params, successCallback, errorCallback) {
    usersResource.userAliveness(params).then(
      function (logoutResponse) {
        successCallback(logoutResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  function registerUser(params, successCallback, errorCallback) {
    usersResource.registerUser(params).then(
      function (logoutResponse) {
        successCallback(logoutResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  function registerFCM(params, successCallback, errorCallback) {
    usersResource.registerFCM(params).then(
      function (logoutResponse) {
        successCallback(logoutResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  return {
    getUserInfo,
    logoutUser,
    userAliveness,
    registerUser,
    registerFCM,
  };
};

export default UserManager(usersResource, Utils, ErrorConstant);
