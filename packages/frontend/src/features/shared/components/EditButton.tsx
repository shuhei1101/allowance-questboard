import { ActionButton } from "../../../core/components";
import { ActionButtonProps } from "../../../core/components/ActionButton";

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
