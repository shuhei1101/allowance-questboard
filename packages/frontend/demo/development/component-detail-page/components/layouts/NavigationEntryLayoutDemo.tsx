import React from 'react';
import { Alert } from 'react-native';
import { NavigationEntryLayout, NavigationEntryText } from '@/core/components/NavigationEntryLayout';
import { ComponentDemo } from '../types';

/** NavigationEntryLayoutのデモコンポーネント */
export const NavigationEntryLayoutDemo: ComponentDemo = {
  info: {
    name: 'NavigationEntryLayout',
    icon: '🧩',
    description: '右矢印付きナビゲーション用レイアウトコンポーネント',
    defaultProps: {
      contentText: '親情報設定',
      disabled: false,
    },
    props: [
      { name: 'contentText', label: '表示テキスト', type: 'string', placeholder: '表示するテキスト' },
      { name: 'disabled', label: '無効化', type: 'boolean' },
    ],
    usage: '<NavigationEntryLayout\n  onPress={handlePress}\n  disabled={false}\n>\n  <NavigationEntryText>表示テキスト</NavigationEntryText>\n</NavigationEntryLayout>'
  },
  renderComponent: ({ componentProps }) => (
    <NavigationEntryLayout
      onPress={() => Alert.alert('ナビゲーション', 'NavigationEntryLayoutが押されました！')}
      disabled={componentProps.disabled}
    >
      <NavigationEntryText>
        {componentProps.contentText}
      </NavigationEntryText>
    </NavigationEntryLayout>
  )
};
