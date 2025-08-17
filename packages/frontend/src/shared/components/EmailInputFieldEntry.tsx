import React from 'react';
import { EntryField } from '@/core/components/EntryField';
import { FieldWithError } from '@/core/components/FieldWithError';
import { EmailInputField } from './EmailInputField';

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
  return (
    <EntryField
      icon="diamond"
      title="メールアドレス"
      required={true}
    >
      <FieldWithError error={error}>
        <EmailInputField
          value={value}
          onChange={onChange}
          error={error}
          placeholder={placeholder}
        />
      </FieldWithError>
    </EntryField>
  );
};
