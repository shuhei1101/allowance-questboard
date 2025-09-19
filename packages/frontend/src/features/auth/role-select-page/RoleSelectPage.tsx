import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useRoleSelectPageStore } from './stores/roleSelectPageStore';
import { useRoleSelectDataInitializer } from './hooks/useRoleSelectDataInitializer';
import { createRoleSelectPageHandlers } from './hooks/createRoleSelectPageHandlers';
import { FamilyNameLabel } from './components/FamilyNameLabel';
import { FamilyCreateButton } from './components/FamilyCreateButton';
import { ParentLoginButton } from './components/ParentLoginButton';
import { ParentCreateButton } from './components/ParentCreateButton';
import { ChildLoginButton } from './components/ChildLoginButton';
import { ChildCreateButton } from './components/ChildCreateButton';
import { LoadingSpinner } from '../../shared/loading-page/components/LoadingSpinner';
import { createAuthenticatedClient } from '../../../core/api/trpcClient';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { useLoadToken } from '../../../core/stores/basePageStore';

export interface RoleSelectPageProps {
  // 現在はpropsなし
}

/** ロール選択画面
 * 
 * ログイン後に表示される、家族情報と親・子のログイン/作成ボタンを表示する画面 */
export const RoleSelectPage: React.FC<RoleSelectPageProps> = () => {
  const { colors } = useTheme();
  const pageStore = useRoleSelectPageStore();
  const sessionStore = useSessionStore();
  
  // トークンを読み込む
  const { jwtToken, isLoading } = useLoadToken(pageStore);
  
  // ルーターを作成（トークンがない場合はundefined）
  const router = jwtToken ? createAuthenticatedClient({
    jwtToken,
    languageType: sessionStore.languageType,
  }) : undefined;

  // データ初期化
  useRoleSelectDataInitializer({
    setRoleSelectData: pageStore.setRoleSelectData,
    loginRouter: router?.login.login,
  });

  // ハンドラーの取得
  const {
    handleFamilyCreate,
    handleParentLogin,
    handleParentCreate,
    handleChildLogin,
    handleChildCreate,
  } = createRoleSelectPageHandlers();

  // ローディング中の表示
  if (isLoading || !pageStore.roleSelectData) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background.primary }]}>
        <LoadingSpinner />
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
          データを読み込んでいます...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          ようこそ！
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          利用方法を選択してください
        </Text>
      </View>

      {/* 家族情報セクション */}
      <View style={styles.familySection}>
        {pageStore.roleSelectData.hasFamily() && (
          <FamilyNameLabel familyName={pageStore.roleSelectData.familyName!} />
        )}
      </View>

      {/* 家族作成セクション */}
      <View style={styles.section}>
        {pageStore.roleSelectData.hasFamily() && (
          <FamilyCreateButton onPress={handleFamilyCreate} />
        )}
      </View>

      {/* 親セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          👥 親としてログイン
        </Text>

        {pageStore.roleSelectData.hasParent() && (
          <ParentLoginButton onPress={handleParentLogin} />
        )}

        {pageStore.roleSelectData.hasFamily() && !pageStore.roleSelectData.hasParent() && (
          <ParentCreateButton onPress={handleParentCreate} />
        )}
      </View>

      {/* 子供セクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          👶 子供としてログイン
        </Text>
        
        {pageStore.roleSelectData.hasChild() && (
          <ChildLoginButton onPress={handleChildLogin} />
        )}
        
        {pageStore.roleSelectData.hasChild() && (
          <ChildCreateButton onPress={handleChildCreate} />
        )}
      </View>

      {/* フッター */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 利用方法に応じてボタンを選択してください
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'center',
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
  familySection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
