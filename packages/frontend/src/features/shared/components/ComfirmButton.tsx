import React from 'react';
import { ActionButton } from '@/core/components/ActionButton';

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
 * 確定ボタンコンポーネント
 * ActionButtonをラップしてsaveアイコンを提供
 * ナビゲーションバーのアクションボタンとしても使用可能
 */
export const ConfirmButton: React.FC<Props> = (props) => {
  return (
    <ActionButton
      {...props}
      iconName="checkmark"
    />
  );
};
