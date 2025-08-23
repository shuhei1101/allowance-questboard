// テスト用のセットアップファイル
import React from 'react';

/**
 * テスト用のシンプルなラッパーコンポーネント
 */
export const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

// i18n用のモック
jest.mock('../src/core/i18n/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// テーマ用のモック
jest.mock('../src/core/theme', () => ({
  useTheme: () => ({
    colors: {
      text: {
        primary: '#000000',
        secondary: '#666666',
      },
      background: {
        secondary: '#f5f5f5',
      },
      border: {
        light: '#e0e0e0',
      },
      danger: '#ff0000',
    },
  }),
}));
