import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const TermResource = ($http: any) => {
  const getAllTerms = (params: RequestOptions) => {
    const url = `${host}/api/Term/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  return {
    getAllTerms,
  };
};

export default TermResource($http);
