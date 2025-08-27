import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface ErrorDetailsProps {
  /** 発生したエラー */
  error: Error;
}

/**
 * エラー詳細コンポーネント
 * 
 * 開発環境でのエラー詳細情報を表示する
 */
export const ErrorDetails: React.FC<ErrorDetailsProps> = ({ error }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  // 開発環境でのみ表示
  if (!__DEV__) {
    return undefined;
  }

  return (
    <View style={[styles.errorDetails, { backgroundColor: colors.background.secondary }]}>
      <Text style={[styles.errorDetailsTitle, { color: colors.text.primary }]}>
        {t('error.details.title', 'エラー詳細（開発モード）')}
      </Text>
      <Text style={[styles.errorDetailsText, { color: colors.text.secondary }]}>
        {error.name}: {error.message}
      </Text>
      {error.stack && (
        <Text style={[styles.errorStackText, { color: colors.text.tertiary }]}>
          {error.stack}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorDetails: {
    width: '100%',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  errorDetailsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorDetailsText: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  errorStackText: {
    fontSize: 10,
    fontFamily: 'monospace',
    lineHeight: 14,
  },
});
