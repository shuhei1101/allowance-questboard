import React from 'react';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { EmailInputField } from './EmailInputField';
import { useTranslation } from '@/core/i18n/useTranslation';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  placeholder?: string;
}

/**
 * メールアドレス入力エントリーコンポーネント
 * EntryFieldとFieldWithErrorでラップしたEmailInputField
 */
export const EmailInputFieldEntry: React.FC<Props> = ({ value, onChange, error, placeholder }) => {
  const { t } = useTranslation();
  
  return (
    <EntryField
      icon="mail"
      title={t('common.fields.email')}
      required={true}
    >
      <EmailInputField
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
    </EntryField>
  );
};
