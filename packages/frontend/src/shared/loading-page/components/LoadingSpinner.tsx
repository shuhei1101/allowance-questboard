import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface LoadingSpinnerProps {
  /** スピナーのサイズ（デフォルト: large） */
  size?: 'small' | 'large';
  /** スピナーの色（カスタム） */
  color?: string;
}

/**
 * ローディングスピナーコンポーネント
 * 
 * アクティビティインジケーターを表示する
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color,
}) => {
  const { colors } = useTheme();

  const spinnerColor = color || colors.primary;

  return (
    <ActivityIndicator 
      size={size} 
      color={spinnerColor}
      style={styles.spinner}
    />
  );
};

const styles = StyleSheet.create({
  spinner: {
    marginBottom: 20,
  },
});
