import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FieldWithError } from '@/core/components/FieldWithError';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface PasswordInputFieldProps {
  /** パスワードの値 */
  value: string;
  /** 値変更時のコールバック */
  onChange: (value: string) => void;
  /** プレースホルダーテキスト */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
}

/**
 * パスワード入力フィールド
 * パスワードを入力するテキストフィールド（マスク表示・表示切り替え機能付き）
 */
export const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  onChange,
  placeholder,
  error,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const hasError = !!error;
  
  // プレースホルダーのデフォルト値を翻訳
  const defaultPlaceholder = placeholder || t('login.passwordPlaceholder');

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <FieldWithError error={error}>
      <View style={[
        styles.inputContainer,
        {
          borderColor: colors.border.light,
          backgroundColor: colors.background.secondary,
        },
        hasError && { borderColor: colors.danger }
      ]}>
        <TextInput
          style={[styles.input, { color: colors.text.primary }]}
          value={value}
          onChangeText={onChange}
          placeholder={defaultPlaceholder}
          placeholderTextColor={colors.text.tertiary}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={toggleSecureEntry}
        >
          <Ionicons 
            name={secureTextEntry ? "eye-off" : "eye"} 
            size={20} 
            color={colors.text.secondary} 
          />
        </TouchableOpacity>
      </View>
    </FieldWithError>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 16,
  },
  eyeButton: {
    paddingHorizontal: 12,
  },
});
