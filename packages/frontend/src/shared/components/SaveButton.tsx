import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'header';
}

/**
 * 保存ボタンコンポーネント
 * ナビゲーションバーのアクションボタンとしても使用可能
 */
export const SaveButton: React.FC<Props> = ({ 
  onPress, 
  disabled = false, 
  loading = false,
  size = 'medium',
  variant = 'default',
}) => {
  const { colors } = useTheme();

  const getButtonStyle = () => {
    switch (size) {
      case 'small':
        return styles.buttonSmall;
      case 'large':
        return styles.buttonLarge;
      default:
        return styles.buttonMedium;
    }
  };

  const getBackgroundColor = () => {
    if (variant === 'header') {
      return 'transparent';
    }
    return disabled ? colors.surface.secondary : '#FFFFFF';
  };

  const getIconColor = () => {
    if (variant === 'header') {
      return disabled ? colors.text.secondary : colors.text.primary;
    }
    return disabled ? colors.text.disabled : colors.primary;
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 20;
      case 'large':
        return 28;
      default:
        return 24;
    }
  };

  return (
    <TouchableOpacity
      style={[
        getButtonStyle(),
        {
          backgroundColor: getBackgroundColor(),
          borderWidth: variant === 'default' ? 1 : 0,
          borderColor: variant === 'default' ? colors.border.light : 'transparent',
        }
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator 
          color={getIconColor()} 
          size={size === 'small' ? 'small' : 'large'}
        />
      ) : (
        <Ionicons 
          name="save" 
          size={getIconSize()} 
          color={getIconColor()} 
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonSmall: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 32,
    minWidth: 32,
  },
  buttonMedium: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    minWidth: 44,
  },
  buttonLarge: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    minWidth: 48,
  },
});
