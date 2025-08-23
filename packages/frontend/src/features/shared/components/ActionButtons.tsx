import React from 'react';
import { ActionButton } from '@/core/components/ActionButton';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'header';
}

/**
 * 編集ボタンコンポーネント
 * ActionButtonをラップしてpencilアイコンを提供
 */
export const EditButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="pencil"
    />
  );
};

/**
 * 削除ボタンコンポーネント
 * ActionButtonをラップしてtrash-outlineアイコンを提供
 */
export const DeleteButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="trash-outline"
    />
  );
};

/**
 * 追加ボタンコンポーネント
 * ActionButtonをラップしてadd-outlineアイコンを提供
 */
export const AddButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="add-outline"
    />
  );
};

/**
 * 戻るボタンコンポーネント
 * ActionButtonをラップしてarrow-backアイコンを提供
 */
export const BackButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="arrow-back"
    />
  );
};

/**
 * 確定ボタンコンポーネント
 * ActionButtonをラップしてsaveアイコンを提供
 * ナビゲーションバーのアクションボタンとしても使用可能
 */
export const ComfirmButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="checkmark"
    />
  );
};
