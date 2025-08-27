import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { DemoStackMeta } from '../demoStackMeta';

/**
 * 画面状態設定メニューページ
 * 各画面専用の設定ページへのナビゲーション
 */
export const PageStateSettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();

  const settingsPages = [
    {
      title: '🔐 ログイン画面設定',
      description: 'ログイン画面のストア状態を設定・テスト',
      route: DemoStackMeta.screens.LoginPageSettings,
      color: '#10b981',
      features: [
        'ローディング状態の切り替え',
        'ダイアログ表示/非表示',
        'サンプルデータ設定',
        'エラー状態の設定',
        '現在の状態確認',
      ],
    },
    {
      title: '👤 親編集画面設定',
      description: '親編集画面のストア状態を設定・テスト',
      route: DemoStackMeta.screens.ParentEditPageSettings,
      color: '#3b82f6',
      features: [
        'ローディング状態の切り替え',
        'サンプルデータ設定',
        'エラー状態の設定',
        '複数パターンのデータ',
        '現在の状態確認',
      ],
    },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          📱 画面状態設定
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各画面のストア状態を個別に設定・テスト
        </Text>
      </View>

      {/* 設定ページ一覧 */}
      <View style={styles.content}>
        {settingsPages.map((page, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.pageCard, { borderLeftColor: page.color, backgroundColor: colors.surface.elevated }]}
            onPress={() => navigation.navigate(DemoStackMeta.name, { screen: page.route })}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.text.primary }]}>
                {page.title}
              </Text>
              <View style={[styles.colorIndicator, { backgroundColor: page.color }]} />
            </View>
            
            <Text style={[styles.cardDescription, { color: colors.text.secondary }]}>
              {page.description}
            </Text>
            
            <View style={styles.featureList}>
              <Text style={[styles.featureHeader, { color: colors.text.primary }]}>
                機能:
              </Text>
              {page.features.map((feature, featureIndex) => (
                <Text key={featureIndex} style={[styles.featureItem, { color: colors.text.secondary }]}>
                  • {feature}
                </Text>
              ))}
            </View>
            
            <View style={styles.cardFooter}>
              <Text style={[styles.actionText, { color: page.color }]}>
                設定画面を開く →
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 使い方ガイド */}
      <View style={[styles.guide, { backgroundColor: colors.surface.elevated }]}>
        <Text style={[styles.guideTitle, { color: colors.text.primary }]}>
          💡 使い方
        </Text>
        <View style={styles.guideContent}>
          <Text style={[styles.guideText, { color: colors.text.secondary }]}>
            1. 設定したい画面を選択
          </Text>
          <Text style={[styles.guideText, { color: colors.text.secondary }]}>
            2. トグルスイッチで状態を切り替え
          </Text>
          <Text style={[styles.guideText, { color: colors.text.secondary }]}>
            3. プリセットで一括設定
          </Text>
          <Text style={[styles.guideText, { color: colors.text.secondary }]}>
            4. 現在の状態を確認
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          ⚡ 設定は即座に各画面に反映されます
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
    padding: 16,
  },
  pageCard: {
    borderRadius: 16,
    borderLeftWidth: 6,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  cardDescription: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 16,
  },
  featureList: {
    marginBottom: 16,
  },
  featureHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 2,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    paddingTop: 12,
    alignItems: 'flex-end',
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
  },
  guide: {
    margin: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  guideContent: {
    paddingLeft: 8,
  },
  guideText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
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
