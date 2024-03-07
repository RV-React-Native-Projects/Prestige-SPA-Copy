import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
}

const stripeResource = ($http: any) => {
  const generatePaymentSheet = (params: RequestOptions) => {
    const url = `${host}/stripe/generatePaymentSheet`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  return {
    generatePaymentSheet,
  };
};

export default stripeResource($http);
