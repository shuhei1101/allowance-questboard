import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { NavigationEntryLayout } from '@/core/components/NavigationEntryLayout';
import { ParentName } from '../../../../../../backend/src/features/parent/value-object/parentName';

export interface ParentInfoInputProps {
  /** 親情報 */
  parentName?: ParentName;
  /** タップ時のコールバック */
  onPress: () => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 未設定時の表示テキスト */
  placeholder?: string;
}

/** 親情報表示コンポーネント
 *
 * NavigationEntryLayoutを使用した親情報表示コンポーネント
 * 親の名前を表示し、右側に矢印を表示して編集画面への遷移を促す */
export const ParentInfoInput: React.FC<ParentInfoInputProps> = ({
  parentName,
  onPress,
  disabled = false,
  placeholder = '未設定',
}) => {
  const { colors } = useTheme();

  return (
    <NavigationEntryLayout
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        <Text style={[
          styles.text, 
          { 
            color: parent ? colors.text.primary : colors.text.secondary,
            fontWeight: parent ? '500' : 'normal',
            fontStyle: parent ? 'normal' : 'italic',
          }
        ]}>
          {parentName ? `${parentName.value}` : placeholder}
        </Text>
      </View>
    </NavigationEntryLayout>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 16,
  },
});
