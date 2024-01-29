import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const AvailableCreditResource = ($http: any) => {
  const createCredit = (params: RequestOptions) => {
    const url = `${host}/api/AvailableCredit/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const findAllCredit = (params: RequestOptions) => {
    const url = `${host}/api/AvailableCredit/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  return {
    createCredit,
    findAllCredit,
  };
};

export default AvailableCreditResource($http);
