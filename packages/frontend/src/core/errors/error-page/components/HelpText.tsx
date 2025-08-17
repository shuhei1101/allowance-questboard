import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface HelpTextProps {
  /** ヘルプテキスト（カスタム） */
  text?: string;
}

/**
 * ヘルプテキストコンポーネント
 * 
 * エラー画面で表示される説明テキスト
 */
export const HelpText: React.FC<HelpTextProps> = ({ text }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const helpText = text || t('error.help.contact', '問題が続く場合は、アプリを再起動してお試しください。');

  return (
    <Text style={[styles.helpText, { color: colors.text.tertiary }]}>
      {helpText}
    </Text>
  );
};

const styles = StyleSheet.create({
  helpText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
