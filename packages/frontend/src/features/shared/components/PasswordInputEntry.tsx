import React from 'react';
import { EntryLayout } from '@/core/components/EntryLayout';
import { OnPasswordChange, PasswordInputField } from './PasswordInput';
import { useTranslation } from '@/core/i18n/useTranslation';
import { Password } from '../../../../../backend/src/features/auth/value-object/password';

interface Props {
  value: Password;
  onChange: OnPasswordChange;
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
