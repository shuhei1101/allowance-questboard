import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyRegisterPage } from '@/features/family/family-register-page/FamilyRegisterPage';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { FamilyId } from '@backend/features/family/value-object/familyId';

/**
 * FamilyRegisterPage デモページ
 * 家族登録画面のデモとテスト
 */
export const FamilyRegisterPageDemo: React.FC = () => {
  const { colors } = useTheme();

  const handleSubmitComplete = (params: { familyId: FamilyId; parentId: ParentId }) => {
    Alert.alert(
      '登録完了',
      `家族登録が完了しました！\n家族ID: ${params.familyId.value}\n親ID: ${params.parentId.value}`,
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('家族登録完了:', params);
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          FamilyRegisterPage
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          家族登録画面のデモ（新実装）
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          内部でストア管理とハンドラーを使用
        </Text>
      </View>

      <View style={styles.content}>
        <FamilyRegisterPage onSubmitComplete={handleSubmitComplete} />
      </View>

      {/* デバッグ情報 */}
      <View style={[styles.debugInfo, { backgroundColor: colors.surface.elevated }]}>
        <Text style={[styles.debugTitle, { color: colors.text.primary }]}>
          🔍 デバッグ情報
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          実装パターン: 新実装（ストア管理）
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          状態管理: useFamilyRegisterFormStore
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          ハンドラー: createFamilyRegisterPageHandlers
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          バリデーション: 動的（form.isValid）
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
  },
  debugInfo: {
    padding: 16,
    margin: 16,
    borderRadius: 8,
    marginTop: 0,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  debugText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
