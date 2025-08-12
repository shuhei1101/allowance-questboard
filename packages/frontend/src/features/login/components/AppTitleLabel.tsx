import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@frontend/core/theme';
import { useTranslation } from '@frontend/core/i18n/useTranslation';

/**
 * アプリタイトルラベル
 * アプリ名「お小遣いクエストボード」を表示するコンポーネント
 */
export const AppTitleLabel: React.FC = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <Text style={[styles.title, { color: colors.text.primary }]}>
      {t('app.title')}
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});
