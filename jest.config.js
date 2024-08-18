module.exports = {
  preset: "jest-expo",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native|@react-native|react-native-svg|@expo|expo|expo-font|expo-splash-screen|expo-image|expo-camera|expo-permissions|expo-status-bar|expo-constants|expo-linking|expo-linear-gradient|expo-modules-core|expo-asset)/)",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
};
