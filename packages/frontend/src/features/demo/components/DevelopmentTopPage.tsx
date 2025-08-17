import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';

/**
 * 開発用TOP画面
 * 通常起動・画面一覧・コンポーネント一覧への入り口
 */
export const DevelopmentTopPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const topMenuItems = [
    {
      id: 'login',
      title: '🚀通常起動',
      description: 'メインのログイン画面',
      onPress: () => navigation.navigate('Login'),
      color: '#10b981',
      size: 'medium',
    },
    {
      title: '📱 画面一覧',
      description: '各画面の個別起動とテスト',
      onPress: () => navigation.navigate('ScreenList'),
      color: '#3b82f6',
      size: 'medium',
    },
    {
      title: '🧩 コンポーネント一覧',
      description: 'コンポーネントの個別確認',
      onPress: () => navigation.navigate('ComponentList'),
      color: '#8b5cf6',
      size: 'medium',
    },
  ];

  const devToolItems = [
    {
      title: '🔍 ストア状態検査',
      description: 'Zustandストアの状態確認',
      onPress: () => navigation.navigate('StoreInspector'),
      color: '#f59e0b',
    },
    {
      title: '⚙️ セッション設定',
      description: 'グローバル状態の設定',
      onPress: () => navigation.navigate('SessionSettings'),
      color: '#6366f1',
    },
    {
      title: '📊 画面状態設定',
      description: '各画面の初期状態設定',
      onPress: () => navigation.navigate('PageStateSettings'),
      color: '#8b5cf6',
    },
  ];

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
        {topMenuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuCard,
              item.size === 'large' && styles.largeCard,
              { backgroundColor: item.color }
            ]}
            onPress={item.onPress}
          >
            <Text style={styles.menuTitle}>{item.title}</Text>
            <Text style={styles.menuDescription}>{item.description}</Text>
            <View style={styles.menuButton}>
              <Text style={styles.menuButtonText}>開く →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 開発ツール */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🛠️ 開発ツール
        </Text>
        <View style={styles.toolGrid}>
          {devToolItems.map((tool, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.toolCard, { backgroundColor: tool.color }]}
              onPress={tool.onPress}
            >
              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolDescription}>{tool.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 情報セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📋 環境情報
        </Text>
        <View style={styles.infoCard}>
          <Text style={[styles.infoText, { color: colors.text.secondary }]}>
            開発モード: 有効
          </Text>
          <Text style={[styles.infoText, { color: colors.text.secondary }]}>
            バージョン: 1.0.0
          </Text>
          <Text style={[styles.infoText, { color: colors.text.secondary }]}>
            最終更新: {new Date().toLocaleDateString()}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 開発・テスト用の機能です
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
  menuCard: {
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
  largeCard: {
    padding: 32,
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  menuDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 22,
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  toolTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
  },
  toolDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    lineHeight: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
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
