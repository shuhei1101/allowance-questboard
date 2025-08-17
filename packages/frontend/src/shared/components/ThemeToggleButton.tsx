import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Appearance } from 'react-native';
import { useTheme } from '@/core/theme';

/**
 * テーマ切り替えボタンコンポーネント（デバッグ用）
 * ダークモード/ライトモードを手動で切り替えるためのボタン
 */
export const ThemeToggleButton: React.FC = () => {
  const { colors, colorScheme } = useTheme();
  const [forceScheme, setForceScheme] = useState<'light' | 'dark' | null>(null);
  const systemColorScheme = Appearance.getColorScheme();

  const toggleTheme = () => {
    const systemColorScheme = Appearance.getColorScheme();
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setForceScheme(newScheme);
    
    console.log('🎨 Theme Toggle Debug:', {
      systemColorScheme: systemColorScheme,
      currentScheme: colorScheme,
      targetScheme: newScheme,
      currentBackground: colors.background.primary,
      currentText: colors.text.primary,
      isSystemDark: systemColorScheme === 'dark',
      isAppDark: colorScheme === 'dark'
    });
  };

  return (
    <TouchableOpacity 
      style={[styles.button, { 
        backgroundColor: colors.primary,
        borderColor: colors.border.light 
      }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.text.inverse }]}>
        端末: {systemColorScheme || 'unknown'} / アプリ: {colorScheme}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    margin: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
