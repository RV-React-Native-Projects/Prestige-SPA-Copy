import $http from "@global/http";
import Config from "react-native-config";

const host = Config?.HOST_URL;

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  id?: string | number;
}

const MemberShipResource = ($http: any) => {
  const findAllForCustomer = (params: RequestOptions) => {
    const url = `${host}/api/Membership/findAllForCustomer/${params.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  const createMemberShip = (params: RequestOptions) => {
    const url = `${host}/api/Membership/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  return {
    findAllForCustomer,
    createMemberShip,
  };
};

export default MemberShipResource($http);
