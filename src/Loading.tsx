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
  const { userToken, user, loadingUser } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();
  const { setStorage } = useEncryptedStorage();

  useEffect(() => {
    if (user) {
      navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
      SplashScreen.hide();
    } else if (!loadingUser) SplashScreen.hide();
  }, [userToken]);

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
