import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { MessagesContextProvider } from "@contexts/MessageContext";
import Loading from "@src/Loading";
import store from "@redux/store";

import { enGB, registerTranslation } from "react-native-paper-dates";
import { loadUserData } from "@reducers/UserSlice";
registerTranslation("en-GB", enGB);

LogBox.ignoreLogs([
  "EXNativeModulesProxy",
  "Sending",
  "new NativeEventEmitter",
  "Non-serializable",
  "Possible unhandled",
]);

store.dispatch(loadUserData());

const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <MessagesContextProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <Loading />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </MessagesContextProvider>
      </ThemeContextProvider>
    </Provider>
  );
};

export default App;
