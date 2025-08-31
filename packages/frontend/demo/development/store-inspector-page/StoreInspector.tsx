import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/core/theme';
import { useParentEditPageStore } from '@/features/parent/parent-edit-page/stores/parentEditPageStore';
import { Session } from '../../../src/core/constants/sessionVariables';
import { JwtStorage } from '../../../src/features/auth/services/jwtStorage';
import { useLoginPageStore } from '../../../src/features/auth/login-page/loginPageStore';

/**
 * ストア状態の確認画面
 * 各Zustandストアの現在の状態を表示・操作できる画面
 */
export const StoreInspector: React.FC = () => {
  const { colors } = useTheme();
  const loginPageStore = useLoginPageStore();
  const parentEditPageStore = useParentEditPageStore();
  const [jwt, setJwt] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchJwt = async () => {
      const token = await JwtStorage.getToken();
      setJwt(token);
    };
    fetchJwt();
  }, []);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🔍 ストア状態検査
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          各Zustandストアの現在の状態を確認できます
        </Text>
      </View>

      {/* セッションストア */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🔐 セッションストア
        </Text>
        
        <View style={[styles.storeContainer, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              JWT:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {jwt ? `${jwt.substring(0, 20)}...` : '未設定'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              言語:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {Session.languageType ? Session.languageType.code.value : '未設定'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              メンバータイプ:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {Session.familyMemberType ? Session.familyMemberType.tableName : '未設定'}
            </Text>
          </View>
        </View>
      </View>

      {/* ログインページストア */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🔑 ログインページストア
        </Text>
        
        <View style={[styles.storeContainer, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              ローディング中:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {loginPageStore.isLoading ? 'はい' : 'いいえ'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              ダイアログ表示:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {loginPageStore.isDialogVisible ? 'はい' : 'いいえ'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              メール:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {loginPageStore.loginForm.email.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              パスワード:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {loginPageStore.loginForm.password.value ? '●'.repeat(loginPageStore.loginForm.password.value.length) : '未入力'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              メールエラー:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {loginPageStore.emailError || '無し'}
            </Text>
          </View>
        </View>
      </View>

      {/* 親編集ページストア */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          👤 親編集ページストア
        </Text>
        
        <View style={[styles.storeContainer, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              ローディング中:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {parentEditPageStore.isLoading ? 'はい' : 'いいえ'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              名前:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.name.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              メール:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.email.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.storeRow}>
            <Text style={[styles.storeLabel, { color: colors.text.secondary }]}>
              誕生日:
            </Text>
            <Text style={[styles.storeValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.birthday.value.toDateString() || '未入力'}
            </Text>
          </View>
        </View>
      </View>

      {/* アクション */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚡ アクション
        </Text>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#ef4444' }]}
          onPress={() => {
            console.log('🎯 Demo - Clearing all errors...');
            parentEditPageStore.clearErrors();
          }}
        >
          <Text style={styles.actionButtonText}>エラーをクリア</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#3b82f6' }]}
          onPress={() => {
            console.log('🎯 Demo - Setting loading states...');
            loginPageStore.setLoading(true);
            parentEditPageStore.setLoading(true);
            setTimeout(() => {
              loginPageStore.setLoading(false);
              parentEditPageStore.setLoading(false);
            }, 2000);
          }}
        >
          <Text style={styles.actionButtonText}>ローディング状態テスト</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 リアルタイムでストア状態が更新されます
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
  section: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  storeContainer: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  storeLabel: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
  },
  storeValue: {
    fontSize: 14,
    flex: 2,
    textAlign: 'right',
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
