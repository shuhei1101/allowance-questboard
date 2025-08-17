import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { getColors, ColorTheme } from './colors';
import { useContext } from 'react';
import { useManualTheme } from './ThemeProvider';

/**
 * テーマフック
 * ThemeProviderが利用可能な場合は手動テーマを使用、
 * そうでなければシステムテーマに自動追従
 * 
 * @returns 現在のテーマカラーとテーマ情報
 */
export const useTheme = () => {
  // 手動テーマが利用可能かチェック
  try {
    const manualTheme = useManualTheme();
    console.log('🎨 useTheme using manual theme:', {
      scheme: manualTheme.colorScheme,
      background: manualTheme.colors.background.primary
    });
    return manualTheme;
  } catch {
    // ThemeProviderが利用できない場合は従来通りシステムテーマを使用
    const colorScheme = useColorScheme();
    
    // デバッグ用：詳細なテーマ情報をログ出力
    const systemColorScheme = Appearance.getColorScheme();
    console.log('🎨 useTheme using system theme:', {
      useColorSchemeResult: colorScheme,
      appearanceGetColorScheme: systemColorScheme,
      actualScheme: colorScheme || 'light',
      isSystemDark: systemColorScheme === 'dark',
      isHookDark: colorScheme === 'dark'
    });
    
    const colors = getColors(colorScheme);
    
    return {
      colors,
      isDark: colorScheme === 'dark',
      colorScheme: colorScheme || 'light',
      toggleTheme: () => console.warn('toggleTheme not available without ThemeProvider'),
      isManualOverride: false
    };
  }
};

/**
 * テーマフックの戻り値型
 */
export interface UseThemeReturn {
  colors: ColorTheme;
  isDark: boolean;
  colorScheme: 'light' | 'dark';
}
