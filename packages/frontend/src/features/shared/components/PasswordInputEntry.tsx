import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { PasswordInputField } from './PasswordInput';
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
export const PasswordInputEntry: React.FC<Props> = ({ value, onChange, error, placeholder }) => {
  const { t } = useTranslation();
  
  return (
    <EntryLayout
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
    </EntryLayout>
  );
};
