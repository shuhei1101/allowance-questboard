import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { FamilyNameInput } from './FamilyNameInput';

export interface OnlineFamilyNameInputEntryProps {
  /** 入力値 */
  value: string;
  /** 値変更時のコールバック */
  onChange: (value: string) => void;
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
  return (
    <EntryLayout
      title="オンライン家族名"
      icon="globe"
      required
      helpText="この家族名はオンライン上で使用されます。"
    >
      <FamilyNameInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        disabled={disabled}
      />
    </EntryLayout>
  );
};
