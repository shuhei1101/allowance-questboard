import React from 'react';
import { Alert } from 'react-native';
import { IconSelectButton } from '@/features/shared/components/IconSelectButton';
import { ComponentDemo } from '../types';

/** IconSelectButtonのデモコンポーネント */
export const IconSelectButtonDemo: ComponentDemo = {
  info: {
    name: 'IconSelectButton',
    icon: '🎨',
    description: 'アイコン選択用のボタンコンポーネント',
    defaultProps: {
      selectedIcon: 'icon-001',
      disabled: false,
    },
    props: [
      { name: 'selectedIcon', label: '選択アイコン', type: 'string', placeholder: 'icon-001' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<IconSelectButton\n  selectedIcon={icon}\n  onSelectIcon={setIcon}\n  disabled={false}\n/>'
  },
  renderComponent: ({ componentProps }) => (
    <IconSelectButton
      selectedIcon={componentProps.selectedIcon}
      onPress={() => Alert.alert('アイコン選択', 'IconSelectButtonが押されました！')}
    />
  )
};
