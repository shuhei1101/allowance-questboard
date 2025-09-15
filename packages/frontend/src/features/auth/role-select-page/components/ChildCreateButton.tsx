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

/** 子供作成ボタンコンポーネント
 * 
 * 子供作成機能のボタン（現在は未実装通知） */
export const ChildCreateButton: React.FC<Props> = ({ onPress, disabled = false }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled ? colors.surface.secondary : 'transparent',
          borderColor: disabled ? colors.border.light : '#f59e0b',
        }
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <Ionicons 
          name="person-add-outline" 
          size={24} 
          color={disabled ? colors.text.disabled : '#f59e0b'}
          style={styles.icon}
        />
        <Text style={[
          styles.buttonText, 
          { color: disabled ? colors.text.disabled : '#f59e0b' }
        ]}>
          子供として登録
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
