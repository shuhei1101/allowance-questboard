import React from 'react';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { PasswordInputField } from './PasswordInputField';
import { useTranslation } from '@/core/i18n/useTranslation';

interface Props {
  value: string;
  onChange: (text: string) => void;
  error?: string;
  placeholder?: string;
}

/**
 * パスワード入力エントリーコンポーネント
 * EntryFieldとFieldWithErrorでラップしたPasswordInputField
 */
export const PasswordInputFieldEntry: React.FC<Props> = ({ value, onChange, error, placeholder }) => {
  const { t } = useTranslation();
  
  return (
    <EntryField
      icon="lock-closed"
      title={t('common.fields.password')}
      required={true}
    >
      <PasswordInputField
        value={value}
        onChange={onChange}
        error={error}
        placeholder={placeholder}
      />
    </EntryField>
  );
};
