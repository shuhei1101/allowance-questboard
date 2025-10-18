import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyIdInputEntry } from '@/features/family/family-register-page/components/FamilyIdInputEntry';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';

/**
 * FamilyIdInputEntry デモページ
 * 家族ID入力エントリーコンポーネントのデモとテスト
 */
export const FamilyIdInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [value, setValue] = useState<FamilyDisplayId>(new FamilyDisplayId(''));
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(false);

  // バリデーション例
  const handleChange = (newValue: FamilyDisplayId) => {
    setValue(newValue);
    
    // エラーの例
    if (newValue.value.length > 20) {
      setError('家族IDは20文字以内で入力してください');
    } else if (newValue.value.includes(' ')) {
      setError('家族IDにスペースは使用できません');
    } else if (newValue.value.match(/[^a-zA-Z0-9_]/)) {
      setError('家族IDは英数字とアンダースコアのみ使用できます');
    } else {
      setError(undefined);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          FamilyIdInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          家族ID入力エントリーコンポーネントのデモ
        </Text>
      </View>

      <View style={styles.content}>
        {/* インタラクティブデモ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🎯 インタラクティブデモ
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyIdInputEntry
              value={value}
              onChange={handleChange}
              error={error}
              disabled={disabled}
              placeholder="tanaka_family"
            />
          </View>
        </View>

        {/* 基本状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✅ 基本状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyIdInputEntry
              value={new FamilyDisplayId('')}
              onChange={() => {}}
              placeholder="smith_family"
            />
          </View>
        </View>

        {/* エラー状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ❌ エラー状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyIdInputEntry
              value={new FamilyDisplayId('invalid family id!')}
              onChange={() => {}}
              error="家族IDは英数字とアンダースコアのみ使用できます"
            />
          </View>
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔒 無効状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyIdInputEntry
              value={new FamilyDisplayId('readonly_family')}
              onChange={() => {}}
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
            <FamilyIdInputEntry
              title="ファミリーID"
              value={new FamilyDisplayId('custom_family')}
              onChange={() => {}}
              placeholder="ファミリーIDを入力"
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
              入力値: "@{value.value}"
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              エラー: {error || 'なし'}
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
