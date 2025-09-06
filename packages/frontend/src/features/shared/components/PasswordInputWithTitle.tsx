import React from 'react';
import { EntryFrame } from '@/core/components/EntryFrame';
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
export const PasswordInputWithTitle: React.FC<Props> = ({ value, onChange, error, placeholder }) => {
  const { t } = useTranslation();
  
  return (
    <EntryFrame
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
    </EntryFrame>
  );
};
