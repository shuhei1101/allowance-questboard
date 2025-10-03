import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FamilyIdInput } from '@/features/family/family-register-page/components/FamilyIdInput';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { useTheme } from '@/core/theme';

/** FamilyIdInputコンポーネントのデモページ */
export const FamilyIdInputPage: React.FC = () => {
  const { colors } = useTheme();
  const [basicValue, setBasicValue] = useState(new FamilyDisplayId(''));
  const [errorValue, setErrorValue] = useState(new FamilyDisplayId('invalid_id'));
  const [disabledValue, setDisabledValue] = useState(new FamilyDisplayId('readonly_family'));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          FamilyIdInput コンポーネント
        </Text>
        <Text style={[styles.description, { color: colors.text.secondary }]}>
          前に"@"マーク付きの家族ID入力コンポーネント
        </Text>

        {/* 基本的な使用例 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            基本的な使用例
          </Text>
          <FamilyIdInput
            value={basicValue}
            onChange={setBasicValue}
            placeholder="tanaka_family"
          />
        </View>

        {/* エラー状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            エラー状態
          </Text>
          <FamilyIdInput
            value={errorValue}
            onChange={setErrorValue}
            error="この家族IDは既に使用されています"
          />
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            無効状態
          </Text>
          <FamilyIdInput
            value={disabledValue}
            onChange={() => {}}
            disabled={true}
          />
        </View>

        {/* カスタムプレースホルダー */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            カスタムプレースホルダー
          </Text>
          <FamilyIdInput
            value={new FamilyDisplayId('')}
            onChange={() => {}}
            placeholder="your_awesome_family"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});
