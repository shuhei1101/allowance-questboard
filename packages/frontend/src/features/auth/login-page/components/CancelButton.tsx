import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface CancelButtonProps {
  /** タップ時のコールバック */
  onClick: () => void;
}

/**
 * キャンセルボタン
 * 家族選択ダイアログを閉じるボタン
 */
export const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.state.inactive }]}
      onPress={onClick}
    >
      <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
        {t('auth.loginPage.cancel')}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
