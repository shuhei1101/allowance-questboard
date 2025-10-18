import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { IconSelectInputEntry } from '@/features/family/family-register-page/components/IconSelectInputEntry';
import { Icon } from '@backend/features/icon/domain/icon';
import { IconName } from '@backend/features/icon/value-objects/iconName';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { SortOrder } from '@backend/features/shared/value-object/sortOrder';

/**
 * IconSelectInputEntry デモページ
 * アイコン選択入力エントリーコンポーネントのデモとテスト
 */
export const IconSelectInputEntryPage: React.FC = () => {
  const { colors } = useTheme();
  const [selectedIcon, setSelectedIcon] = useState<Icon | undefined>();
  const [disabled, setDisabled] = useState(false);

  // サンプルアイコンの作成
  const sampleIcons = [
    new Icon({
      id: new IconId(1),
      name: new IconName('diamond'),
      sortOrder: new SortOrder(1),
      isActive: true,
    }),
    new Icon({
      id: new IconId(2),
      name: new IconName('star'),
      sortOrder: new SortOrder(2),
      isActive: true,
    }),
    new Icon({
      id: new IconId(3),
      name: new IconName('heart'),
      sortOrder: new SortOrder(3),
      isActive: true,
    }),
    new Icon({
      id: new IconId(4),
      name: new IconName('crown'),
      sortOrder: new SortOrder(4),
      isActive: true,
    }),
  ];

  const handleIconSelect = () => {
    Alert.alert(
      '家紋選択',
      'アイコン選択画面への遷移',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: 'ダイヤモンド選択',
          onPress: () => setSelectedIcon(sampleIcons[0]),
        },
        {
          text: 'スター選択',
          onPress: () => setSelectedIcon(sampleIcons[1]),
        },
        {
          text: 'ハート選択',
          onPress: () => setSelectedIcon(sampleIcons[2]),
        },
        {
          text: 'クラウン選択',
          onPress: () => setSelectedIcon(sampleIcons[3]),
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text.primary }]}>
          IconSelectInputEntry
        </Text>
        <Text style={[styles.subtitle, { color: colors.text.secondary }]}>
          アイコン選択入力エントリーコンポーネントのデモ
        </Text>
      </View>

      <View style={styles.content}>
        {/* インタラクティブデモ */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🎯 インタラクティブデモ
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <IconSelectInputEntry
              selectedIcon={selectedIcon}
              onPress={handleIconSelect}
              disabled={disabled}
            />
          </View>
        </View>

        {/* 基本状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✅ 基本状態（未選択）
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <IconSelectInputEntry
              selectedIcon={undefined}
              onPress={() => Alert.alert('家紋選択', '基本状態の家紋選択')}
            />
          </View>
        </View>

        {/* 選択済み状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            ✨ 選択済み状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <IconSelectInputEntry
              selectedIcon={sampleIcons[0]}
              onPress={() => Alert.alert('家紋変更', 'ダイヤモンドが選択されています')}
            />
          </View>
        </View>

        {/* 無効状態 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text.primary }]}>
            🔒 無効状態
          </Text>
          <View style={[styles.example, { backgroundColor: colors.surface.elevated }]}>
            <IconSelectInputEntry
              selectedIcon={sampleIcons[1]}
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
            <IconSelectInputEntry
              title="シンボル"
              selectedIcon={sampleIcons[2]}
              onPress={() => Alert.alert('シンボル変更', 'ハートが選択されています')}
              placeholder="シンボルを選択"
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
              選択中アイコン: {selectedIcon ? selectedIcon.name.value : '未選択'}
            </Text>
            <Text style={[styles.debugText, { color: colors.text.secondary }]}>
              アイコンID: {selectedIcon ? selectedIcon.id?.value || '未設定' : '未選択'}
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
