import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@frontend/core/theme';

/**
 * アプリアイコン
 * クリップボードアイコンを表示するコンポーネント
 */
export const AppIcon: React.FC = () => {
  const { colors } = useTheme();
  
  return (
    <View style={styles.iconContainer}>
      <Ionicons name="clipboard" size={80} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
});
