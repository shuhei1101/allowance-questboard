import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface LoginButtonProps {
  /** ボタンが無効かどうか */
  disabled: boolean;
  /** ローディング状態かどうか */
  loading: boolean;
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * ログインボタン
 * メイン認証ログインを実行するボタン
 */
export const LoginButton: React.FC<LoginButtonProps> = ({
  disabled,
  loading,
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const isInteractionDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isInteractionDisabled ? colors.state.inactive : colors.primary
        }
      ]}
      onPress={onPress}
      disabled={isInteractionDisabled}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.inverse} size="small" />
      ) : (
        <Text style={[
          styles.buttonText,
          {
            color: isInteractionDisabled ? colors.text.disabled : colors.text.inverse
          }
        ]}>
          {t('auth.loginPage.loginButton')}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
