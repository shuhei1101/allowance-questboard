import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Appearance } from 'react-native';
import { useTheme } from '@/core/theme';
import { useManualTheme } from '@/core/theme/ThemeProvider';

/**
 * テーマ切り替えボタンコンポーネント（デバッグ用）
 * ダークモード/ライトモードを手動で切り替えるためのボタン
 */
export const ThemeToggleButton: React.FC = () => {
  const { colors, colorScheme } = useTheme();
  const manualTheme = useManualTheme();
  const [forceScheme, setForceScheme] = useState<'light' | 'dark' | null>(null);
  const systemColorScheme = Appearance.getColorScheme();

  const toggleSystemTheme = () => {
    const newScheme = colorScheme === 'dark' ? 'light' : 'dark';
    setForceScheme(newScheme);
    
    console.log('🎨 System Theme Toggle Debug:', {
      systemColorScheme: systemColorScheme,
      currentScheme: colorScheme,
      targetScheme: newScheme,
      currentBackground: colors.background.primary,
      currentText: colors.text.primary,
      isSystemDark: systemColorScheme === 'dark',
      isAppDark: colorScheme === 'dark'
    });
  };

  const toggleManualTheme = () => {
    manualTheme.toggleTheme();
  };

  return (
    <View style={styles.container}>
      {/* システムテーマ情報表示 */}
      <TouchableOpacity 
        style={[styles.button, { 
          backgroundColor: colors.primary,
          borderColor: colors.border.light 
        }]}
        onPress={toggleSystemTheme}
      >
        <Text style={[styles.text, { color: colors.text.inverse }]}>
          端末: {systemColorScheme || 'unknown'} / アプリ: {colorScheme}
        </Text>
      </TouchableOpacity>
      
      {/* 手動テーマ切り替えボタン */}
      <TouchableOpacity 
        style={[styles.button, { 
          backgroundColor: manualTheme.isDark ? '#32D74B' : '#FF9500',
          borderColor: colors.border.light 
        }]}
        onPress={toggleManualTheme}
      >
        <Text style={[styles.text, { color: '#FFFFFF' }]}>
          {manualTheme.isDark ? '☀️ ライトに切り替え' : '🌙 ダークに切り替え'}
          {manualTheme.isManualOverride && ' (手動)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
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
