import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { LoadingSpinner, LoadingMessage } from './components';

interface LoadingPageProps {
  message?: string;
}

/**
 * ローディング画面コンポーネント
 * アプリ初期化中に表示される
 */
export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  message = "アプリを初期化しています..." 
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        {/* ローディングスピナー */}
        <LoadingSpinner />
        
        {/* ローディングメッセージ */}
        <LoadingMessage message={message} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
});
