import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { EntryWithError } from '@/core/components/EntryWithError';
import { FamilyIdInput, FamilyIdInputProps } from './FamilyIdInput';
import { FamilyDisplayId } from '@backend/features/family/value-object/familyDisplayId';

export interface FamilyIdInputEntryProps {
  /** 入力値 */
  value: FamilyDisplayId;
  /** 値変更時のコールバック */
  onChange: (value: FamilyDisplayId) => void;
  /** プレースホルダー */
  placeholder?: string;
  /** エラーメッセージ */
  error?: string;
  /** 無効状態 */
  disabled?: boolean;
  /** タイトル（省略時: "家族ID"） */
  title?: string;
}

/** 家族ID入力エントリーコンポーネント
 *
 * EntryLayoutを使用した家族ID入力フィールド */
export const FamilyIdInputEntry: React.FC<FamilyIdInputEntryProps> = ({
  value,
  onChange,
  placeholder,
  error,
  disabled,
  title = '家族ID',
}) => {
  return (
    <EntryLayout
      title={title}
      icon="shield"
    >
      <EntryWithError error={error}>
        <FamilyIdInput
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={error}
          disabled={disabled}
        />
      </EntryWithError>
    </EntryLayout>
  );
};
