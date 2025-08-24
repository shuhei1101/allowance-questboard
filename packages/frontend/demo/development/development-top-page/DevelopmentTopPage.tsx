import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { useNavigation } from '@react-navigation/native';
import { MainMenuCard } from './components/MainMenuCard';
import { DevToolCard } from './components/DevToolCard';
import { EnvironmentInfoCard } from './components/EnvironmentInfoCard';
import { initMasterData } from '@/features/auth/services/initMasterData';
import { useSessionStore } from '@/features/auth/stores/sessionStore';
import { useAppConfigStore } from '@/features/shared/stores/appConfigStore';
import { createAuthenticatedClient } from '@/core/api/trpcClient';

/**
 * 開発用TOP画面
 * 通常起動・画面一覧・コンポーネント一覧への入り口
 */
export const DevelopmentTopPage: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<any>();
  const [isInitializing, setIsInitializing] = useState(false);
  const sessionStore = useSessionStore();
  const appConfigStore = useAppConfigStore();
  const router = createAuthenticatedClient({
    jwtToken: sessionStore.jwt,
    languageType: sessionStore.languageType,
  });
  
  // 初期データ取得ハンドラー
  const handleInitMasterData = async () => {
    if (isInitializing) return;
    
    setIsInitializing(true);
    
    try {
      console.log('🚀 マスタデータ初期化開始...');
      await initMasterData({
        getMasterData: router.init.getMasterData,
        setLanguageTypes: sessionStore.setLanguageType,
        setFamilyMemberType: sessionStore.setFamilyMemberType,
        setIconCategories: appConfigStore.setIconCategories,
        setIconByName: appConfigStore.setIconByName,
      });
      console.log('✅ マスタデータ初期化完了！');
      
      Alert.alert(
        '✅ 成功',
        'マスタデータの初期化が完了しました！',
        [{ text: 'OK' }]
      );
    } catch (error) {
      console.error('❌ マスタデータ初期化エラー:', error);
      
      Alert.alert(
        '❌ エラー',
        'マスタデータの初期化に失敗しました。\n\n' + 
        (error instanceof Error ? error.message : '不明なエラー'),
        [{ text: 'OK' }]
      );
    } finally {
      setIsInitializing(false);
    }
  };

  const topMenuItems = [
    {
      id: 'login',
      title: '🚀通常起動',
      description: 'メインのログイン画面',
      onPress: () => navigation.navigate('Login'),
      color: '#10b981',
      size: 'medium' as const,
    },
    {
      title: '📱 画面一覧',
      description: '各画面の個別起動とテスト',
      onPress: () => navigation.navigate('ScreenList'),
      color: '#3b82f6',
      size: 'medium' as const,
    },
    {
      title: '🧩 コンポーネント一覧',
      description: 'コンポーネントの個別確認',
      onPress: () => navigation.navigate('ComponentList'),
      color: '#8b5cf6',
      size: 'medium' as const,
    },
  ];

  const devToolItems = [
    {
      title: '� 初期データ取得',
      description: isInitializing ? '初期化中...' : 'マスタデータを初期化',
      onPress: handleInitMasterData,
      color: isInitializing ? '#9ca3af' : '#10b981',
      disabled: isInitializing,
    },
    {
      title: '�🔍 ストア状態検査',
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
          <MainMenuCard
            key={index}
            title={item.title}
            description={item.description}
            onPress={item.onPress}
            color={item.color}
            size={item.size}
          />
        ))}
      </View>

      {/* 開発ツール */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🛠️ 開発ツール
        </Text>
        <View style={styles.toolGrid}>
          {devToolItems.map((tool, index) => (
            <DevToolCard
              key={index}
              title={tool.title}
              description={tool.description}
              onPress={tool.onPress}
              color={tool.color}
              disabled={tool.disabled}
            />
          ))}
        </View>
      </View>

      {/* 情報セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📋 環境情報
        </Text>
        <EnvironmentInfoCard />
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
