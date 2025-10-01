import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { FamilyNameInput } from './FamilyNameInput';
import { FamilyOnlineName } from '@backend/features/family/value-object/familyOnlineName';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';
import { FamilyName } from '@backend/features/family/value-object/familyName';

export interface OnlineFamilyNameInputEntryProps {
  /** 入力値 */
  value: FamilyOnlineName;
  /** 値変更時のコールバック */
  onChange: (value: FamilyOnlineName) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
}

/** オンライン家族名入力エントリーコンポーネント
 *
 * EntryLayoutを使用したオンライン家族名入力コンポーネント
 * ヘルプテキストでオンライン利用についての説明を表示 */
export const OnlineFamilyNameInputEntry: React.FC<OnlineFamilyNameInputEntryProps> = ({
  value,
  onChange,
  placeholder = '例: 田中',
  error,
  disabled,
}) => {
  /** BaseFamilyName変更時にFamilyOnlineNameに変換してonChangeに渡す */
  const handleFamilyNameChange = (familyName: BaseFamilyName) => {
    const familyOnlineName = new FamilyOnlineName(familyName.value);
    onChange(familyOnlineName);
  };

  return (
    <EntryLayout
      title="オンライン家族名"
      icon="globe"
      required
      helpText="この家族名はオンライン上で使用されます。"
    >
      <FamilyNameInput
        value={value}
        onChange={handleFamilyNameChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
      />
    </EntryLayout>
  );
};
