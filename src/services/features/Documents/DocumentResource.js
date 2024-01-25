import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

const DocumentResource = function ($http) {
  function uploadFile(params) {
    var url = host + "/api/v1/document/";
    const headers = {
      "Content-Type": "multipart/form-data",
      ...params?.headers,
    };

    console.log("URL==>", url);
    console.log("Data==>", JSON.stringify(params?.data, null, 2));
    console.log("headers==>", headers);
    return $http.post(url, params?.data, headers);
  }

  function deleteFile(params) {
    var url = host + `/api/v1/document/${params?.id}/`;

    console.log("URL==>", url);
    console.log("Data==>", JSON.stringify(params?.body, null, 2));
    return $http.delete(url, params?.headers, params?.body);
  }

  function getTripDocFields(params) {
    var url = host + `/api/v1/company/driver-app/trip/docfields/${params?.id}/`;

    console.log("URL==>", url);
    // console.log("Data==>", JSON.stringify(params?.body, null, 2));
    return $http.get(url, params, params?.headers);
  }

  return {
    uploadFile,
    deleteFile,
    getTripDocFields,
  };
};

export default DocumentResource($http);
