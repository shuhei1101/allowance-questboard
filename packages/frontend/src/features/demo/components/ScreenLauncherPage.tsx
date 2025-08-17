import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ScreenLauncherPageProps {
  screenType: string;
}

/**
 * 画面X起動画面
 * 特定画面の起動と状態設定を行う
 */
export const ScreenLauncherPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { screenType } = route.params as ScreenLauncherPageProps;

  const screenInfo = getScreenInfo(screenType);

  const handleLaunchScreen = () => {
    switch (screenType) {
      case 'login':
        navigation.navigate('DemoLoginPage');
        break;
      case 'parent-edit':
        navigation.navigate('DemoParentEditPage');
        break;
      case 'child-edit':
        Alert.alert('未実装', 'この画面はまだ実装されていません');
        break;
      case 'family-member-list':
        Alert.alert('未実装', 'この画面はまだ実装されていません');
        break;
      default:
        Alert.alert('エラー', '不明な画面タイプです');
    }
  };

  const handleSessionSettings = () => {
    navigation.navigate('SessionSettings');
  };

  const handlePageStateSettings = () => {
    navigation.navigate('PageStateSettings');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          {screenInfo.icon} {screenInfo.title}
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          {screenInfo.description}
        </Text>
      </View>

      {/* 画面起動セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🚀 画面起動
        </Text>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: screenInfo.color }]}
          onPress={handleLaunchScreen}
        >
          <Text style={styles.primaryButtonText}>
            {screenInfo.title}を起動
          </Text>
        </TouchableOpacity>
      </View>

      {/* 状態設定セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚙️ 状態設定
        </Text>
        <Text style={[styles.sectionDescription, { color: colors.text.secondary }]}>
          画面を特定の状態で起動するための設定
        </Text>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={handleSessionSettings}
        >
          <View style={styles.settingButtonContent}>
            <Text style={[styles.settingButtonTitle, { color: colors.text.primary }]}>
              🔧 セッション状態設定
            </Text>
            <Text style={[styles.settingButtonDescription, { color: colors.text.secondary }]}>
              ログイン状態・言語・権限などの設定
            </Text>
          </View>
          <Text style={[styles.settingButtonArrow, { color: colors.text.secondary }]}>
            →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingButton}
          onPress={handlePageStateSettings}
        >
          <View style={styles.settingButtonContent}>
            <Text style={[styles.settingButtonTitle, { color: colors.text.primary }]}>
              📱 画面状態設定
            </Text>
            <Text style={[styles.settingButtonDescription, { color: colors.text.secondary }]}>
              {screenInfo.title}の初期状態・エラー状態の設定
            </Text>
          </View>
          <Text style={[styles.settingButtonArrow, { color: colors.text.secondary }]}>
            →
          </Text>
        </TouchableOpacity>
      </View>

      {/* 使い方ガイド */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          💡 使い方
        </Text>
        <View style={styles.guideList}>
          <Text style={[styles.guideItem, { color: colors.text.secondary }]}>
            1. 状態設定で画面の初期状態を設定
          </Text>
          <Text style={[styles.guideItem, { color: colors.text.secondary }]}>
            2. 画面起動ボタンで対象画面を起動
          </Text>
          <Text style={[styles.guideItem, { color: colors.text.secondary }]}>
            3. 設定した状態で画面の動作を確認
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * 画面タイプから画面情報を取得
 */
function getScreenInfo(screenType: string) {
  const screenInfoMap = {
    'login': {
      title: 'ログイン画面',
      icon: '🔐',
      description: 'メール・パスワード認証、家族作成、パスワードリセット機能',
      color: '#10b981',
    },
    'parent-edit': {
      title: '親編集画面',
      icon: '👤',
      description: '親の基本情報編集（名前、メール、アイコン、誕生日）',
      color: '#3b82f6',
    },
    'child-edit': {
      title: '子編集画面',
      icon: '👶',
      description: '子の基本情報編集（今後実装予定）',
      color: '#f59e0b',
    },
    'family-member-list': {
      title: '家族メンバー一覧',
      icon: '👨‍👩‍👧‍👦',
      description: '家族メンバーの一覧表示（今後実装予定）',
      color: '#ef4444',
    },
  };

  return screenInfoMap[screenType as keyof typeof screenInfoMap] || {
    title: '不明な画面',
    icon: '❓',
    description: '画面情報が見つかりません',
    color: '#6b7280',
  };
}

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
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  settingButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingButtonContent: {
    flex: 1,
  },
  settingButtonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingButtonDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingButtonArrow: {
    fontSize: 18,
    marginLeft: 12,
  },
  guideList: {
    paddingLeft: 8,
  },
  guideItem: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 4,
  },
});
