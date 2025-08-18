import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';

/**
 * 画面一覧ページ
 * 各画面の起動画面への遷移
 */
export const ScreenListPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const screens = [
    {
      id: 'login',
      title: '🔐 ログイン画面',
      description: 'メール・パスワード認証、家族作成、パスワードリセット機能',
      onPress: () => navigation.navigate('ScreenLauncher', { screenType: 'login' }),
      color: '#10b981',
    },
    {
      id: 'parent-edit',
      title: '👤 親編集画面',
      description: '親の基本情報編集（名前、メール、アイコン、誕生日）',
      onPress: () => navigation.navigate('ScreenLauncher', { screenType: 'parent-edit' }),
      color: '#3b82f6',
    },
    {
      id: 'child-edit',
      title: '👶 子編集画面',
      description: '子の基本情報編集（今後実装予定）',
      onPress: () => navigation.navigate('ScreenLauncher', { screenType: 'child-edit' }),
      color: '#f59e0b',
    },
    {
      id: 'family-member-list',
      title: '👨‍👩‍👧‍👦 家族メンバー一覧',
      description: '家族メンバーの一覧表示（今後実装予定）',
      onPress: () => navigation.navigate('ScreenLauncher', { screenType: 'family-member-list' }),
      color: '#ef4444',
    },
    {
      id: 'icon-select',
      title: '🎨 アイコン選択画面',
      description: 'カテゴリごとのアイコン選択とプレビュー機能',
      onPress: () => navigation.navigate('icon-select-pageDetail'),
      color: '#8b5cf6',
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          📱 画面一覧
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各画面の起動とテストができます
        </Text>
      </View>

      <View style={styles.content}>
        {screens.map((screen) => (
          <TouchableOpacity
            key={screen.id}
            style={[styles.screenCard, { backgroundColor: screen.color }]}
            onPress={screen.onPress}
          >
            <Text style={styles.screenTitle}>{screen.title}</Text>
            <Text style={styles.screenDescription}>{screen.description}</Text>
            <View style={styles.launchButton}>
              <Text style={styles.launchButtonText}>起動画面へ →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 各画面をタップして起動画面に移動
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
  screenDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 16,
  },
  launchButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-end',
  },
  launchButtonText: {
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
