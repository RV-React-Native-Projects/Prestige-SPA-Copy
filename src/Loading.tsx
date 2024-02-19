import React, { Suspense, useEffect } from "react";
import SplashScreen from "react-native-splash-screen";
import MyStack, { useAppNavigation } from "@navigation/Navigation";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@features/Auth/AuthManager";
import { setLoadingUser, setUser } from "@reducers/UserSlice";

function Loading() {
  const navigation = useAppNavigation();
  const { loadingUser, userEmail } = useAppSelector(state => state.user);
  const storeDispatch = useAppDispatch();

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
    } else if (!loadingUser && !userEmail) SplashScreen.hide();
  }, [userEmail, !loadingUser]);

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
