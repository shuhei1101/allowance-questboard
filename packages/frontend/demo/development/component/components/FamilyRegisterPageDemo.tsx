import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTheme } from '@/core/theme';
import { FamilyRegisterPage } from '@/features/family/family-register-page/FamilyRegisterPage';
import { FamilyRegisterForm } from '@/features/family/family-register-page/models/familyRegisterForm';
import { Parent } from '@backend/features/parent/models/parent';
import { ParentName } from '@backend/features/parent/value-object/parentName';
import { ParentId } from '@backend/features/parent/value-object/parentId';
import { IconId } from '@backend/features/icon/value-objects/iconId';
import { FamilyId } from '@backend/features/family/value-object/familyId';
import { Birthday } from '@backend/features/shared/value-object/birthday';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';
import { FamilyName } from '@backend/features/family/value-object/familyName';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';

/**
 * FamilyRegisterPage デモページ
 * 家族登録画面のデモとテスト
 */
export const FamilyRegisterPageDemo: React.FC = () => {
  const { colors } = useTheme();
  
  // サンプルフォームの作成
  const [form, setForm] = useState(() => {
    try {
      return new FamilyRegisterForm({
        family: {
          displayId: new FamilyDisplayId('tanaka_family'),
          name: new FamilyName('田中'),
          onlineName: new FamilyOnlineName('田中'),
        },
        parent: {
          name: new ParentName('田中太郎'),
          birthday: new Birthday(new Date('1985-05-15')),
        },
      });
    } catch (error) {
      console.error('Failed to create FamilyRegisterForm:', error);
      // フォールバック用の簡単なオブジェクト
      return {
        family: {
          displayId: { value: 'tanaka_family' },
          name: { value: '田中' },
          onlineName: { value: '田中' },
        },
        parent: {
          name: { value: '田中太郎' },
          birthday: { value: new Date('1985-05-15') },
        },
      } as any;
    }
  });

  const [parent, setParent] = useState<Parent | undefined>();
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleFamilyNameChange = (value: BaseFamilyName) => {
    Alert.alert('家族名変更', `新しい値: ${value.value}`);
  };

  const handleOnlineFamilyNameChange = (value: FamilyOnlineName) => {
    Alert.alert('オンライン家族名変更', `新しい値: ${value.value}`);
  };

  const handleFamilyIdChange = (value: FamilyDisplayId) => {
    Alert.alert('家族ID変更', `新しい値: ${value.value}`);
  };

  const handleIconSelect = () => {
    Alert.alert('家紋選択', 'アイコン選択画面への遷移');
  };

  const handleParentEdit = () => {
    Alert.alert(
      '親情報編集',
      '親編集画面への遷移',
      [
        { text: 'キャンセル', style: 'cancel' },
        {
          text: '親情報を設定',
          onPress: () => {
            const sampleParent = new Parent({
              id: new ParentId(1),
              name: new ParentName('田中太郎'),
              iconId: new IconId(1),
              birthday: new Birthday(new Date('1985-05-15')),
              familyId: new FamilyId(1),
            });
            setParent(sampleParent);
          },
        },
        {
          text: '親情報をクリア',
          onPress: () => setParent(undefined),
        },
      ]
    );
  };

  const handleSubmit = (familyId?: string, parentId?: string) => {
    setIsLoading(true);
    Alert.alert(
      '家族登録',
      `家族登録処理を実行します\n家族ID: ${familyId || '未指定'}\n親ID: ${parentId || '未指定'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setTimeout(() => {
              setIsLoading(false);
              Alert.alert('成功', '家族登録が完了しました！');
            }, 2000);
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
          家族登録画面のデモ
        </Text>
      </View>

      <View style={styles.content}>
        <FamilyRegisterPage
          form={form as any}
          parent={parent}
          onFamilyNameChange={handleFamilyNameChange}
          onOnlineFamilyNameChange={handleOnlineFamilyNameChange}
          onFamilyIdChange={handleFamilyIdChange}
          onIconSelect={handleIconSelect}
          onParentEdit={handleParentEdit}
          onSubmit={handleSubmit}
          isValid={isValid}
          isLoading={isLoading}
        />
      </View>

      {/* デバッグ情報 */}
      <View style={[styles.debugInfo, { backgroundColor: colors.surface.elevated }]}>
        <Text style={[styles.debugTitle, { color: colors.text.primary }]}>
          🔍 デバッグ情報
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          フォーム有効: {isValid ? 'はい' : 'いいえ'}
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          ローディング中: {isLoading ? 'はい' : 'いいえ'}
        </Text>
        <Text style={[styles.debugText, { color: colors.text.secondary }]}>
          親情報: {parent ? parent.name.value : '未設定'}
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
