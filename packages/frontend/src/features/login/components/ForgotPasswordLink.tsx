import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface ForgotPasswordLinkProps {
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * パスワード忘れリンク
 * パスワードリセット画面へ遷移するリンク
 */
export const ForgotPasswordLink: React.FC<ForgotPasswordLinkProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity
      style={styles.linkContainer}
      onPress={onPress}
    >
      <Text style={[styles.linkText, { color: colors.primary }]}>
        {t('login.forgotPassword')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
