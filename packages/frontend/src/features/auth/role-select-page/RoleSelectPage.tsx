import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useRoleSelectPageStore } from './stores/roleSelectPageStore';
import { useRoleSelectDataInitializer } from './hooks/useRoleSelectDataInitializer';
import { createRoleSelectPageHandlers } from './hooks/createRoleSelectPageHandlers';
import { FamilyNameLabel } from './components/FamilyNameLabel';
import { FamilyCreateButton } from './components/FamilyCreateButton';
import { FamilyJoinButton } from './components/FamilyJoinButton';
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
    handleFamilyJoin,
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
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.content}>
        
        {/* パターン1: 家族情報がある場合 */}
        {pageStore.roleSelectData.hasFamily() ? (
          <>
            {/* 家族名ラベル */}
            <View style={styles.familyNameSection}>
              <FamilyNameLabel familyName={pageStore.roleSelectData.familyName!} />
            </View>

            {/* 親ユーザでログインボタン */}
            <View style={styles.buttonSection}>
              <ParentLoginButton onPress={handleParentLogin} />
            </View>

            {/* 子ユーザでログインボタン */}
            <View style={styles.buttonSection}>
              <ChildLoginButton onPress={handleChildLogin} />
            </View>
          </>
        ) : (
          /* パターン2: 家族情報がない場合 */
          <>
            {/* 新規家族を作成ボタン */}
            <View style={styles.buttonSection}>
              <FamilyCreateButton onPress={handleFamilyCreate} />
            </View>

            {/* 家族に参加ボタン */}
            <View style={styles.buttonSection}>
              <FamilyJoinButton onPress={handleFamilyJoin} />
            </View>
          </>
        )}
        
      </View>
    </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  familyNameSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonSection: {
    marginBottom: 16,
  },
});
