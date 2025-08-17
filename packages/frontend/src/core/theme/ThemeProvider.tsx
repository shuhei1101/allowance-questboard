import React, { createContext, useContext, useState, ReactNode } from 'react';
import { getColors, ColorTheme } from './colors';

type ThemeContextType = {
  colors: ColorTheme;
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => void;
  isManualOverride: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * 手動テーマ切り替え機能付きのテーマプロバイダー
 * システムのuseColorScheme()が動作しない場合の代替手段
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);
  
  // 手動設定がある場合はそれを使用、なければシステム設定
  const effectiveScheme = manualTheme || 'light'; // 一旦デフォルトはlight
  const colors = getColors(effectiveScheme);
  const isDark = effectiveScheme === 'dark';
  
  const toggleTheme = () => {
    const newTheme = effectiveScheme === 'dark' ? 'light' : 'dark';
    setManualTheme(newTheme);
    
    console.log('🎨 Manual Theme Toggle:', {
      from: effectiveScheme,
      to: newTheme,
      newBackground: getColors(newTheme).background.primary
    });
  };
  
  console.log('🎨 ThemeProvider Debug:', {
    manualTheme,
    effectiveScheme,
    backgroundColor: colors.background.primary
  });

  return (
    <ThemeContext.Provider 
      value={{
        colors,
        colorScheme: effectiveScheme,
        isDark,
        toggleTheme,
        isManualOverride: manualTheme !== null
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 手動テーマ切り替え対応のuseThemeフック
 */
export const useManualTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useManualTheme must be used within a ThemeProvider');
  }
  return context;
};
