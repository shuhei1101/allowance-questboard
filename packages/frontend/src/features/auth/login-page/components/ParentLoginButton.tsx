import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface ParentLoginButtonProps {
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * 親ログインボタン
 * 親としてログインするボタン
 */
export const ParentLoginButton: React.FC<ParentLoginButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      <Ionicons name="person" size={20} color={colors.text.inverse} style={styles.icon} />
      <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
        {t('login.parentLogin')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
