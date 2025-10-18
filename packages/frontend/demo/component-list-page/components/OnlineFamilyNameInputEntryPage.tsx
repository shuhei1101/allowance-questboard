import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/core/theme';
import { OnlineFamilyNameInputEntry } from '@/features/family/family-register-page/components/OnlineFamilyNameInputEntry';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';

/**
 * OnlineFamilyNameInputEntry デモページ
 * オンライン家族名入力エントリーコンポーネントのデモとテスト
 */
export const OnlineFamilyNameInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [value, setValue] = useState<FamilyOnlineName>(new FamilyOnlineName(''));
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(false);

  // バリデーション例
  const handleChange = (newValue: FamilyOnlineName) => {
    setValue(newValue);
    
    // エラーの例
    if (newValue.value.length > 10) {
      setError('オンライン家族名は10文字以内で入力してください');
    } else if (newValue.value.includes(' ')) {
      setError('オンライン家族名にスペースは使用できません');
    } else if (newValue.value.includes('@') || newValue.value.includes('#')) {
      setError('特殊文字は使用できません');
    } else {
      setError(undefined);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          OnlineFamilyNameInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          オンライン家族名入力エントリーコンポーネントのデモ
        </Text>
      </View>

      <View style={styles.content}>
        {/* インタラクティブデモ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🎯 インタラクティブデモ
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value={value}
              onChange={handleChange}
              error={error}
              disabled={disabled}
            />
          </View>
        </View>

        {/* 基本状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✅ 基本状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <OnlineFamilyNameInputEntry
              value={new FamilyOnlineName('')}
              onChange={() => {}}
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
              value={new FamilyOnlineName('とても長いオンライン家族名')}
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
              value={new FamilyOnlineName('田中')}
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
            <OnlineFamilyNameInputEntry
              value={new FamilyOnlineName('田中@#')}
              onChange={() => {}}
              placeholder="オンライン家族名を入力してください"
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
              入力値: "{value.value}"
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              エラー: {error || 'なし'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              無効状態: {disabled ? 'はい' : 'いいえ'}
            </Text>
          </View>
        </View>

        {/* 操作ボタン */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🎮 コントロール
          </Text>
          <View style={[styles.controls, { backgroundColor: colors.surface.elevated }]}>
            <View style={styles.buttonRow}>
              <Text 
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => setValue(new FamilyOnlineName('田中家'))}
              >
                値をセット
              </Text>
              <Text 
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => setValue(new FamilyOnlineName(''))}
              >
                クリア
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <Text 
                style={[styles.button, { backgroundColor: colors.danger }]}
                onPress={() => setError('テストエラー')}
              >
                エラー設定
              </Text>
              <Text 
                style={[styles.button, { backgroundColor: colors.danger }]}
                onPress={() => setError(undefined)}
              >
                エラークリア
              </Text>
            </View>
            <View style={styles.buttonRow}>
              <Text 
                style={[styles.button, { backgroundColor: colors.warning }]}
                onPress={() => setDisabled(!disabled)}
              >
                {disabled ? '有効にする' : '無効にする'}
              </Text>
            </View>
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
  controls: {
    padding: 16,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
  },
});
