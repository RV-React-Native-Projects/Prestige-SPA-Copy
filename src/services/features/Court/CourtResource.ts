import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const courtResource = ($http: any) => {
  const getAllCourts = (params: RequestOptions) => {
    const url = `${host}/api/Location/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("userLogin headers==>", params?.headers);
    return $http.get(url, params?.data, params?.headers);
  };

  const getAllCoach = (params: RequestOptions) => {
    const url = `${host}/api/Stakeholder/findAllCoaches`;

    console.log("URL==>", url);
    console.log("params==>", params);
    console.log("userLogin headers==>", params?.headers);
    return $http.get(url, params?.data, params?.headers);
  };

  return {
    getAllCourts,
    getAllCoach,
  };
};

export default courtResource($http);
