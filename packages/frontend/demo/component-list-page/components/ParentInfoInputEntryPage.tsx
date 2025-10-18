import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { ParentInfoInputEntry } from '@/features/family/family-register-page/components/ParentInfoInputEntry';
import { Parent } from '@backend/features/parent/models/parent';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { FamilyId } from '@backend/features/family/value-object/familyId';
import { Birthday } from '@backend/features/shared/value-object/birthday';

/**
 * ParentInfoInputEntry デモページ
 * 親情報入力エントリーコンポーネントのデモとテスト
 */
export const ParentInfoInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [selectedParent, setSelectedParent] = useState<Parent | undefined>();
  const [disabled, setDisabled] = useState(false);

  // サンプル親情報の作成
  const sampleIconId = new IconId(1);
  const sampleFamilyId = new FamilyId(1);

  const sampleParents = [
    new Parent({
      id: new ParentId(1),
      name: new ParentName('田中太郎'),
      iconId: sampleIconId,
      birthday: new Birthday(new Date('1985-05-15')),
      familyId: sampleFamilyId,
    }),
    new Parent({
      id: new ParentId(2),
      name: new ParentName('佐藤花子'),
      iconId: sampleIconId,
      birthday: new Birthday(new Date('1987-12-03')),
      familyId: sampleFamilyId,
    }),
    new Parent({
      id: new ParentId(3),
      name: new ParentName('山田二郎'),
      iconId: sampleIconId,
      birthday: new Birthday(new Date('1982-08-20')),
      familyId: sampleFamilyId,
    }),
  ];

  const handleParentEdit = () => {
    Alert.alert(
      '親情報編集',
      '親編集画面への遷移（家族登録画面から）',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '田中太郎選択',
          onPress: () => setSelectedParent(sampleParents[0]),
        },
        {
          text: '佐藤花子選択',
          onPress: () => setSelectedParent(sampleParents[1]),
        },
        {
          text: '山田二郎選択',
          onPress: () => setSelectedParent(sampleParents[2]),
        },
        {
          text: '未設定にする',
          onPress: () => setSelectedParent(undefined),
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          ParentInfoInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          親情報入力エントリーコンポーネントのデモ
        </Text>
      </View>

      <View style={styles.content}>
        {/* インタラクティブデモ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🎯 インタラクティブデモ
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              parentName={selectedParent?.name}
              onPress={handleParentEdit}
              disabled={disabled}
            />
          </View>
        </View>

        {/* 基本状態（未設定） */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✅ 基本状態（未設定）
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              parentName={undefined}
              onPress={() => Alert.alert('親情報編集', '基本状態の親情報編集')}
            />
          </View>
        </View>

        {/* 設定済み状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✨ 設定済み状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              parentName={sampleParents[0].name}
              onPress={() => Alert.alert('親情報編集', '田中太郎の情報を編集')}
            />
          </View>
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔒 無効状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              parentName={sampleParents[1].name}
              onPress={() => {}}
              disabled
            />
          </View>
        </View>

        {/* カスタムタイトル */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🏷️ カスタムタイトル
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              title="保護者情報"
              parentName={sampleParents[2].name}
              onPress={() => Alert.alert('保護者情報', 'カスタムタイトルでの編集')}
            />
          </View>
        </View>

        {/* カスタムプレースホルダー */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            📝 カスタムプレースホルダー
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <ParentInfoInputEntry
              parentName={undefined}
              onPress={() => Alert.alert('カスタム', 'カスタムプレースホルダー')}
              placeholder="親情報を設定してください"
            />
          </View>
        </View>

        {/* 現在の値表示 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔍 デバッグ情報
          </Text>
          <View style={[styles.debugInfo, { backgroundColor: colors.surface.elevated }]}>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              選択中親: {selectedParent ? selectedParent.name.value : '未設定'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              親ID: {selectedParent ? selectedParent.id?.value || '未設定' : '未設定'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              アイコンID: {selectedParent ? selectedParent.iconId?.value || '未設定' : '未設定'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              誕生日: {selectedParent ? selectedParent.birthday?.value.toLocaleDateString() || '未設定' : '未設定'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              無効状態: {disabled ? 'はい' : 'いいえ'}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  example: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  debugInfo: {
    padding: 16,
    borderRadius: 8,
  },
  debugText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});
