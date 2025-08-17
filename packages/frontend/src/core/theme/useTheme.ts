import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { getColors, ColorTheme } from './colors';

/**
 * テーマフック
 * useColorSchemeを使ってシステムテーマに自動追従
 * 
 * @returns 現在のテーマカラーとテーマ情報
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
  
  // デバッグ用：詳細なテーマ情報をログ出力
  const systemColorScheme = Appearance.getColorScheme();
  console.log('🎨 useTheme Debug:', {
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
  };
};

/**
 * テーマフックの戻り値型
 */
export interface UseThemeReturn {
  colors: ColorTheme;
  isDark: boolean;
  colorScheme: 'light' | 'dark';
}
