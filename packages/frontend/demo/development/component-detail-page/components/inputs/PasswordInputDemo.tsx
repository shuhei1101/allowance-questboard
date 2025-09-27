import React from 'react';
import { PasswordInputField } from '@/features/shared/components/PasswordInput';
import { ComponentDemo } from '../types';

/** PasswordInputのデモコンポーネント */
export const PasswordInputDemo: ComponentDemo = {
  info: {
    name: 'PasswordInputField',
    icon: '🔒',
    description: 'パスワード入力用のフィールドコンポーネント',
    defaultProps: {
      value: 'password123',
      placeholder: 'パスワードを入力',
      errorMessage: '',
      disabled: false,
    },
    props: [
      { name: 'value', label: '入力値', type: 'string', placeholder: 'パスワード' },
      { name: 'placeholder', label: 'プレースホルダー', type: 'string' },
      { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<PasswordInputField\n  value={password}\n  onChangeText={setPassword}\n  placeholder="パスワードを入力"\n  errorMessage={passwordError}\n/>'
  },
  renderComponent: ({ componentProps, updateProp }) => (
    <PasswordInputField
      value={componentProps.value}
      onChange={(value) => updateProp('value', value)}
      placeholder={componentProps.placeholder}
      error={componentProps.errorMessage}
    />
  )
};
