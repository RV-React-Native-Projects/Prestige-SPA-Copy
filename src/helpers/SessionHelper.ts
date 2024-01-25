import React from "react";
import UserManager from "@features/User/UserManager";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { setAuthToken, setTenantToken, setUser } from "@reducers/userSlice";

const SessionHelper = function () {
  const { isUserLoggedIn, authToken, tenantToken, authHeader } = useAppSelector(
    state => state.user,
  );

  const storeDispatch = useAppDispatch();

  function getUserInfo() {
    if (!isUserLoggedIn()) {
      if (authToken) {
        if (tenantToken) {
          var params = {
            headers: authHeader,
          };
          UserManager.getUserInfo(
            params,
            async (res: any) => {
              console.log("getUserInfo Res===>", JSON.stringify(res?.data));
              await storeDispatch(setUser(res?.data?.result));
            },
            (err: Error) => {
              console.log("getUserInfo Err===>", err);
            },
          );
        }
      }
    }
  }

  async function logout() {
    storeDispatch(setUser(null));
    storeDispatch(setAuthToken(null));
    storeDispatch(setTenantToken(null));
  }

  return {
    getUserInfo: getUserInfo,
    logout: logout,
  };
};

export default SessionHelper();
