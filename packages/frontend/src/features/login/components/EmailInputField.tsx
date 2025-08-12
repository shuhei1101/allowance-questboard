import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '@frontend/core/theme';
import { useTranslation } from '@frontend/core/i18n/useTranslation';

interface EmailInputFieldProps {
  /** メールアドレスの値 */
  value: string;
  /** 値変更時のコールバック */
  onChange: (value: string) => void;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
}

/**
 * メールアドレス入力フィールド
 * メールアドレスを入力するテキストフィールド
 */
export const EmailInputField: React.FC<EmailInputFieldProps> = ({
  value,
  onChange,
  placeholder,
  error,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const hasError = !!error;
  
  // プレースホルダーのデフォルト値を翻訳
  const defaultPlaceholder = placeholder || t('login.emailPlaceholder');

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          { 
            borderColor: colors.border.light,
            backgroundColor: colors.background.secondary,
            color: colors.text.primary,
          },
          hasError && { borderColor: colors.danger }
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={defaultPlaceholder}
        placeholderTextColor={colors.text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    marginTop: 4,
  },
});
