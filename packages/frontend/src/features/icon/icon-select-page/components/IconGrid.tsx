import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import * as LucideIcons from 'lucide-react-native';
import { Icon } from '@backend/features/icon/domain/icon';
import { AppConstants } from '@/core/constants/appConstants';
import { Icons } from '@backend/features/icon/domain/icons';

interface Props {
  /**
   * 表示するアイコン一覧
   */
  icons: Icons;
  /**
   * 現在選択されているアイコン
   */
  selectedIcon?: Icon;
  /**
   * アイコンが選択された時のコールバック
   * @param icon 選択されたアイコン
   */
  onIconSelect: (icon: Icon) => void;
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
    const isSelected = selectedIcon?.key.equals(item.key) === true;

    // AppConstants.iconByNameから事前に生成されたAppIconを取得
    const appIcon = AppConstants.iconByName?.get(item);
    const IconComponent = appIcon?.obj || LucideIcons.HelpCircle;

    return (
      <TouchableOpacity
        style={[
          styles.iconItem,
          {
            backgroundColor: colors.surface.secondary,
            borderColor: isSelected ? colors.secondary : colors.border.light,
          },
        ]}
        onPress={() => onIconSelect(item)}
        testID={`icon-item-${item.name.value}`}
      >
        <IconComponent
          size={24}
          color={colors.text.primary}
        />
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
      data={icons.items}
      renderItem={renderIcon}
      keyExtractor={(item) => item.key.value.toString()}
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
    width: `${100 / 6}%`,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
