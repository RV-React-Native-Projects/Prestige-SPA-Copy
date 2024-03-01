import React, { Suspense, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import MyStack, { useAppNavigation } from "@navigation/Navigation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@features/Auth/AuthManager";
import { setLoadingUser, setUser } from "@reducers/UserSlice";
import { getAppConfig } from "@reducers/AppDataSlice";
import { Platform } from "react-native";
import SpInAppUpdates, {
  NeedsUpdateResponse,
  IAUUpdateKind,
  StartUpdateOptions,
} from "sp-react-native-in-app-updates";
import {
  getFcmToken,
  registerListenerWithFCM,
} from "./helpers/NotificationHelper";

const isIOS = Platform.OS === "ios";

function Loading() {
  const navigation = useAppNavigation();
  const { loadingUser, userEmail, authHeader, FCMToken } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();

  useEffect(() => {
    async function checkForUpdate() {
      const inAppUpdates = new SpInAppUpdates(false);
      inAppUpdates.checkNeedsUpdate().then(result => {
        if (result.shouldUpdate) {
          let updateOptions: StartUpdateOptions = {};
          if (Platform.OS === "android") {
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
          }
          inAppUpdates.startUpdate(updateOptions); // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        }
      });
    }
    checkForUpdate();
  }, []);

  useEffect(() => {
    if (authHeader && userEmail) {
      AuthManager.getUserData(
        { email: userEmail, headers: authHeader },
        res => {
          storeDispatch(setUser(res?.data?.data));
          storeDispatch(getAppConfig());
          navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
          SplashScreen.hide();
          storeDispatch(setLoadingUser(false));
        },
        err => {
          console.log("Error fetching the User", err);
          storeDispatch(setLoadingUser(false));
        },
      );
    } else if (!loadingUser && !userEmail && !authHeader) SplashScreen.hide();
  }, [authHeader, userEmail, !loadingUser]);

  console.log("FCMToken==>", FCMToken);

  useEffect(() => {
    if (!FCMToken) getFcmToken();
    if (FCMToken) registerListenerWithFCM();
  }, [FCMToken]);

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
