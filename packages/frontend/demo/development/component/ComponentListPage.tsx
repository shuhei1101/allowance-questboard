import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useAppNavigation } from '../../../AppNavigator';

/**
 * コンポーネント一覧ページ
 * 各コンポーネントの詳細ページへの遷移
 */
export const ComponentListPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useAppNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  // セクション位置を記録するためのstate
  const sectionPositions = useRef<{ [key: string]: number }>({});

  // セクションにスクロールする関数
  const scrollToSection = (sectionKey: string) => {
    const position = sectionPositions.current[sectionKey];
    if (position !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ 
        y: Math.max(0, position - 20), // 20px上にオフセット
        animated: true 
      });
    }
  };

  // セクション位置を記録する関数
  const handleSectionLayout = (sectionKey: string, event: any) => {
    const { y } = event.nativeEvent.layout;
    sectionPositions.current[sectionKey] = y;
  };

  const componentCategories = [
    {
      key: 'inputs',
      title: '📝 入力コンポーネント',
      path: 'features/shared/components',
      description: '各種入力フィールドコンポーネント',
      components: [
        {
          id: 'email-input',
          name: 'EmailInputField',
          description: 'メールアドレス入力フィールド',
          screen: 'EmailInputPage',
        },
        {
          id: 'password-input',
          name: 'PasswordInputField', 
          description: 'パスワード入力フィールド',
          screen: 'PasswordInputPage',
        },
        {
          id: 'birthday-input',
          name: 'BirthdayInputField',
          description: '誕生日入力フィールド',
          screen: 'BirthdayInputPage',
        },
        {
          id: 'family-name-input',
          name: 'FamilyNameInput',
          description: '家族名入力フィールド（後ろに"家"付き）',
          screen: 'FamilyNameInputPage',
        },
      ],
    },
    {
      key: 'buttons',
      title: '🔘 ボタンコンポーネント',
      path: 'features/shared/components',
      description: 'アクション実行用ボタンコンポーネント',
      components: [
        {
          id: 'save-button',
          name: 'SaveButton',
          description: '保存ボタン',
          screen: 'SaveButtonPage',
        },
        {
          id: 'icon-select-button',
          name: 'IconSelectButton',
          description: 'アイコン選択ボタン',
          screen: 'IconSelectButtonPage',
        },
      ],
    },
    {
      key: 'layouts',
      title: '🧩 レイアウトコンポーネント',
      path: 'core/components',
      description: 'UI構造・レイアウト用コンポーネント',
      components: [
        {
          id: 'navigation-entry-layout',
          name: 'NavigationEntryLayout',
          description: '右矢印付きナビゲーションレイアウト',
          screen: 'NavigationEntryLayoutPage',
        },
      ],
    },
  ];

  return (
    <ScrollView 
      ref={scrollViewRef}
      style={[styles.container, { backgroundColor: colors.background.primary }]}
    >
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🧩 コンポーネント一覧
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各コンポーネントの詳細確認とテスト
        </Text>
      </View>

      {/* セクションジャンプリンク */}
      <View style={[styles.sectionLinksContainer, { backgroundColor: colors.surface.elevated }]}>
        <Text style={[styles.sectionLinksTitle, { color: colors.text.primary }]}>
          📍 セクションジャンプ
        </Text>
        <View style={styles.sectionLinks}>
          {componentCategories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[styles.sectionLink, { backgroundColor: colors.background.secondary }]}
              onPress={() => scrollToSection(category.key)}
            >
              <Text style={[styles.sectionLinkText, { color: colors.primary }]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.content}>
        {componentCategories.map((category, categoryIndex) => (
          <View 
            key={categoryIndex} 
            style={styles.categorySection}
            onLayout={(event) => handleSectionLayout(category.key, event)}
          >
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
                {category.title}
              </Text>
              <Text style={[styles.categoryPath, { color: colors.text.tertiary }]}>
                src/{category.path}
              </Text>
              <Text style={[styles.categoryDescription, { color: colors.text.secondary }]}>
                {category.description}
              </Text>
            </View>
            
            {category.components.map((component) => (
              <TouchableOpacity
                key={component.id}
                style={[styles.componentCard, { backgroundColor: colors.surface.elevated }]}
                onPress={() => {
                  // TODO: 各コンポーネントの詳細ページに遷移
                  // navigation.navigate('ComponentDemo', { screen: component.screen });
                  console.log(`Navigate to ${component.screen}`);
                }}
              >
                <View style={styles.componentInfo}>
                  <Text style={[styles.componentName, { color: colors.text.primary }]}>
                    {component.name}
                  </Text>
                  <Text style={[styles.componentDescription, { color: colors.text.secondary }]}>
                    {component.description}
                  </Text>
                </View>
                <Text style={[styles.arrowIcon, { color: colors.text.secondary }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionLinksContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionLinksTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionLinks: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sectionLink: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  sectionLinkText: {
    fontSize: 12,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categoryPath: {
    fontSize: 12,
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  componentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 20,
    marginLeft: 12,
  },
});
