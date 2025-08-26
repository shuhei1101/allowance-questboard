import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useTheme } from '@/core/theme';
import { useParentEditPageStore } from '@/features/parent/parent-edit-page/stores/parentEditPageStore';
import { ParentForm } from '@/features/parent/parent-edit-page/models/parentForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';
import { Birthday } from '@backend/features/shared/value-object/birthday';

/**
 * 親編集画面状態設定ページ
 * 親編集画面のストア状態を設定・リセット・テスト
 */
export const ParentEditPageSettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const parentEditPageStore = useParentEditPageStore();
  
  // 現在の状態を取得
  const [isLoading, setIsLoading] = useState(parentEditPageStore.isLoading);

  const presets = [
    {
      name: '初期状態',
      description: '空のフォーム状態',
      icon: '🔄',
      action: () => {
        parentEditPageStore.setParentForm(ParentForm.initialize());
        parentEditPageStore.clearErrors();
        parentEditPageStore.setLoading(false);
        setIsLoading(false);
        Alert.alert('設定完了', '親編集画面を初期状態にリセットしました');
      },
    },
    {
      name: 'サンプルデータ',
      description: 'デモ用のサンプルデータを設定',
      icon: '👤',
      action: () => {
        try {
          const sampleForm = new ParentForm({
            name: new ParentName('田中太郎'),
            email: new Email('tanaka@example.com'),
            password: new Password('password123'),
            icon: new Icon({
              id: new IconId(1),
              name: new IconName('home'),
              sortOrder: new SortOrder(1),
            }),
            birthday: new Birthday(),
          });
          parentEditPageStore.setParentForm(sampleForm);
          parentEditPageStore.clearErrors();
          Alert.alert('設定完了', 'サンプルデータを設定しました');
        } catch (error) {
          Alert.alert('エラー', `設定に失敗しました: ${error}`);
        }
      },
    },
    {
      name: '別のサンプル',
      description: '別パターンのサンプルデータ',
      icon: '👩',
      action: () => {
        try {
          const sampleForm = new ParentForm({
            name: new ParentName('佐藤花子'),
            email: new Email('sato.hanako@demo.jp'),
            password: new Password('sato2024pass'),
            icon: new Icon({
              id: new IconId(2),
              name: new IconName('user'),
              sortOrder: new SortOrder(2)
            }),
            birthday: new Birthday(),
          });
          parentEditPageStore.setParentForm(sampleForm);
          parentEditPageStore.clearErrors();
          Alert.alert('設定完了', '別のサンプルデータを設定しました');
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
        parentEditPageStore.setNameError('名前が入力されていません');
        parentEditPageStore.setEmailError('メールアドレスが無効です');
        parentEditPageStore.setPasswordError('パスワードが短すぎます');
        parentEditPageStore.setBirthdayError('誕生日の形式が正しくありません');
        Alert.alert('設定完了', 'エラー状態を設定しました');
      },
    },
    {
      name: 'エラークリア',
      description: 'すべてのエラーを削除',
      icon: '✨',
      action: () => {
        parentEditPageStore.clearErrors();
        Alert.alert('設定完了', 'エラーをクリアしました');
      },
    },
  ];

  const handleLoadingToggle = (value: boolean) => {
    setIsLoading(value);
    parentEditPageStore.setLoading(value);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text.primary }]}>
          👤 親編集画面設定
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.text.secondary }]}>
          親編集画面のストア状態を設定・テスト
        </Text>
      </View>

      {/* boolean状態設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          ⚡ 状態設定
        </Text>
        
        <View style={[styles.toggleContainer, { backgroundColor: colors.surface.elevated }]}>
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
      </View>

      {/* プリセット設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎨 プリセット
        </Text>

        {presets.map((preset, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.presetButton, { backgroundColor: colors.surface.elevated }]}
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
        
        <View style={[styles.statusContainer, { backgroundColor: colors.surface.elevated }]}>
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              名前
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.name.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Email
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.email.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Password
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.password.value ? '●●●●●●' : '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              アイコン
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.icon?.name.value || '未選択'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              誕生日
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentEditPageStore.parentForm.birthday.toString() || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              フォーム状態
            </Text>
            <Text style={[styles.statusValue, { color: parentEditPageStore.parentForm.isValid ? '#10b981' : '#ef4444' }]}>
              {parentEditPageStore.parentForm.isValid ? '✅ 有効' : '❌ 無効'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              エラー状態
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {(parentEditPageStore.nameError || parentEditPageStore.emailError || 
                parentEditPageStore.passwordError || parentEditPageStore.birthdayError) ? '❌ エラーあり' : '✅ エラーなし'}
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
