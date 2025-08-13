import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme, spacing, typography } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface TermsOfServiceLinkProps {
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * 利用規約リンク
 * 利用規約確認画面へ遷移するリンク
 */
export const TermsOfServiceLink: React.FC<TermsOfServiceLinkProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  const styles = StyleSheet.create({
    linkContainer: {
      alignItems: 'center',
      marginTop: spacing.lg,
    },
    linkText: {
      color: colors.primary,
      fontSize: typography.caption.fontSize,
      fontWeight: typography.caption.fontWeight,
      textDecorationLine: 'underline',
    },
  });

  return (
    <TouchableOpacity
      style={styles.linkContainer}
      onPress={onPress}
    >
      <Text style={styles.linkText}>
        {t('login.termsOfService')}
      </Text>
    </TouchableOpacity>
  );
};
