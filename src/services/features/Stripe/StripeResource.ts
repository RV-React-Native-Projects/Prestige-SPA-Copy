import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

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
