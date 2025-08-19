import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import * as LucideIcons from 'lucide-react-native';
import { Icon } from '@backend/features/icon/domain/icon';

interface Props {
  /**
   * 表示するアイコン一覧
   */
  icons: Icon[];
  /**
   * 現在選択されているアイコン名
   */
  selectedIcon?: string;
  /**
   * アイコンが選択された時のコールバック
   * @param iconName 選択されたアイコン名
   */
  onIconSelect: (iconName: string) => void;
}

/**
 * アイコン選択画面のアイコングリッド
 * アイコンを6列のグリッドレイアウトで表示
 */
export const IconGrid: React.FC<Props> = ({
  icons,
  selectedIcon,
  onIconSelect,
}) => {
  const { colors } = useTheme();

  const renderIcon = ({ item }: { item: Icon }) => {
    const iconName = item.name.value;
    const isSelected = selectedIcon === iconName;

    // Lucideアイコンを動的に取得
    const IconComponent = (LucideIcons as any)[iconName];

    return (
      <TouchableOpacity
        style={[
          styles.iconItem,
          {
            backgroundColor: colors.surface.secondary,
            borderColor: isSelected ? colors.secondary : colors.border.light,
          },
        ]}
        onPress={() => onIconSelect(iconName)}
        testID={`icon-item-${iconName}`}
      >
        {IconComponent ? (
          <IconComponent
            size={24}
            color={colors.text.primary}
          />
        ) : (
          <LucideIcons.HelpCircle
            size={24}
            color={colors.text.primary}
          />
        )}
      </TouchableOpacity>
    );
  };

  if (icons.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { color: colors.text.secondary }]}>
          このカテゴリにはアイコンがありません
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={icons}
      renderItem={renderIcon}
      keyExtractor={(item) => item.id.value.toString()}
      numColumns={6}
      contentContainerStyle={styles.gridContainer}
      showsVerticalScrollIndicator={false}
      testID="icon-grid"
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    padding: 4,
  },
  iconItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
