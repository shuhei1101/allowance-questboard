const path = require("path");
const { getDefaultConfig } = require("@expo/metro-config");

const config = getDefaultConfig(__dirname);

// モノレポ用の設定
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, "../backend/node_modules"),
  path.resolve(__dirname, "node_modules")
];

config.watchFolders = [
  path.resolve(__dirname, "../../packages/shared"),
  path.resolve(__dirname, "../backend/src") // backend を watch
];

// Expo Router用の設定
config.resolver.alias = {
  ...config.resolver.alias,
  "@": path.resolve(__dirname, "src"),
  "@backend": path.resolve(__dirname, "../backend/src"), // backend の alias
};

module.exports = config;
