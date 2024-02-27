import React, { Suspense, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import MyStack, { useAppNavigation } from "@navigation/Navigation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@features/Auth/AuthManager";
import { setLoadingUser, setUser } from "@reducers/UserSlice";
import { getAppConfig } from "@reducers/AppDataSlice";

function Loading() {
  const navigation = useAppNavigation();
  const { loadingUser, userEmail, authHeader } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();

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

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
