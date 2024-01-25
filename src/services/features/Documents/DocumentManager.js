import ErrorConstants from "@common/ErrorConstant";
import Utils from "@common/Utils";
import DocumentResource from "./DocumentResource";

const DocumentManager = function (DocumentResource, Utils, ErrorConstants) {
  function uploadFile(params, successCallback, errorCallback) {
    DocumentResource.uploadFile(params).then(
      function (uploadDocResponse) {
        successCallback(uploadDocResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  function deleteFile(params, successCallback, errorCallback) {
    DocumentResource.deleteFile(params).then(
      function (uploadDocResponse) {
        successCallback(uploadDocResponse);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  function getTripDocFields(params, successCallback, errorCallback) {
    DocumentResource.getTripDocFields(params).then(
      function (res) {
        successCallback(res);
      },
      function (error) {
        error = Utils.updateErrorObject(error);
        errorCallback(error);
      },
    );
  }

  return {
    uploadFile,
    deleteFile,
    getTripDocFields,
  };
};

export default DocumentManager(DocumentResource, Utils, ErrorConstants);
