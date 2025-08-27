import React from 'react';
import { ActionButton, ActionButtonProps } from '@/core/components/ActionButton';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'header';
  backgroundColor?: string;
  iconColor?: string;
}

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
