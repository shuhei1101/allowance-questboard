const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// モノレポサポート: 親ディレクトリのワークスペースを監視
config.watchFolders = [
  path.resolve(__dirname, '..'),  // packages/
  path.resolve(__dirname, '../shared'), // shared package
];

// NodeJS modules解決設定
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../node_modules'), // ルートのnode_modules
  path.resolve(__dirname, '../../node_modules'), // プロジェクトルートのnode_modules
];

// TypeScriptのpathマッピングに対応
config.resolver.alias = {
  '@shared': path.resolve(__dirname, '../shared'),
  '@frontend': path.resolve(__dirname, './src'),
  '@backend': path.resolve(__dirname, '../backend/src'),
};

// ソースファイルの拡張子設定
config.resolver.sourceExts = [
  ...config.resolver.sourceExts,
  'tsx',
  'ts',
  'jsx',
  'js',
  'json',
];

// プラットフォーム固有の拡張子
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

module.exports = config;
