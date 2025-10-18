import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { MainMenuCard } from './components/TopMenuCard';
import { AuthStackMeta } from '@/features/auth/AuthNavigator';
import { DemoStackMeta } from '../DemoNavigator';
import { useAppNavigation } from '../../AppNavigator';

/**
 * 開発用TOP画面
 * 通常起動・画面一覧・コンポーネント一覧への入り口
 */
export const DemoTopPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useAppNavigation();


  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🧪 開発環境
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          開発・テスト・デモ機能のメインハブ
        </Text>
      </View>

      {/* メイン機能 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎯 メイン機能
        </Text>
          {[
            <MainMenuCard
              key='login'
              title='🚀通常起動'
              description='メインのログイン画面'
              onPress={() => navigation.navigate(AuthStackMeta.name, { screen: AuthStackMeta.screens.login, params: {
                headerShown: true
              }})}
              color='#10b981'
              size='medium'
            />,
            <MainMenuCard
              key='screenList'
              title='📱 画面一覧'
              description='各画面の個別起動とテスト'
              onPress={() => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenList })}
              color='#3b82f6'
              size='medium'
            />,
            <MainMenuCard
              key='componentList'
              title='🧩 コンポーネント一覧'
              description='コンポーネントの個別確認'
              onPress={() => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.componentList })}
              color='#8b5cf6'
              size='medium'
            />
          ]}
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
