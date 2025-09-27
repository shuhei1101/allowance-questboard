import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Switch } from 'react-native';
import { useTheme } from '@/core/theme';
import { ParentForm } from '@/features/parent/parent-edit-page/models/parentForm';
import { Email } from '@backend/features/auth/value-object/email';
import { Password } from '@backend/features/auth/value-object/password';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { useParentFormStore } from '../../src/features/parent/parent-edit-page/stores/parentFormStore';

/**
 * 親編集画面状態設定ページ
 * 親編集画面のストア状態を設定・リセット・テスト
 */
export const ParentEditPageSettingsPage: React.FC = () => {
  const { colors } = useTheme();
  const parentFormStore = useParentFormStore();
  

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
        
      </View>

      {/* プリセット設定 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
          🎨 プリセット
        </Text>

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
              {parentFormStore.form.name.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Email
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentFormStore.form.email.value || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              Password
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentFormStore.form.password.value ? '●●●●●●' : '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              アイコン
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentFormStore.form.icon?.name.value || '未選択'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              誕生日
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {parentFormStore.form.birthday.toString() || '未入力'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              フォーム状態
            </Text>
            <Text style={[styles.statusValue, { color: parentFormStore.form.isValid ? '#10b981' : '#ef4444' }]}>
              {parentFormStore.form.isValid ? '✅ 有効' : '❌ 無効'}
            </Text>
          </View>
          
          <View style={styles.statusItem}>
            <Text style={[styles.statusLabel, { color: colors.text.secondary }]}>
              エラー状態
            </Text>
            <Text style={[styles.statusValue, { color: colors.text.primary }]}>
              {(parentFormStore.errors.name || parentFormStore.errors.email || 
                parentFormStore.errors.password || parentFormStore.errors.birthday) ? '❌ エラーあり' : '✅ エラーなし'}
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
