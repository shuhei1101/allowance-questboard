import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { DemoStackMeta } from '../../DemoNavigator';
import { useAppNavigation } from '../../../AppNavigator';

/**
 * 画面一覧ページ
 * 各画面の起動画面への遷移
 */
export const ScreenListPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useAppNavigation();

  const screens = [
    {
      id: 'login',
      title: '🔐 ログイン画面',
      onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenLauncher, params: { screenType: 'login' } }),
      color: '#10b981',
    },
    {
      id: 'family-register',
      title: '👪 家族登録画面',
      onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenLauncher, params: { screenType: 'family-register' } }),
      color: '#8b5cf6',
    },
    {
      id: 'parent-edit',
      title: '👤 親編集画面',
      onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenLauncher, params: { screenType: 'parent-edit' } }),
      color: '#3b82f6',
    },
    {
      id: 'child-edit',
      title: '👶 子編集画面',
      onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenLauncher, params: { screenType: 'child-edit' } }),
      color: '#f59e0b',
    },
    {
      id: 'family-member-list',
      title: '👨‍👩‍👧‍👦 家族メンバー一覧',
      onPress: () => navigation.navigate(DemoStackMeta.name, { screen: DemoStackMeta.screens.screenLauncher, params: { screenType: 'family-member-list' } }),
      color: '#ef4444',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
      </View>

      <View style={styles.content}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.id}
            style={[styles.screenCard, { backgroundColor: screen.color }]}
            onPress={screen.onPress}
          >
            <Text style={styles.screenTitle}>{screen.title}</Text>
          </TouchableOpacity>
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
  content: {
    paddingHorizontal: 16,
  },
  screenCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
});
