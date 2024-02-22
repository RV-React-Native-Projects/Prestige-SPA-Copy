import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const appConfigResource = ($http: any) => {
  const getAppConfig = (params: RequestOptions) => {
    const url = `${host}/api/Config/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  return {
    getAppConfig,
  };
};

export default appConfigResource($http);
