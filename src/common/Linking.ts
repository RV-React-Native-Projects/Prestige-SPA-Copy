import Config from "react-native-config";

const linking = {
  prefixes: [
    `${Config.SCHEME}://app`,
    `${Config.SCHEME}://`,
    "https://premier.com",
    "https://psracd.com",
    "premier://",
    "psracd://",
  ],
  config: {
    screens: {
      Landing: {
        path: "Landing",
      },
      Login: {
        path: "Login",
      },
      SignUp: {
        path: "SignUp",
      },
      HomeTab: {
        path: "HomeTab",
      },
      CourtTab: {
        path: "CourtTab",
      },
      CoachTab: {
        path: "CoachTab",
      },
      GroupTab: {
        path: "GroupTab",
      },
      BookingTab: {
        path: "BookingTab",
      },
      Tab: {
        path: "Tab",
      },
      CourtDetail: {
        path: "CourtDetail/:courtId",
        parse: { courtId: (courtId: string) => `${courtId}` },
      },
      CoachDetail: {
        path: "CoachDetail/:coachId",
        parse: { coachId: (coachId: string) => `${coachId}` },
      },
      BookingDetails: {
        path: "BookingDetails/:bookingId",
        parse: { bookingId: (bookingId: string) => `${bookingId}` },
      },
      Profile: {
        path: "Profile",
      },
    },
  },
  async getInitialURL(): Promise<string> {
    return linking.getInitialURL();
  },
};

export default linking;
