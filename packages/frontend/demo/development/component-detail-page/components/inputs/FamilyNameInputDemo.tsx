import React from 'react';
import { FamilyNameInput } from '@/features/family/family-register-page/components/FamilyNameInput';
import { ComponentDemo } from '../types';

/** FamilyNameInputのデモコンポーネント */
export const FamilyNameInputDemo: ComponentDemo = {
  info: {
    name: 'FamilyNameInput',
    icon: '🏠',
    description: '家族名入力用のコンポーネント（後ろに"家"の固定文字付き）',
    defaultProps: {
      value: '田中',
      placeholder: '例: 田中',
      errorMessage: '',
      disabled: false,
    },
    props: [
      { name: 'value', label: '入力値', type: 'string', placeholder: '家族名' },
      { name: 'placeholder', label: 'プレースホルダー', type: 'string' },
      { name: 'errorMessage', label: 'エラーメッセージ', type: 'string' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<FamilyNameInput\n  value={familyName}\n  onChange={setFamilyName}\n  placeholder="例: 田中"\n  error={familyNameError}\n/>'
  },
  renderComponent: ({ componentProps, updateProp }) => (
    <FamilyNameInput
      value={componentProps.value}
      onChange={(value) => updateProp('value', value)}
      placeholder={componentProps.placeholder}
      error={componentProps.errorMessage}
      disabled={componentProps.disabled}
    />
  )
};
