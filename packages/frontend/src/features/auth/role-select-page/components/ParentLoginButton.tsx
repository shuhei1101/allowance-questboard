import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useTheme } from '@/core/theme';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  /** ボタン押下時のコールバック */
  onPress: () => void;
  /** ボタンが無効かどうか */
  disabled?: boolean;
}

/** 親ログインボタンコンポーネント
 * 
 * 親としてログインするためのボタン */
export const ParentLoginButton: React.FC<Props> = ({ onPress, disabled = false }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.surface.secondary : colors.surface.elevated,
          borderColor: disabled ? colors.border.light : colors.primary,
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons 
          name="person-circle-outline" 
          size={24} 
          color={disabled ? colors.text.disabled : colors.primary}
          style={styles.icon}
        />
        <Text style={[
          styles.buttonText, 
          { color: disabled ? colors.text.disabled : colors.primary }
        ]}>
          親としてログイン
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    marginBottom: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
