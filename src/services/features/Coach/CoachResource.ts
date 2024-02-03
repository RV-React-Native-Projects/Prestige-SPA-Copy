import $http from "@global/http";
import Config from "react-native-config";

// const host = Config?.HOST_URL;
const host = "https://nodejsclusters-160185-0.cloudclusters.net";

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, any>;
  id?: string | number;
}

const CoachResource = ($http: any) => {
  const getAllCoach = (params: RequestOptions) => {
    const url = `${host}/api/Stakeholder/findAllCoaches`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  const generateBookingSlots = (params: RequestOptions) => {
    const url = `${host}/api/CoachBooking/generateBookingSlots`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const CoachBookingCreateOne = (params: RequestOptions) => {
    const url = `${host}/api/CoachBooking/createOne`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.post(url, params?.data, params?.headers);
  };

  const getAllBookingForCustomer = (params: RequestOptions) => {
    const url = `${host}/api/CoachBooking/findAllForCustomer/${params?.id}`;

    console.log("URL==>", url);
    console.log("params==>", params);
    return $http.get(url, params?.data, params?.headers);
  };

  return {
    getAllCoach,
    generateBookingSlots,
    CoachBookingCreateOne,
    getAllBookingForCustomer,
  };
};

export default CoachResource($http);
