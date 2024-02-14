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

  const signUpUser = (params: RequestOptions) => {
    const url = `${host}/api/Stakeholder/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  return {
    getUserData,
    userLogin,
    signUpUser,
  };
};

export default usersResource($http);
