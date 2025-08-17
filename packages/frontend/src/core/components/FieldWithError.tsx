import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';

interface FieldWithErrorProps {
  /** フィールド部分（TextInput、チェックボックス、ラジオボタン、複数の入力要素など） */
  children: ReactNode;
  /** エラーメッセージ */
  error?: string;
}

/**
 * エラー表示付きフィールドラッパー
 * TextInput、チェックボックス、ラジオボタン、複数の入力要素などをラップして、エラー表示機能を提供
 */
export const FieldWithError: React.FC<FieldWithErrorProps> = ({
  children,
  error,
}) => {
  const { colors } = useTheme();
  const hasError = !!error;

  return (
    <View style={styles.container}>
      {children}
      {hasError && (
        <Text style={[styles.errorText, { color: colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
