import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyNameInputEntry } from '@/features/family/family-register-page/components/FamilyNameInputEntry';

/**
 * FamilyNameInputEntry デモページ
 * 家族名入力エントリーコンポーネントのデモとテスト
 */
export const FamilyNameInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(false);

  // バリデーション例
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    // エラーの例
    if (newValue.length > 10) {
      setError('家族名は10文字以内で入力してください');
    } else if (newValue.includes(' ')) {
      setError('家族名にスペースは使用できません');
    } else {
      setError(undefined);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          👪 FamilyNameInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          家族名入力エントリーコンポーネント
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          EntryLayoutを使用した家族名入力コンポーネントです。{'\n'}
          入力値の後ろに"家"の固定文字が表示されます。
        </Text>
      </View>

      <View style={styles.content}>
        {/* 基本的な使用例 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            📝 基本的な使用例
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyNameInputEntry
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
            <FamilyNameInputEntry
              value="とても長い家族名"
              onChange={() => {}}
              error="家族名は10文字以内で入力してください"
            />
          </View>
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔒 無効状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <FamilyNameInputEntry
              value="田中"
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
            <FamilyNameInputEntry
              title="ご家族名"
              value="山田"
              onChange={() => {}}
              placeholder="ご家族名を入力してください"
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
