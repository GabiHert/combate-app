module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-navigation|react-native-bluetooth-classic)",
  ],
};

export {};
