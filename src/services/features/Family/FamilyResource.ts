import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  id?: string | number;
}

const FamilyResource = ($http: any) => {
  const findAllPlayerCategory = (params: RequestOptions) => {
    const url = `${host}/api/PlayerCategory/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };
  const findAllFamily = (params: RequestOptions) => {
    const url = `${host}/api/FamilyMember/findAllForCustomer/${params.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  const createFamily = (params: RequestOptions) => {
    const url = `${host}/api/FamilyMember/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const updateFamily = (params: RequestOptions) => {
    const url = `${host}/api/FamilyMember/updateOne/${params.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.put(url, params?.data, params?.headers);
  };

  const deleteFamily = (params: RequestOptions) => {
    const url = `${host}/api/FamilyMember/deleteOne/${params.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.delete(url, params?.headers, params?.data);
  };

  return {
    findAllPlayerCategory,
    findAllFamily,
    createFamily,
    updateFamily,
    deleteFamily,
  };
};

export default FamilyResource($http);
