import React, { createContext, useContext, ReactNode } from 'react';
import { useColorScheme, View } from 'react-native';
import { getColors, ColorTheme } from './colors';

type ThemeContextType = {
  colors: ColorTheme;
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  isSystemControlled: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * テーマプロバイダー
 * システムのダークモード設定に自動的に追従します
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const effectiveScheme = systemColorScheme || 'light';
  const colors = getColors(effectiveScheme);
  
  console.log('🎨 ThemeProvider System Auto:', {
    systemColorScheme,
    effectiveScheme,
    isSystemDark: systemColorScheme === 'dark',
    backgroundColor: colors.background.primary
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.primary }}>
      {children}
    </View>
  );
};

/**
 * システム自動追従テーマフック
 */
export const useManualTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useManualTheme must be used within a ThemeProvider');
  }
  return context;
};
