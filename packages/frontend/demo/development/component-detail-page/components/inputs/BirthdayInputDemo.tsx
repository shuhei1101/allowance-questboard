import React from 'react';
import { BirthdayInput } from '@/features/shared/components/BirthdayInput';
import { ComponentDemo } from '../types';

/** BirthdayInputのデモコンポーネント */
export const BirthdayInputDemo: ComponentDemo = {
  info: {
    name: 'BirthdayInputField',
    icon: '🎂',
    description: '誕生日入力用のフィールドコンポーネント',
    defaultProps: {
      value: '1990-01-01',
      errorMessage: '',
      disabled: false,
    },
    props: [
      { name: 'value', label: '入力値', type: 'string', placeholder: 'YYYY-MM-DD' },
      { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<BirthdayInputField\n  value={birthday}\n  onChange={setBirthday}\n  errorMessage={birthdayError}\n/>'
  },
  renderComponent: ({ componentProps, updateProp }) => (
    <BirthdayInput
      value={componentProps.value}
      onChange={(value) => updateProp('value', value)}
      error={componentProps.errorMessage}
    />
  )
};
