import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconCategory } from '@backend/features/icon-category/domain/iconCategory';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';

interface Props {
  /**
   * アイコンカテゴリ一覧
   */
  categories: IconCategory[];
  /**
   * 現在選択されているカテゴリID
   */
  selectedCategoryId?: IconCategoryId;
  /**
   * カテゴリが変更された時のコールバック
   * @param categoryId 選択されたカテゴリID
   */
  onCategoryChange: (categoryId: IconCategoryId) => void;
}

/**
 * アイコン選択画面のタブバー
 * アイコンカテゴリをタブとして表示し、選択されたカテゴリでアイコン一覧をフィルタリング
 */
export const TabBar: React.FC<Props> = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
}) => {
  const { colors } = useTheme();

  if (categories.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.surface.elevated }]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategoryId?.equals(category.id);
          // TODO: 言語タイプでの名前取得メソッドを実装後に修正
          const categoryName = `カテゴリ${index + 1}`;
          
          return (
            <TouchableOpacity
              key={category.id.value}
              style={[
                styles.tab,
                isSelected && [styles.tabSelected, { borderBottomColor: colors.primary }],
              ]}
              onPress={() => onCategoryChange(category.id)}
              testID={`icon-category-tab-${category.id.value}`}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: isSelected ? colors.primary : colors.text.secondary },
                ]}
              >
                {categoryName}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabSelected: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
