import React from 'react';
import { EntryFrame } from '@/core/components/EntryFrame';
import { EntryWithError } from '@/core/components/EntryWithError';
import { EmailInput } from './EmailInput';
import { useTranslation } from '@/core/i18n/useTranslation';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  placeholder?: string;
}

/** メールアドレス入力コンポーネント（タイトル付き）
 * 
 * EntryFrameでラップしたEmailInput */
export const EmailInputWithTitle: React.FC<Props> = ({ value, onChange, error, placeholder }) => {
  const { t } = useTranslation();
  
  return (
    <EntryFrame
      icon="mail"
      title={t('common.fields.email')}
      required={true}
    >
      <EmailInput
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
    </EntryFrame>
  );
};
