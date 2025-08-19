import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';
import { ParentEditPage } from './parent-edit-page/ParentEditPage';

// 親機能関連のナビゲーションパラメータ型定義
export type ParentStackParamList = {
  ParentEdit: { onConfirm: (parentData: any) => void };
};

const ParentStack = createStackNavigator<ParentStackParamList>();

/**
 * 親編集画面のラッパー
 */
const ParentEditPageWrapper: React.FC<{ route: any }> = ({ route }) => {
  const { onConfirm } = route.params || {};

  const handleConfirm = (parentData: any) => {
    if (onConfirm) {
      onConfirm(parentData);
    } else {
      Alert.alert('確定', '親情報が保存されました');
    }
  };

  return <ParentEditPage onConfirm={handleConfirm} />;
};

/**
 * 親機能関連のナビゲーター
 * 親編集画面を管理
 */
export function ParentNavigator() {
  return (
    <ParentStack.Navigator
      initialRouteName="ParentEdit"
      screenOptions={{
        headerShown: true,
        headerTitle: '親情報編集',
      }}
      {...({} as any)}
    >
      <ParentStack.Screen 
        name="ParentEdit" 
        component={ParentEditPageWrapper} 
      />
    </ParentStack.Navigator>
  );
}
