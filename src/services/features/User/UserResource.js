import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

// https://devapi.transportsimple.com/api/v1company/driver-app/user/details/
const usersResource = function ($http) {
  function getUserInfo(params) {
    var url = host + "/api/v1/company/driver-app/user/details/";

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("getUserInfo headers==>", params?.headers);
    return $http.get(url, params, params?.headers);
  }

  function logoutUser(params) {
    var url = host + "/rest-auth/logout/";

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("getUserInfo headers==>", params?.headers);
    return $http.post(url, null, params?.headers);
  }

  function userAliveness(params) {
    var url = host + "/api/v1/user/aliveness/";

    console.log("URL==>", url);
    // console.log("userAliveness headers==>", params?.headers);
    return $http.get(url, null, params?.headers);
  }

  function registerUser(params) {
    var url = host + "/api/v1/user/token/register/";

    console.log("URL==>", url);
    console.log("registerUser headers==>", params?.headers);
    return $http.get(url, null, params?.headers);
  }

  function registerFCM(params) {
    var url = host + "/api/v1/user/cm_token/register/";

    console.log("URL==>", url);
    console.log("registerUser headers==>", params?.headers);
    return $http.post(url, params?.data, params?.headers);
  }

  return {
    getUserInfo,
    logoutUser,
    userAliveness,
    registerUser,
    registerFCM,
  };
};

export default usersResource($http);
