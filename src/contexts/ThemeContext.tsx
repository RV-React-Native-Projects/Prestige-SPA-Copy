import React, { ReactNode, createContext } from "react";
import {
  NavigationContainer,
  DefaultTheme as NavigatorLightTheme,
  DarkTheme as NavigatorDarkTheme,
} from "@react-navigation/native";
import { NativeBaseProvider, extendTheme } from "native-base/src/core/index";
import {
  Provider as PaperProvider,
  MD3DarkTheme as PaperDarkTheme,
  MD3LightTheme as PaperLightTheme,
} from "react-native-paper";
import linking from "@common/Linking";
import { useAppSelector } from "@redux/store";

interface ThemeContextProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<Record<string, unknown> | undefined>(
  undefined,
);

export const ThemeContextProvider: React.FC<
  ThemeContextProviderProps
> = props => {
  const { theme, isDarkMode } = useAppSelector(state => state.theme);

  const paperTheme = isDarkMode ? PaperDarkTheme : PaperLightTheme;
  const navigationTheme = isDarkMode ? NavigatorDarkTheme : NavigatorLightTheme;
  const config = {
    useSystemColorMode: true,
    initialColorMode: isDarkMode ? "dark" : "light",
  };
  const nativeBaseTheme = extendTheme({ config });

  return (
    <ThemeContext.Provider value={{}}>
      <NativeBaseProvider theme={nativeBaseTheme}>
        <NavigationContainer theme={navigationTheme} linking={linking}>
          <PaperProvider theme={paperTheme}>{props.children}</PaperProvider>
        </NavigationContainer>
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
