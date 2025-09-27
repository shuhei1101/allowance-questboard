import React from 'react';
import { Alert } from 'react-native';
import { ComfirmButton } from '@/features/shared/components/ComfirmButton';
import { ComponentDemo } from '../types';

/** SaveButtonのデモコンポーネント */
export const SaveButtonDemo: ComponentDemo = {
  info: {
    name: 'SaveButton',
    icon: '💾',
    description: '保存処理用のボタンコンポーネント',
    defaultProps: {
      loading: false,
      disabled: false,
    },
    props: [
      { name: 'loading', label: 'ローディング状態', type: 'boolean' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<SaveButton\n  onPress={handleSave}\n  loading={isLoading}\n  disabled={!isValid}\n/>'
  },
  renderComponent: ({ componentProps }) => (
    <ComfirmButton
      onPress={() => Alert.alert('保存', 'SaveButtonが押されました！')}
      loading={componentProps.loading}
      disabled={componentProps.disabled}
    />
  )
};
