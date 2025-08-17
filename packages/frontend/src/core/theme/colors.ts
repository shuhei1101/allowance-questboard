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

  // 背景色 - より明るく清潔感のある色に調整
  background: {
    primary: '#FFFFFF',      // 純白
    secondary: '#F8F9FA',    // 非常に明るいグレー
    tertiary: '#F2F3F5',     // 明るいグレー
  },

  // サーフェス色
  surface: {
    elevated: '#FFFFFF',
    base: '#F8F9FA',
    secondary: '#E5E5EA',
  },

  // テキストカラー - コントラストを改善
  text: {
    primary: '#1D1D1F',      // ほぼ黒だが少し柔らかく
    secondary: '#3A3A3C',    // 濃いグレー
    tertiary: '#6D6D70',     // ミディアムグレー
    disabled: '#C7C7CC',     // 薄いグレー
    inverse: '#FFFFFF',      // 白
  },

  // ボーダー色
  border: {
    light: '#D1D1D6',        // 明るいボーダー
    medium: '#8E8E93',       // ミディアムボーダー
    dark: '#3C3C43',         // 暗いボーダー
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

  // 背景色 - より黒に近い色に変更
  background: {
    primary: '#000000',      // 完全な黒
    secondary: '#111111',    // 非常に濃いグレー
    tertiary: '#1A1A1A',     // 濃いグレー
  },

  // サーフェス色 - 背景に合わせて調整
  surface: {
    elevated: '#1A1A1A',     // 少し明るいグレー
    base: '#222222',         // ミディアムグレー
    secondary: '#2A2A2A',    // より明るいグレー
  },

  // テキストカラー - コントラストを向上
  text: {
    primary: '#FFFFFF',      // 純白
    secondary: '#E5E5E7',    // 明るいグレー
    tertiary: '#98989D',     // ミディアムグレー
    disabled: '#48484A',     // 暗いグレー
    inverse: '#000000',      // 黒
  },

  // ボーダー色 - 背景に合わせて調整
  border: {
    light: '#333333',        // 暗いボーダー
    medium: '#555555',       // ミディアムボーダー
    dark: '#777777',         // 明るめのボーダー
  },

  // 状態色
  state: {
    active: '#0A84FF',
    inactive: '#8E8E93',
    selected: '#1A365D',
    hover: '#2A2A2A',        // 背景より少し明るく
    pressed: '#333333',      // さらに明るく
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
  const selectedTheme = colorScheme === 'dark' ? darkColors : lightColors;
  
  // デバッグ用：色の選択結果をログ出力
  console.log('🎨 getColors Debug:', {
    inputScheme: colorScheme,
    selectedTheme: colorScheme === 'dark' ? 'dark' : 'light',
    backgroundColor: selectedTheme.background.primary
  });
  
  return selectedTheme;
};
