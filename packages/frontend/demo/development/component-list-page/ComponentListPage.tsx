import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { DemoStackInfo } from '../../constants/demoStackInfo';

/**
 * コンポーネント一覧ページ
 * 各コンポーネントの表示画面への遷移
 */
export const ComponentListPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const componentCategories = [
    {
      title: '📝 入力コンポーネント',
      components: [
        {
          id: 'email-input',
          name: 'EmailInputField',
          description: 'メールアドレス入力フィールド',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'email-input' } }),
        },
        {
          id: 'password-input',
          name: 'PasswordInputField', 
          description: 'パスワード入力フィールド',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'password-input' } }),
        },
        {
          id: 'birthday-input',
          name: 'BirthdayInputField',
          description: '誕生日入力フィールド',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'birthday-input' } }),
        },
      ],
    },
    {
      title: '🔘 ボタンコンポーネント',
      components: [
        {
          id: 'save-button',
          name: 'SaveButton',
          description: '保存ボタン',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'save-button' } }),
        },
        {
          id: 'icon-select-button',
          name: 'IconSelectButton',
          description: 'アイコン選択ボタン',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'icon-select-button' } }),
        },
      ],
    },
    {
      title: '📄 ページコンポーネント',
      components: [
        {
          id: 'icon-select-page',
          name: 'IconSelectPage',
          description: 'アイコン選択画面',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.iconSelectPageDetail }),
        },
      ],
    },
    {
      title: '🎨 表示コンポーネント',
      components: [
        {
          id: 'loading-spinner',
          name: 'LoadingSpinner',
          description: 'ローディング表示',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'loading-spinner' } }),
        },
        {
          id: 'error-message',
          name: 'ErrorMessage',
          description: 'エラーメッセージ表示',
          onPress: () => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.componentDetail, params: { componentType: 'error-message' } }),
        },
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🧩 コンポーネント一覧
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各コンポーネントの詳細確認とテスト
        </Text>
      </View>

      <View style={styles.content}>
        {componentCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
              {category.title}
            </Text>
            
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
        <View style={styles.categorySection}>
          <Text style={[styles.categoryTitle, { color: colors.text.primary }]}>
            🧪 総合テスト
          </Text>
          
          <TouchableOpacity
            style={[styles.componentCard, styles.specialCard, { backgroundColor: colors.surface.elevated }]}
            onPress={() => navigation.navigate(DemoStackInfo.name, { screen: DemoStackInfo.screens.ComponentShowcase })}
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
  content: {
    paddingHorizontal: 16,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 4,
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
