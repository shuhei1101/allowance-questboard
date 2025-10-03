import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/core/theme';
import { NavigationEntryLayout } from '@/core/components/NavigationEntryLayout';
import { Icon } from '@backend/features/icon/domain/icon';

export interface IconSelectEntryProps {
  /** 選択されたアイコン */
  selectedIcon?: Icon;
  /** アイコン選択時のコールバック */
  onPress: () => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 未選択時の表示テキスト */
  placeholder?: string;
}

/** アイコン選択エントリーコンポーネント
 *
 * NavigationEntryLayoutを使用したアイコン選択コンポーネント
 * 左側に選択されたアイコンを表示し、右側に矢印を表示 */
export const IconSelectEntry: React.FC<IconSelectEntryProps> = ({
  selectedIcon,
  onPress,
  disabled = false,
  placeholder = '選択なし',
}) => {
  const { colors } = useTheme();

  return (
    <NavigationEntryLayout
      onPress={onPress}
      disabled={disabled}
    >
      <View style={styles.content}>
        {selectedIcon ? (
          <Ionicons
            name={selectedIcon.name.value as any}
            size={24}
            color={colors.text.primary}
          />
        ) : (
          <Text style={[styles.placeholderText, { color: colors.text.secondary }]}>
            {placeholder}
          </Text>
        )}
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
  placeholderText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});
