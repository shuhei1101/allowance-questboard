import { useColorScheme } from 'react-native';
import { Appearance } from 'react-native';
import { getColors, ColorTheme } from './colors';

/**
 * テーマとカラースキームを取得するカスタムフック
 * システムのダークモード設定に自動的に追従します
 */
export const useTheme = (): UseThemeReturn => {
  const systemColorScheme = useColorScheme();
  const actualScheme = systemColorScheme || 'light';
  
  console.log('🎨 useTheme System Auto:', {
    systemColorScheme,
    actualScheme,
    isSystemDark: systemColorScheme === 'dark',
    useColorSchemeResult: systemColorScheme,
    appearanceGetColorScheme: Appearance.getColorScheme()
  });

  const colors = getColors(actualScheme);
  
  return {
    colors,
    colorScheme: actualScheme,
    isDark: actualScheme === 'dark',
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
