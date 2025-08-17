import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface RetryButtonProps {
  /** 再試行ボタンがタップされた時のコールバック */
  onRetry: () => void;
  /** ボタンのテキスト（カスタム） */
  text?: string;
  /** ボタンが無効かどうか */
  disabled?: boolean;
}

/**
 * 再試行ボタンコンポーネント
 * 
 * エラー画面で表示される再試行ボタン
 */
export const RetryButton: React.FC<RetryButtonProps> = ({
  onRetry,
  text,
  disabled = false,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const buttonText = text || t('error.actions.retry', '再試行');

  return (
    <TouchableOpacity
      style={[
        styles.retryButton,
        { backgroundColor: disabled ? colors.text.tertiary : colors.primary }
      ]}
      onPress={onRetry}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={[styles.retryButtonText, { color: colors.text.inverse }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  retryButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    minWidth: 120,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
