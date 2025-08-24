import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DemoStackInfo } from '../../constants/demoStackInfo';

interface DependencyComponentListPageProps {
  components: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
  }>;
  screenTitle: string;
}

/**
 * 依存コンポーネント一覧ページ
 * ScreenLauncherPageから渡されたコンポーネント一覧を表示
 */
export const DependencyComponentListPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { components, screenTitle } = route.params as DependencyComponentListPageProps;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🧩 依存コンポーネント
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          {screenTitle}で使用されているコンポーネント一覧
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.componentSection}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            📋 コンポーネント一覧 ({components.length}個)
          </Text>
          
          {components.map((component) => (
            <TouchableOpacity
              key={component.id}
              style={[styles.componentCard, { backgroundColor: colors.surface.elevated }]}
              onPress={() => navigation.navigate(DemoStackInfo.name, { screen: `${component.id}Detail` })}
            >
              <View style={styles.componentInfo}>
                <Text style={[styles.componentName, { color: colors.text.primary }]}>
                  {component.icon} {component.name}
                </Text>
                <Text style={[styles.componentDescription, { color: colors.text.secondary }]}>
                  {component.description}
                </Text>
              </View>
              <View style={[styles.componentButton, { backgroundColor: colors.background.secondary }]}>
                <Text style={[styles.componentButtonText, { color: colors.primary }]}>
                  詳細 →
                </Text>
              </View>
            </TouchableOpacity>
          ))}
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
  componentSection: {
    marginBottom: 32,
  },
  sectionTitle: {
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
  },
  componentButtonText: {
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
