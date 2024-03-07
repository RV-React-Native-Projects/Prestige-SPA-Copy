import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  params?: Record<string, any>;
  id: string | number;
}

const FcmTokenResource = ($http: any) => {
  const updateFcmToken = (params: RequestOptions) => {
    const url = `${host}/api/DeviceTokenMapping/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const deleteFcmToken = (params: RequestOptions) => {
    const url = `${host}/api/DeviceTokenMapping/deleteOne/${params?.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.delete(url, params?.data, params?.headers);
  };

  return {
    updateFcmToken,
    deleteFcmToken,
  };
};

export default FcmTokenResource($http);
