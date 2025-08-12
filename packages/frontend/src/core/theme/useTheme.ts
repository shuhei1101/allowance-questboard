import { useColorScheme } from 'react-native';
import { getColors, ColorTheme } from './colors';

/**
 * テーマフック
 * useColorSchemeを使ってシステムテーマに自動追従
 * 
 * @returns 現在のテーマカラーとテーマ情報
 */
export const useTheme = () => {
  const colorScheme = useColorScheme();
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
