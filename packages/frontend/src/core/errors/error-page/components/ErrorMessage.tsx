import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface ErrorMessageProps {
  /** エラータイトル */
  title: string;
  /** エラーメッセージ */
  message: string;
}

/**
 * エラーメッセージコンポーネント
 * 
 * エラータイトルとメッセージを表示する
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
}) => {
  const { colors } = useTheme();

  return (
    <>
      {/* エラータイトル */}
      <Text style={[styles.title, { color: colors.text.primary }]}>
        {title}
      </Text>

      {/* エラーメッセージ */}
      <Text style={[styles.message, { color: colors.text.secondary }]}>
        {message}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 32,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
});
