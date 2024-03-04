import React, { Suspense, useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import AppStack, { useAppNavigation } from "@navigation/Navigation";
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
import NotificationHelper from "@helpers/NotificationHelper";
import Utils from "@common/Utils";

const isIOS = Platform.OS === "ios";

function Loading() {
  const navigation = useAppNavigation();
  const notificationHelper = NotificationHelper();
  const { loadingUser, userEmail, authHeader, user, FCMToken } = useAppSelector(
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
          inAppUpdates.startUpdate(updateOptions);
          // https://github.com/SudoPlz/sp-react-native-in-app-updates/blob/master/src/types.ts#L78
        }
      });
    }
    checkForUpdate();
  }, []);

  useEffect(() => {
    if (userEmail && authHeader && !user) {
      AuthManager.getUserData(
        { email: userEmail, headers: authHeader },
        res => {
          // console.log("User", JSON.stringify(res?.data?.data, null, 2));
          storeDispatch(setUser(res?.data?.data));
          navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
          SplashScreen.hide();
          storeDispatch(setLoadingUser(false));
          storeDispatch(getAppConfig());
        },
        err => {
          console.log("Error fetching the User", err);
          storeDispatch(setLoadingUser(false));
        },
      );
    } else if (!loadingUser && !authHeader && !userEmail) {
      Utils.wait(1500).then(() => SplashScreen.hide());
    }
  }, [userEmail, authHeader, user, !loadingUser]);

  useEffect(() => {
    if (authHeader) {
      if (!FCMToken) notificationHelper.getFcmToken();
      if (FCMToken) notificationHelper.registerListenerWithFCM();
    }
  }, [FCMToken, authHeader]);

  return (
    <Suspense fallback="">
      <AppStack />
    </Suspense>
  );
}

export default Loading;
