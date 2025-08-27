import { ActionButton, ActionButtonProps } from "../../../core/components/ActionButton";


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
