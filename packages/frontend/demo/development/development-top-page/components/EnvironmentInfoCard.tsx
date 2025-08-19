import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

/**
 * 環境情報カードコンポーネント
 * 開発環境の情報を表示するカード
 */
export const EnvironmentInfoCard: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.infoCard, { backgroundColor: colors.surface.elevated }]}>
      <Text style={[styles.infoText, { color: colors.text.secondary }]}>
        開発モード: 有効
      </Text>
      <Text style={[styles.infoText, { color: colors.text.secondary }]}>
        バージョン: 1.0.0
      </Text>
      <Text style={[styles.infoText, { color: colors.text.secondary }]}>
        最終更新: {new Date().toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
