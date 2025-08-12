import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@frontend/core/theme';
import { useTranslation } from '@frontend/core/i18n/useTranslation';

interface ChildLoginButtonProps {
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * 子供ログインボタン
 * 子供としてログインするボタン
 */
export const ChildLoginButton: React.FC<ChildLoginButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.secondary }]}
      onPress={onPress}
    >
      <Ionicons name="happy" size={20} color={colors.text.inverse} style={styles.icon} />
      <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
        {t('login.childLogin')}
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
