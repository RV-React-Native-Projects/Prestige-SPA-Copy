import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  email?: string;
  id?: number | string;
}

const usersResource = ($http: any) => {
  const getUserData = (params: RequestOptions) => {
    const url = `${host}/api/Stakeholder/findOne/${params.email}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("userLogin headers==>", params?.headers);
    return $http.get(url, params?.data, params?.headers);
  };

  const userLogin = (params: RequestOptions) => {
    const url = `${host}/api/Stakeholder/login`;

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("userLogin headers==>", params?.headers);
    return $http.post(url, params?.data, params?.headers);
  };

  const verifyOTP = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/verify`;

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("userLogin headers==>", params?.headers);
    return $http.post(url, params?.data, params?.headers);
  };

  const getUserInfo = (params: RequestOptions) => {
    const url = `${host}/api/v1/user/getUser`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  const resendOTP = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/resend`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const signUpUser = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/signup`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const editUser = (params: RequestOptions) => {
    const url = `${host}/api/v1/user/editUser`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const profileUpload = (params: RequestOptions) => {
    const url = `${host}/api/v1/user/profile`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const forgotPassword = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/forgot`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const reSetPassword = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/reset`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const createNewPassword = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/confirm`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const refreshUserToken = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/refresh`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const checkToken = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/check_token`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const logoutUser = (params: RequestOptions) => {
    const url = `${host}/api/v1/auth/v2/logout`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const deleteUser = (params: RequestOptions) => {
    const url = `${host}/api/v1/user/profile`;
    //  NOTE - I don't Think API is Correct. @RV

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  return {
    getUserData,
    userLogin,
    verifyOTP,
    getUserInfo,
    resendOTP,
    signUpUser,
    editUser,
    profileUpload,
    forgotPassword,
    reSetPassword,
    createNewPassword,
    refreshUserToken,
    checkToken,
    logoutUser,
    deleteUser,
  };
};

export default usersResource($http);
