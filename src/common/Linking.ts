import Config from "react-native-config";

const linking = {
  prefixes: [
    `${Config.SCHEME}://app`,
    `${Config.SCHEME}://`,
    "https://druce.com",
    "druce://",
  ],
  // config: {
  //   screens: {
  //     Landing_Page: {
  //       path: "landing",
  //     },
  //     Login_Page: {
  //       path: "login",
  //     },
  //     Otp_Page: {
  //       path: "otp",
  //     },
  //     Tab_Home: {
  //       initialRouteName: "home",
  //       screens: {
  //         Home_Page: {
  //           path: "home",
  //         },
  //         Trip_Details_Page: {
  //           path: "trip_details/:tripId",
  //           parse: { tripId: (tripId: string) => `${tripId}` },
  //         },
  //         Profile_Page: {
  //           path: "profile",
  //         },
  //         Notification_Page: "notification",
  //         VehicleDocument_Page: {
  //           path: "vehicledocument/:vehicleId",
  //           parse: {
  //             vehicleId: (vehicleId: string) => `${vehicleId}`,
  //           },
  //         },
  //         CompleteTrip_Page: {
  //           path: "completetrip/:tripId",
  //           parse: {
  //             tripId: (tripId: string) => `${tripId}`,
  //           },
  //         },
  //         TripDocument_Page: {
  //           path: "tripdocument/:id",
  //           parse: {
  //             id: (id: string) => `${id}`,
  //           },
  //         },
  //         PodReceived_Page: {
  //           path: "podreceived/:id",
  //           parse: {
  //             id: (id: string) => `${id}`,
  //           },
  //         },
  //         Settings: "settings",
  //         TripExpense_Page: {
  //           path: "tripexpense/:tripId/:tripStatus",
  //           parse: {
  //             tripId: (tripId: string) => `${tripId}`,
  //             tripStatus: (tripStatus: string) => `${tripStatus}`,
  //           },
  //         },
  //         AddEditTripExpense_Page: {
  //           path: "addedit_tripexpense/:tripId",
  //           parse: {
  //             tripId: (tripId: string) => `${tripId}`,
  //           },
  //         },
  //       },
  //     },

  //     Tab_Attendance: {
  //       initialRouteName: "attendance",
  //       screens: {
  //         Attendance_Page: {
  //           path: "attendance",
  //         },
  //         AttendanceDetails_Page: {
  //           path: "attendance_details",
  //         },
  //         DateFilter_Page: {
  //           path: "datefilter",
  //         },
  //       },
  //     },
  //   },
  // },
  // async getInitialURL(): Promise<string> {
  //   return linking.getInitialURL();
  // },
};

export default linking;
