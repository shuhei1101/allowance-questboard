import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { OnlineFamilyNameInputEntry } from '@/features/family/family-register-page/components/OnlineFamilyNameInputEntry';

/**
 * OnlineFamilyNameInputEntry デモページ
 * オンライン家族名入力エントリーコンポーネントのデモとテスト
 */
export const OnlineFamilyNameInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(false);

  // バリデーション例
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    // エラーの例
    if (newValue.length > 10) {
      setError('オンライン家族名は10文字以内で入力してください');
    } else if (newValue.includes(' ')) {
      setError('オンライン家族名にスペースは使用できません');
    } else if (newValue.includes('@') || newValue.includes('#')) {
      setError('オンライン家族名に記号は使用できません');
    } else {
      setError(undefined);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          🌐 OnlineFamilyNameInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          オンライン家族名入力エントリーコンポーネント
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          EntryLayoutを使用したオンライン家族名入力コンポーネントです。{'\n'}
          入力値の後ろに"家"の固定文字が表示され、{'\n'}
          ヘルプテキストでオンライン利用について説明します。
        </Text>
      </View>

      <View style={styles.content}>
        {/* 基本的な使用例 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            📝 基本的な使用例
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value={value}
              onChange={handleChange}
              placeholder="例: 田中"
              error={error}
              disabled={disabled}
            />
          </View>
        </View>

        {/* エラー状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ❌ エラー状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value="とても長いオンライン家族名"
              onChange={() => {}}
              error="オンライン家族名は10文字以内で入力してください"
            />
          </View>
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔒 無効状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value="田中"
              onChange={() => {}}
              disabled
            />
          </View>
        </View>

        {/* 記号エラー例 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ⚠️ 記号エラー例
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value="田中@#"
              onChange={() => {}}
              error="オンライン家族名に記号は使用できません"
            />
          </View>
        </View>

        {/* ヘルプテキスト確認 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ℹ️ ヘルプテキスト
          </Text>
          <Text style={[styles.helpDescription, { color: colors.text.secondary }]}>
            タイトルの横にあるℹ️ボタンをタップすると、{'\n'}
            「この家族名はオンライン上で使用されます。」{'\n'}
            というヘルプテキストが表示されます。
          </Text>
        </View>

        {/* 現在の値表示 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔍 デバッグ情報
          </Text>
          <View style={[styles.debugInfo, { backgroundColor: colors.surface.elevated }]}>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              入力値: "{value}"
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
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  example: {
    padding: 16,
    borderRadius: 12,
  },
  helpDescription: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  debugInfo: {
    padding: 16,
    borderRadius: 12,
  },
  debugText: {
    fontSize: 12,
    fontFamily: 'Courier',
    marginBottom: 4,
  },
});
