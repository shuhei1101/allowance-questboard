import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { DemoStackMeta } from '../../demoStackMeta';
import { useAppNavigation } from '../../../AppNavigator';

/**
 * コンポーネント一覧ページ
 * 各コンポーネントの表示画面への遷移
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
      key: 'shared',
      title: '📝 共有コンポーネント',
      path: 'features/shared',
      description: '共通入力コンポーネント',
      components: [
        {
          id: 'email-input',
          name: 'EmailInputField',
          description: 'メールアドレス入力フィールド',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'email-input' } }),
        },
        {
          id: 'password-input',
          name: 'PasswordInputField', 
          description: 'パスワード入力フィールド',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'password-input' } }),
        },
        {
          id: 'birthday-input',
          name: 'BirthdayInputField',
          description: '誕生日入力フィールド',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'birthday-input' } }),
        },
        {
          id: 'save-button',
          name: 'SaveButton',
          description: '保存ボタン',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'save-button' } }),
        },
        {
          id: 'icon-select-button',
          name: 'IconSelectButton',
          description: 'アイコン選択ボタン',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'icon-select-button' } }),
        },
        {
          id: 'loading-spinner',
          name: 'LoadingSpinner',
          description: 'ローディング表示',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'loading-spinner' } }),
        },
        {
          id: 'error-message',
          name: 'ErrorMessage',
          description: 'エラーメッセージ表示',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'error-message' } }),
        },
      ],
    },
    {
      key: 'family-register-page',
      title: '🏠 家族登録ページ',
      path: 'features/family/family-register-page',
      description: '家族登録ページ専用コンポーネント',
      components: [
        {
          id: 'family-name-input',
          name: 'FamilyNameInput',
          description: '家族名入力フィールド（後ろに"家"付き）',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'family-name-input' } }),
        },
      ],
    },
    {
      key: 'core',
      title: '🧩 コア',
      path: 'core/components',
      description: 'コア・レイアウトコンポーネント',
      components: [
        {
          id: 'navigation-entry-layout',
          name: 'NavigationEntryLayout',
          description: '右矢印付きナビゲーションレイアウト',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentDetail, params: { componentType: 'navigation-entry-layout' } }),
        },
      ],
    },
    {
      key: 'icon-select-page',
      title: '📄 アイコン選択ページ',
      path: 'features/icon-select/icon-select-page',
      description: 'ページコンポーネント',
      components: [
        {
          id: 'icon-select-page',
          name: 'IconSelectPage',
          description: 'アイコン選択画面',
          onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.iconSelectPageDetail }),
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
          <TouchableOpacity
            style={[styles.sectionLink, { backgroundColor: colors.background.secondary }]}
            onPress={() => scrollToSection('test')}
          >
            <Text style={[styles.sectionLinkText, { color: colors.primary }]}>
              🧪 総合テスト
            </Text>
          </TouchableOpacity>
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
                onPress={component.onPress}
              >
                <View style={styles.componentInfo}>
                  <Text style={[styles.componentName, { color: colors.text.primary }]}>
                    {component.name}
                  </Text>
                  <Text style={[styles.componentDescription, { color: colors.text.secondary }]}>
                    {component.description}
                  </Text>
                </View>
                <View style={styles.componentButton}>
                  <Text style={[styles.componentButtonText, { color: colors.primary }]}>
                    詳細 →
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* 総合テストセクション */}
        <View 
          style={styles.categorySection}
          onLayout={(event) => handleSectionLayout('test', event)}
        >
          <View style={styles.categoryHeader}>
            <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
              🧪 総合テスト
            </Text>
            <Text style={[styles.categoryPath, { color: colors.text.tertiary }]}>
              demo/
            </Text>
            <Text style={[styles.categoryDescription, { color: colors.text.secondary }]}>
              全コンポーネントの動作テスト
            </Text>
          </View>
          
          <TouchableOpacity
            style={[styles.componentCard, styles.specialCard, { backgroundColor: colors.surface.elevated }]}
            onPress={() => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.ComponentShowcase })}
          >
            <View style={styles.componentInfo}>
              <Text style={[styles.componentName, { color: colors.text.primary }]}>
                全コンポーネント一覧
              </Text>
              <Text style={[styles.componentDescription, { color: colors.text.secondary }]}>
                すべてのコンポーネントを一画面で確認
              </Text>
            </View>
            <View style={[styles.componentButton, { backgroundColor: '#8b5cf6' }]}>
              <Text style={styles.specialButtonText}>
                テスト →
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 各コンポーネントをタップして詳細画面に移動
        </Text>
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
    padding: 16,
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
    marginRight: 8,
    marginBottom: 8,
  },
  sectionLinkText: {
    fontSize: 12,
    fontWeight: '600',
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
    paddingLeft: 4,
  },
  categoryPath: {
    fontSize: 12,
    fontFamily: 'monospace',
    paddingLeft: 4,
    marginBottom: 6,
  },
  categoryDescription: {
    fontSize: 14,
    paddingLeft: 4,
    marginBottom: 8,
  },
  componentCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  specialCard: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  componentInfo: {
    flex: 1,
  },
  componentName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  componentDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  componentButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#f3f4f6',
  },
  componentButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  specialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
});
