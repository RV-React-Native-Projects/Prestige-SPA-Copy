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
  const { authHeader, authToken, loadingUser, refreshToken } = useAppSelector(
    state => state.user,
  );
  const storeDispatch = useAppDispatch();
  const { setStorage } = useEncryptedStorage();
  // console.log("USER===>>", JSON.stringify(user, null, 2));

  function refreshUserToken() {
    AuthManager.refreshUserToken(
      {
        data: { token: refreshToken },
      },
      async res => {
        console.log("refreshUserToken Res===>", res);
        const decryptedData = await Utils.decryptToken(res.data.response);
        console.log("decryptedData======>", decryptedData);
        setStorage("SPA_Auth_Token", decryptedData?.token?.accessToken);
        setStorage("SPA_Refresh_Token", decryptedData?.token?.refreshToken);
        storeDispatch(setAuthToken(decryptedData?.token?.accessToken));
        storeDispatch(setRefreshToken(decryptedData?.token?.refreshToken));
      },
      err => {
        console.log("Error ", err);
        SplashScreen.hide();
        // storeDispatch(setLoadingUser(false));
      },
    );
  }

  useEffect(() => {
    if (authHeader) {
      let params = { headers: authHeader };
      AuthManager.getUserInfo(
        params,
        res => {
          console.log("REs", res);
          storeDispatch(setUser(res?.data?.response));
          navigation.reset({ index: 0, routes: [{ name: "Tab" }] });
          SplashScreen.hide();
        },
        err => {
          console.log(err);
          refreshUserToken();
        },
      );
    } else if (!loadingUser) SplashScreen.hide();
  }, [authHeader, authToken, !loadingUser]);

  return (
    <Suspense fallback="">
      <MyStack />
    </Suspense>
  );
}

export default Loading;
