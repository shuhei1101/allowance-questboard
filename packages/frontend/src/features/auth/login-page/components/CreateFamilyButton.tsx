import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useTranslation } from '@/core/i18n/useTranslation';

interface CreateFamilyButtonProps {
  /** タップ時のコールバック */
  onPress: () => void;
}

/**
 * 新規家族作成ボタン
 * 新規家族登録画面へ遷移するボタン
 */
export const CreateFamilyButton: React.FC<CreateFamilyButtonProps> = ({
  onPress,
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.secondary }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: colors.text.inverse }]}>
        {t('login.createFamilyButton')}
      </Text>
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
