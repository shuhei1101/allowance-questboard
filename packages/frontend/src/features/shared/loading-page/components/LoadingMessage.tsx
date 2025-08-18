import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface LoadingMessageProps {
  /** メインメッセージ */
  message: string;
  /** サブメッセージ（カスタム） */
  subMessage?: string;
}

/**
 * ローディングメッセージコンポーネント
 * 
 * ローディング中に表示するメッセージとサブメッセージ
 */
export const LoadingMessage: React.FC<LoadingMessageProps> = ({
  message,
  subMessage = "しばらくお待ちください 🌟",
}) => {
  const { colors } = useTheme();

  return (
    <>
      <Text style={[styles.message, { color: colors.text.primary }]}>
        {message}
      </Text>
      <Text style={[styles.subMessage, { color: colors.text.secondary }]}>
        {subMessage}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 14,
    textAlign: 'center',
  },
});
