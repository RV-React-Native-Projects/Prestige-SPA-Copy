module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: ["react-native-reanimated/plugin"],
  env: {
    production: {
      plugins: ["react-native-paper/babel", "react-native-reanimated/plugin"],
    },
  },
  plugins: [
    [
      "module-resolver",
      {
        alias: {
          "@src": "./src",
          "@assets": "./src/assets",
          "@appConfig": "./app.json",
          "@config": "./Config.json",
          "@cards": "./src/cards",
          "@common": "./src/common",
          "@components": "./src/components",
          "@constants": "./src/constants",
          "@contexts": "./src/contexts",
          "@helpers": "./src/helpers",
          "@hooks": "./src/hooks",
          "@navigation": "./src/navigation",
          "@redux": "./src/redux",
          "@reducers": "./src/redux/reducers",
          "@screen_components": "./src/screen_components",
          "@screens": "./src/screens",
          "@skeltons": "./src/skeltons",
          "@services": "./src/services",
          "@features": "./src/services/features",
          "@global": "./src/services/global",
        },
      },
    ],
    [
      "module:react-native-dotenv",
      {
        envName: "APP_ENV",
        moduleName: "@env",
        path: ".env",
      },
    ],
    "react-native-paper/babel",
    ["react-native-reanimated/plugin", { relativeSourceLocation: true }],
  ],
};
