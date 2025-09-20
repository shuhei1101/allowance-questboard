import React, { useCallback } from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';

interface InformationButtonProps {
  /** 表示するヘルプテキスト */
  text: string;
}

/** インフォメーションボタンコンポーネント
 * 
 * 押下時にアラートでヘルプテキストを表示するボタン */
export const InformationButton: React.FC<InformationButtonProps> = ({ text }) => {
  const { colors } = useTheme();

  const handlePress = useCallback(() => {
    Alert.alert('ヘルプ', text, [{ text: 'OK' }]);
  }, [text]);

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={styles.button}
      activeOpacity={0.7}
    >
      <Ionicons 
        name="information-circle-outline" 
        size={16} 
        color={colors.text.secondary} 
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginLeft: 4,
    padding: 2, // タップ領域を広げる
  },
});
