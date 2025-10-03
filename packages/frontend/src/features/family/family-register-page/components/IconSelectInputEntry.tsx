import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { IconSelectEntry, IconSelectEntryProps } from '@/features/shared/components/IconSelectEntry';
import { Icon } from '@backend/features/icon/domain/icon';

export interface IconSelectInputEntryProps {
  /** 選択されたアイコン */
  selectedIcon?: Icon;
  /** アイコン選択時のコールバック */
  onPress: () => void;
  /** 無効状態 */
  disabled?: boolean;
  /** 未選択時の表示テキスト */
  placeholder?: string;
  /** タイトル（省略時: "家紋"） */
  title?: string;
}

/** アイコン選択入力エントリーコンポーネント
 *
 * EntryLayoutを使用したアイコン選択入力フィールド */
export const IconSelectInputEntry: React.FC<IconSelectInputEntryProps> = ({
  selectedIcon,
  onPress,
  disabled = false,
  placeholder,
  title = '家紋',
}) => {
  return (
    <EntryLayout
      title={title}
      icon="diamond"
    >
      <IconSelectEntry
        selectedIcon={selectedIcon}
        onPress={onPress}
        disabled={disabled}
        placeholder={placeholder}
      />
    </EntryLayout>
  );
};
