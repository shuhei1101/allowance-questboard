import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { ParentInfoInput, ParentInfoInputProps } from './ParentInfoInput';

export interface ParentInfoInputEntryProps extends ParentInfoInputProps {
  /** エントリーのタイトル */
  title?: string;
}

/** 親情報入力エントリー
 *
 * EntryLayoutでラップしたParentInfoInputコンポーネント
 * 家族登録画面での親情報表示・編集エントリー */
export const ParentInfoInputEntry: React.FC<ParentInfoInputEntryProps> = ({
  title = '親情報',
  ...parentInfoInputProps
}) => {
  return (
    <EntryLayout
      title={title}
      icon="person"
    >
      <ParentInfoInput {...parentInfoInputProps} />
    </EntryLayout>
  );
};
