import React from 'react';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { PasswordInputField } from './PasswordInputField';

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
  return (
    <EntryField
      icon="diamond"
      title="パスワード"
      required={true}
    >
      <FieldWithError error={error}>
        <PasswordInputField
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
        />
      </FieldWithError>
    </EntryField>
  );
};
