import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { useRoleSelectDataInitializer } from './hooks/useRoleSelectDataInitializer';
import { createRoleSelectPageHandlers } from './hooks/createRoleSelectPageHandlers';
import { FamilyNameLabel } from './components/FamilyNameLabel';
import { FamilyCreateButton } from './components/FamilyCreateButton';
import { FamilyJoinButton } from './components/FamilyJoinButton';
import { ParentLoginButton } from './components/ParentLoginButton';
import { ChildLoginButton } from './components/ChildLoginButton';
import { LoadingSpinner } from '../../shared/loading-page/components/LoadingSpinner';
import { createAuthenticatedClient } from '../../../core/api/trpcClient';
import { useSessionStore } from '../../../core/constants/sessionStore';
import { RoleSelectData } from './models/roleSelectData';

export interface RoleSelectPageProps {
  // 現在はpropsなし
}

/** ロール選択画面
 * 
 * ログイン後に表示される、家族情報と親・子のログイン/作成ボタンを表示する画面 */
export const RoleSelectPage: React.FC<RoleSelectPageProps> = () => {
  const { colors } = useTheme();
  const sessionStore = useSessionStore();
  const [roleSelectData, setRoleSelectData] = useState<RoleSelectData>(RoleSelectData.initialize());
  const [isLoading, setLoading] = useState<boolean>(true);

  if (!sessionStore.jwtToken) {
    throw new Error('JWTトークンが存在しません。ログイン状態を確認してください。');
  }

  // ルーターを作成（トークンがない場合はundefined）
  const router = createAuthenticatedClient({
    jwtToken: sessionStore.jwtToken,
    languageType: sessionStore.languageType,
  });



  // データ初期化
  useRoleSelectDataInitializer({
    loginRouter: router.login.login,
    setRoleSelectData,
    setLoading
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
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background.primary }]}>
        <LoadingSpinner />
        <Text style={[styles.loadingText, { color: colors.text.secondary }]}>
          データを読み込んでいます...
        </Text>
      </View>
    );
  }

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
