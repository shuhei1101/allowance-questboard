import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * 確定ボタンコンポーネント（保存アイコン）
 */
export const ConfirmButton: React.FC<Props> = ({ 
  onPress, 
  disabled = false, 
  loading = false,
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled 
            ? colors.surface.secondary 
            : colors.primary,
        }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.text.inverse} />
      ) : (
        <Ionicons 
          name="save" 
          size={24} 
          color={colors.text.inverse} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
});
