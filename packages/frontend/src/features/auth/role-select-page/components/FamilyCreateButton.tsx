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

/** 家族作成ボタンコンポーネント
 * 
 * 家族作成画面への遷移ボタン */
export const FamilyCreateButton: React.FC<Props> = ({ onPress, disabled = false }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.surface.secondary : colors.primary,
          borderColor: colors.border.light,
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons 
          name="add-circle-outline" 
          size={24} 
          color={disabled ? colors.text.disabled : colors.text.inverse}
          style={styles.icon}
        />
        <Text style={[
          styles.buttonText, 
          { color: disabled ? colors.text.disabled : colors.text.inverse }
        ]}>
          新しい家族を作成
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
    borderWidth: 1,
    marginBottom: 16,
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
