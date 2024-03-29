import React, { Suspense, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import MyStack, { useAppNavigation } from "@navigation/Navigation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@features/Auth/AuthManager";
import { useEncryptedStorage } from "@hooks/useEncryptedStorage";
import {
  setAuthToken,
  setLoadingUser,
  setRefreshToken,
  setUser,
} from "@reducers/UserSlice";
import Utils from "@common/Utils";

function Loading() {
  const navigation = useAppNavigation();
  const { user, userToken, loadingUser, userEmail } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();
  const { setStorage } = useEncryptedStorage();

  // @RV take a Look at these Logics after the Splash Scrren in Place
  useEffect(() => {
    if (userEmail) {
      AuthManager.getUserData(
        { email: userEmail },
        res => {
          storeDispatch(setUser(res?.data?.data));
          navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
          storeDispatch(setLoadingUser(false));
          SplashScreen.hide();
        },
        err => {
          console.log(err);
          storeDispatch(setLoadingUser(false));
        },
      );
    } else if (!loadingUser) SplashScreen.hide();
  }, [userEmail]);

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
