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
    return $http.get(url, params?.data, params?.headers);
  };

  const getSlots = (params: RequestOptions) => {
    const url = `${host}/api/Slot/findAll`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  const generateBookingSlots = (params: RequestOptions) => {
    const url = `${host}/api/CourtBooking/generateBookingSlots`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const createOneBooking = (params: RequestOptions) => {
    const url = `${host}/api/CourtBooking/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  return {
    getAllCourts,
    getSlots,
    generateBookingSlots,
    createOneBooking
  };
};

export default courtResource($http);
