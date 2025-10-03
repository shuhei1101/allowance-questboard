import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { EntryWithError } from '@/core/components/EntryWithError';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';
import { Email } from '@backend/features/auth/value-object/email';

export type OnEmailChange = (value: Email) => void;

interface EmailInputFieldProps {
  /** メールアドレスの値 */
  value: Email;
  /** 値変更時のコールバック */
  onChange: OnEmailChange;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
}

/** メールアドレス入力フィールド
 * 
 * メールアドレスを入力するテキストフィールド */
export const EmailInput: React.FC<EmailInputFieldProps> = ({
  value,
  onChange,
  placeholder,
  error,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const hasError = !!error;
  
  /** TextInputからの文字列入力をEmailに変換してonChangeに渡す */
  const handleTextChange = (text: string) => {
    const email = new Email(text);
    onChange(email);
  };

  // プレースホルダーのデフォルト値を翻訳
  const defaultPlaceholder = placeholder || t('auth.loginPage.emailPlaceholder');

  return (
    <EntryWithError error={error}>
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
        value={value.value}
        onChangeText={handleTextChange}
        placeholder={defaultPlaceholder}
        placeholderTextColor={colors.text.tertiary}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="none"
        autoComplete="off"
      />
    </EntryWithError>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
});
