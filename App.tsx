import React from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeContextProvider } from "@contexts/ThemeContext";
import { MessagesContextProvider } from "@contexts/MessageContext";
import Loading from "@src/Loading";
import store from "@redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

import { enGB, registerTranslation } from "react-native-paper-dates";
import { loadUserData } from "@reducers/UserSlice";
import { loadUserTheme } from "@reducers/ThemeSlice";
registerTranslation("en-GB", enGB);

// -- TODO @RV ==> Move this key to .env After Seeting Up Configuratio
const publishableKey =
  "pk_test_51OYm22CjUZPEHdfTgxLTR9ECnnY2hltvM4Q5BGvNhOkTtxOB2JhEGzUOmlD2vRUvmMS3XxIpap3sqEImyfC7Ps6800J3wELOoL";

LogBox.ignoreLogs([
  "EXNativeModulesProxy",
  "Sending",
  "new NativeEventEmitter",
  "Non-serializable",
  "Non-Serializable",
  "Possible unhandled",
  "Require cycle",
]);

store.dispatch(loadUserData());
store.dispatch(loadUserTheme());

const App = () => {
  return (
    <StripeProvider
      publishableKey={publishableKey}
      urlScheme="spoacd://" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.identifier" // required for Apple Pay
    >
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
    </StripeProvider>
  );
};

export default App;
