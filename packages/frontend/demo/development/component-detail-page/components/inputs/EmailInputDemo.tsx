import React from 'react';
import { EmailInput } from '@/features/shared/components/EmailInput';
import { ComponentDemo } from '../types';

/** EmailInputのデモコンポーネント */
export const EmailInputDemo: ComponentDemo = {
  info: {
    name: 'EmailInputField',
    icon: '📧',
    description: 'メールアドレス入力用のフィールドコンポーネント',
    defaultProps: {
      value: 'test@example.com',
      placeholder: 'メールアドレスを入力',
      errorMessage: '',
      disabled: false,
    },
    props: [
      { name: 'value', label: '入力値', type: 'string', placeholder: 'メールアドレス' },
      { name: 'placeholder', label: 'プレースホルダー', type: 'string' },
      { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<EmailInputField\n  value={email}\n  onChangeText={setEmail}\n  placeholder="メールアドレスを入力"\n  errorMessage={emailError}\n/>'
  },
  renderComponent: ({ componentProps, updateProp }) => (
    <EmailInput
      value={componentProps.value}
      onChange={(value) => updateProp('value', value)}
      placeholder={componentProps.placeholder}
      error={componentProps.errorMessage}
    />
  )
};
