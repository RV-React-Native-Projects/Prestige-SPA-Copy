import React, { memo, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AppText from "@src/components/Text/AppText";
import AppButton from "@src/components/Button/AppButton";
import { useAppDispatch, useAppSelector } from "@redux/store";
import AuthManager from "@src/services/features/Auth/AuthManager";
import { useAppNavigation } from "@src/navigation/Navigation";
import { appLogout, removeUserData } from "@reducers/UserSlice";
import AppContainer from "@components/Container/AppContainer";
import useAppToast from "@components/Alert/AppToast";
import { VerticalSpacing } from "@src/components/Spacing/Spacing";

function Home() {
  const { authHeader, authToken, userToken } = useAppSelector(
    state => state.user,
  );
  const { theme } = useAppSelector(state => state.theme);
  const storeDispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const appToast = useAppToast();

  const onPressLogout = () => {
    AuthManager.logoutUser(
      { data: { token: authToken } },
      res => {
        console.log(JSON.stringify(res, null, 2));
        storeDispatch(removeUserData());
        storeDispatch(appLogout(null));
      },
      err => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    if (!userToken) {
      navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    }
  }, [userToken]);

  return (
    <AppContainer
      hideStatusbar={false}
      scrollable={false}
      backgroundColor={theme.appBackgroundColor}>
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <AppButton
          width={"80%"}
          Title="Logout User"
          onPress={onPressLogout}
          color={theme.error}
        />
        <VerticalSpacing />
        <AppButton
          width={"80%"}
          Title="Show Toast"
          onPress={() => appToast.showNormalToast({ title: "Show Toast" })}
        />
      </View>
    </AppContainer>
  );
}

export default memo(Home);

const styles = StyleSheet.create({});
