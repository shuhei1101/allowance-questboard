import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { FamilyNameInput } from './FamilyNameInput';
import { BaseFamilyName } from '@backend/features/family/value-object/baseFamilyName';

export interface FamilyNameInputEntryProps {
  /** エントリーのタイトル */
  title?: string;
  /** 入力値 */
  value: BaseFamilyName;
  /** 値変更時のコールバック */
  onChange: (value: BaseFamilyName) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
}

/** 家族名入力エントリーコンポーネント
 *
 * EntryLayoutを使用した家族名入力コンポーネント */
export const FamilyNameInputEntry: React.FC<FamilyNameInputEntryProps> = ({
  title = '家族名',
  value,
  onChange,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <EntryLayout
      title={title}
      icon="home"
      required
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
