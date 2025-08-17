import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '@/core/theme';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  text?: string;
}

/**
 * 確定ボタンコンポーネント
 */
export const ConfirmButton: React.FC<Props> = ({ 
  onPress, 
  disabled = false, 
  loading = false, 
  text = 'OK' 
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
        <Text style={[styles.text, { color: colors.text.inverse }]}>
          {text}
        </Text>
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
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});
