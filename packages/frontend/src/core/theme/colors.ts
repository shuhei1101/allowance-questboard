import { ColorSchemeName } from 'react-native';

/**
 * ライトテーマカラー定義
 */
export const lightColors = {
  // プライマリーカラー
  primary: '#007AFF',
  primaryLight: '#5AC8FA',
  primaryDark: '#0051D5',

  // セカンダリーカラー
  secondary: '#34C759',
  secondaryLight: '#30D158',
  secondaryDark: '#28A745',

  // システムカラー
  danger: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  success: '#34C759',

  // 背景色
  background: {
    primary: '#F2F2F7',
    secondary: '#FFFFFF',
    tertiary: '#F8F9FA',
  },

  // サーフェス色
  surface: {
    elevated: '#FFFFFF',
    base: '#F8F9FA',
    secondary: '#E5E5EA',
  },

  // テキストカラー
  text: {
    primary: '#000000',
    secondary: '#3C3C43',
    tertiary: '#8E8E93',
    disabled: '#C7C7CC',
    inverse: '#FFFFFF',
  },

  // ボーダー色
  border: {
    light: '#C6C6C8',
    medium: '#8E8E93',
    dark: '#3C3C43',
  },

  // 状態色
  state: {
    active: '#007AFF',
    inactive: '#8E8E93',
    selected: '#E3F2FD',
    hover: '#F5F5F5',
    pressed: '#E0E0E0',
  },
} as const;

/**
 * ダークテーマカラー定義
 */
export const darkColors = {
  // プライマリーカラー
  primary: '#0A84FF',
  primaryLight: '#64D2FF',
  primaryDark: '#0051D5',

  // セカンダリーカラー
  secondary: '#32D74B',
  secondaryLight: '#64D864',
  secondaryDark: '#248A3D',

  // システムカラー
  danger: '#FF453A',
  warning: '#FF9F0A',
  info: '#0A84FF',
  success: '#32D74B',

  // 背景色
  background: {
    primary: '#000000',
    secondary: '#1C1C1E',
    tertiary: '#2C2C2E',
  },

  // サーフェス色
  surface: {
    elevated: '#1C1C1E',
    base: '#2C2C2E',
    secondary: '#3A3A3C',
  },

  // テキストカラー
  text: {
    primary: '#FFFFFF',
    secondary: '#EBEBF5',
    tertiary: '#8E8E93',
    disabled: '#48484A',
    inverse: '#000000',
  },

  // ボーダー色
  border: {
    light: '#38383A',
    medium: '#48484A',
    dark: '#8E8E93',
  },

  // 状態色
  state: {
    active: '#0A84FF',
    inactive: '#8E8E93',
    selected: '#1A365D',
    hover: '#2C2C2E',
    pressed: '#3A3A3C',
  },
} as const;

/**
 * カラーテーマの構造タイプ定義
 */
export interface ColorTheme {
  // プライマリーカラー
  primary: string;
  primaryLight: string;
  primaryDark: string;

  // セカンダリーカラー
  secondary: string;
  secondaryLight: string;
  secondaryDark: string;

  // システムカラー
  danger: string;
  warning: string;
  info: string;
  success: string;

  // 背景色
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };

  // サーフェス色
  surface: {
    elevated: string;
    base: string;
    secondary: string;
  };

  // テキストカラー
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    inverse: string;
  };

  // ボーダー色
  border: {
    light: string;
    medium: string;
    dark: string;
  };

  // 状態色
  state: {
    active: string;
    inactive: string;
    selected: string;
    hover: string;
    pressed: string;
  };
}

/**
 * テーマに応じたカラーを取得する関数
 * @param colorScheme システムのカラースキーム
 * @returns 適切なカラーテーマ
 */
export const getColors = (colorScheme: ColorSchemeName): ColorTheme => {
  return colorScheme === 'dark' ? darkColors : lightColors;
};
