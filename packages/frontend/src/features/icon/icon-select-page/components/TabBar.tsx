import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconCategoryId } from '@backend/features/icon-category/value-objects/iconCategoryId';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { IconCategories } from '@backend/features/icon-category/domain/iconCategories';

interface Props {
  /**
   * アイコンカテゴリ一覧
   */
  categories: IconCategories;
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
  const { languageType } = useSessionStore();

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
          const isSelected = selectedCategoryId?.equals(category.key);
          // 言語タイプに応じてカテゴリ名を取得
          const categoryName = languageType
            ? category.nameByLanguages.get(languageType?.id)?.value ?? `カテゴリ${index + 1}`
            : `カテゴリ${index + 1}`;
          
          return (
            <TouchableOpacity
              key={category.key.value}
              style={[
                styles.tab,
                isSelected && [styles.tabSelected, { borderBottomColor: colors.primary }],
              ]}
              onPress={() => onCategoryChange(category.key)}
              testID={`icon-category-tab-${category.key.value}`}
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
