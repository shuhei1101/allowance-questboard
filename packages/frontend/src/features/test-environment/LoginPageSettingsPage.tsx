import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useTheme } from '@/core/theme';
import { useLoginPageStore } from '@/features/auth/login-page/stores/loginPageStore';
import { LoginForm } from '@/features/auth/login-page/models/loginForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';

/**
 * ログイン画面状態設定ページ
 * ログイン画面のストア状態を設定・リセット・テスト
 */
export const LoginPageSettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const loginPageStore = useLoginPageStore();
  
  // 現在の状態を取得
  const [isLoading, setIsLoading] = useState(loginPageStore.isLoading);
  const [isDialogVisible, setIsDialogVisible] = useState(loginPageStore.isDialogVisible);

  const presets = [
    {
      name: '初期状態',
      description: '空のフォーム状態',
      icon: '🔄',
      action: () => {
        loginPageStore.updateLoginForm(LoginForm.initialize());
        loginPageStore.clearErrors();
        loginPageStore.setLoading(false);
        loginPageStore.hideDialog();
        setIsLoading(false);
        setIsDialogVisible(false);
        Alert.alert('設定完了', 'ログイン画面を初期状態にリセットしました');
      },
    },
    {
      name: 'サンプルデータ',
      description: 'デモ用のサンプルデータを設定',
      icon: '📝',
      action: () => {
        try {
          const sampleForm = new LoginForm({
            email: new Email('demo@example.com'),
            password: new Password('demo123456'),
          });
          loginPageStore.updateLoginForm(sampleForm);
          loginPageStore.clearErrors();
          Alert.alert('設定完了', 'サンプルデータを設定しました');
        } catch (error) {
          Alert.alert('エラー', `設定に失敗しました: ${error}`);
        }
      },
    },
    {
      name: 'エラー状態',
      description: 'バリデーションエラーを表示',
      icon: '❌',
      action: () => {
        loginPageStore.setEmailError('メールアドレスが無効です');
        loginPageStore.setPasswordError('パスワードが短すぎます');
        Alert.alert('設定完了', 'エラー状態を設定しました');
      },
    },
    {
      name: 'エラークリア',
      description: 'すべてのエラーを削除',
      icon: '✨',
      action: () => {
        loginPageStore.clearErrors();
        Alert.alert('設定完了', 'エラーをクリアしました');
      },
    },
  ];

  const handleLoadingToggle = (value: boolean) => {
    setIsLoading(value);
    loginPageStore.setLoading(value);
  };

  const handleDialogToggle = (value: boolean) => {
    setIsDialogVisible(value);
    if (value) {
      loginPageStore.showDialog();
    } else {
      loginPageStore.hideDialog();
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          🔐 ログイン画面設定
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          ログイン画面のストア状態を設定・テスト
        </Text>
      </View>

      {/* boolean状態設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚡ 状態設定
        </Text>
        
        <View style={styles.toggleContainer}>
          <View style={styles.toggleItem}>
            <Text style={[styles.toggleLabel, { color: colors.text.primary }]}>
              ローディング状態
            </Text>
            <Switch
              value={isLoading}
              onValueChange={handleLoadingToggle}
              trackColor={{ false: '#d1d5db', true: '#10b981' }}
              thumbColor={isLoading ? '#ffffff' : '#ffffff'}
            />
          </View>
          <Text style={[styles.toggleDescription, { color: colors.text.secondary }]}>
            {isLoading ? '🔄 読み込み中表示' : '⏸️ 通常状態'}
          </Text>
        </View>

        <View style={styles.toggleContainer}>
          <View style={styles.toggleItem}>
            <Text style={[styles.toggleLabel, { color: colors.text.primary }]}>
              家族選択ダイアログ
            </Text>
            <Switch
              value={isDialogVisible}
              onValueChange={handleDialogToggle}
              trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
              thumbColor={isDialogVisible ? '#ffffff' : '#ffffff'}
            />
          </View>
          <Text style={[styles.toggleDescription, { color: colors.text.secondary }]}>
            {isDialogVisible ? '💬 ダイアログ表示中' : '📱 画面表示中'}
          </Text>
        </View>
      </View>

      {/* プリセット設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎨 プリセット
        </Text>

        {presets.map((preset, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.presetButton, { backgroundColor: '#ffffff' }]}
            onPress={preset.action}
            activeOpacity={0.7}
          >
            <View style={styles.presetContent}>
              <View style={styles.presetHeader}>
                <Text style={styles.presetIcon}>{preset.icon}</Text>
                <Text style={[styles.presetTitle, { color: colors.text.primary }]}>
                  {preset.name}
                </Text>
              </View>
              <Text style={[styles.presetDescription, { color: colors.text.secondary }]}>
                {preset.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 現在の状態表示 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          📊 現在の状態
        </Text>
        
        <View style={[styles.statusContainer, { backgroundColor: '#ffffff' }]}>
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Email
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {loginPageStore.loginForm.email.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Password
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {loginPageStore.loginForm.password.value ? '●●●●●●' : '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              フォーム状態
            </Text>
            <Text style={[styles.statusValue, { color: loginPageStore.loginForm.isValid ? '#10b981' : '#ef4444' }]}>
              {loginPageStore.loginForm.isValid ? '✅ 有効' : '❌ 無効'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              エラー状態
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {(loginPageStore.emailError || loginPageStore.passwordError) ? '❌ エラーあり' : '✅ エラーなし'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.text.secondary }]}>
          💡 設定は即座に画面に反映されます
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
  toggleContainer: {
    backgroundColor: '#ffffff',
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
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  toggleDescription: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  presetButton: {
    borderRadius: 12,
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
  presetContent: {
    padding: 16,
  },
  presetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  presetIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  presetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  presetDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  statusContainer: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusValue: {
    fontSize: 14,
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
