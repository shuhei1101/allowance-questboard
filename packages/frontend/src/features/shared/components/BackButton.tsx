import { ActionButton } from "../../../core/components";

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
